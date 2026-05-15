import { logout } from "../utils/logout";
import {
	getAccessToken,
	setAccessToken,
	clearAccessToken,
} from "./tokenStore";

const BASE_URL = "https://kowope-backend-service.onrender.com";

let refreshPromise = null;

/**
 * Refresh access token using HttpOnly refresh cookie
 */
export const refreshAccessToken = async () => {
	const res = await fetch(
		`${BASE_URL}/api/v1/auth/token/refresh`,
		{
			method: "POST",
			credentials: "include",
		}
	);

	const data = await res.json();

	if (!res.ok || !data?.success) {
		const err = new Error(data?.message || "Refresh failed");
		err.code = "SESSION_EXPIRED"; // attach a code for easy matching upstream
		throw err;
	}

	if (!data?.access_token) {
		throw new Error("No access token returned");
	}

	setAccessToken(data.access_token);
	return data.access_token;
};

/**
 * Main authenticated fetch wrapper
 */
export const fetchWithAuth = async (
	url,
	options = {}
) => {
	const token = getAccessToken();

	const headers = {
		...(options.headers || {}),
	};

	// attach access token
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	let res = await fetch(url, {
		...options,
		headers,
		credentials: "include",
	});

	// access token expired
	if (res.status === 401) {
		try {
			// only ONE refresh request globally
			if (!refreshPromise) {
				refreshPromise = refreshAccessToken().finally(() => {
					refreshPromise = null;
				});
			}

			const newAccessToken = await refreshPromise;

			// retry original request
			res = await fetch(url, {
				...options,
				headers: {
					...(options.headers || {}),
					Authorization: `Bearer ${newAccessToken}`,
				},
				credentials: "include",
			});

			// refresh failed logically
			if (res.status === 401) {
				clearAccessToken();
				logout();
				throw new Error("AUTH_EXPIRED");
			}

		} catch (err) {
			if (err.code === "SESSION_EXPIRED") {
				clearAccessToken();
				logout();
			}

			throw err;
		}
	}

	if (res.status === 429) {
		const data = await res.json().catch(() => ({}));

		const retryAfter =
			res.headers.get("Retry-After");

		const message =
			data?.message ||
			(retryAfter
				? `Too many requests. Try again in ${retryAfter} seconds.`
				: "Too many requests. Please slow down.");

		const err = new Error(message);

		err.code = "RATE_LIMITED";

		throw err;
	}

	if (!res.ok) {
		const data = await res.json().catch(() => ({}));

		throw new Error(
			data.message || "REQUEST_FAILED"
		);
	}

	return res.json();
};