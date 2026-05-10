import { clearAccessToken } from "../services/tokenStore";

export const logout = async () => {

	clearAccessToken();

	try {
		await fetch(
			"https://kowope-backend-service.onrender.com/api/v1/auth/driver/logout",
			{
				method: "POST",
				credentials: "include",
			}
		);
	} catch {}

	window.location.replace(
		"/login?reason=session-expired"
	);
};