// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImageCarousel from '../components/ImageCarousel';
import ConnectSection from '../components/ConnectSection';
import Footer from '../components/Footer';
import WhyChoose from '../components/WhyChoose';
import IntroParagraph from '../components/IntroParagraph';
import WildebeestCarousel from '../components/WildebeestCarousel';
import SignatureTours from '../components/SignatureTours';

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <IntroParagraph />
      <WildebeestCarousel />
      <SignatureTours />
      <ImageCarousel />
      <ConnectSection />
      <WhyChoose />
      <Footer />
    </div>
  );
}
