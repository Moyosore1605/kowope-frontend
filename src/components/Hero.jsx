import React from 'react'
import bgHero from "../assets/bgHero.jpg"

export default function Hero() {
    return (
        <main className='w-full h-[600px] bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgHero})` }}>
            <div className='w-full h-full bg-black opacity-80 px-12 pt-20'>
                <p className='text-xl font-bold text-[#F4B400] mb-6'>No More Cash, No More Wahala!</p>
                <h1 className='text-white text-5xl font-bold mb-6'>Digital Ticketing  for <br /> Motor Parks.</h1>
                <p className='text-gray-500 mb-6'>Kowope is revolutionizing Lagos transport hubs. Buy your daily ticket
                    <br /> in seconds, show your QR code, and enter the park—no cash, no <br /> stress, no delays.
                </p>
                <div className='flex items-center gap-6 mb-6'>
                    <button className='bg-[#F4B400] px-6 py-2 rounded-lg text-black font-semibold'>
                        Get Started
                    </button>
                    <button className='bg-transparent border-2 border-[#2563EB] px-6 py-2 rounded-lg text-white font-semibold'>
                        Learn More
                    </button>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='flex flex-col'>
                        <p className='text-[#F4B400] text-2xl font-bold'>90%</p>
                        <p className='text-gray-500 text-sm'>Less Dispute</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-white text-2xl font-bold'>2 mins</p>
                        <p className='text-gray-500 text-sm'>Ticket Purchase</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-[#F4B400] text-2xl font-bold'>0</p>
                        <p className='text-gray-500 text-sm'>Cash Handling</p>
                    </div>
                </div>
            </div>
        </main>
    )
}