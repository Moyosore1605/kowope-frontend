import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicRoute() {
	const { isAuthenticated, isLoading } = useAuth();

	// if (isLoading) return <div>Loading...</div>;

	if (isAuthenticated) {
		return <Navigate to="/driver-dashboard" replace />;
	}

	return <Outlet />;
}