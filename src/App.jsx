import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import SelectRole from './pages/SelectRole';
import DashboardLayout from './layout/DashboardLayout';
import DriverDashboard from './pages/Driver/DriverDashboard';
import { DarkModeSwitcher } from './context/DarkModeState';
import BuyTicketPage from './pages/Driver/BuyTicketPage';
import TicketHistoryPage from './pages/Driver/TicketHistoryPage';
import SettingsPage from './pages/Driver/SettingsPage';

function App() {

  return (
    <BrowserRouter>
		<DarkModeSwitcher>
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/signup' element={<Signup />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/driver-dashboard' element={<DashboardLayout />}>
					<Route index element={<DriverDashboard />} />
					<Route path="buy-ticket" element={<BuyTicketPage />} />
					<Route path="ticket-history" element={<TicketHistoryPage />} />
					<Route path="settings" element={<SettingsPage />} />
				</Route>
			</Routes>
		</DarkModeSwitcher>
    </BrowserRouter>
  )
}

export default App
