import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Camera, Mountain, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";


const destinations = [
  {
    name: "Serengeti National Park",
    tagline: "The Endless Plains of Wonder",
    description:
      "Step into the Serengeti, where time slows and nature takes center stage. Witness the endless golden plains that host the Great Migration — millions of wildebeest and zebra crossing in a timeless dance of life and survival. From sunrise safaris filled with lion roars to tranquil sunsets over the acacia trees, Serengeti is not just a destination — it's a feeling that stays with you forever.",
    image: "/images/serengeti3.jpg",
    highlights: [
      "Great Migration (June–Oct)",
      "Golden savannah landscapes",
      "Predator-rich ecosystem",
      "Luxury lodges under starlit skies",
    ],
    reverse: false,
  },
  {
    name: "Ngorongoro Crater",
    tagline: "Africa's Garden of Eden",
    description:
      "Descend into the Ngorongoro Crater — a UNESCO World Heritage Site and home to one of the densest concentrations of wildlife on Earth. Here, the Big Five roam freely within the world's largest intact volcanic caldera. The experience feels almost sacred: mist-covered mornings, shimmering crater lakes, and moments where time seems to stand still.",
    image: "/images/crater.jpg",
    highlights: [
      "Home of the Big Five",
      "Crater floor safaris",
      "Breathtaking viewpoints",
      "Cultural tours with the Maasai",
    ],
    reverse: true,
  },
  {
    name: "Tarangire & Lake Manyara",
    tagline: "Where Giants Roam and Flamingos Dance",
    description:
      "Tarangire's ancient baobab trees and elephant herds define its wild charm, while Lake Manyara dazzles with pink flamingos and tree-climbing lions. Together, they offer an unforgettable contrast — earthy wilderness and tranquil waters — making them ideal for immersive safaris rich in color and diversity.",
    image: "/images/tarangire2.jpeg",
    highlights: [
      "Massive elephant herds",
      "Flamingos of Lake Manyara",
      "Tree-climbing lions",
      "Baobab-studded landscapes",
    ],
    reverse: false,
  },
  {
    name: "Zanzibar",
    tagline: "The Spice Island Escape",
    description:
      "A mosaic of turquoise seas, white sands, and fragrant spice plantations, Zanzibar is the crown jewel of Tanzania's coast. Lose yourself in the rhythm of island life — wander through Stone Town's historic alleys, sail on a traditional dhow at sunset, or simply let the ocean winds carry your thoughts away.",
    image: "/images/zanzibar.jpg",
    highlights: [
      "Pristine white-sand beaches",
      "Stone Town heritage tours",
      "Spice plantation experiences",
      "Sunset dhow cruises",
    ],
    reverse: true,
  },
  {
    name: "Mahale Mountains National Park",
    tagline: "Whispers of the Wild on Lake Tanganyika",
    description:
      "Hidden on the shores of Lake Tanganyika, Mahale Mountains offers a rare connection with nature. Trek through lush rainforest to meet wild chimpanzees in their natural habitat, and unwind on secluded beaches. Few places on Earth feel this untouched — it's where wilderness and peace coexist in perfect harmony.",
    image: "/images/gorilla.jpg",
    highlights: [
      "Chimpanzee tracking",
      "Lake Tanganyika boat safaris",
      "Remote, pristine wilderness",
      "Mountain and forest hikes",
    ],
    reverse: false,
  },
];

const ngorongoroCarousel = [
  "/images/ngororo2.jpeg",
  "/images/crater.jpg",
  "/images/ngorongoro3.jpg",
  "/images/ngorongoro4.jpg",
];

const tarangireCarousel = [
  "/images/tarangire.jpg",
  "/images/manyara.jpg",
  "/images/tour.jpg",
  "/images/tarangire3.jpeg",
];

/* Animation presets (subtle & elegant) */
const sectionVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const heroTextVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 } },
};

export default function Tanzania() {
  // For crossfade carousels we use two layers and swap sources to avoid gaps
  const craterRef = useRef(null);
  const tarangireRef = useRef(null);

  const [craterActive, setCraterActive] = useState(0); // index of current image
  const [craterLayer, setCraterLayer] = useState(0); // 0 or 1 -> which img layer is visible
  const [tarActive, setTarActive] = useState(0);
  const [tarLayer, setTarLayer] = useState(0);

  // Preload carousel images to avoid flash
  useEffect(() => {
    [...ngorongoroCarousel, ...tarangireCarousel].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Separate carousel intervals for each destination
  useEffect(() => {
    const craterInterval = setInterval(() => {
      setCraterActive((prev) => {
        const nextIndex = (prev + 1) % ngorongoroCarousel.length;
        setCraterLayer((currentLayer) => 1 - currentLayer);
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(craterInterval);
  }, []);

  useEffect(() => {
    const tarInterval = setInterval(() => {
      setTarActive((prev) => {
        const nextIndex = (prev + 1) % tarangireCarousel.length;
        setTarLayer((currentLayer) => 1 - currentLayer);
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(tarInterval);
  }, []);

  /* small helper to render destination image area (we keep logic for carousels) */
  const DestinationImage = ({ dest }) => {
    if (dest.name.includes("Ngorongoro")) {
      return (
        <div
          ref={craterRef}
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          style={{ minHeight: 400 }}
        >
          {/* Layer 0 */}
          <img
            className="carousel-layer absolute inset-0 w-full h-[400px] object-cover transition-opacity duration-700 ease-in-out"
            src={ngorongoroCarousel[craterActive]}
            alt="Ngorongoro"
            style={{ opacity: craterLayer === 0 ? 1 : 0 }}
            draggable={false}
          />
          {/* Layer 1 */}
          <img
            className="carousel-layer absolute inset-0 w-full h-[400px] object-cover transition-opacity duration-700 ease-in-out"
            src={ngorongoroCarousel[(craterActive + 1) % ngorongoroCarousel.length]}
            alt="Ngorongoro alt"
            style={{ opacity: craterLayer === 1 ? 1 : 0 }}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
            <MapPin className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-2xl font-bold">{dest.name}</span>
          </div>
        </div>
      );
    }

    if (dest.name.includes("Tarangire")) {
      return (
        <div
          ref={tarangireRef}
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          style={{ minHeight: 400 }}
        >
          {/* Layer 0 */}
          <img
            className="carousel-layer absolute inset-0 w-full h-[400px] object-cover transition-opacity duration-700 ease-in-out"
            src={tarangireCarousel[tarActive]}
            alt="Tarangire"
            style={{ opacity: tarLayer === 0 ? 1 : 0 }}
            draggable={false}
          />
          {/* Layer 1 */}
          <img
            className="carousel-layer absolute inset-0 w-full h-[400px] object-cover transition-opacity duration-700 ease-in-out"
            src={tarangireCarousel[(tarActive + 1) % tarangireCarousel.length]}
            alt="Manyara"
            style={{ opacity: tarLayer === 1 ? 1 : 0 }}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
            <MapPin className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-2xl font-bold">Tarangire & Manyara</span>
          </div>
        </div>
      );
    }

    // default static image with subtle hover zoom
    return (
      <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
          <MapPin className="w-6 h-6 text-[#D4AF37]" />
          <span className="text-2xl font-bold">{dest.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar with subtle fade-in */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Navbar />
      </motion.div>

      {/* Hero */}
      <header
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/serengeti2.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <motion.div
          className="relative z-10 text-center max-w-4xl px-6"
          initial="hidden"
          animate="visible"
          variants={heroTextVariant}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            Tanzania Safari Dreams
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.25 }}>
            Where time stands still and nature tells stories older than the stars.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.35 }}>
            <Link
              to="/enquire"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#3E2F1C] font-bold rounded-full hover:bg-white transition-all shadow-xl text-lg"
            >
              Begin Your Journey <ChevronRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </header>

      {/* Intro / Why Tanzania */}
      <motion.section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold !text-[#3E2F1C] mb-6">Why Tanzania? Why Baraka Trails?</h2>
          <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-10"></div>

          <p className="text-lg md:text-xl !text-[#5A4B3A] leading-relaxed mb-8">
            Tanzania whispers rather than shouts — a journey of quiet awe and untamed grace.{" "}
            <span className="font-semibold text-[#D4AF37]">From the Serengeti to Zanzibar,</span> every horizon is a memory waiting to unfold.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Mountain className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold !text-[#3E2F1C] mb-3">Epic Landscapes</h3>
              <p className="text-[#5A4B3A]">From volcanic craters to turquoise seas, Tanzania's geography feels like nature's grandest art gallery.</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Camera className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold !text-[#3E2F1C] mb-3">Moments in Stillness</h3>
              <p className="text-[#5A4B3A]">Every sunrise invites reflection, every encounter humbles. The rhythm of life beats quietly yet deeply here.</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold !text-[#3E2F1C] mb-3">Crafted with Soul</h3>
              <p className="text-[#5A4B3A]">Our local guides ensure every moment resonates — connecting you not just to wildlife, but to the heart of Tanzania.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Cinematic Scroll / Moments */}
      <motion.section
        className="relative py-28 bg-fixed bg-center bg-cover text-white"
        style={{ backgroundImage: "url('/images/crater.jpg')" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">Moments That Stay With You</h2>
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            A lion's gaze at dawn. The hush of a crater before sunrise. The whisper of waves in Zanzibar. These are not just memories — they are the rhythm of a place that calls you back long after you've left.
          </p>
        </div>
      </motion.section>

      {/* Destinations */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 className="text-4xl md:text-5xl font-bold !text-[#3E2F1C] mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              Discover Tanzania's Soul
            </motion.h2>
            <motion.p className="text-lg text-[#5A4B3A] max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
              A land where wilderness meets wonder and every landscape feels alive with stories untold.
            </motion.p>
          </div>

          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${dest.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 mb-24 items-center`}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="md:w-1/2">
                <DestinationImage dest={dest} />
              </div>

              <div className="md:w-1/2">
                <h3 className="text-3xl md:text-4xl font-bold !text-[#D4AF37] mb-3">{dest.name}</h3>
                <p className="text-xl italic text-[#5A4B3A] mb-6">{dest.tagline}</p>
                <p className="text-lg text-[#5A4B3A] leading-relaxed mb-6">{dest.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {dest.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                      <span className="text-[#5A4B3A]">{highlight}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/enquire"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#3E2F1C] text-white font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#3E2F1C] transition-all"
                >
                  Plan Your Visit <ChevronRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Traveler's Note + Did You Know */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold !text-[#3E2F1C] mb-4">Traveler's Note</h3>
              <p className="text-[#5A4B3A] italic">
                "We arrived before dawn and watched as the plains slowly came to life — it felt like visiting another world. The quiet moments here become the loudest memories." — <span className="font-semibold">Asha, Kenya</span>
              </p>
            </div>
          </motion.div>

          <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-bold !text-[#3E2F1C] mb-2">Did you know?</h4>
              <p className="text-[#5A4B3A]">
                Ngorongoro Crater hosts more than 25,000 large animals and is one of the few places where wildlife density can rival that of the Serengeti — all within a single volcanic caldera.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-bold !text-[#3E2F1C] mb-2">Local insight</h4>
              <p className="text-[#5A4B3A]">
                Visiting in the shoulder seasons (May–June or Nov–Dec) often means fewer crowds, dramatic skies, and excellent photography light — an ideal choice for travelers seeking serenity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Highlights / Planner CTA */}
      <motion.section className="py-20 px-6 bg-[#FAF7F2]" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold !text-[#3E2F1C] mb-6">Craft Your Own Journey</h2>
          <p className="text-lg md:text-xl text-[#5A4B3A] mb-10 leading-relaxed">
            Trace your path — from the Serengeti's endless plains to Zanzibar's blue horizon. Our travel specialists will help weave your dreams into a bespoke journey.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.img src="/images/tanzania-map.jpg" alt="Tanzania map" className="w-72 md:w-96 rounded-2xl shadow-xl" whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} draggable={false} />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                  <h4 className="font-semibold !text-[#3E2F1C]">3–7 days</h4>
                  <p className="text-sm text-[#5A4B3A]">Serengeti day trips & short exploration</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                  <h4 className="font-semibold !text-[#3E2F1C]">8–12 days</h4>
                  <p className="text-sm text-[#5A4B3A]">Serengeti + Ngorongoro + Tarangire</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                  <h4 className="font-semibold !text-[#3E2F1C]">12+ days</h4>
                  <p className="text-sm text-[#5A4B3A]">Full circuit + Zanzibar or Mahale</p>
                </div>
              </div>

              <Link to="/enquire" className="inline-flex items-center gap-3 px-8 py-3 bg-[#3E2F1C] text-white rounded-full font-bold hover:bg-[#D4AF37] hover:text-[#3E2F1C] transition-all shadow-lg">
                Start Planning <ChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Closing */}
      <motion.section className="py-20 px-6 bg-gradient-to-br from-[#3E2F1C] to-[#2A1F14] text-center" initial="hidden" whileInView="visible" variants={sectionVariant} viewport={{ once: true }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">Tanzania Awaits Your Spirit</h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">Some journeys change what you see. A journey through Tanzania changes how you see everything.</p>
          <Link to="/enquire" className="inline-flex items-center gap-2 px-10 py-5 bg-[#D4AF37] text-[#3E2F1C] font-bold rounded-full hover:bg-white transition-all shadow-2xl text-xl">
            Begin Your Journey <ChevronRight size={28} />
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}