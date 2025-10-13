// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const blogHeroImage = '/images/11.jpg';

export default function Blog() {
  return (
    <div className="relative min-h-screen">
      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${blogHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-[1] text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37]">
            Our Blog
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Read about travel tips, safari guides, and inspiring stories from our adventures.
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
        <h2 className="text-3xl font-bold text-[#3E2F1C]">Blog Highlights</h2>
        <p className="mt-4 text-lg text-[#5A4B3A]">
          Discover tips, news, and stories from our safaris to help plan your perfect adventure.
        </p>
      </div>
    </div>
  );
}