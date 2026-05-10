import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

import { restoreSession } from "../services/restoreSession";
import { fetchDriverProfile } from "../services/driverAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const [authStatus, setAuthStatus] = useState("booting");

	/*
	booting
	authenticated
	unauthenticated
	offline
	server-error
	*/

	useEffect(() => {
		const bootstrapAuth = async () => {
			try {
				// restore access token
				const restored = await restoreSession();

				if (!restored) {
					setAuthStatus(
						"unauthenticated"
					);
					return;
				}

				// fetch user profile
				const profile = await fetchDriverProfile();

				setUser(profile);

				setAuthStatus(
					"authenticated"
				);

			} catch (err) {

				// offline
				if (!navigator.onLine) {
					setAuthStatus("offline");
					return;
				}

				// backend unavailable
				setAuthStatus("server-error");
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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);