import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Trees, Waves, Heart, Sparkles, Mountain, Eye } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const destinations = [
  {
    id: "bwindi",
    name: "Bwindi Impenetrable Forest",
    tagline: "Into the Mist with Mountain Gorillas",
    description:
      "Deep within the ancient rainforest, where mist clings to towering trees and silence speaks volumes, lies one of Earth's most profound wildlife encounters. Bwindi is home to nearly half of the world's remaining mountain gorillas. Trekking through dense vegetation, your heart racing with anticipation, and then — a moment of eye contact with a silverback. Time stops. Everything else fades. This is connection at its purest.",
    image: "/images/gorilla.jpg",
    highlights: [
      "Mountain gorilla trekking",
      "UNESCO World Heritage Site",
      "450+ mountain gorillas",
      "Batwa cultural experiences",
      "Ancient montane forest",
      "Over 350 bird species",
    ],
    color: "#2D5016",
    accentColor: "#7BA428",
  },
  {
    id: "queen-elizabeth",
    name: "Queen Elizabeth National Park",
    tagline: "Where Savannah Meets the Rift Valley",
    description:
      "Sprawling across the base of the majestic Rwenzori Mountains, Queen Elizabeth National Park is a symphony of ecosystems. Tree-climbing lions lounge in fig branches, hippos congregate in the Kazinga Channel, and elephants march across golden grasslands. The diversity here is staggering — crater lakes shimmer in the distance, wetlands teem with birdlife, and every game drive reveals something extraordinary.",
    image: "/images/elizabeth.jpg",
    highlights: [
      "Tree-climbing lions of Ishasha",
      "Kazinga Channel boat cruises",
      "95+ mammal species",
      "Scenic crater lakes",
      "Rwenzori Mountains backdrop",
      "Vibrant birdlife (600+ species)",
    ],
    color: "#8B4513",
    accentColor: "#D4A574",
  },
  {
    id: "murchison",
    name: "Murchison Falls National Park",
    tagline: "The Nile's Most Powerful Moment",
    description:
      "Witness the mighty Nile squeeze through a 7-meter gorge and explode in a thunderous cascade — Murchison Falls is raw, untamed power. But beyond this dramatic centerpiece lies Uganda's largest national park, where the savannah stretches endlessly, elephants roam in large herds, and Nile crocodiles bask on sandy banks. River safaris here feel like journeys through primordial Africa.",
    image: "/images/falls.jpg",
    highlights: [
      "Murchison Falls boat safari",
      "Top of the Falls hike",
      "Large elephant herds",
      "Nile crocodiles & hippos",
      "Rothschild's giraffes",
      "Remote wilderness feel",
    ],
    color: "#1B4D6B",
    accentColor: "#4A9FCC",
  },
  {
    id: "kibale",
    name: "Kibale Forest National Park",
    tagline: "The Primate Capital of the World",
    description:
      "Step into a realm where chimpanzees rule. Kibale Forest echoes with their hoots, calls, and playful chatter. Tracking these intelligent primates through the lush tropical forest is exhilarating — watching them swing through the canopy, groom each other, and interact with such human-like gestures is deeply moving. With 13 primate species calling Kibale home, every trail holds the promise of magic.",
    image: "/images/kibale.jpg",
    highlights: [
      "Chimpanzee tracking",
      "13 primate species",
      "Bigodi Wetland Sanctuary",
      "Guided forest walks",
      "Over 375 bird species",
      "Vibrant butterfly diversity",
    ],
    color: "#2F4F2F",
    accentColor: "#6B8E23",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Uganda() {
  const [activeDestination, setActiveDestination] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Auto-rotate featured destination every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDestination((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <Navbar />
      </motion.div>

      {/* Hero with Parallax */}
      <motion.header
        className="relative bg-cover bg-center h-[85vh] flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: "url('/images/uganda.jpg')",
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        
        <motion.div
          className="relative z-10 text-center max-w-5xl px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 drop-shadow-2xl tracking-tight">
            Uganda
          </h1>
          <p className="text-3xl md:text-4xl text-[#D4AF37] font-light mb-8 italic">
            The Pearl of Africa
          </p>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto">
            Where ancient forests whisper secrets, gorillas roam misty mountains, 
            and the Nile carves its most dramatic chapter.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/enquire"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] text-gray-900 font-bold rounded-full hover:bg-white transition-all shadow-2xl text-lg"
            >
              Discover Uganda <ChevronRight size={24} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Why Uganda Section with Icons Grid */}
      <motion.section 
        className="py-24 px-6 bg-white"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold !text-gray-900 mb-6">
              Why Uganda Captivates
            </h2>
            <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-xl !text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Churchill called it the Pearl of Africa for good reason. Uganda distills 
              the continent's essence into a compact, accessible paradise of biodiversity.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                icon: <Trees className="w-14 h-14 text-[#7BA428]" />,
                title: "Primate Paradise",
                description: "Home to mountain gorillas, chimpanzees, and 11 other primate species in pristine habitats.",
              },
              {
                icon: <Waves className="w-14 h-14 text-[#4A9FCC]" />,
                title: "Source of the Nile",
                description: "Where the world's longest river begins its epic 6,650km journey to the Mediterranean.",
              },
              {
                icon: <Mountain className="w-14 h-14 text-[#8B4513]" />,
                title: "Diverse Landscapes",
                description: "From snow-capped Rwenzoris to tropical forests, savannah plains to crater lakes.",
              },
              {
                icon: <Heart className="w-14 h-14 text-[#D4AF37]" />,
                title: "Warm Hearts",
                description: "Experience legendary Ugandan hospitality and authentic cultural connections.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold !text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Destination Carousel */}
      <section className="py-20 px-6 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience Highlights</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Each destination tells a unique story of wilderness and wonder
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              key={activeDestination}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]"
            >
              <img
                src={destinations[activeDestination].image}
                alt={destinations[activeDestination].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-sm uppercase tracking-wider text-gray-300">Featured</span>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {destinations[activeDestination].name}
                </h3>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              key={`content-${activeDestination}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-2xl italic text-[#D4AF37] mb-6">
                {destinations[activeDestination].tagline}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {destinations[activeDestination].description.slice(0, 250)}...
              </p>

              {/* Quick Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {destinations[activeDestination].highlights.slice(0, 4).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Destination Selector */}
              <div className="flex gap-3 mb-8">
                {destinations.map((dest, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDestination(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeDestination 
                        ? "bg-[#D4AF37] w-12" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`View ${dest.name}`}
                  />
                ))}
              </div>

              <Link
                to="/enquire"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-gray-900 font-bold rounded-full hover:bg-white transition-all"
              >
                Plan Your Visit <ChevronRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Destinations - Split Layout */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-32 last:mb-0"
            >
              <div className={`grid md:grid-cols-5 gap-12 items-start ${
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}>
                {/* Image Column */}
                <div className={`md:col-span-2 ${index % 2 === 1 ? "md:col-start-4" : ""}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="sticky top-24"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-[450px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${dest.color}99 0%, transparent 100%)`,
                        }}
                      ></div>
                    </div>
                    
                    {/* Small stat badges */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div 
                        className="p-4 rounded-xl text-white text-center"
                        style={{ backgroundColor: dest.color }}
                      >
                        <Eye className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-semibold">Must-See</p>
                      </div>
                      <div 
                        className="p-4 rounded-xl text-white text-center"
                        style={{ backgroundColor: dest.accentColor }}
                      >
                        <Heart className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-semibold">Unforgettable</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Column */}
                <div className={`md:col-span-3 ${index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-1 rounded-full"
                      style={{ backgroundColor: dest.accentColor }}
                    ></div>
                    <span 
                      className="text-sm uppercase tracking-widest font-bold"
                      style={{ color: dest.color }}
                    >
                      Destination {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ color: dest.color }}
                  >
                    {dest.name}
                  </h3>
                  
                  <p className="text-2xl italic text-gray-600 mb-6">
                    {dest.tagline}
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {dest.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                    <h4 className="text-xl font-bold !text-gray-900 mb-6">Experience Highlights</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {dest.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: dest.accentColor }}
                          ></div>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/enquire"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white hover:shadow-2xl transition-all"
                    style={{ backgroundColor: dest.color }}
                  >
                    Explore {dest.name.split(' ')[0]} <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Immersive Quote Section */}
      <motion.section
        className="relative py-32 px-6 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/images/uganda-landscape.jpg')" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-8" />
            <blockquote className="text-3xl md:text-4xl text-white font-light leading-relaxed mb-8 italic">
              "In Uganda, you don't just observe nature — you become part of its ancient rhythm. 
              Every encounter feels sacred, every moment profound."
            </blockquote>
            <cite className="text-xl text-[#D4AF37] not-italic">— Sarah Mitchell, Conservation Photographer</cite>
          </motion.div>
        </div>
      </motion.section>

      {/* Planning Section */}
      <motion.section
        className="py-24 px-6 bg-gradient-to-b from-white to-gray-50"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold !text-gray-900 mb-6">
              Craft Your Uganda Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From gorilla encounters to waterfall adventures, we'll design your perfect itinerary
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                duration: "5-7 Days",
                title: "Gorilla & Chimp Focus",
                features: ["Bwindi gorilla tracking", "Kibale chimpanzees", "Entebbe & Kampala"],
              },
              {
                duration: "8-12 Days",
                title: "Complete Circuit",
                features: ["All primate parks", "Queen Elizabeth NP", "Murchison Falls", "Kazinga Channel"],
              },
              {
                duration: "14+ Days",
                title: "Grand Uganda",
                features: ["Full wildlife circuit", "Rwenzori trekking", "Nile adventures", "Cultural immersion"],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="text-[#D4AF37] text-sm uppercase tracking-wider font-bold mb-2">
                  {plan.duration}
                </div>
                <h3 className="text-2xl font-bold !text-gray-900 mb-6">{plan.title}</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-[#7BA428] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/enquire"
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#7BA428] to-[#2D5016] text-white font-bold rounded-full hover:shadow-2xl transition-all text-xl"
            >
              Start Planning Your Adventure <ChevronRight size={26} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="py-24 px-6 bg-gradient-to-br from-gray-900 via-[#2D5016] to-gray-900 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Your Uganda Story Begins Now
            </h2>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              The gorillas are waiting. The falls are calling. The adventure is yours.
            </p>
            <Link
              to="/enquire"
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#D4AF37] text-gray-900 font-bold rounded-full hover:bg-white transition-all shadow-2xl text-xl"
            >
              Make It Real <ChevronRight size={28} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}