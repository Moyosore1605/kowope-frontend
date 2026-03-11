import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import kowopeLogo from "../assets/kowopeLogo.jpg";

const navLinks = [
    { label: 'How it Works', to: '/login' },
    { label: 'Benefits', to: '/select-role' },
    { label: 'Contact', to: '/select-role' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const closeMobile = () => setMobileOpen(false);

    // Close mobile menu on route change
    React.useEffect(() => {
        closeMobile();
    }, [location.pathname]);

    return (
        <header className="relative px-6 md:px-8 shadow-sm bg-white">
            {/* ── Top bar ── */}
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" onClick={closeMobile}>
                    <img
                        src={kowopeLogo}
                        alt="Kowope Logo"
                        className="w-[110px] h-[85px] object-contain"
                    />
                </Link>

                {/* Desktop nav links */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            className="text-black font-semibold text-sm hover:text-[#3B5BDB] transition-colors duration-150"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop auth buttons */}
                <div className="hidden md:flex gap-6 items-center">
                    <Link to="/login" className="text-black font-semibold text-sm hover:text-[#3B5BDB] transition-colors duration-150">
                        Login
                    </Link>
                    <Link to="/select-role">
                        <button className="bg-[#F4B400] px-6 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition-colors duration-150">
                            Signup
                        </button>
                    </Link>
                </div>

                {/* Mobile hamburger button */}
                <button
                    className="flex md:hidden flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        /* X icon */
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        /* Hamburger icon */
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* ── Mobile dropdown menu ── */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                    }`}
            >
                <nav className="flex flex-col gap-1 pt-2 border-t border-gray-100">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            onClick={closeMobile}
                            className="text-gray-800 font-semibold text-sm px-3 py-3 rounded-lg hover:bg-[#EEF4FF] hover:text-[#3B5BDB] transition-colors duration-150"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-2" />

                    {/* Mobile auth */}
                    <Link
                        to="/login"
                        onClick={closeMobile}
                        className="text-gray-800 font-semibold text-sm px-3 py-3 rounded-lg hover:bg-[#EEF4FF] hover:text-[#3B5BDB] transition-colors duration-150"
                    >
                        Login
                    </Link>
                    <Link to="/select-role" onClick={closeMobile}>
                        <button className="w-full bg-[#F4B400] px-6 py-2.5 rounded-lg font-semibold text-sm mt-1 hover:bg-yellow-400 transition-colors duration-150">
                            Signup
                        </button>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
