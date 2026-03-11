import React from 'react';

const steps = [
    {
        number: '01',
        role: 'For Drivers',
        title: 'Buy Your Ticket',
        description:
            'Register once with your phone number and license. Pay via card, transfer, or USSD. Get your QR ticket instantly.',
        bullets: ['One-time registration', 'Multiple payment methods', 'Instant QR generation'],
        active: false,
    },
    {
        number: '02',
        role: 'For Agents',
        title: 'Validate & Go',
        description:
            "Scan the driver's QR code at the park entrance. The system instantly shows valid or invalid. No arguments needed.",
        bullets: ['5-second validation', 'Clear status display', 'Auto-logged records'],
        active: false,
    },
    {
        number: '03',
        role: 'For Management',
        title: 'See Everything',
        description:
            'Access real-time dashboard showing all transactions, revenue, and agent activity. Export reports anytime.',
        bullets: ['Live revenue tracking', 'Agent monitoring', 'Detailed analytics'],
        active: false,
    },
];

export default function HowItWorks() {
    return (
        <section
            className="py-20 px-6 md:px-16 relative overflow-hidden"
            style={{ backgroundColor: '#0D1B2A' }}
        >
            {/* Dotted background pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, #4a5568 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[#F4B400] font-semibold text-xs uppercase tracking-widest mb-4">
                        How It Works
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Three Users. One Platform.
                    </h2>
                    <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
                        Kowope connects everyone in the transport ecosystem through a simple,
                        transparent digital system.
                    </p>
                </div>

                {/* Cards with connector line */}
                <div className="relative">
                    {/* Horizontal connector line (desktop only) */}
                    <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gray-600 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-7 flex flex-col gap-4 border transition-all duration-200"
                                style={{
                                    backgroundColor: step.active ? '#111f35' : '#111f35',
                                    borderColor: step.active ? '#F4B400' : '#1e3a5f',
                                }}
                            >
                                {/* Number + active dot */}
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl font-bold text-[#F4B400] leading-none">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Role label */}
                                <p className="text-[#F4B400] text-xs font-semibold uppercase tracking-wider -mt-2">
                                    {step.role}
                                </p>

                                {/* Title */}
                                <h3 className="text-white text-xl font-bold leading-snug -mt-1">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Bullets */}
                                <ul className="space-y-2 mt-1">
                                    {step.bullets.map((b, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                                            <span className="w-2 h-2 rounded-full bg-[#F4B400] flex-shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
