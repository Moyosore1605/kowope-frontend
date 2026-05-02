import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, UserCircle } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from '../../layout/AuthLayout';
import { verifyOtp, resendOtp } from "../../services/auth";

export default function VerifyOtp() {
    const navigate = useNavigate();

    const [globalError, setGlobalError] = useState('');
    const [errors, setErrors] = useState({});
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const codeRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleCodeChange = (index, value) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        const newCode = [...code];
        newCode[index] = digit;
        setCode(newCode);
        if (digit && index < 5) {
            codeRefs[index + 1].current.focus();
        }
    };

    const handleCodeKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            codeRefs[index - 1].current.focus();
        }
    };

    // Mutation for verifying the OTP
    const mutation = useMutation({
        mutationFn: (payload) => verifyOtp(payload),
        onSuccess: (data) => {
            toast.success("Verification successful!");
            navigate("/driver-dashboard");
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

    // Mutation for resending the OTP
    const resendMutation = useMutation({
        mutationFn: (payload) => resendOtp(payload),
        onSuccess: (data) => {
            toast.success("Code resent successfully!\nNew code: " + data.new_code);
            // Optionally clear the current code input
            setCode(["", "", "", "", "", ""]);
            codeRefs[0].current.focus();
        },
        onError: (error) => {
            const responseData = error?.response?.data;
            const message = responseData?.message || "Failed to resend code. Please try again.";
            toast.error(message);
        }
    });

    const validateForm = () => {
        const newErrors = {};
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        const joinedCode = code.join("");
        if (joinedCode.length < 6) {
            newErrors.code = "Please enter a complete 6-digit code";
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
                code: code.join("")
            });
        }
    };

    const handleResend = () => {
        // Validate that phone exists before attempting to resend
        if (!phone.trim()) {
            toast.error("Please enter your phone number first to resend code.");
            setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
            return;
        }

        // Trigger the resend mutation with the payload expected by the API
        resendMutation.mutate({
            phone_number: phone
        });
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center w-full">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">

                    {/* Icon + Heading */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                            <UserCircle className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-xl font-bold text-header mb-1">Verify Code</h1>
                        <p className="text-body text-sm">Enter your 6-digit code</p>
                    </div>

                    {/* Global Error Banner */}
                    {globalError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-red-800">Verification Failed</h3>
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
                            <div className={`flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2
                                ${errors.phone ? 'border border-red-500' : 'border border-transparent'}`}>
                                <input
                                    type="tel"
                                    placeholder="08012345678"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                                    }}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder:text-[#98A2B3]"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* PIN boxes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                Code
                            </label>
                            <p className="text-xs text-body mb-3">Enter your 6-digit code</p>
                            <div className="flex justify-center gap-3">
                                {code.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={codeRefs[i]}
                                        type="password"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(i, e.target.value)}
                                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                                        className={`w-11 h-11 text-center text-lg font-semibold rounded-xl border-2 outline-none transition-all bg-white
                                            ${errors.code
                                                ? "border-red-400 focus:border-red-500"
                                                : digit
                                                    ? "border-secondary"
                                                    : "border-gray-200 focus:border-secondary"
                                            }`}
                                    />
                                ))}
                            </div>
                            {errors.code && (
                                <p className="text-xs text-red-500 mt-2 text-center">{errors.code}</p>
                            )}
                        </div>

                        {/* Verify button */}
                        <button
                            type="submit"
                            disabled={mutation.isPending || resendMutation.isPending}
                            className="w-full bg-secondary hover:bg-blue-700 active:bg-blue-800 cursor-pointer text-white font-semibold py-3.5 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {mutation.isPending ? "Verifying..." : "Verify and Login →"}
                        </button>

                        {/* Resend link */}
                        <p className="text-center text-sm text-body">
                            Did not get the code?{" "}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendMutation.isPending}
                                className="text-blue-500 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                            >
                                {resendMutation.isPending ? "Sending..." : "Resend code"}
                            </button>
                        </p>

                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}