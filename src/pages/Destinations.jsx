// src/pages/Destinations.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const destinationsHeroImage = '/images/9.jpg';

export default function Destinations() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${destinationsHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37]">
            Hidden Destinations
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Explore breathtaking locations off the beaten path. Perfect for travelers seeking adventure and unique experiences.
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
        <h2 className="text-3xl font-bold text-[#3E2F1C]">Destination Highlights</h2>
        <p className="mt-4 text-lg text-[#5A4B3A]">
          From pristine beaches to remote wildlife reserves, discover destinations curated for unforgettable experiences.
        </p>
      </div>
    </div>
  );
}
