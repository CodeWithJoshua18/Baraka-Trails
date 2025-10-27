import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";

const destinationsHeroImage = "/images/safari4.jpg";

// Animation variants for scroll reveal
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Reusable component for scroll-triggered animations
const ScrollReveal = ({ children, variant = fadeInUpVariants, threshold = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
    >
      {children}
    </motion.div>
  );
};

export default function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    // Prevent horizontal scroll
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedDestination) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedDestination]);

  const destinations = [
    {
      name: "Tanzania",
      image: "/images/beach.jpeg",
      highlights: [
        "Serengeti National Park – Witness the Great Migration.",
        "Ngorongoro Crater – Home to the Big Five.",
        "Tarangire & Lake Manyara – Elephants, baobabs, and flamingos.",
        "Zanzibar – Bush2Beach adventures.",
        "Mahale National Park – Meet chimpanzees in the wild.",
      ],
      desc: "The heart of safari — Tanzania is where the call of the wild meets breathtaking beauty.",
    },
    {
      name: "Kenya",
      image: "/images/mara.jpeg",
      highlights: [
        "Maasai Mara – Big cats and the Great Migration.",
        "Amboseli – Elephants beneath Kilimanjaro.",
        "Lake Naivasha & Nakuru – Birdlife and rhinos.",
        "Samburu – Raw, authentic, untamed.",
      ],
      desc: "The home of the Maasai Mara — Kenya is where safari dreams come alive.",
    },
    {
      name: "Uganda",
      image: "/images/falls.jpg",
      highlights: [
        "Bwindi Forest – Trek to meet gorillas.",
        "Queen Elizabeth Park – Tree-climbing lions.",
        "Murchison Falls – Thundering waterfalls and river safaris.",
        "Kibale Forest – Chimpanzees and lush jungles.",
      ],
      desc: "The Pearl of Africa — a perfect harmony of wilderness, water, and wonder.",
    },
  ];

  const adventures = [
    {
      title: "Safari & Beachside Relaxation",
      price: "$3,160 (All Inclusive)",
      duration: "7 Days — Selous Game Reserve & Zanzibar Safari",
      image: "/images/beach.jpeg",
    },
    {
      title: "Wildlife and Marine Experience",
      price: "$3,840 (All Inclusive)",
      duration: "8 Days Safari & Zanzibar",
      image: "/images/mara.jpeg",
    },
    {
      title: "Across the Land, Beyond Expectations",
      price: "$4,950",
      duration: "11 Days Safari — Kenya & Tanzania",
      image: "/images/lions.jpeg",
    },
    {
      title: "Enjoy a Balance of Wildlife Encounters",
      price: "Request Quotation",
      duration: "15 Days Chimpanzee & Serengeti",
      image: "/images/chipanzee.jpeg",
    },
  ];

  const storytelling = [
    {
      title: "Where Adventure Meets Serenity",
      text: "At Baraka Trails, every safari is more than a journey—it's a transformation. From the untamed wilderness to golden beaches, experience nature's rhythm in its purest form.",
      image: "/images/safari1.jpeg",
    },
    {
      title: "A Thousand Miles of Untold Stories",
      text: "Traverse through the savannahs, meet the Maasai warriors, and hear the whispers of ancient landscapes. Each moment is a story waiting to be lived.",
      image: "/images/safari3.jpeg",
    },
    {
      title: "Beyond the Horizon",
      text: "Dive into the harmony of the wild and the calm. Whether trekking with gorillas or watching sunsets over Kilimanjaro, your spirit finds its home in Africa.",
      image: "/images/safari2.jpeg",
    },
  ];

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedDestination(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden max-w-[100vw]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full max-w-[100vw] h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${destinationsHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center w-full max-w-3xl px-6 mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37] break-words">
            Hidden Destinations
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 break-words">
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

      {/* Back Home Button */}
      <div className="text-center mt-6 px-4">
        <Link
          to="/"
          className="px-6 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors inline-block"
        >
          Back to Home
        </Link>
      </div>

      {/* Punchline */}
      <div className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-5xl font-bold !text-[#3E2F1C] mb-6 leading-tight">
      Why Choose an African Safari?
    </h2>
    
    <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
    
    <p className="text-lg md:text-xl text-[#5A4B3A] leading-relaxed mb-6">
      A journey through Africa is more than travel — it's a <span className="font-semibold text-[#D4AF37]">feeling</span>. 
    </p>
    
    <p className="text-lg md:text-xl text-[#5A4B3A] leading-relaxed mb-6">
      It's the rhythm of the wild, the colors of culture, and the spirit of discovery that stays with you long after you return home.
    </p>
    
    <p className="text-base md:text-lg text-[#5A4B3A] leading-relaxed max-w-3xl mx-auto">
      Our destination itineraries give you the freedom to travel at your own pace, with unlimited opportunities to discover the very best of Tanzania, Kenya, and Uganda. From iconic game parks to cultural encounters and gorilla trekking, <span className="font-semibold text-[#3E2F1C]">Baraka Trails</span> crafts journeys that go beyond the ordinary.
    </p>
  </div>
</div>

      {/* Destination Cards */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 p-10 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {destinations.map((dest, index) => (
          <motion.div
            key={index}
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedDestination(dest)}
            className="relative cursor-pointer overflow-hidden rounded-2xl shadow-lg group"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold !text-[#D4AF37]">{dest.name}</h3>
              <p className="text-white text-sm mt-2 px-4 opacity-90">{dest.desc}</p>
              <span className="mt-4 px-4 py-2 bg-[#D4AF37] !text-[#3E2F1C] font-semibold rounded-md transition-colors">
                View Details
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal Popup - Slides from Left */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            className="modal-overlay fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex justify-start items-center"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white w-full md:w-2/3 lg:w-1/2 h-full shadow-xl overflow-y-auto p-6 md:p-12"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 text-gray-500 hover:text-[#D4AF37] transition z-50"
                onClick={() => setSelectedDestination(null)}
              >
                <X className="w-8 h-8" />
              </button>

              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-60 object-cover rounded-xl mb-6"
              />
              <h3 className="text-3xl font-bold !text-[#3E2F1C] mb-4">{selectedDestination.name}</h3>
              <p className="text-lg text-[#5A4B3A] mb-6">{selectedDestination.desc}</p>
              
              <h4 className="text-xl font-semibold !text-[#3E2F1C] mb-3">Highlights:</h4>
              <div className="text-[#5A4B3A] space-y-2 mb-8">
                {selectedDestination.highlights.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 mb-12">
                <Link
                  to="/enquire"
                  className="px-6 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors text-center"
                  onClick={() => setSelectedDestination(null)}
                >
                  Plan This Safari
                </Link>
                <Link
                  to={`/destinations/${selectedDestination.name.toLowerCase()}`}
                  className="px-6 py-3 bg-[#3E2F1C] text-white font-semibold rounded-md hover:bg-[#2A1F12] transition-colors text-center"
                  onClick={() => setSelectedDestination(null)}
                >
                  Explore {selectedDestination.name}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Adventure Packages */}
      <ScrollReveal>
        <div className="bg-[#F9F6F1] py-16 mt-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-[#3E2F1C]">Safari Packages & Experiences</h2>
          <p className="text-[#5A4B3A] mt-3 mb-10 max-w-2xl mx-auto px-6">
            Choose your adventure — from serene beaches to thrilling safaris, each journey is designed to connect you with the heart of Africa.
          </p>
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {adventures.map((adv, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E2DC]"
              >
                <img
                  src={adv.image}
                  alt={adv.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold !text-[#3E2F1C] mb-2">{adv.title}</h3>
                  <p className="text-[#D4AF37] font-semibold text-lg mb-1">{adv.price}</p>
                  <p className="text-[#5A4B3A] mb-4">{adv.duration}</p>
                  <Link
                    to="/enquire"
                    className="inline-block w-full px-6 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors text-center"
                  >
                    Book This Package
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Storytelling Punchline */}
      <ScrollReveal>
        <div className="text-center mt-16 mb-10 px-6">
          <h2 className="text-3xl md:text-4xl font-bold !text-[#3E2F1C]">
            Stories From the Heart of Africa
          </h2>
          <p className="mt-4 text-lg text-[#5A4B3A] max-w-3xl mx-auto">
            Every trail tells a tale. Every sunset whispers a secret. Join us as we journey through landscapes that transform wanderers into storytellers, and adventures into memories that last a lifetime.
          </p>
        </div>
      </ScrollReveal>

      {/* Storytelling Section */}
      {storytelling.map((story, i) => (
        <ScrollReveal key={i} threshold={0.2}>
          <div
            className={`flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-6 py-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.img
              src={story.image}
              alt={story.title}
              className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold !text-[#3E2F1C] mb-4">{story.title}</h3>
              <p className="text-[#5A4B3A] leading-relaxed">{story.text}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}

      {/* footer */}
      <Footer />
    </div>
  );
}