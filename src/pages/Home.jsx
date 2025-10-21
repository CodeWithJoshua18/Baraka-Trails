import React from 'react';
import Hero from '../components/Hero';
import ImageCarousel from '../components/ImageCarousel';
import ConnectSection from '../components/ConnectSection';
import Footer from '../components/Footer';
import WhyChoose from '../components/WhyChoose';
import IntroParagraph from '../components/IntroParagraph';
import WildebeestCarousel from '../components/WildebeestCarousel';
import SignatureTours from '../components/SignatureTours';
import TripAdvisorWidget from '../components/TripAdvisor';

export default function Home() {
  console.log('🔴 HOME RENDERED AT:', new Date().toLocaleTimeString());
  
  return (
    <div className="relative">
      <Hero />
      <IntroParagraph />
       <WildebeestCarousel />
      <SignatureTours />
      <ImageCarousel />
      <ConnectSection />
      <WhyChoose />
      <TripAdvisorWidget />
      <Footer /> 
    </div>
  );
}