import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import kowopeLogo from "../assets/kowopeLogo-removebg-preview.png";

const navLinks = [
    { label: 'How it Works', to: '#how-it-works' },
    { label: 'Benefits', to: '#benefits' },
    { label: 'Contact', to: '#contact' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    const closeMobile = () => setMobileOpen(false);

    // Close mobile menu on route change
    useEffect(() => {
        closeMobile();
    }, [location.pathname]);
    
    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 p-4 shadow-sm ${scrolled ? "backdrop-blur-lg bg-white shadow-sm opacity-98" : "bg-white"}`}>
            {/* ── Top bar ── */}
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" onClick={closeMobile}>
                    <img
                        src={kowopeLogo}
                        alt="Kowope Logo"
                        className="w-24 h-12 object-contain"
                    />
                </Link>

                {/* Desktop nav links */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            href={link.to}
                            className="text-black font-semibold text-sm hover:text-[#3B5BDB] transition-colors duration-150"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop auth buttons */}
                <div className="hidden md:flex gap-6 items-center">
                    <Link to="/login" className="text-black font-semibold text-sm hover:text-[#3B5BDB] transition-colors duration-150">
                        Login
                    </Link>
                    <Link to="/signup">
                        <button className="bg-primary px-6 py-2 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors duration-150">
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
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100 py-5' : 'max-h-0 opacity-0'
                    }`}
            >
                <nav className="flex flex-col gap-1 pt-2 border-t border-gray-100">
                    {navLinks.map((link) => (
                        <a
                            onClick={closeMobile}
                            className="text-gray-800 font-semibold text-sm px-3 py-3 rounded-lg hover:bg-[#EEF4FF] hover:text-[#3B5BDB] transition-colors duration-150"
                            href={link.to}
                        >
                            {link.label}
                        </a>
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
                    <Link to="/signup" onClick={closeMobile}>
                        <button className="w-full bg-primary px-6 py-2.5 rounded-lg font-semibold text-sm mt-1 hover:bg-primary-hover transition-colors duration-150">
                            Signup
                        </button>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
