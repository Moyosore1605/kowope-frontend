import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AuthLayout from '../../layout/AuthLayout';
import { registerDriver } from "../../services/auth";

export default function Signup() {
    const navigate = useNavigate();

    const [globalError, setGlobalError] = useState('');
    const [errors, setErrors] = useState({});
    
    // Form States
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [idType, setIdType] = useState("license");
    const [licenseFile, setLicenseFile] = useState(null);
    const [vehicleReg, setVehicleReg] = useState("");
    const [area, setArea] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    
    // UI & API States
    const [showPin, setShowPin] = useState(false);
    const [showConfirmPin, setShowConfirmPin] = useState(false);
    const [areas, setAreas] = useState([]);
    const fileInputRef = useRef(null);

    const { data, isLoading, error } = useQuery({
	    queryKey: ["areas"],
        queryFn: async () => {
            const res = await fetch("https://kowope-backend-service.onrender.com/api/v1/areas");
            if (!res.ok) throw new Error("Failed");
            return res.json();
        },
        retry: 5,          // 🔄 automatic retries
        retryDelay: 2000,  // ⏱ delay
    });

    useEffect(() => {
        if (data?.results) {
            setAreas(data.results);
        }
    }, [data]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!fullName.trim()) newErrors.fullName = "Full name is required";
        if (!phone.trim()) newErrors.phone = "Phone number is required";
        if (!vehicleReg.trim()) newErrors.vehicleReg = "Vehicle registration is required";
        if (!area) newErrors.area = "Please select your area";
        
        if (!licenseFile) {
            newErrors.licenseFile = "ID document is required";
        }

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
            const payload = new FormData();
            payload.append('full_name', fullName);
            payload.append('phone_number', phone);
            payload.append('document_type', idType);
            payload.append('license_number', vehicleReg);
            
            // This will now append the UUID string correctly
            payload.append('area', area); 
            
            payload.append('pin', pin);
            payload.append('confirm_pin', confirmPin);
            payload.append('document_file', licenseFile);

            mutation.mutate(payload);
        }
    };

    const mutation = useMutation({
        mutationFn: (payload) => registerDriver(payload),
        onSuccess: (data) => {
            toast.success(`Registration successful 🎉\nRegistered driver otp: ${data.otp}`);
            if (data.user.role === "driver") {
                navigate("/verify-otp");
            }
            // console.log("Registered driver otp:", data.otp);
        },
        onError: async (error) => {
            const responseData = error?.response?.data;
            const backendErrors = responseData?.errors || responseData;

            if (backendErrors && typeof backendErrors === 'object') {
                const formattedErrors = {};
                let mappedAtLeastOneField = false;

                Object.keys(backendErrors).forEach((key) => {
                    if (key === 'message' && typeof backendErrors[key] === 'string') return;

                    mappedAtLeastOneField = true;
                    
                    const errorMessages = Array.isArray(backendErrors[key]) 
                        ? backendErrors[key] 
                        : [backendErrors[key]];

                    const fieldMap = {
                        full_name: "fullName",
                        phone_number: "phone",
                        document_type: "idType",
                        license_number: "vehicleReg",
                        area: "area",
                        pin: "pin",
                        confirm_pin: "confirmPin",
                        document_file: "licenseFile",
                    };

                    const frontendKey = fieldMap[key] || key; 
                    formattedErrors[frontendKey] = errorMessages.join(", ");

                    errorMessages.forEach((msg) => {
                        const cleanKey = key.replace(/_/g, ' ').toUpperCase();
                        toast.error(`${cleanKey}: ${msg}`);
                    });
                });

                if (mappedAtLeastOneField) {
                    setErrors((prev) => ({ ...prev, ...formattedErrors }));
                    return; 
                }
            } 
          
            if (responseData?.message) {
                setGlobalError(responseData.message);
                toast.error(responseData.message);
            } else {
                const fallbackError = error.message || "An unexpected error occurred. Please try again later.";
                setGlobalError(fallbackError);
                toast.error("Registration failed.");
            }
        },
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setLicenseFile(file);
    };

    // Icons
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
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-header">
                        Swift Digital Ticketing for Drivers
                    </h1>
                    <p className="text-body text-sm mt-1">
                        Don't have an account? Create one to purchase tickets seamlessly
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
                    <h2 className="text-xl font-bold text-header mb-1">Create Your Account</h2>
                    <p className="text-body text-sm mb-6">Register as a driver to start buying digital tickets</p>

                    {globalError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-red-800">Registration Failed</h3>
                                <p className="text-sm text-red-600 mt-1">{globalError}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">Full Name</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                            </div>
                            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">Phone Number</label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 gap-2">
                                <input
                                    type="tel"
                                    placeholder="08012345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-transparent flex-1 outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                            </div>
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>

                        {/* ID Type */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">ID Type</label>
                            <div className="flex gap-5">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="idType"
                                        value="license"
                                        checked={idType === "license"}
                                        onChange={() => setIdType("license")}
                                        className="accent-primary w-4 h-4"
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
                                        className="accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-gray-700">NIN</span>
                                </label>
                            </div>
                        </div>

                        {/* License Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">
                                {idType === "license" ? "Driver's License" : "NIN Slip"}
                            </label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className={`border-2 border-dashed rounded-lg py-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 ${errors.licenseFile ? 'border-red-400' : 'border-gray-200 hover:border-yellow-400'}`}
                            >
                                {!licenseFile ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                ) : (
                                    null
                                )}
                                <span className="text-sm text-gray-500 font-medium">
                                    {licenseFile ? licenseFile.name : (idType === "license" ? "Upload Driver's License" : "Upload NIN Slip")}
                                </span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-xs tracking-wide text-gray-400 mt-1">PDF and JPEG formats, up to 5 MB</p>
                            {errors.licenseFile && <p className="text-xs text-red-500 mt-1">{errors.licenseFile}</p>}
                        </div>

                        {/* Vehicle Registration Number */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">Vehicle Registration Number</label>
                            <div className="bg-gray-100 rounded-lg px-3 py-3">
                                <input
                                    type="text"
                                    placeholder="ABC123XY"
                                    value={vehicleReg}
                                    onChange={(e) => setVehicleReg(e.target.value)}
                                    className="bg-transparent w-full outline-none text-gray-600 text-sm placeholder-gray-400"
                                />
                            </div>
                            {errors.vehicleReg && <p className="text-xs text-red-500 mt-1">{errors.vehicleReg}</p>}
                        </div>

                        {/* LGA */}
                        {/* <div>
                            <label className="block text-sm font-semibold text-header mb-1">Local Government Area (LGA)</label>
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
                            {errors.lga && <p className="text-xs text-red-500 mt-1">{errors.lga}</p>}
                        </div> */}

                        {/* Dynamic Area Fetching */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">Area</label>
                            <div className="relative">
                                <select
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="w-full bg-gray-100 rounded-lg px-3 py-3 text-sm text-gray-500 outline-none appearance-none cursor-pointer"
                                    disabled={isLoading}
                                >
                                    <option value="">
                                        {isLoading ? "Loading areas..." : "Select your area"}
                                    </option>
                                    {areas.map((a) => (
                                        <option key={a.id} value={a.id}>
                                            {a.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                            {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                        </div>

                        {/* Create PIN */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-1">Create PIN</label>
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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-primary hover:bg-primary-hover text-gray-900 font-bold py-3.5 rounded-xl transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {mutation.isPending ? "Registering..." : "Register"}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-sm text-body">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 font-medium hover:underline">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}