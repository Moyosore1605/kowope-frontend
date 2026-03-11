import React from 'react';
import { Link } from 'react-router-dom';
import kowopeLogo from '../assets/kowopeLogo.jpg';

/**
 * Shared layout wrapper for all auth pages (Login, Signup, SelectRole).
 * Renders the Kowope logo header + a centred content area for children.
 */
export default function AuthLayout({ children }) {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            {/* ── Header ─────────────────────────────── */}
            <header className="px-6 flex mx-auto">
                <Link to="/">
                    <img
                        src={kowopeLogo}
                        alt="Kowope Logo"
                        className="w-[120px] h-[85px] object-contain"
                    />
                </Link>
            </header>

            {/* ── Page content ───────────────────────── */}
            <div className="flex flex-col items-center justify-center flex-1 px-4 py-8">
                {children}
            </div>
        </main>
    );
}
