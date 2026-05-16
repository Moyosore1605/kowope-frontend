import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { clearAccessToken } from "../services/tokenStore";
import { restoreSession } from "../services/restoreSession";
import { fetchDriverProfile } from "../services/driverAuth";

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authStatus, setAuthStatus] = useState("booting");

	const logoutUser = async (reason = "logged-out") => {

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

    useEffect(() => {
		const handleLogout = async (event) => {

			const reason = event.detail || "session-expired";
			await logoutUser(reason);
		};

		window.addEventListener(
			"app-logout",
			handleLogout
		);

		return () => {

			window.removeEventListener(
				"app-logout",
				handleLogout
			);
		};

	}, []);

	useEffect(() => {
		const bootstrapAuth = async () => {
			try {

				const restored = await restoreSession();

				if (!restored) {
					setAuthStatus("unauthenticated");
                    return;
				}

				const profile = await fetchDriverProfile();

				setUser(profile);

				setAuthStatus("authenticated");
			} catch (err) {

				if (!navigator.onLine) {
					setAuthStatus("offline");
					return;
				}

				setAuthStatus("unauthenticated");
			}
		};

		bootstrapAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				authStatus,
				setAuthStatus,
				logoutUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);