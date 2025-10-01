// src/pages/Safari.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import Card from '../components/Card'; // Assuming you already have the Card component

// Hero image for Safari page
const safariHeroImage = '/images/7.jpg';

// Dummy safari packages
const safariPackages = [
  {
    title: 'Serengeti Explorer',
    desc: '3-day guided tour through the Serengeti National Park with luxury camping.',
    img: '/images/serengeti.jpg',
  },
  {
    title: 'Ngorongoro Adventure',
    desc: 'Discover the Ngorongoro Crater and see the Big Five in one day.',
    img: '/images/ngorongoro.jpg',
  },
  {
    title: 'Lake Manyara Safari',
    desc: 'Enjoy a day exploring the scenic Lake Manyara with expert guides.',
    img: '/images/lake-manyara.jpg',
  },
];

export default function Safari() {
  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${safariHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37]">
            Safari Adventures
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Experience the wild like never before! Explore curated safari trips,
            encounter wildlife up close, and create unforgettable memories.
          </p>
          {/* Enquire button for mobile */}
          <Link
            to="/enquire"
            className="mt-6 inline-block px-6 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors md:hidden"
          >
            Enquire
          </Link>
        </motion.div>
      </section>

      {/* Back to Home navigation */}
      <div className="text-center mt-6">
        <Link
          to="/"
          className="px-6 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Page Content */}
      <div className="p-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E2F1C]">Safari Highlights</h2>
        <p className="mt-4 text-lg text-[#5A4B3A]">
          Our safari trips take you deep into Tanzania’s wildlife reserves. Enjoy guided tours,
          luxury accommodations, and breathtaking landscapes. More adventures await!
        </p>
      </div>

      {/* Dummy Safari Packages Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-10 grid gap-8 md:grid-cols-3">
        {safariPackages.map((pkg, index) => (
          <Card key={index} className="hover:scale-105 transition-transform">
            <img
              src={pkg.img}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4 text-left">
              <h3 className="text-xl font-bold text-[#3E2F1C]">{pkg.title}</h3>
              <p className="mt-2 text-[#5A4B3A]">{pkg.desc}</p>
              <Link
                to="/enquire"
                className="mt-4 inline-block px-4 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors"
              >
                Enquire
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
