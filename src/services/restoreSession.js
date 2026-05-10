import { refreshAccessToken } from "./fetchWithAuth";

export const restoreSession = async () => {
	try {
		await refreshAccessToken();
		return true;
	} catch (err) {
		return false;
	}
};