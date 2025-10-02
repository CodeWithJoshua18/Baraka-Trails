// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BookingGuide from '../components/BookingGuide';
import ImageCarousel from '../components/ImageCarousel';
import ConnectSection from '../components/ConnectSection';
import Footer from '../components/Footer';
import WhyChoose from '../components/WhyChoose';

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <BookingGuide />
      <ImageCarousel />
      <ConnectSection />
      <WhyChoose />
      <Footer />
    </div>
  );
}
