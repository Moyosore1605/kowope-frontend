import { clearAccessToken } from "../services/tokenStore";
import { useAuth } from "../context/AuthContext.jsx";

export const logout = async (reason="logged-out") => {
	const { setUser, setAuthStatus } = useAuth();
	setUser(null);
	setAuthStatus("unauthenticated");
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
		`/login?reason=${reason}`
	);
};