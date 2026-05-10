import { refreshAccessToken } from "./fetchWithAuth";

export const restoreSession = async () => {
    try {
        await refreshAccessToken();
        return true;
    } catch (err) {
        if (err.code === "SESSION_EXPIRED") {
            return false; // expected — user needs to log in again
        }
        throw err; // unexpected error, let AuthProvider handle it
    }
};