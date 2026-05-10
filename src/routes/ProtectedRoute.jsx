import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
	children,
}) {
	const { authStatus } = useAuth();

	// session booting
	if (authStatus === "booting") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading session...
			</div>
		);
	}

	// offline
	if (authStatus === "offline") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				No internet connection.
			</div>
		);
	}

	// backend unavailable
	if (authStatus === "server-error") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Server unavailable.
			</div>
		);
	}

	// not authenticated
	if (authStatus === "unauthenticated") {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children;
}