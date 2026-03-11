import React from 'react';
import { Link } from 'react-router-dom';
import kowopeLogo from "../assets/kowopeLogo.jpg";
import Hero from '../components/Hero';
import Problems from '../components/Problems';
import Solution from '../components/Solution';
import HowItWorks from '../components/HowItWorks';
import Why from '../components/Why';
import FAQ from '../components/FAQ';
import CTACard from '../components/CTACard';
import Footer from '../components/Footer';
import Header from '../components/Header';


export default function Landing() {
    return (
        <main>
            <Header />
            <Hero />
            <Problems />
            <Solution />
            <HowItWorks />
            <Why />
            <FAQ />
            <CTACard />
            <Footer />
        </main>
    )
}