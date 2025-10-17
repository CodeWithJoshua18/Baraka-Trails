import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Explore the Heights",
    desc: "Climb Kilimanjaro with expert guides and unmatched local insight.",
    btn: "Start Your Ascent",
    href: "#climbing",
  },
  {
    title: "Journey Through the Wild",
    desc: "Embark on immersive safaris across Africa's legendary landscapes.",
    btn: "Plan Your Safari",
    href: "#safari",
  },
  {
    title: "Discover Hidden Destinations",
    desc: "From serene lakes to cultural villages — your next story awaits.",
    btn: "View Destinations",
    href: "#destinations",
  },
  {
    title: "Baraka Trails Experience",
    desc: "Luxury, authenticity, and adventure — crafted for every traveler.",
    btn: "Learn More",
    href: "#about",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle responsive layout with debounce
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 300);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Auto slide change
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Touch swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left
        setIndex((prev) => (prev + 1) % slides.length);
      } else {
        // Swiped right
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/3.jpg')`,
      }}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-0"></div>

      <div className="relative z-[1] flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#D4AF37] leading-tight drop-shadow-2xl">
              {slides[index].title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              {slides[index].desc}
            </p>

            {/* ✅ Fixed <a> tag */}
            <a
              href={slides[index].href}
              className="inline-block px-8 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-lg hover:bg-[#C49E2C] transition-all shadow-lg"
            >
              {slides[index].btn}
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="absolute bottom-10 flex justify-center gap-3 z-[1]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-[#D4AF37] scale-110" : "bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);