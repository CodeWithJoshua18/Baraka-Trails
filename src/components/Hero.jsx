import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

const slides = [
  {
    title: "Climb Kilimanjaro",
    desc: "Reach the roof of Africa with guided tours.",
    href: "#climbing",
    img: "/images/8.jpg",
  },
  {
    title: "Safari Adventures",
    desc: "Experience the wild like never before.",
    href: "#safari",
    img: "/images/7.jpg",
  },
  {
    title: "Discover Destinations",
    desc: "Breathtaking locations curated for you.",
    href: "#destinations",
    img: "/images/9.jpg",
  },
];

const Hero = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const intervalRef = useRef(null);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.img;
    });
  }, []);

  // Safe interval for carousel (prevents re-renders affecting other components)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover transition-all duration-700"
        style={{ backgroundImage: `url(${slides[carouselIndex].img})` }}
      />
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#D4AF37] leading-tight">
              {slides[carouselIndex].title}
            </h1>
            <p className="text-md sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {slides[carouselIndex].desc}
            </p>
            <a
              href={slides[carouselIndex].href}
              className="inline-block px-6 py-3 mt-4 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;

