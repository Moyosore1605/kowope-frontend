import { logout } from "../utils/logout";

const BASE_URL = "https://kowope-backend-service.onrender.com";

let refreshPromise = null;

export const refreshAccessToken = async () => {
	const res = await fetch(
		`${BASE_URL}/api/v1/auth/token/refresh`,
		{
			method: "POST",
			credentials: "include",
		}
	);

	if (!res.ok) {
		throw new Error("Refresh failed");
	}

	return res.json();
};

export const fetchWithAuth = async (url, options = {}) => {
	let res = await fetch(url, {
		...options,
		credentials: "include",
	});

	// 🔁 Handle expired access token
	if (res.status === 401) {
		try {
			// ensure only ONE refresh happens globally
			if (!refreshPromise) {
				refreshPromise = refreshAccessToken().finally(() => {
					refreshPromise = null;
				});
			}

			await refreshPromise;

			// retry request once
			res = await fetch(url, {
				...options,
				credentials: "include",
			});

			// ❌ still unauthorized after refresh → session is dead
			if (res.status === 401) {
				logout();
				throw new Error("AUTH_EXPIRED");
			}

		} catch (err) {
			logout();
			throw new Error("AUTH_EXPIRED");
		}
	}

	// ❌ other errors
	if (!res.ok) {
		const data = await res.json().catch(() => ({}));
		throw new Error(data.message || "REQUEST_FAILED");
	}

	return res.json();
};
