import { useContext, useState } from "react";
import { LogOut, X } from "lucide-react";
import { logout } from "../utils/logout";
import { useAuth } from "../context/AuthContext.jsx";
import { DarkModeContext } from "../context/DarkModeState";

export default function LogoutModal({ isOpen, onClose }) {
	const { darkMode: dk } = useContext(DarkModeContext);

	const [isLoading, setIsLoading] = useState(false);
    const { setUser, setAuthStatus } = useAuth();

	const handleLogout = async () => {
		try {
			setIsLoading(true);
            setUser(null);
            setAuthStatus("unauthenticated");

			await logout();

		} catch (err) {
			console.error("Logout failed:", err);
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/40 z-50 transition-opacity"
				onClick={onClose}
			/>

			{/* Modal */}
			<div
				className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-full max-w-sm rounded-2xl shadow-xl border p-6 transition-colors
                ${
					dk
						? "bg-gray-900 border-gray-800"
						: "bg-white border-gray-100"
				}`}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
                        ${
							dk
								? "text-gray-400 hover:bg-gray-800"
								: "text-gray-400 hover:bg-gray-100"
						}`}
				>
					<X
						size={16}
					/>
				</button>

				{/* Icon */}
				<div className="flex flex-col items-center text-center gap-4">
					<div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
						<LogOut
							size={24}
							className="text-red-500"
							strokeWidth={1.8}
						/>
					</div>

					{/* Text */}
					<div>
						<h2
							className={`text-lg font-bold mb-1 ${
								dk
									? "text-white"
									: "text-gray-900"
							}`}
						>
							Log out
						</h2>

						<p
							className={`text-sm ${
								dk
									? "text-gray-400"
									: "text-gray-500"
							}`}
						>
							Are you sure you want to log out of your account?
						</p>
					</div>

					{/* Buttons */}
					<div className="flex gap-3 w-full mt-2">
						<button
							onClick={onClose}
							disabled={isLoading}
							className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all
                                ${
									dk
										? "border-gray-700 text-gray-300 hover:bg-gray-800"
										: "border-gray-200 text-gray-700 hover:bg-gray-50"
								}`}
						>
							Cancel
						</button>

						<button
							onClick={handleLogout}
							disabled={isLoading}
							className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 active:bg-red-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading
								? "Logging out..."
								: "Yes, log out"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}