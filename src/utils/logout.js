import { queryClient } from "../services/queryClient";

const AUTH_ERRORS = {
	SESSION_EXPIRED: "session-expired",
};

export const logout = () => {
	queryClient.clear();          // wipe all cached user data
	window.location.replace(`/login?reason=${AUTH_ERRORS.SESSION_EXPIRED}`);
};