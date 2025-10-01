// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const aboutHeroImage = '/images/10.jpg';

export default function About() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37]">
            About Baraka Trails
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Learn about our mission, our team, and our commitment to authentic Tanzanian adventures.
          </p>
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
        <h2 className="text-3xl font-bold text-[#3E2F1C]">Our Story</h2>
        <p className="mt-4 text-lg text-[#5A4B3A]">
          Founded to share Tanzania’s natural beauty, we provide safe, curated, and unforgettable safari experiences for all adventurers.
        </p>
      </div>
    </div>
  );
}
