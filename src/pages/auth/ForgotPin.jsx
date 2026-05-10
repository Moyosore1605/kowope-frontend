import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from '../../layout/AuthLayout';
import toast from "react-hot-toast";
import { verifyOtp } from "../../services/driverAuth";

export default function ForgotPin() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [phone, setPhone] = useState('');


    useEffect(() => {
	    const savedPhone = sessionStorage.getItem("otp_phone");
        if (savedPhone) {
            setPhone(savedPhone);
        }
    }, []);

    // Mutation for verifying the OTP
    const mutation = useMutation({
        mutationFn: (payload) => verifyOtp(payload),
        onSuccess: (data) => {
            toast.success(`OTP sent successfully!\notp: ${data.otp}`);
            sessionStorage.setItem("otp_phone", phone);
            console.log("otp:", data.otp);
            navigate("/verify-otp", { state: { flow: "forgot-pin" } });
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
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        else if (!/^\d{10,15}$/.test(phone.trim())) {
            newErrors.phone = "Please enter a valid phone number";
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

    return (
        <AuthLayout>
            <div className="flex flex-col items-center w-full">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">

                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-xl font-bold text-header mb-1">Forgot Pin?</h1>
                        <p className="text-body text-sm">Enter your phone number to get otp code</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Phone Number */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                Phone Number
                            </label>
                            <div className={`flex items-center bg-gray-100 rounded-lg px-3 py-3
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

                        {/* Continue button */}
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-primary hover:bg-primary-hover cursor-pointer text-gray-900 font-semibold py-3.5 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {mutation.isPending ? "Sending..." : "Continue"}
                        </button>

                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}