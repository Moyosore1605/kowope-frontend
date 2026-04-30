import { useState, useContext } from "react";
import { ShieldCheck, ChevronRight, Check, Wallet, CreditCard, ArrowRightLeft, Info } from "lucide-react";
import { DarkModeContext } from "../../context/DarkModeState";
import { Link } from "react-router-dom";

const ticketDetails = {
	type: "Daily Operating Ticket",
	zone: "Lagos Mainland",
	route: "Ikorodu",
	amount: "₦1,500",
	driver: "Michael Blaq",
	vehicle: "ABC-123-XY",
};

const paymentMethods = [
	{ id: "wallet", label: "Wallet", Icon: Wallet },
	{ id: "card", label: "Card", Icon: CreditCard },
	{ id: "transfer", label: "Transfer", Icon: ArrowRightLeft },
];

function SummaryRow({ label, value, valueClass = "", dk }) {
  return (
    <div className={`flex justify-between items-center py-3 border-b ${dk ? 'border-gray-800' : 'border-gray-100'}`}>
		<span className="text-sm text-gray-400">{label}</span>
		<span className={`text-sm font-semibold ${valueClass || (dk ? 'text-white' : 'text-gray-900')}`}>{value}</span>
    </div>
  );
}

function ReviewRow({ label, value, muted = false, dk }) {
	return (
		<div className={`flex justify-between items-center py-2.5 border-b last:border-0 ${dk ? "border-gray-800" : "border-gray-100"}`}>
			<span className={`text-xs ${dk ? "text-gray-500" : "text-gray-400"}`}>{label}</span>
			<span className={`text-xs font-medium ${muted
				? dk ? "text-gray-500" : "text-gray-300"
				: dk ? "text-white" : "text-gray-900"}`}>
				{value}
			</span>
		</div>
	);
}

function BuyTicketPage() {
	const [paymentMethod, setPaymentMethod] = useState("wallet");
	const [paid, setPaid] = useState(false);
	const { darkMode } = useContext(DarkModeContext);

	const dk = darkMode;

	const card = `rounded-2xl border p-6 ${dk
		? "bg-gray-900 border-gray-800"
		: "bg-white border-gray-100 shadow-sm"}`;

	const handlePay = () => {
		// Replace with your payment API call — call setPaid(true) on success
		setPaid(true);
		onSuccess?.();
	};

	// ── Success state ──
	if (paid) {
		return (
		<div className="p-6">
			<div className={`${card} flex flex-col items-center justify-center text-center gap-4 py-16`}>
			<div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
				<Check size={26} className="text-green-500" strokeWidth={2.5} />
			</div>
			<div>
				<h2 className={`text-lg font-semibold mb-1 ${dk ? "text-white" : "text-gray-900"}`}>
				Payment successful
				</h2>
				<p className={`text-sm max-w-xs mx-auto ${dk ? "text-gray-400" : "text-gray-500"}`}>
				Your ticket is now active and your QR code has been generated.
				</p>
			</div>
			<button
				onClick={() => setPaid(false)}
				className={`mt-2 px-7 py-2.5 rounded-xl text-sm font-medium border transition-all
				${dk
					? "border-gray-700 text-gray-200 hover:bg-gray-800"
					: "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
				Back to dashboard
			</button>
			</div>
		</div>
		);
	}

	return (
		<div className="p-6">

		{/* Top bar */}
		<div className="flex items-start justify-between mb-6">
			<div>
				{/* Breadcrumb */}
				<div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
					<Link className="hover:underline cursor-pointer" to="/driver-dashboard" >Home</Link>
					<ChevronRight size={12} className="text-gray-300" />
					<span className={`font-medium ${dk ? "text-gray-200" : "text-gray-600"}`}>Buy Ticket</span>
				</div>
				<h1 className={`text-2xl md:text-3xl font-bold mb-1 ${dk ? "text-white" : "text-gray-900"}`}>
					Buy Ticket
				</h1>
				<p className={`text-sm ${dk ? "text-gray-400" : "text-gray-500"}`}>
					Purchase your daily operating ticket
				</p>
			</div>
			<div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border shrink-0 mt-1
			bg-green-50 border-green-200 text-green-600">
				<ShieldCheck size={13} />
				Secure payment
			</div>
		</div>

		{/* Step indicators */}
		<div className="flex items-center gap-2 mb-8">
			{["Ticket details", "Payment", "Confirm"].map((label, i) => (
			<div key={label} className="flex items-center gap-2">
				{i > 0 && <div className={`w-6 h-px ${dk ? "bg-gray-700" : "bg-gray-200"}`} />}
				<div className="flex items-center gap-2">
					<div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium
						${i < 2
						? "bg-yellow-400 text-gray-900"
						: dk ? "border border-gray-700 text-gray-500" : "border border-gray-200 text-gray-400"}`}>
						{i + 1}
					</div>
					<span className={`text-xs font-medium ${i < 2
						? dk ? "text-white" : "text-gray-800"
						: dk ? "text-gray-500" : "text-gray-400"}`}>
						{label}
					</span>
				</div>
			</div>
			))}
		</div>

		<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

			{/* ── Left column ── */}
			<div className="lg:col-span-2 flex flex-col gap-4">

			{/* Ticket summary */}
			<div className={`lg:col-span-2 rounded-2xl border shadow-sm p-6 transition-colors ${dk ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
				<h2 className={`text-base font-bold mb-4 ${dk ? 'text-white' : 'text-gray-900'}`}>
					Ticket Summary
				</h2>
				<div className={`rounded-xl p-4 mb-5 ${dk ? 'bg-gray-800' : 'bg-gray-50'}`}>
					<SummaryRow label="Ticket Type" value={ticketDetails.type} dk={dk} />
					<SummaryRow label="Operating Zone" value={ticketDetails.zone} dk={dk} />
					<SummaryRow label="Route" value={ticketDetails.route} dk={dk} />
					<SummaryRow label="Valid For" value="Today Only" valueClass="text-green-500" dk={dk} />
					<div className="flex justify-between items-center pt-3 mt-1">
						<span className="text-sm text-gray-400">Amount</span>
						<span className={`text-lg font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>
							{ticketDetails.amount}
						</span>
					</div>
				</div>
			</div>

			{/* Payment method */}
			<div className={card}>
				<h3 className={`text-sm font-bold mb-3 ${dk ? 'text-white' : 'text-gray-800'}`}>
					Payment Method
				</h3>

				<div className="grid grid-cols-3 gap-3 mb-6">
				{paymentMethods.map(({ id, label, Icon }) => {
					const selected = paymentMethod === id;
					return (
						<button
							key={id}
							onClick={() => setPaymentMethod(id)}
							className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-all
							${selected
								? "border-yellow-400 bg-yellow-50 text-yellow-800"
								: dk
								? "border-gray-700 text-gray-400 hover:border-gray-600"
								: "border-gray-100 text-gray-500 hover:border-gray-200"
							}`}>
							<div className={`w-8 h-8 rounded-lg flex items-center justify-center
							${selected ? "bg-yellow-400" : dk ? "bg-gray-800" : "bg-gray-100"}`}>
								<Icon size={15} className={selected ? "text-gray-900" : ""} />
							</div>
							<span className="text-xs">{label}</span>
						</button>
					);
				})}
				</div>

				<button
					onClick={handlePay}
					className="w-full py-3.5 rounded-xl text-sm font-semibold bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 transition-all">
					Pay {ticketDetails.amount}
				</button>
			</div>
			</div>

			{/* ── Right: Ticket Review ── */}
			<div className={`rounded-2xl border shadow-sm p-6 flex flex-col gap-4 transition-colors
			${dk ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
			<h2 className={`text-base font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>Ticket Review</h2>

			{/* Status badge */}
			<div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
				${dk ? 'bg-gray-800' : 'bg-gray-50'}`}>
				<span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
				<span className={dk ? 'text-red-400' : 'text-red-500'}>Not Active</span>
				<span className={`ml-auto text-xs ${dk ? 'text-gray-500' : 'text-gray-400'}`}>
					QR Code: Will generate after payment
				</span>
			</div>

			{/* Review rows */}
			<div className="flex flex-col">
				<ReviewRow label="Driver" value={ticketDetails?.driver ?? '—'} dk={dk} />
				<ReviewRow label="Vehicle" value={ticketDetails?.vehicle ?? '—'} dk={dk} />
				<ReviewRow label="Zone" value={ticketDetails?.zone ?? '—'} dk={dk} />
				<ReviewRow label="Route" value={ticketDetails?.route ?? '—'} dk={dk} />
				<ReviewRow label="Valid Until" value="—" dk={dk} />
			</div>

			{/* Info box */}
			<div className={`mt-auto rounded-xl p-4 flex gap-3
				${dk ? 'bg-yellow-400/10 border border-yellow-400/20' : 'bg-yellow-50 border border-yellow-100'}`}>
				<Info size={15} className="text-yellow-500 shrink-0 mt-0.5" />
				<ul className="space-y-1">
				{[
					'Pay to activate your ticket',
					'QR codes appears instantly',
					'Valid for today only',
				].map((item, i) => (
					<li key={i} className={`text-xs ${dk ? 'text-yellow-300' : 'text-yellow-700'}`}>
					· {item}
					</li>
				))}
				</ul>
			</div>
			</div>
		</div>
	</div>
  );
}

export default BuyTicketPage;