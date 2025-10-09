// src/pages/Safari.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";

export default function Safari() {
  const [openIndex, setOpenIndex] = useState(null);
  const [openQuick, setOpenQuick] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [carouselIndexes, setCarouselIndexes] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  const toggleQuick = (index) => setOpenQuick(openQuick === index ? null : index);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "🌦️ December – March",
      content: `December – January (Short Rains Ending): Light, short rains taper off, leaving the landscape lush and green — ideal for photography. 
January – March (Green Season / Calving Season in Serengeti): Over 500,000 wildebeest calves are born within weeks, attracting predators like lions and cheetahs.
Temperature: 25–30°C daytime, cooler nights. 
Rainfall: brief, localized showers. 
Experience: Lush scenery, fewer tourists, dramatic skies — perfect for immersive photography.`,
    },
    {
      title: "🦓 April – June",
      content: `Brief but heavy showers occur, usually lasting a few hours. April and May bring solitude and discounted lodges. Wildlife gathers in green landscapes perfect for photographers.
Temperature: Day 25–30°C, nights 15–18°C. June mornings cooler (10–15°C in higher areas).
Experience: Peaceful parks, vivid greenery, and a more intimate safari setting.`,
    },
    {
      title: "📸 July – November",
      content: `Dry season offers excellent visibility, dramatic action near waterholes, and golden light for photography. 
Peak wildlife activity, fewer mosquitoes, and lower malaria risk. 
However, it's peak season — expect higher accommodation rates and some dryness late in the season.`,
    },
  ];

  const safariPackages = [
    {
      title: "Tarangire, Manyara and Ngorongoro crater (3-day safari)",
      desc: "Explore the iconic parks and witness Tanzania's incredible wildlife up close. Perfect for first-time safari adventurers.",
      images: ["/images/tarangire.jpg", "/images/manyara.jpg", "/images/crater.jpg"],
      price: "$1,140",
    },
    
    {
      title: "Tarangire, Ngorongoro & More Adventures in Serengeti (5-day safari)",
      desc: "Extended safari exploring Serengeti plains along with Tarangire and Ngorongoro highlights.",
      images: ["/images/ngororo2.jpg", "/images/serengeti2.jpg"],
      price: "$2,250",
    },
    {
      title: "Tarangire, Ngorongoro & Migration Watching in Serengeti (6-day safari)",
      desc: "Witness the Great Migration and predators in action. Inclusive flight from Serengeti to Arusha/JRO.",
      images: ["/images/4.jpg", "/images/5.jpg"],
      price: "$3,280",
    },
    {
      title: "Ndutu – The Heart of the Southern Serengeti (10-day safari)",
      desc: "Deep safari exploration in Southern Serengeti. All-inclusive package with luxury accommodations.",
      images: ["/images/ndutu1.jpg", "/images/ndutu2.jpeg", "/images/ndutu3.jpg"],
      price: "$4,210",
    },
    {
      title: "Bush2Beach & Cultural Tour (15-day safari)",
      desc: "Ultimate Tanzania adventure combining wildlife, culture, and relaxation. All-inclusive experience.",
      images: ["/images/bush2beach.jpg", "/images/tour.jpg"],
      price: "$6,420",
    },
  ];

  const quickLinks = [
    { title: "Quick Safari", desc: "Includes dropdown with images and descriptions for select safari options." },
    { title: "Safari Packing List", desc: "Tips and essentials to carry for your safari adventure." },
    { title: "Safari Accommodations", desc: "Discover the best lodges and camps for comfort and style." },
    { title: "Coffee Tour", desc: "Experience local coffee farms and tastings." },
    { title: "Kikuletwa Tour", desc: "Explore Kikuletwa hot springs and surrounding landscapes." },
    { title: "Tanzanite Tour", desc: "Learn about Tanzania's famous gemstone and visit mines." },
  ];

  const titleOffset = isMobile ? 0 : scrollY * 0.15;
  const subtitleOffset = isMobile ? 0 : scrollY * 0.1;

  // Preload all carousel images
  useEffect(() => {
    safariPackages.forEach((pkg) => {
      pkg.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  // Automated Carousel (slow and smooth)
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndexes((prev) => {
        const updated = {};
        safariPackages.forEach((pkg, idx) => {
          const current = prev[idx] || 0;
          updated[idx] = (current + 1) % pkg.images.length;
        });
        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-black bg-[#FAF7F2] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center overflow-hidden"
        style={{ backgroundImage: "url('/images/7.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          style={{ y: -titleOffset }}
          initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: isMobile ? 0.6 : 1,
            ease: "easeOut",
            delay: 0.5
          }}
          className="relative z-10 px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Tanzania Safari Experience
          </h1>
        </motion.div>
        <motion.p
          style={{ y: -subtitleOffset }}
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: isMobile ? 0.5 : 0.8,
            delay: isMobile ? 0.7 : 0.8,
            ease: "easeOut"
          }}
          className="relative z-10 mt-4 text-lg md:text-xl italic text-[#D4AF37]"
        >
          Where wilderness meets wonder
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            y: [0, 10, 0], 
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: isMobile ? 1 : 1.5
          }}
          className="absolute bottom-20 text-white flex flex-col items-center space-y-1"
        >
          <ArrowDown className="w-6 h-6 animate-bounce text-[#D4AF37]" />
          <span className="text-sm text-[#D4AF37] font-semibold">Scroll Down</span>
        </motion.div>
      </section>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="px-6 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors shadow-md"
        >
          Back to Home
        </Link>
      </div>

      {/* Content Sections */}
      <section
        className="relative py-20 mt-12 px-6 md:px-20 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/serengeti2.jpg')",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 w-full max-w-4xl space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-3xl shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold !text-black mb-4">
              Tanzania Safari Highlights
            </h2>
            <p className="!text-black text-lg md:text-xl leading-relaxed">
              Tanzania safari is one of the most thrilling adventures in the world.
              From the endless plains of the Serengeti to the iconic Ngorongoro Crater,
              Tanzania offers unmatched wildlife viewing, cultural experiences, and breathtaking landscapes.
              We design tailor-made itineraries that combine luxury, comfort, and adventure,
              ensuring every journey is unforgettable.
            </p>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold !text-amber-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            BEST TIME FOR TANZANIA SAFARI
          </motion.h2>

          <div className="space-y-4 w-full">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl overflow-hidden shadow-md"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left px-6 py-4 text-lg font-semibold !text-black hover:bg-white/30 transition"
                >
                  <span>{section.title}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-6 !text-black text-base md:text-lg leading-relaxed">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Packages with Optimized Mobile Animation */}
      <section className="py-20 px-6 md:px-20 bg-[#F5F3F0]">
        <h2 className="text-3xl md:text-4xl font-bold !text-black text-center mb-12">
          Safari Packages & Prices
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {safariPackages.map((pkg, index) => {
            const currentIndex = carouselIndexes[index] || 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut"
                }}
                viewport={{ 
                  once: true,
                  margin: "-50px",
                  amount: 0.2
                }}
                className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                  {/* Render all images, control visibility with opacity */}
                  {pkg.images.map((img, imgIndex) => (
                    <motion.img
                      key={imgIndex}
                      src={img}
                      alt={`${pkg.title} - Image ${imgIndex + 1}`}
                      animate={{ 
                        opacity: currentIndex === imgIndex ? 1 : 0 
                      }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="w-full h-48 object-cover absolute top-0 left-0"
                      loading="eager"
                      style={{ 
                        willChange: 'opacity',
                        pointerEvents: currentIndex === imgIndex ? 'auto' : 'none'
                      }}
                    />
                  ))}

                  {/* Dots */}
                  <div className="absolute bottom-2 w-full flex justify-center space-x-2 z-10">
                    {pkg.images.map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentIndex === dotIndex ? "bg-[#D4AF37]" : "bg-white/50"
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold !text-black">{pkg.title}</h3>
                  <p className="mt-2 !text-black">{pkg.desc}</p>
                  <p className="mt-4 font-semibold !text-black">{pkg.price}</p>
                  <div className="mt-4 flex gap-3 flex-wrap">
                    <Link
                      to="/book"
                      className="px-4 py-2 bg-[#D4AF37] !text-black font-semibold rounded-md hover:bg-[#C49E2C] transition"
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/enquire"
                      className="px-4 py-2 bg-[#3E2F1C] !text-white font-semibold rounded-md hover:bg-[#5A4B3A] transition"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick Links Collapsibles */}
      <section className="py-20 px-6 md:px-20 bg-[#EFEFEF]">
        <h2 className="text-3xl md:text-4xl font-bold !text-black text-center mb-12">
          Quick Links
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl overflow-hidden shadow-md"
            >
              <button
                onClick={() => toggleQuick(index)}
                className="w-full flex justify-between items-center text-left px-6 py-4 text-lg font-semibold !text-black hover:bg-white/30 transition"
              >
                <span>{link.title}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openQuick === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openQuick === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-6 !text-black text-base md:text-lg leading-relaxed">
                      {link.desc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}