import {
	Navigate,
	Outlet,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {

	const { authStatus } = useAuth();

	// app still restoring session
	if (authStatus === "booting") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	}

	// already authenticated
	if (authStatus === "authenticated") {
		return (
			<Navigate
				to="/driver-dashboard"
				replace
			/>
		);
	}

	// offline/server-error users
	// may still access login page
	return <Outlet />;
}