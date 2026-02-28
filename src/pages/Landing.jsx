import React from 'react';
import { Link } from 'react-router-dom';
import kowopeLogo from "../assets/kowopeLogo.jpg";
import Hero from '../components/Hero';


export default function Landing() {
    return (
        <main>
            <div className='px-8 flex justify-between items-center'>
                <Link to="/">
                    <img
                        src={kowopeLogo}
                        alt="Kowope Logo"
                        className="w-[130px] h-[100px] object-contain"
                    />
                </Link>
                <section className='flex gap-10'>
                    <Link to='/login' className='text-black font-semibold'>How it Works</Link>
                    <Link to='/select-role' className='text-black font-semibold'>Benefits</Link>
                    <Link to='/select-role' className='text-black font-semibold'>Contact</Link>
                </section>
                <section className='flex gap-6 items-center'>
                    <Link to='/login' className='text-black font-semibold'>Login</Link>
                    <Link to='/select-role' className='text-black font-semibold'>
                        <button className='bg-[#F4B400] px-6 py-2 rounded-lg'>
                            Signup
                        </button>
                    </Link>
                </section>
            </div>
            <Hero />
        </main>
    )
}