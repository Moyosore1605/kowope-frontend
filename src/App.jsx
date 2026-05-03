import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Landing from './pages/Landing';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
// import SelectRole from './pages/SelectRole';
import DashboardLayout from './layout/DashboardLayout';
import DriverDashboard from './pages/Driver/DriverDashboard';
import { DarkModeSwitcher } from './context/DarkModeState';
import BuyTicketPage from './pages/Driver/BuyTicketPage';
import TicketHistoryPage from './pages/Driver/TicketHistoryPage';
import SettingsPage from './pages/Driver/SettingsPage';
import VerifyOtp from './pages/auth/VerifyOtp';
import { queryClient } from "./services/queryClient";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {

	// const queryClient = new QueryClient({
	// 	defaultOptions: {
	// 		queries: {
	// 		retry: 1,
	// 		refetchOnWindowFocus: false,
	// 		},
	// 	},
	// });

  	return (
      	<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<DarkModeSwitcher>
					<Toaster
						position="top-right"
						toastOptions={{
						duration: 4000,
						style: {
							fontSize: "14px",
						},
						}}
					/>
					<Routes>
						<Route path='/' element={<Landing />}></Route>
						<Route element={<PublicRoute />}>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</Route>
						<Route path='/verify-otp' element={<VerifyOtp />}></Route>
						<Route path='/driver-dashboard' element={
							<ProtectedRoute>
								<DashboardLayout />
							</ProtectedRoute>
						}>
							<Route index element={<DriverDashboard />} />
							<Route path="buy-ticket" element={<BuyTicketPage />} />
							<Route path="ticket-history" element={<TicketHistoryPage />} />
							<Route path="settings" element={<SettingsPage />} />
						</Route>
					</Routes>
				</DarkModeSwitcher>
			</QueryClientProvider>
    	</BrowserRouter>
  	)
}

export default App
