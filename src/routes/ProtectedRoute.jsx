import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import KowopeDashboardLogo from '../assets/kowopeDashboardLogo-removebg-preview.png';

const Spinner = () => (
	<>
		<style>{`@keyframes kw-spin { to { transform: rotate(360deg); } }`}</style>
		<div style={{
			width: 40, height: 40,
			border: "3px solid #fde9b8",
			borderTopColor: "#F5A623",
			borderRadius: "50%",
			animation: "kw-spin 0.75s linear infinite",
			}} />
	</>
);

const Icon = ({ children, bg, color }) => (
	<div style={{
		width: 52, height: 52, borderRadius: 14,
		background: bg, color,
		display: "flex", alignItems: "center", justifyContent: "center",
		fontSize: 24,
	}}>
		{children}
	</div>
);

const Badge = ({ label, bg, color }) => (
	<span style={{
		fontSize: 11, fontWeight: 500,
		padding: "3px 10px", borderRadius: 20,
		background: bg, color,
		letterSpacing: "0.04em",
	}}>
		{label}
	</span>
);

const RetryButton = ({ onClick }) => (
	<button onClick={onClick} style={{
		marginTop: 4, padding: "9px 22px",
		borderRadius: 8, border: "none",
		background: "#F5A623", color: "#1a1a2e",
		fontSize: 13, fontWeight: 600,
		cursor: "pointer", letterSpacing: "0.02em",
	}}>
		Retry
	</button>
);

const StateScreen = ({ children }) => (
	<div style={{
		minHeight: "100svh",
		display: "flex", alignItems: "center", justifyContent: "center",
		background: "#f9fafb",
	}}>
		<div style={{
			display: "flex", flexDirection: "column",
			alignItems: "center", gap: 14,
			textAlign: "center", maxWidth: 300,
			padding: "0 1.5rem",
			}}>
		{children}
		</div>
	</div>
);

const Title = ({ children }) => (
 	<p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>{children}</p>
);

const Desc = ({ children }) => (
  	<p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.55 }}>{children}</p>
);

export default function ProtectedRoute({ children }) {
  const { authStatus, setAuthStatus } = useAuth();

  if (authStatus === "booting") return (
    <StateScreen>
		<img src={KowopeDashboardLogo} alt="Kowopé" style={{ width: 100, height: 100 }} />
		<Spinner />
		<Title>Restoring your session</Title>
		<Desc>Hang tight — we're getting you back in.</Desc>
    </StateScreen>
  );

  if (authStatus === "offline") return (
    <StateScreen>
		<img src={KowopeDashboardLogo} alt="Kowopé" style={{ width: 100, height: 100 }} />
		<Icon bg="#fff7e6" color="#b45309">⚡</Icon>
		<Badge label="No connection" bg="#fff7e6" color="#92400e" />
		<Title>You're offline</Title>
		<Desc>Check your internet connection and tap retry to continue.</Desc>
		<RetryButton onClick={() => navigator.onLine && setAuthStatus("booting")} />
    </StateScreen>
  );

  if (authStatus === "server-error") return (
    <StateScreen>
		<img src={KowopeDashboardLogo} alt="Kowopé" style={{ width: 100, height: 100 }} />
		<Icon bg="#fef2f2" color="#b91c1c">⚠</Icon>
		<Badge label="Server unavailable" bg="#fef2f2" color="#991b1b" />
		<Title>Something went wrong</Title>
		<Desc>We're having trouble reaching Kowopé. Please try again shortly.</Desc>
		<RetryButton onClick={() => setAuthStatus("booting")} />
    </StateScreen>
  );

  if (authStatus === "unauthenticated") return <Navigate to="/login" replace />;

  return children;
}