import React from 'react';
import { Link } from 'react-router-dom';

export default function CTACard() {
    return (
        <section className="py-16 px-6 md:px-16 bg-white">
            <div
                className="max-w-5xl mx-auto rounded-3xl px-10 py-16 text-center relative overflow-hidden"
                style={{ backgroundColor: '#2563EB' }}
            >
                {/* Wavy SVG background lines */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 900 300"
                >
                    {[0, 40, 80, 120, 160, 200, 240].map((offset, i) => (
                        <path
                            key={i}
                            d={`M0 ${100 + offset} Q225 ${60 + offset} 450 ${100 + offset} T900 ${100 + offset}`}
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                        />
                    ))}
                </svg>

                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-snug">
                        Ready to Transform Your Transportation experience?
                    </h2>
                    <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                        Join the digital revolution. Whether you're a driver, agent, or park manager, Kowope
                        makes your daily operations smoother, safer, and more transparent.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/select-role">
                            <button className="bg-[#F4B400] text-gray-900 font-semibold px-10 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200 w-44">
                                Get started
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="bg-transparent text-white font-semibold px-10 py-3 rounded-lg border border-white hover:bg-white hover:text-blue-600 transition-colors duration-200 w-44">
                                Learn more
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
