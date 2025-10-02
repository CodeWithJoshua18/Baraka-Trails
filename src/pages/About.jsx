// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const aboutHeroImage = '/images/10.jpg';

// Wildebeest + Tours Data
const wildebeestSlides = [
  { image: '/images/wildebeest1.jpg', caption: "The Great Migration – a timeless spectacle of survival and endurance." },
  { image: '/images/wildebeest2.jpg', caption: "Rivers crossed, horizons chased – witness Africa’s heartbeat." },
  { image: '/images/wildebeest3.jpg', caption: "Thousands moving as one across endless plains." },
];

const tours = [
  {
    title: "12 - Day Grand Tour",
    subtitle: "(Cultural Experience • Local Cuisine • Wildlife Safari • Zanzibar Escape)",
    price: "$4,620 / Person sharing",
    description:
      "Experience the best of Tanzania in one unforgettable journey. The Grand Tour combines thrilling wildlife safaris, immersive cultural encounters, and culinary discoveries, topped off with a relaxing Zanzibar beach getaway.",
    images: ["/images/food.jpeg", "/images/hadzbe.jpg", "/images/zanzibar.jpg", "/images/safari.jpg"],
  },
  {
    title: "14 - Day Premium & Experiential",
    subtitle: "(From Jungles to Savannahs to Shores: Gorilla Trekking, Serengeti Safari & Zanzibar Escape)",
    price: "$7,870 / Person sharing (All Inclusive)",
    description:
      "Experience the ultimate East African journey, from trekking mountain gorillas in lush rainforests to exploring the vast Serengeti savannahs and unwinding on Zanzibar’s white-sand beaches. This carefully curated itinerary blends wildlife encounters, cultural immersion, and luxury relaxation, giving you the best of Uganda and Tanzania in one seamless adventure.",
    images: ["/images/serengeti.jpeg", "/images/gorilla.jpg"],
  },
  {
    title: "11 - Day Kilimanjaro & Serengeti Adventure",
    subtitle: "(Marangu Route Trek • Serengeti Safari)",
    price: "$4,090 / Person sharing (All Inclusive)",
    description:
      "Experience the ultimate Tanzanian adventure — conquer Africa’s highest peak and witness the world’s most breathtaking wildlife spectacle. This 11-day journey combines a 6-day Kilimanjaro trek via the Marangu Route with a 5-day Serengeti safari, offering the perfect balance of challenge, discovery, and relaxation.",
    images: ["/images/kilimanjaro.jpg", "/images/serengeti2.jpg"],
  },
];

function TourCard({ tour }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (tour.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % tour.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [tour.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      {/* Image Slideshow */}
      <div className="overflow-hidden rounded-xl mb-4 relative h-56">
        <motion.img
          key={currentImg}
          src={tour.images[currentImg]}
          alt={tour.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-56 object-cover rounded-xl absolute inset-0"
        />
      </div>
      <h3 className="text-2xl font-bold" style={{ color: "#000" }}>
        {tour.title}
      </h3>
      <p className="italic text-sm mt-1" style={{ color: "#000" }}>
        {tour.subtitle}
      </p>
      <p className="font-semibold mt-2" style={{ color: "#000" }}>
        {tour.price}
      </p>
      <p className="mt-4" style={{ color: "#000" }}>
        {tour.description}
      </p>
    </motion.div>
  );
}

export default function About() {
  const [wildeCurrent, setWildeCurrent] = useState(0);

  // Auto-slide Wildebeest carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setWildeCurrent((prev) => (prev + 1) % wildebeestSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fdfcf7]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            About Baraka Trails
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Learn about our mission, our team, and our commitment to authentic Tanzanian adventures.
          </p>
        </motion.div>
      </section>

      {/* Back to Home */}
      <div className="text-center mt-6">
        <Link
          to="/"
          className="px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Intro Paragraph */}
      <div className="px-6 py-10 max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl" style={{ color: "#000" }}>
          Travel is more than just visiting places — it’s about creating stories, sharing moments, 
          and making a lasting impact. From the towering heights of Mount Kilimanjaro to the endless 
          plains of the Serengeti, the turquoise waters of Zanzibar, and the majestic gorillas of Uganda, 
          we craft journeys that inspire, empower, and transform.
        </p>
      </div>

      {/* Wildebeest Carousel */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-sm" style={{ color: "#000" }}>
          The Great Migration
        </h2>
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <motion.div
            key={wildeCurrent}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <img
              src={wildebeestSlides[wildeCurrent].image}
              alt="Wildebeest Migration"
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
            <p className="mt-4 text-center" style={{ color: "#000" }}>
              {wildebeestSlides[wildeCurrent].caption}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signature Tours */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center drop-shadow-sm" style={{ color: "#000" }}>
          Signature Journeys
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {tours.map((tour, idx) => (
            <TourCard key={idx} tour={tour} />
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative bg-black py-16 mt-12">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/safari.jpg"
            alt="Baraka Trails Safari"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-6">
            Book any adventure you will choose
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Whether it’s conquering Kilimanjaro, witnessing the Great Migration, or 
            relaxing on Zanzibar’s beaches — your journey of a lifetime begins here.  
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/destinations"
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors"
            >
              Explore Baraka Trails
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
