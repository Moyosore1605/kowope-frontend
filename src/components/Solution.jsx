import React from 'react';
import SolutionImg from '../assets/solutionImg.png';
import Time from "../assets/time.png";
import Scanimg from "../assets/scanImg.png";
import Barchart from "../assets/barChartSolution.png";

const leftFeatures = [
    {
        icon: (
            <img src={Time} alt="Time" className="w-10 h-10" />
        ),
        title: 'Buy Ticket in Seconds',
        description: 'Open app, pay, done. Your QR ticket is ready instantly. Works on any smartphone.',
        bullets: ['Under 2 minutes', 'Multiple payment options', 'Works offline'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Zero Cash Risk',
        description: 'No more carrying cash to the park. No more robbery fears. Everything digital.',
        bullets: ['Secure payments', 'Digital receipts', 'Payment history'],
    },
];

const rightFeatures = [
    {
        icon: (
            <img src={Scanimg} alt="Scan" className="w-10 h-10" />
        ),
        title: 'Scan & Go',
        description: 'Agents simply scan your QR code. Green means go. No arguments, no delays.',
        bullets: ['10-second validation', 'Real-time verification', 'Clear status display'],
    },
    {
        icon: (
            <img src={Barchart} alt="Barchart" className="w-10 h-10" />
        ),
        title: 'Real-Time Dashboard',
        description: 'Park management sees every transaction as it happens. Full transparency.',
        bullets: ['Live revenue tracking', 'Agent monitoring', 'Export reports'],
    },
];

function FeatureCard({ icon, title, description, bullets, align = 'left' }) {
    return (
        <div className={`flex flex-col ${align === 'right' ? 'items-center text-center' : 'items-center text-center'}`}>
            <div className="text-gray-700 mb-3">{icon}</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-500 text-sm mb-2 leading-relaxed">{description}</p>
            <ul className="space-y-1">
                {bullets.map((b, i) => (
                    <li key={i} className="text-gray-500 text-sm flex items-center gap-1.5">
                        {align === 'right' && <span className="text-gray-400">·</span>}
                        {align === 'left' && <span className="text-gray-400">·</span>}
                        {b}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Solution() {
    return (
        <section className="py-20 px-6 md:px-16 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-[#3B5BDB] font-semibold text-xs uppercase tracking-widest mb-3">
                        The Solution
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Kowope Makes It Simple
                    </h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
                        One app connects drivers, agents, and park management. Everyone wins.
                    </p>
                </div>

                {/* Three-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                    {/* Left features */}
                    <div className="flex flex-col gap-12">
                        {leftFeatures.map((f, i) => (
                            <FeatureCard key={i} {...f} align="left" />
                        ))}
                    </div>

                    {/* Center image */}
                    <div className="flex justify-center">
                        <img
                            src={SolutionImg}
                            alt="Kowope Solution"
                            className="rounded-2xl w-full max-w-[280px] object-cover shadow-md"
                        />
                    </div>

                    {/* Right features */}
                    <div className="flex flex-col gap-12">
                        {rightFeatures.map((f, i) => (
                            <FeatureCard key={i} {...f} align="right" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
