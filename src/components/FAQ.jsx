import React, { useState } from 'react';

const faqs = [
    {
        question: 'How long does it take to buy a ticket?',
        answer:
            'First-time registration takes 3-5 minutes. After that, repeat purchases take just 30 seconds. Compare this to 20-30 minutes wasted with cash-based systems and the time lost in disputes.',
    },
    {
        question: 'Is my data secure?',
        answer:
            'Yes. Kowope uses industry-standard encryption to protect all user data and payment information. Your details are never shared with third parties.',
    },
    {
        question: "What if drivers don't have smartphones?",
        answer:
            'Kowope supports USSD-based ticketing for drivers without smartphones, ensuring everyone can participate regardless of their device.',
    },
    {
        question: 'How does Kowope eliminate agberos from the system?',
        answer:
            'By digitising the entire ticketing process, there is no cash to collect and no room for informal collectors. Agents use the app to validate QR codes, removing the need for human cash handlers.',
    },
    {
        question: 'What payment methods are supported?',
        answer:
            'We support card payments, bank transfers, USSD codes, and major mobile wallets — making it easy for every driver to pay their way.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-6 md:px-16 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                {/* Left: heading */}
                <div className="md:sticky md:top-24">
                    <p className="text-[#F4B400] font-semibold text-xs uppercase tracking-widest mb-4">
                        Got Questions?
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                        Frequently Asked <br /> Questions
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        If you have any further questions, please don't hesitate to reach out to
                        our customer support team for assistance.
                    </p>
                </div>

                {/* Right: accordion */}
                <div className="flex flex-col divide-y divide-gray-100">
                    {faqs.map((faq, index) => (
                        <div key={index} className="py-5">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between text-left gap-4 group"
                            >
                                <span className="text-gray-900 font-semibold text-sm md:text-base group-hover:text-[#3B5BDB] transition-colors duration-150">
                                    {faq.question}
                                </span>
                                <span
                                    className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition-transform duration-200"
                                    style={{
                                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            {/* Answer */}
                            <div
                                className="overflow-hidden transition-all duration-300"
                                style={{ maxHeight: openIndex === index ? '300px' : '0px' }}
                            >
                                <p className="text-gray-500 text-sm leading-relaxed pt-3">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
