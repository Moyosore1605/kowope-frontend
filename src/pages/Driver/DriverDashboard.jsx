import { useState, useEffect, useContext } from "react";
import {
	TriangleAlert, Lock, ReceiptText, Check, Clock, Share2
} from 'lucide-react';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeState";

const payments = [
	{ date: 'Sun, 21 Apr 2022',   price: '₦1,500', status: 'Active' },
	{ date: 'Mon, 22 Apr 2022',   price: '₦1,500', status: 'Expired' },
	{ date: 'Tue, 23 Apr 2022',   price: '₦1,500', status: 'Expired' },
	{ date: 'Wed, 24 Apr 2022',   price: '₦1,500', status: 'Expired' },
	{ date: 'Thurs, 25 Apr 2022', price: '₦1,500', status: 'Expired' },
	{ date: 'Fri, 26 Apr 2022',   price: '₦1,500', status: 'Expired' },
	{ date: 'Sat, 27 Apr 2022',   price: '₦1,500', status: 'Expired' },
];

const ticketInfo = {
	reference: 'KWP-20260212-391',
	validFor:  'Feb 12, 2026',
	driver:    'Micheal Blaq',
	vehicle:   'ABC-123-XY',
	purchased: 'Today, 7:33 AM',
};

const QR_MAP = [
	[1,1,1,1,1,1,1,0,1,0],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,1,1,1,0,1,0,1,0],
	[1,0,1,1,1,0,1,1,0,1],
	[1,0,0,0,0,0,1,0,1,1],
	[1,1,1,1,1,1,1,0,1,0],
	[0,0,0,0,0,0,0,1,0,1],
	[1,0,1,1,0,1,0,1,1,0],
	[1,1,0,0,1,1,1,0,0,1],
	[0,1,1,0,0,0,0,1,1,0],
];

function QRCode({ darkMode }) {
	return (
		<div
		style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(10, 1fr)',
			gap: 2,
			padding: 12,
			borderRadius: 12,
			width: 140,
			height: 140,
			background: darkMode ? '#1e293b' : '#f8fafc',
		}}
		>
		{QR_MAP.flat().map((v, i) => (
			<div
			key={i}
			style={{
				background: v ? (darkMode ? '#e2e8f0' : '#1e293b') : 'transparent',
				borderRadius: 2,
			}}
			/>
		))}
		</div>
	);
}

function DetailRow({ label, value, darkMode }) {
	return (
		<div
			className="flex justify-between items-center py-2"
			style={{ borderBottom: darkMode ? '1px solid #1f2937' : '1px solid #f1f5f9' }}
		>
		<span className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-body'}`}>{label}</span>
		<span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-[#010214]'}`}>{value}</span>
		</div>
	);
}

function DriverDashboard() {
	const [hasTicket, setHasTicket] = useState(true);
	const [countdown, setCountdown] = useState({ h: 23, m: 59, s: 0 });
	const { darkMode } = useContext(DarkModeContext);

	const card = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";

	useEffect(() => {
		if (!hasTicket) return;
		const t = setInterval(() => {
		setCountdown(c => {
			let { h, m, s } = c;
			if (s > 0) return { h, m, s: s - 1 };
			if (m > 0) return { h, m: m - 1, s: 59 };
			if (h > 0) return { h: h - 1, m: 59, s: 59 };
			clearInterval(t);
			return { h: 0, m: 0, s: 0 };
		});
		}, 1000);
		return () => clearInterval(t);
	}, [hasTicket]);

	const isUrgent = countdown.h < 2;

  	return (
        <div className="flex-1 p-6 transition-colors duration-200">

			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
				<div>
					<h1 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-header'}`}>
						Welcome back, Micheal.
					</h1>
					<p className={`text-sm font-medium ${hasTicket ? 'text-[#00AE4E] font-medium' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
						{hasTicket ? "You're cleared to operate today." : "You don't have an active ticket for today."}
					</p>
				</div>
				<Link
					className="bg-primary hover:bg-primary-hover active:bg-primary-active text-gray-900 font-semibold py-2.5 px-8 rounded-xl transition-all shadow-sm text-sm whitespace-nowrap flex justify-center items-center"
					to={hasTicket ? "/driver-dashboard/ticket" : "/driver-dashboard/buy-ticket"}
				>
					{hasTicket ? "View Ticket" : "Buy Ticket"}
				</Link>
			</div>

			{/* Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

				<div className="lg:col-span-2 flex flex-col gap-5">

				{/* Status card */}
					<div className={`p-6 rounded-2xl border shadow-sm transition-colors ${
					hasTicket
						? darkMode
						? "bg-green-900/20 border-green-800"
						: "bg-[#F0FFF7] border-[#D1FAE5]"
						: card
					}`}>
						<h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-header'}`}>Today's Status</h2>
						{hasTicket ? (
						<>
							<div className="flex items-center gap-2 font-medium mb-2">
								<div className="w-5 h-5 rounded-full bg-[#00AE4E] flex items-center justify-center shrink-0">
									<Check size={11} className="text-white" strokeWidth={3} />
								</div>
								<span className="text-[#00AE4E] text-sm font-semibold">Ticket Active</span>
							</div>
							<p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-body'}`}>Expires today</p>
						</>
						) : (
						<>
							<div className="flex items-center gap-2 text-red-500 font-medium mb-2">
								<TriangleAlert size={17} className="shrink-0" />
								<span className="text-sm">Inactive — Ticket not paid</span>
							</div>
							<p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-body'}`}>Pay your daily ticket to operate today.</p>
						</>
						)}
					</div>

					{/* Recent Payments */}
					<div className={`p-6 rounded-2xl border shadow-sm flex flex-col hover:shadow-md transition-colors ${card}`}>
						<div className="flex items-center justify-between mb-5">
							<h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-header'}`}>Recent Payments</h2>
							{hasTicket && <Link className="text-xs text-primary font-medium hover:underline" to="/driver-dashboard/ticket-history" >View all →</Link>}
						</div>

						{hasTicket ? (
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
							<thead>
								<tr className={darkMode ? 'text-gray-500' : 'text-body'}>
									<th className="text-xs font-medium text-left pb-3 pr-4">Date</th>
									<th className="text-xs font-medium text-left pb-3 pr-4">Price</th>
									<th className="text-xs font-medium text-left pb-3">Status</th>
								</tr>
							</thead>
							<tbody>
								{payments.map((p, i) => (
								<tr
									key={i}
									className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
									style={{ borderTop: darkMode ? '1px solid #1f2937' : '1px solid #f1f5f9' }}
								>
									<td className={`py-2.5 pr-4 text-xs ${darkMode ? 'text-gray-300' : 'text-header'}`}>{p.date}</td>
									<td className={`py-2.5 pr-4 text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-header'}`}>{p.price}</td>
									<td className="py-2.5">
									<span className={`text-xs font-semibold px-2 py-0.5 rounded-md
										${p.status === 'Active'
										? 'bg-[#E5FFF1] text-[#00AE4E]'
										: darkMode
											? 'bg-gray-800 text-gray-400'
											: 'bg-gray-100 text-gray-500'}`}>
										{p.status}
									</span>
									</td>
								</tr>
								))}
							</tbody>
							</table>
						</div>
						) : (
						<div className="flex flex-col items-center justify-center gap-2 py-10">
							<div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
							<ReceiptText size={20} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
							</div>
							<p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-body'}`}>No recent payments</p>
							<p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Payments will appear here after purchase</p>
						</div>
						)}
					</div>
				</div>

				{/* QR Code panel */}
				<div className={`p-6 rounded-2xl border shadow-sm flex flex-col hover:shadow-md transition-colors ${card}`}>
				<div className="flex items-center justify-between mb-5">
					<h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-header'}`}>QR Code</h2>
					{!hasTicket && (
					<span className={`text-xs px-2.5 py-1 rounded-full font-medium ${darkMode ? 'bg-gray-800 text-body' : 'bg-gray-100 text-body'}`}>
						Locked
					</span>
					)}
				</div>

				{hasTicket ? (
					<div className="flex flex-col items-center gap-4">
						<div className={`rounded-2xl p-3 border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
							<QRCode darkMode={darkMode} />
						</div>
						<p className={`text-xs text-center ${darkMode ? 'text-gray-400' : 'text-body'}`}>
							Show this QR code to the agent at the park entrance
						</p>

						<div className="w-full mt-1">
							<DetailRow label="Ticket Reference" value={ticketInfo.reference} darkMode={darkMode} />
							<DetailRow label="Valid For" value={ticketInfo.validFor} darkMode={darkMode} />
							<DetailRow label="Driver" value={ticketInfo.driver} darkMode={darkMode} />
							<DetailRow label="Vehicle" value={ticketInfo.vehicle} darkMode={darkMode} />
							<DetailRow label="Purchased" value={ticketInfo.purchased} darkMode={darkMode} />
						</div>

						{/* Countdown */}
						<div className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl mt-1
							${darkMode ? 'bg-orange-900/30 border border-orange-800' : 'bg-orange-50 border border-orange-100'}`}>
							<Clock
								size={15}
								className={`shrink-0 ${isUrgent ? 'text-red-500' : 'text-orange-500'}`}
							/>
							<span
								className={`text-xs font-semibold ${
									isUrgent ? 'text-red-500' : 'text-orange-500'
								}`}
							>
								Expires in {String(countdown.h).padStart(2, '0')}h {String(countdown.m).padStart(2, '0')}m {String(countdown.s).padStart(2, '0')}s
							</span>
						</div>

						{/* Share */}
						<button className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all
							${darkMode ? 'border-gray-700 text-gray-200 hover:bg-gray-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
							<Share2 size={15} />
							Share Ticket
						</button>
					</div>
				) : (
					<div className="flex-1 flex flex-col items-center justify-center gap-4">
						<div className={`rounded-2xl p-8 w-full flex items-center justify-center aspect-square border-2 border-dashed transition-colors
							${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
							<Lock size={36} className={darkMode ? 'text-gray-600' : 'text-gray-300'} strokeWidth={1.5} />
						</div>
						<div className="text-center">
							<p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>QR unavailable</p>
							<p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
								Purchase a ticket to unlock access
							</p>
							<p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Available after payment</p>
						</div>
					</div>
				)}
				</div>

			</div>
        </div>
    );
}

export default DriverDashboard;