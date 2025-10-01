// src/pages/Climbing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const climbingHeroImage = '/images/8.jpg';

export default function Climbing() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${climbingHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37]">
            Climbing Kilimanjaro
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Reach the roof of Africa safely with our guided climbs. From beginners to experienced hikers, we have a package for you.
          </p>
          <Link
            to="/enquire"
            className="mt-6 inline-block px-6 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors md:hidden"
          >
            Enquire
          </Link>
        </motion.div>
      </section>

      <div className="text-center mt-6">
        <Link
          to="/"
          className="px-6 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="p-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E2F1C]">Climbing Highlights</h2>
        <p className="mt-4 text-lg text-[#5A4B3A]">
          Enjoy expert guides, well-planned routes, and stunning mountain vistas. Our Kilimanjaro trips are safe, memorable, and tailored to your experience level.
        </p>
      </div>
    </div>
  );
}
