export const triggerLogout = (reason = "session-expired") => {

	window.dispatchEvent(
		new CustomEvent(
			"app-logout",
			{
				detail: reason,
			}
		)
	);
};