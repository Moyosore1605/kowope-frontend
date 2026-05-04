import { queryClient } from "../services/queryClient";

const AUTH_ERRORS = {
	SESSION_EXPIRED: "session-expired",
};

let hasLoggedOut = false;

export const logout = () => {
	if (hasLoggedOut) return;
	hasLoggedOut = true;

	queryClient.clear();

	window.location.replace(`/login?reason=${AUTH_ERRORS.SESSION_EXPIRED}`);
};
