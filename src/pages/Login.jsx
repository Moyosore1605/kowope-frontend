import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import AuthLayout from '../layout/AuthLayout';

export default function Login() {
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState(["", "", "", ""]);
    const pinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const handlePinChange = (index, value) => {
        // Allow only single digit
        const digit = value.replace(/\D/g, "").slice(-1);
        const newPin = [...pin];
        newPin[index] = digit;
        setPin(newPin);

        // Auto-focus next input
        if (digit && index < 3) {
            pinRefs[index + 1].current.focus();
        }
    };

    const handlePinKeyDown = (index, e) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            pinRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted", { phone, pin: pin.join("") });
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center w-full">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        A Swift Digital ticketing for drivers
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Login to purchase your daily ticket
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mb-6">Login to your driver account</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                Phone Number
                            </label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type="tel"
                                    placeholder="08012345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    className="bg-gray-200 rounded-md p-1 flex items-center justify-center"
                                    title="More options"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* PIN */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                PIN
                            </label>
                            <p className="text-xs text-gray-400 mb-3">Enter your 4-digit PIN</p>
                            <div className="flex gap-3">
                                {pin.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={pinRefs[i]}
                                        type="password"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handlePinChange(i, e.target.value)}
                                        onKeyDown={(e) => handlePinKeyDown(i, e)}
                                        className={`w-12 h-12 text-center text-lg font-semibold rounded-xl border-2 outline-none transition-all bg-white
                                            ${i === 0 && !digit
                                                ? "border-yellow-400"
                                                : digit
                                                    ? "border-yellow-400"
                                                    : "border-gray-200"
                                            }
                                            focus:border-yellow-400`}
                                    />
                                ))}
                            </div>
                            <div className="text-right mt-2">
                                <Link
                                    to="/forgot-pin"
                                    className="text-yellow-500 text-sm font-medium hover:text-yellow-600 transition-colors"
                                >
                                    Forgot PIN?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-xl transition-colors text-base"
                        >
                            Login
                        </button>

                        {/* Register Link */}
                        <p className="text-center text-sm text-gray-500">
                            New to Kowope?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-500 font-medium hover:underline"
                            >
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}