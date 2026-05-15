import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { restoreSession } from "../services/restoreSession";
import { fetchDriverProfile } from "../services/driverAuth";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authStatus, setAuthStatus] = useState("booting");

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                const restored = await restoreSession();
                if (!restored) { setAuthStatus("unauthenticated"); return; }

                const profile = await fetchDriverProfile();
                setUser(profile);
                setAuthStatus("authenticated");
            } catch (err) {
                setAuthStatus(!navigator.onLine ? "offline" : "server-error");
            }
        };
        bootstrapAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, authStatus, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
