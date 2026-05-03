import { logout } from "../utils/logout";

const BASE_URL = "https://kowope-backend-service.onrender.com"

let isRefreshing = false;
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

	if (res.status === 401) {
		if (!isRefreshing) {
			isRefreshing = true;
			refreshPromise = refreshAccessToken()
				.finally(() => {
					isRefreshing = false;
				});
		}

		try {
			await refreshPromise;

			// retry request
			res = await fetch(url, {
				...options,
				credentials: "include",
			});
		} catch (err) {
            logout();
			throw new Error("Session expired");
		}
	}

	if (!res.ok) {
		const data = await res.json().catch(() => ({}));
		const error = new Error(data.message || "Request failed");
		error.response = { data };
		throw error;
	}

	return res.json();
};