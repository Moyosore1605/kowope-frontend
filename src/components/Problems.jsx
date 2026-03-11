import React from 'react';
import Cash from "../assets/cash.png";
import Time from "../assets/time.png";
import Bars from "../assets/bars.png";

const problems = [
    {
        icon: (
            <img src={Cash} alt="Cash" className="w-10 h-10" />
        ),
        title: 'Cash Everywhere',
        description: 'Drivers carry NGN 100,000+ daily. Agents handle millions. Robbery risk is real.',
    },
    {
        icon: (
            <img src={Time} alt="Time" className="w-10 h-10" />
        ),
        title: 'Time Wasted Daily',
        description: '20-30 minutes waiting at the park gate. Passengers frustrated. Money lost.',
    },
    {
        icon: (
            <img src={Bars} alt="Bars" className="w-10 h-10" />
        ),
        title: 'Revenue Leakage',
        description: 'Park management loses 30-40% of expected revenue. No visibility. No control.',
    },
];

export default function Problems() {
    return (
        <section style={{ backgroundColor: '#EEF2FF' }} className="py-20 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
                {/* Label */}
                <p className="text-[#F4B400] font-semibold text-sm uppercase tracking-widest mb-3">
                    The Problem
                </p>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Motor Parks Are Losing Millions Daily
                </h2>

                {/* Subtitle */}
                <p className="text-gray-500 text-base max-w-xl mx-auto mb-14 leading-relaxed">
                    Cash-based systems create problems for everyone—drivers, agents, and park management.
                    It's time for a change.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-8 text-left shadow-sm transition-all duration-200 hover:shadow-md border border-gray-100'
                                }`}
                        >
                            {/* Icon */}
                            <div className="text-gray-800 mb-5">
                                {problem.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {problem.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
