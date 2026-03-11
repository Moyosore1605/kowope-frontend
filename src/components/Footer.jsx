import React from 'react';
import { Link } from 'react-router-dom';
import kowopeLogo from '../assets/kowopeLogo.jpg';

const quickLinks = [
    { label: 'How It Works', to: '/login' },
    { label: 'Benefits', to: '/select-role' },
    { label: 'Get Started', to: '/select-role' },
    { label: 'FAQs', to: '/' },
];

const supports = [
    { label: 'Help Center', to: '/' },
    { label: 'Contact Us', to: '/' },
    { label: 'Terms & Conditions', to: '/' },
    { label: 'Privacy Policy', to: '/' },
];

const contact = [
    { label: 'support@kowope.ng' },
    { label: '+234 900 000 0000' },
    { label: 'Lagos, Nigeria' },
];

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#0D1B2A' }} className="relative">
            {/* Wavy top curve */}
            <div className="w-full overflow-hidden leading-none" style={{ marginTop: '-2px' }}>
                <svg
                    viewBox="0 0 1440 80"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="w-full"
                    style={{ height: '60px' }}
                >
                    <path
                        d="M0,0 C360,80 1080,80 1440,0 L1440,0 L0,0 Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Main footer content */}
            <div className="max-w-6xl mx-auto px-6 md:px-16 pt-10 pb-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand column */}
                <div className="flex flex-col gap-4">
                    <img
                        src={kowopeLogo}
                        alt="Kowope Logo"
                        className="w-[80px] h-[60px] object-contain rounded-lg"
                    />
                    <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                        Transforming Lagos transport hubs from informal, cash-based operations into
                        digitally enabled ecosystems.
                    </p>

                    {/* Social icons */}
                    <div className="flex gap-4 mt-2">
                        {/* Instagram */}
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        {/* X / Twitter */}
                        <a href="#" aria-label="X" className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold text-sm mb-5">Quick Links</h4>
                    <ul className="space-y-3">
                        {quickLinks.map((link, i) => (
                            <li key={i}>
                                <Link
                                    to={link.to}
                                    className="text-gray-400 text-sm hover:text-white transition-colors duration-150"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Supports */}
                <div>
                    <h4 className="text-white font-semibold text-sm mb-5">Supports</h4>
                    <ul className="space-y-3">
                        {supports.map((link, i) => (
                            <li key={i}>
                                <Link
                                    to={link.to}
                                    className="text-gray-400 text-sm hover:text-white transition-colors duration-150"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold text-sm mb-5">Contact</h4>
                    <ul className="space-y-3">
                        {contact.map((item, i) => (
                            <li key={i} className="text-gray-400 text-sm">
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800 py-5 text-center">
                <p className="text-gray-500 text-xs">
                    © 2026 Kowope. All rights reserved. Proudly Nigerian. 🇳🇬
                </p>
            </div>
        </footer>
    );
}
