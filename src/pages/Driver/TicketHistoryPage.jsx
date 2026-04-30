import { useState, useContext } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DarkModeContext } from "../../context/DarkModeState";

const allTickets = [
	{ date: "Sun, 21 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Active" },
	{ date: "Mon, 22 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Active" },
	{ date: "Tue, 23 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Active" },
	{ date: "Wed, 24 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Expired" },
	{ date: "Thurs, 25 Apr 2022", price: "₦1,500", ref: "KWP-20260212-391", status: "Expired" },
	{ date: "Fri, 26 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Expired" },
	{ date: "Sat, 27 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Expired" },
	{ date: "Sun, 28 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Expired" },
	{ date: "Mon, 29 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-391", status: "Expired" },
	{ date: "Tue, 30 Apr 2022",   price: "₦1,500", ref: "KWP-20260212-392", status: "Active" },
	{ date: "Wed, 01 May 2022",   price: "₦1,500", ref: "KWP-20260212-393", status: "Expired" },
	{ date: "Thurs, 02 May 2022", price: "₦1,500", ref: "KWP-20260212-394", status: "Expired" },
	{ date: "Fri, 03 May 2022",   price: "₦1,500", ref: "KWP-20260212-395", status: "Active" },
	{ date: "Sat, 04 May 2022",   price: "₦1,500", ref: "KWP-20260212-396", status: "Expired" },
	{ date: "Sun, 05 May 2022",   price: "₦1,500", ref: "KWP-20260212-397", status: "Expired" },
	{ date: "Mon, 06 May 2022",   price: "₦1,500", ref: "KWP-20260212-398", status: "Active" },
	{ date: "Tue, 07 May 2022",   price: "₦1,500", ref: "KWP-20260212-399", status: "Expired" },
	{ date: "Wed, 08 May 2022",   price: "₦1,500", ref: "KWP-20260212-400", status: "Expired" },
];

const TABS = ["All", "Active", "Expired"];
const PER_PAGE = 9;

function StatusBadge({ status }) {
	const isActive = status === "Active";
	return (
		<span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${isActive ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-500 border border-red-100"}`}>
		<span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-400"}`} />
			{status}
		</span>
	);
}

function TicketHistoryPage() {
	const [tab, setTab]     = useState("All");
	const [page, setPage]   = useState(1);
	const { darkMode } = useContext(DarkModeContext);

	const dk = darkMode;

	const filtered = tab === "All" ? allTickets : allTickets.filter(t => t.status === tab);
	const totalPages = Math.ceil(filtered.length / PER_PAGE);
	const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

	const handleTab = (t) => { setTab(t); setPage(1); };

	// Build page number array: 1 2 3 … last-1 last
	const pageNums = () => {
		if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
		if (page <= 3) return [1, 2, 3, "…", totalPages - 1, totalPages];
		if (page >= totalPages - 2) return [1, "…", totalPages - 2, totalPages - 1, totalPages];
		return [1, "…", page - 1, page, page + 1, "…", totalPages];
	};

	const th = `text-xs font-semibold uppercase tracking-wider text-left py-3 px-4
		${dk ? "text-gray-500 border-b border-gray-800" : "text-gray-400 border-b border-gray-100"}`;

	const td = `py-3.5 px-4 text-sm ${dk ? "text-gray-300 border-b border-gray-800" : "text-gray-700 border-b border-gray-100"}`;

	return (
		<div className="p-6">

		{/* Page header */}
		<div className="flex items-center justify-between mb-6">
			<h1 className={`text-2xl md:text-3xl font-bold ${dk ? "text-white" : "text-gray-900"}`}>
				Ticket History
			</h1>

			{/* Date range picker */}
			<button className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all
			${dk
				? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
				: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"}`}>
				<Calendar size={15} className={dk ? "text-gray-400" : "text-gray-400"} />
				<span>21 Apr · 2 May</span>
				<ChevronDown size={14} className={dk ? "text-gray-500" : "text-gray-400"} />
			</button>
		</div>

		{/* Main card */}
		<div className={`rounded-2xl border transition-colors
			${dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>

			{/* Tabs */}
			<div className={`flex items-center gap-1 px-4 pt-4 pb-0 border-b
			${dk ? "border-gray-800" : "border-gray-100"}`}>
			{TABS.map(t => (
				<button
					key={t}
					onClick={() => handleTab(t)}
					className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2 -mb-px
						${tab === t
						? dk
							? "border-yellow-400 text-yellow-400"
							: "border-yellow-400 text-gray-900"
						: dk
							? "border-transparent text-gray-500 hover:text-gray-300"
							: "border-transparent text-gray-400 hover:text-gray-600"
						}`}
				>
					{t}
				</button>
			))}
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
			{paginated.length > 0 ? (
				<table className="w-full">
					<thead>
						<tr>
							<th className={th}>Date</th>
							<th className={th}>Price</th>
							<th className={th}>Ticket Reference</th>
							<th className={th}>Status</th>
						</tr>
					</thead>
					<tbody>
						{paginated.map((ticket, i) => (
						<tr
							key={i}
							className={`transition-colors ${dk ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}>
							<td className={td}>{ticket.date}</td>
							<td className={`${td} font-medium`}>{ticket.price}</td>
							<td className={`${td} font-mono text-xs tracking-wide`}>{ticket.ref}</td>
							<td className={td}><StatusBadge status={ticket.status} /></td>
						</tr>
						))}
					</tbody>
				</table>
			) : (
				/* Empty state */
				<div className="flex flex-col items-center justify-center py-20 gap-3">
					<div className={`w-12 h-12 rounded-xl flex items-center justify-center
						${dk ? "bg-gray-800" : "bg-gray-50"}`}>
						<Calendar size={22} className={dk ? "text-gray-600" : "text-gray-300"} strokeWidth={1.5} />
					</div>
					<p className={`text-sm font-medium ${dk ? "text-gray-400" : "text-gray-400"}`}>
						No {tab.toLowerCase()} tickets found
					</p>
					<p className={`text-xs ${dk ? "text-gray-600" : "text-gray-300"}`}>
						Tickets will appear here once you make a purchase
					</p>
				</div>
			)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
			<div className={`flex items-center justify-between px-4 py-4 border-t
				${dk ? "border-gray-800" : "border-gray-100"}`}>

				<button
					onClick={() => setPage(p => Math.max(1, p - 1))}
					disabled={page === 1}
					className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-all
						${page === 1
						? dk ? "border-gray-800 text-gray-600 cursor-not-allowed" : "border-gray-100 text-gray-300 cursor-not-allowed"
						: dk ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"
					}`}
				>
					<ChevronLeft size={15} />
					Previous
				</button>

				<div className="flex items-center gap-1">
				{pageNums().map((n, i) =>
					n === "…" ? (
					<span key={`ellipsis-${i}`} className={`w-8 text-center text-sm ${dk ? "text-gray-500" : "text-gray-400"}`}>
						…
					</span>
					) : (
					<button
						key={n}
						onClick={() => setPage(n)}
						className={`w-8 h-8 rounded-lg text-sm font-medium transition-all
						${page === n
							? "bg-yellow-400 text-gray-900"
							: dk
							? "text-gray-400 hover:bg-gray-800"
							: "text-gray-500 hover:bg-gray-100"
						}`}>
						{n}
					</button>
					)
				)}
				</div>

				<button
					onClick={() => setPage(p => Math.min(totalPages, p + 1))}
					disabled={page === totalPages}
					className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-all
						${page === totalPages
						? dk ? "border-gray-800 text-gray-600 cursor-not-allowed" : "border-gray-100 text-gray-300 cursor-not-allowed"
						: dk ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"
					}`}
				>
					Next
					<ChevronRight size={15} />
				</button>

			</div>
			)}
		</div>
	</div>
  );
}

export default TicketHistoryPage;