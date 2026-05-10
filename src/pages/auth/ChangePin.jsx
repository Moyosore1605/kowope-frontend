import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from '../../layout/AuthLayout';
import toast from "react-hot-toast";
import { verifyOtp } from "../../services/driverAuth";

export default function ChangePin() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [pin, setPin] = useState(["", "", "", ""]);
    const [confirmPin, setConfirmPin] = useState("");

    const [showPin, setShowPin] = useState(false);
    const [showConfirmPin, setShowConfirmPin] = useState(false);

    // Mutation for verifying the OTP
    const mutation = useMutation({
        mutationFn: (payload) => verifyOtp(payload),
        onSuccess: (data) => {
            toast.success("Pin changed successfully!");
            sessionStorage.removeItem("otp_phone");
        },
        onError: (error) => {
            const responseData = error?.response?.data;
            if (responseData?.errors) {
                setErrors(responseData.errors);
            } else {
                const message = responseData?.message || "Invalid code. Please try again.";
                setGlobalError(message);
                toast.error(message);
            }
        },
    });

    const validateForm = () => {
        const newErrors = {};
        if (!pin) {
            newErrors.pin = "PIN is required";
        } else if (pin.length < 4) {
            newErrors.pin = "PIN must be 4 digits";
        }
        
        if (pin !== confirmPin) {
            newErrors.confirmPin = "PINs do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGlobalError('');
        setErrors({});
        if (validateForm()) {
            mutation.mutate({
                code: pin.join("")
            });
        }
    };

    const EyeIcon = ({ open }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            {open ? (
                <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10A5 5 0 0110 15zm0-8a3 3 0 100 6 3 3 0 000-6z" />
            ) : (
                <path d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.72-1.72A9.96 9.96 0 0019 10c-.73-2.89-4-7-9-7a9.9 9.9 0 00-4.93 1.3L3.28 2.22zM10 5a5 5 0 014.39 7.38L12.9 10.9A3 3 0 009.1 7.1L7.62 5.61A4.96 4.96 0 0110 5zM1 10c.73 2.89 4 7 9 7a9.9 9.9 0 004.93-1.3l-1.44-1.44A5 5 0 015.61 7.62L3.72 5.73A9.68 9.68 0 001 10z" />
            )}
        </svg>
    );

    return (
        <AuthLayout>
            <div className="flex flex-col items-center w-full">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">

                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-xl font-bold text-header mb-1">Change Pin</h1>
                        <p className="text-body text-sm">Enter your new PIN to access account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">PIN</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type={showPin ? "text" : "password"}
                                    inputMode="numeric"
                                    maxLength={4}
                                    placeholder="Enter 4-digit PIN"
                                    value={pin.join("")}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                                        const pinArray = value.split("").concat(Array(4).fill(""));
                                        setPin(pinArray.slice(0, 4));
                                    }}
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
                            <p className="text-xs tracking-wide text-gray-400 mt-1">Do not use common PINs like 1234, 0000, etc.</p>
                            {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
                        </div>

                        {/* Confirm PIN */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">Confirm PIN</label>
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
                            {errors.confirmPin && <p className="text-xs text-red-500 mt-1">{errors.confirmPin}</p>}
                        </div>

                        {/* Continue button */}
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-primary hover:bg-primary-hover cursor-pointer text-gray-900 font-semibold py-3.5 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {mutation.isPending ? "Changing..." : "Continue"}
                        </button>

                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}