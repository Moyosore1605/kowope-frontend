import React from 'react';

const benefits = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#3B5BDB" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" strokeLinecap="round" />
            </svg>
        ),
        title: 'Eliminate Agberos',
        description: 'No more informal ticket collectors. Digital system replaces the chaos.',
        accent: '#3B5BDB',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#3B5BDB" strokeWidth={1.5}>
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="16 7 22 7 22 13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Recover Revenue',
        description: 'Stop losing 30-40% of daily revenue to leakage and untracked payments.',
        accent: '#F4B400',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#3B5BDB" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Save Time',
        description: 'Drivers save 20-30 minutes daily. Faster entry, happier passengers.',
        accent: '#3B5BDB',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#3B5BDB" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Reduce Risk',
        description: 'No cash means no robbery targets. Everyone is safer.',
        accent: '#F4B400',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#3B5BDB" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        title: 'Full Transparency',
        description: 'Every transaction is logged. Management sees everything in real-time.',
        accent: '#3B5BDB',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#3B5BDB" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="9 15 11 17 15 13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'End Disputes',
        description: 'Digital records prove payment. No more "he said, she said" arguments.',
        accent: '#F4B400',
    },
];

export default function Why() {
    return (
        <section className="py-20 px-6 md:px-16" style={{ backgroundColor: '#EEF4FF' }}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-[#3B5BDB] font-semibold text-xs uppercase tracking-widest mb-3">
                        Why Kowope
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Benefits That Matter.
                    </h2>
                    <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
                        Real solutions for real problems facing Lagos transport every day.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4 overflow-hidden relative"
                        >
                            {/* Colored top accent bar */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                style={{ backgroundColor: benefit.accent }}
                            />

                            {/* Icon */}
                            <div className="mt-3">{benefit.icon}</div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-gray-900">
                                {benefit.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
