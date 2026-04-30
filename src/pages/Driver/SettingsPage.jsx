import { useState, useRef, useContext } from "react";
import {
  FileText, CheckCircle, Upload, ChevronDown,
  Eye, EyeOff, Save
} from "lucide-react";
import { DarkModeContext } from "../../context/DarkModeState";

const lgas   = ["Lagos Mainland", "Lagos Island", "Ikeja", "Surulere", "Alimosho", "Eti-Osa"];
const areas  = ["Ikorodu", "Yaba", "Apapa", "Lekki", "Victoria Island", "Badagry"];

function Label({ children, dk }) {
	return (
		<p className={`text-xs font-semibold mb-1.5 ${dk ? "text-gray-400" : "text-gray-500"}`}>
			{children}
		</p>
	);
}

function Input({ value, onChange, placeholder, disabled, dk, type = "text" }) {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none
				focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400
				${disabled
				? dk ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
					: "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
				: dk ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-600"
					: "bg-white border-gray-200 text-gray-800 placeholder-gray-300"
				}`}
		/>
	);
}

function Select({ value, onChange, options, dk }) {
	return (
		<div className="relative">
		<select
			value={value}
			onChange={e => onChange(e.target.value)}
			className={`w-full px-4 py-2.5 rounded-xl border text-sm appearance-none outline-none transition-colors
			focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 pr-9
			${dk
				? "bg-gray-800 border-gray-700 text-gray-100"
				: "bg-white border-gray-200 text-gray-800"}`}>
			{options.map(o => <option key={o}>{o}</option>)}
		</select>
		<ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
			${dk ? "text-gray-500" : "text-gray-400"}`} />
		</div>
	);
}

function PinField({ label, placeholder, hint, dk }) {
	const [show, setShow] = useState(false);
	const [val,  setVal]  = useState("");
	return (
		<div>
		<Label dk={dk}>{label}</Label>
		<div className="relative">
			<input
			type={show ? "text" : "password"}
			value={val}
			onChange={e => setVal(e.target.value)}
			placeholder={placeholder}
			maxLength={4}
			className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm outline-none transition-colors
				focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400
				${dk
				? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-600"
				: "bg-white border-gray-200 text-gray-800 placeholder-gray-300"}`}
			/>
			<button
				type="button"
				onClick={() => setShow(s => !s)}
				className={`absolute right-3 top-1/2 -translate-y-1/2 ${dk ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>
				{show ? <EyeOff size={15} /> : <Eye size={15} />}
			</button>
		</div>
			{hint && <p className={`text-xs mt-1.5 ${dk ? "text-gray-600" : "text-gray-300"}`}>{hint}</p>}
		</div>
	);
}

function SectionHeader({ title, subtitle, dk }) {
  return (
    <div className="mb-5">
		<h2 className={`text-lg font-bold ${dk ? "text-white" : "text-gray-900"}`}>{title}</h2>
		<p className={`text-sm ${dk ? "text-gray-400" : "text-gray-400"}`}>{subtitle}</p>
    </div>
  );
}

function Divider({ dk }) {
  	return <div className={`my-8 border-t ${dk ? "border-gray-800" : "border-gray-100"}`} />;
}

function SettingsPage() {
    const { darkMode } = useContext(DarkModeContext);
	const dk = darkMode;

	const [fullName, setFullName] = useState("Micheal Blaq");
	const [phone, setPhone] = useState("08123345678");
	const [vehicle, setVehicle] = useState("ABC-123-XY");
	const [lga, setLga] = useState("Lagos Mainland");
	const [area, setArea] = useState("Ikorodu");
	const [fileName, setFileName] = useState("Drivers license.pdf");
	const [saved, setSaved] = useState(false);

	const fileRef = useRef();

	const handleFile = (e) => {
		const f = e.target.files?.[0];
		if (f) setFileName(f.name);
	};

	const handleSave = () => {
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	const card = `rounded-2xl border p-6 transition-colors ${dk
		? "bg-gray-900 border-gray-800"
		: "bg-white border-gray-100 shadow-sm"}`;

	return (
		<div className="p-6 pb-24">

		{/* ── Profile header ── */}
		<div className={`${card} flex items-center gap-5 mb-5`}>
			<div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 text-2xl font-bold shrink-0">
				M
			</div>
			<div>
			<h1 className={`text-xl font-bold mb-0.5 ${dk ? "text-white" : "text-gray-900"}`}>
				Micheal Blaq
			</h1>
			<p className={`text-sm ${dk ? "text-gray-400" : "text-gray-500"}`}>08123341622</p>
			<p className={`text-sm ${dk ? "text-gray-400" : "text-gray-500"}`}>ABC-123-XY</p>
			<p className={`text-xs mt-1 ${dk ? "text-gray-500" : "text-gray-400"}`}>Member since June 5, 2025</p>
			</div>
		</div>

		{/* ── Profile & Settings ── */}
		<div className={card}>
			<SectionHeader title="Profile & Settings" subtitle="You can update your profile" dk={dk} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

			{/* Full name */}
			<div>
				<Label dk={dk}>Full Name</Label>
				<Input value={fullName} onChange={e => setFullName(e.target.value)} dk={dk} />
			</div>

			{/* Phone */}
			<div>
				<Label dk={dk}>Phone Number</Label>
				<Input value={phone} onChange={e => setPhone(e.target.value)} dk={dk} />
			</div>

			{/* Driver's license */}
			<div className="md:col-span-2">
				<Label dk={dk}>Driver's License Number</Label>
				<div className={`rounded-xl border px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 justify-between
				${dk ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>

				{/* File info */}
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
						<FileText size={16} className="text-red-500" />
					</div>
					<div>
						<p className={`text-sm font-medium ${dk ? "text-gray-200" : "text-gray-700"}`}>{fileName}</p>
						<p className={`text-xs ${dk ? "text-gray-500" : "text-gray-400"}`}>0 kB of 130 kB</p>
					</div>
					<div className="flex items-center gap-1 text-xs font-medium text-green-500">
						<CheckCircle size={13} />
						Verified
					</div>
				</div>

				{/* Upload button */}
				<button
					onClick={() => fileRef.current?.click()}
					className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all shrink-0
					${dk
						? "border-gray-600 text-gray-300 hover:bg-gray-700"
						: "border-gray-300 text-gray-600 hover:bg-white"}`}>
					<Upload size={14} />
					Upload License
				</button>
				<input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg" className="hidden" onChange={handleFile} />
				</div>
				<p className={`text-xs mt-1.5 ${dk ? "text-gray-600" : "text-gray-300"}`}>
					PDF or JPEG formats, up to 5 MB
				</p>
			</div>

			{/* Vehicle registration */}
			<div>
				<Label dk={dk}>Vehicle Registration Number</Label>
				<Input value={vehicle} onChange={e => setVehicle(e.target.value)} dk={dk} />
			</div>

			{/* LGA */}
			<div>
				<Label dk={dk}>Local Government Area (LGA)</Label>
				<Select value={lga} onChange={setLga} options={lgas} dk={dk} />
			</div>

			{/* Area */}
			<div>
				<Label dk={dk}>Area</Label>
				<Select value={area} onChange={setArea} options={areas} dk={dk} />
			</div>

			</div>

			<Divider dk={dk} />

			{/* ── Change PIN ── */}
			<SectionHeader title="Change Pin" subtitle="Update your pin" dk={dk} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<PinField
					label="Current PIN"
					placeholder="Re-enter your PIN to change pin"
					dk={dk}
				/>
				<PinField
					label="Reset PIN"
					placeholder="Enter 4-digit PIN"
					hint="Do not use common PINs like 1234, 0000, etc."
					dk={dk}
				/>
				<PinField
					label="Confirm PIN"
					placeholder="Re-enter your PIN"
					dk={dk}
				/>
			</div>

		</div>

		{/* ── Sticky Save button ── */}
		<div className="bottom-0 right-0 left-0 lg:left-64 px-6 py-4 flex justify-end transition-colors">
			<button
				onClick={handleSave}
				className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm
					${saved
					? "bg-green-500 text-white"
					: "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900"}`}>
				{saved ? (
					<>
					<CheckCircle size={15} />
					Saved!
					</>
				) : (
					<>
					<Save size={15} />
					Save
					</>
				)}
			</button>
		</div>

	</div>
	);
}

export default SettingsPage;