import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import DriverDashboardSkeleton from "../components/Driver/DriverDashboardSkeleton.jsx";
import KowopeDashboardLogo from '../assets/kowopeDashboardLogo-removebg-preview.png';

const StateScreen = ({ icon, badge, badgeColor, title, desc, action }) => (
	<div className="min-h-svh bg-gray-50 flex flex-col items-center justify-center px-6">
		<div className="flex flex-col items-center gap-5 text-center max-w-sm w-full">

		{/* Logo */}
		<img src={KowopeDashboardLogo} alt="Kowopé" className="h-10 w-auto mb-2" />

		{/* Icon */}
		<div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${icon.bg}`}>
			{icon.symbol}
		</div>

		{/* Badge */}
		<span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeColor}`}>
			{badge}
		</span>

		{/* Copy */}
		<div className="flex flex-col gap-2">
			<p className="text-base font-semibold text-gray-900">{title}</p>
			<p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
		</div>

		{/* Action */}
		{action}
		</div>
	</div>
);

const RetryButton = ({ onClick }) => (
	<button
		onClick={onClick}
		className="mt-1 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover active:scale-95 transition-all text-sm font-semibold text-gray-900 cursor-pointer"
	>
		Retry
	</button>
);

export default function ProtectedRoute({ children }) {
  	const { authStatus, setAuthStatus } = useAuth();

	if (authStatus === "booting") {
		return (
			<DriverDashboardSkeleton />
		);
	}

	if (authStatus === "offline") return (
		<StateScreen
			icon={{ symbol: "⚡", bg: "bg-amber-50 text-amber-700" }}
			badge="No connection"
			badgeColor="bg-amber-50 text-amber-700"
			title="You're offline"
			desc="Check your internet connection and tap retry to continue."
			action={<RetryButton onClick={() => navigator.onLine && setAuthStatus("booting")} />}
		/>
	);

	if (authStatus === "server-error") return (
		<StateScreen
			icon={{ symbol: "⚠", bg: "bg-red-50 text-red-700" }}
			badge="Server unavailable"
			badgeColor="bg-red-50 text-red-700"
			title="Something went wrong"
			desc="We're having trouble reaching Kowopé. Please try again shortly."
			action={<RetryButton onClick={() => setAuthStatus("booting")} />}
		/>
	);

	if (authStatus === "unauthenticated") return <Navigate to="/login" replace />;

	return children;
}