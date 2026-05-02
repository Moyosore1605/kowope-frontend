import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from '../../layout/AuthLayout';
import { loginDriver } from "../../services/auth";

export default function Login() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [globalError, setGlobalError] = useState('');
    const [errors, setErrors] = useState({});
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

    const mutation = useMutation({
        mutationFn: (payload) => loginDriver(payload),
        onSuccess: (data) => {
            toast.success("Welcome back! 👋");
            queryClient.invalidateQueries(["userProfile"]);
            // const role = data?.user?.role;
            navigate("/driver-dashboard"); 
        },
        onError: (error) => {
            const responseData = error?.response?.data;
            
            // Handle backend field-specific errors or global message
            if (responseData?.errors) {
                setErrors(responseData.errors);
            } else {
                const message = responseData?.message || "Invalid credentials. Please try again.";
                setGlobalError(message);
                toast.error(message);
            }
        },
    });

    const validateForm = () => {
        const newErrors = {};
        
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        
        const joinedPin = pin.join("");
        if (joinedPin.length < 4) {
            newErrors.pin = "Please enter a complete 4-digit PIN";
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
                phone_number: phone,
                pin: pin.join("")
            });
        }
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center w-full">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-header">
                        Swift Digital Ticketing for Drivers
                    </h1>
                    <p className="text-body text-sm mt-1">
                        Login to purchase your daily ticket
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
                    <h2 className="text-xl font-bold text-header mb-1">Welcome Back</h2>
                    <p className="text-body text-sm mb-6">Login to your driver account</p>

                    {/* Global Error Banner */}
                    {globalError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-red-800">Login Failed</h3>
                                <p className="text-sm text-red-600 mt-1">{globalError}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                Phone Number
                            </label>
                            <div className={`flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2 ${errors.phone ? 'border border-red-500' : ''}`}>
                                <input
                                    type="tel"
                                    placeholder="08012345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder:text-[#98A2B3]"
                                />
                            </div>
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>

                        {/* PIN */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                PIN
                            </label>
                            <p className="text-xs tracking-wide text-body mb-3">Enter your 4-digit PIN</p>
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
                                            ${errors.pin 
                                                ? "border-red-400 focus:border-red-500" 
                                                : i === 0 && !digit
                                                    ? "border-primary"
                                                    : digit
                                                        ? "border-primary"
                                                        : "border-gray-200"
                                            } focus:border-primary`}
                                    />
                                ))}
                            </div>
                            {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
                            
                            <div className="text-right mt-2">
                                <Link
                                    to="/forgot-pin"
                                    className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
                                >
                                    Forgot PIN?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3.5 rounded-xl transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {mutation.isPending ? "Logging in..." : "Login"}
                        </button>

                        {/* Register Link */}
                        <p className="text-center text-sm text-body">
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