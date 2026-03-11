import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from '../layout/AuthLayout';
import kowopeBus from "../assets/kowopeBus.jpg";
import kowopeAgent from "../assets/kowopeAgent.png";
import kowopeManagement from "../assets/kowopeManagement.jpg";

const roles = [
    {
        id: "driver",
        label: "Driver",
        image: kowopeBus,
    },
    {
        id: "agent",
        label: "Agent",
        image: kowopeAgent,
    },
    {
        id: "management",
        label: "Management",
        image: kowopeManagement,
    },
];

export default function SelectRole() {
    const [selected, setSelected] = useState("driver");
    const navigate = useNavigate();

    const handleNext = () => {
        navigate("/signup");
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center w-full">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-gray-900">
                        A Swift Digital ticketing for drivers
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Select a role to sign up on Kowope
                    </p>
                </div>

                {/* Role Cards */}
                <div className="flex flex-wrap justify-center gap-6 mb-10">
                    {roles.map((role) => {
                        const isSelected = selected === role.id;
                        return (
                            <button
                                key={role.id}
                                type="button"
                                onClick={() => setSelected(role.id)}
                                className={`flex flex-col items-center justify-center w-44 h-44 rounded-2xl border-2 bg-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md
                                    ${isSelected
                                        ? "border-yellow-400 shadow-md"
                                        : "border-gray-200 hover:border-yellow-200"
                                    }`}
                            >
                                <img
                                    src={role.image}
                                    alt={role.label}
                                    className="w-24 h-24 object-contain mb-3"
                                />
                                <span
                                    className={`text-sm font-semibold ${isSelected ? "text-yellow-500" : "text-gray-700"
                                        }`}
                                >
                                    {role.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-gray-900 font-bold px-20 py-3.5 rounded-xl text-base"
                >
                    Next
                </button>
            </div>
        </AuthLayout>
    );
}
