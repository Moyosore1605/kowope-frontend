import {
	Navigate,
	Outlet,
} from "react-router-dom";
import DriverDashboardSkeleton from "../components/Driver/DriverDashboardSkeleton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function PublicRoute() {

	const { authStatus } = useAuth();

	// app still restoring session
	if (authStatus === "booting") {
		return (
			<DriverDashboardSkeleton />
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