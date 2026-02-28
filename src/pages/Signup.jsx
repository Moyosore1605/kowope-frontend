import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import kowopeLogo from "../assets/kowopeLogo.jpg";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [idType, setIdType] = useState("drivers-license");
    const [licenseFile, setLicenseFile] = useState(null);
    const [vehicleReg, setVehicleReg] = useState("");
    const [lga, setLga] = useState("");
    const [area, setArea] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [showPin, setShowPin] = useState(false);
    const [showConfirmPin, setShowConfirmPin] = useState(false);
    const fileInputRef = useRef(null);

    const lgaOptions = [
        "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin",
        "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki",
        "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island",
        "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere",
    ];

    const areaOptions = {
        Ikeja: ["Allen Avenue", "Oregun", "Alausa", "GRA", "Opebi"],
        "Lagos Island": ["Victoria Island", "Ikoyi", "Onikan", "Marina"],
        Alimosho: ["Idimu", "Egbeda", "Ipaja", "Shasha", "Akowonjo"],
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setLicenseFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup submitted", {
            fullName, phone, idType, licenseFile, vehicleReg, lga, area, pin,
        });
    };

    const EyeIcon = ({ open }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            {open ? (
                <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10A5 5 0 0110 15zm0-8a3 3 0 100 6 3 3 0 000-6z" />
            ) : (
                <path d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.72-1.72A9.96 9.96 0 0019 10c-.73-2.89-4-7-9-7a9.9 9.9 0 00-4.93 1.3L3.28 2.22zM10 5a5 5 0 014.39 7.38L12.9 10.9A3 3 0 009.1 7.1L7.62 5.61A4.96 4.96 0 0110 5zM1 10c.73 2.89 4 7 9 7a9.9 9.9 0 004.93-1.3l-1.44-1.44A5 5 0 015.61 7.62L3.72 5.73A9.68 9.68 0 001 10z" />
            )}
        </svg>
    );

    const DotsIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
    );

    return (
        <main className="min-h-screen bg-white flex flex-col">
            {/* Top Logo */}
            <header className="px-8">
                <div className="flex flex-col items-start">
                    <Link to="/">
                        <img
                            src={kowopeLogo}
                            alt="Kowope Logo"
                            className="w-[130px] object-contain"
                        />
                    </Link>
                </div>
            </header>

            {/* Center Content */}
            <div className="flex flex-col items-center justify-center flex-1 px-4 py-2">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        A Swift Digital ticketing for drivers
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Don't have an account, create one to purchase ticket seamlessly
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Create Your Account</h2>
                    <p className="text-gray-500 text-sm mb-6">Register as a driver to start buying digital tickets</p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                                <button type="button" className="bg-gray-200 rounded-md p-1 flex items-center justify-center" title="More options">
                                    <DotsIcon />
                                </button>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Phone Number</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type="tel"
                                    placeholder="08012345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                                <button type="button" className="bg-gray-200 rounded-md p-1 flex items-center justify-center" title="More options">
                                    <DotsIcon />
                                </button>
                            </div>
                        </div>

                        {/* ID Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">ID Type</label>
                            <div className="flex gap-5">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="idType"
                                        value="drivers-license"
                                        checked={idType === "drivers-license"}
                                        onChange={() => setIdType("drivers-license")}
                                        className="accent-yellow-400 w-4 h-4"
                                    />
                                    <span className="text-sm text-gray-700">Driver's License</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="idType"
                                        value="nin"
                                        checked={idType === "nin"}
                                        onChange={() => setIdType("nin")}
                                        className="accent-yellow-400 w-4 h-4"
                                    />
                                    <span className="text-sm text-gray-700">NIN</span>
                                </label>
                            </div>
                        </div>

                        {/* License Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                {idType === "drivers-license" ? "Driver's License" : "NIN Slip"}
                            </label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-gray-200 rounded-lg py-5 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors bg-gray-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-sm text-gray-500 font-medium">
                                    {licenseFile ? licenseFile.name : "Upload License"}
                                </span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">PDF and JPEG formats, up to 5 MB</p>
                        </div>

                        {/* Vehicle Registration Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Vehicle Registration Number</label>
                            <div className="bg-gray-100 rounded-lg px-3 py-3">
                                <input
                                    type="text"
                                    placeholder="ABC-123-XY"
                                    value={vehicleReg}
                                    onChange={(e) => setVehicleReg(e.target.value)}
                                    className="bg-transparent w-full outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* LGA */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Local Government Area (LGA)</label>
                            <div className="relative">
                                <select
                                    value={lga}
                                    onChange={(e) => { setLga(e.target.value); setArea(""); }}
                                    className="w-full bg-gray-100 rounded-lg px-3 py-3 text-sm text-gray-500 outline-none appearance-none cursor-pointer"
                                >
                                    <option value="">Select your LGA</option>
                                    {lgaOptions.map((l) => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Area */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Area</label>
                            <div className="relative">
                                <select
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="w-full bg-gray-100 rounded-lg px-3 py-3 text-sm text-gray-500 outline-none appearance-none cursor-pointer"
                                    disabled={!lga}
                                >
                                    <option value="">Select your area</option>
                                    {(areaOptions[lga] || []).map((a) => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Create PIN */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Create PIN</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type={showPin ? "text" : "password"}
                                    inputMode="numeric"
                                    maxLength={4}
                                    placeholder="Enter 4-digit PIN"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPin(!showPin)}
                                    className="flex items-center justify-center"
                                >
                                    <EyeIcon open={showPin} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Do not use common PINs like 1234, 0000, etc.</p>
                        </div>

                        {/* Confirm PIN */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Confirm PIN</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type={showConfirmPin ? "text" : "password"}
                                    inputMode="numeric"
                                    maxLength={4}
                                    placeholder="Re-enter your PIN"
                                    value={confirmPin}
                                    onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                                    className="flex items-center justify-center"
                                >
                                    <EyeIcon open={showConfirmPin} />
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-xl transition-colors text-base"
                        >
                            Register
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 font-medium hover:underline">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}