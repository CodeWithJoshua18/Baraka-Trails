import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { title: "Climb Kilimanjaro", desc: "Reach the roof of Africa with guided tours.", href: "#climbing", img: "/images/8.jpg" },
  { title: "Safari Adventures", desc: "Experience the wild like never before.", href: "#safari", img: "/images/7.jpg" },
  { title: "Discover Destinations", desc: "Breathtaking locations curated for you.", href: "#destinations", img: "/images/9.jpg" },
];

const Hero = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const intervalRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Preload images
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.img;
    });
  }, []);

  // Automatic slide for large screens only
  useEffect(() => {
    if (!isMobile) {
      intervalRef.current = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(intervalRef.current);
    }
  }, [isMobile]);

  // Swipe handler
  const handleSwipe = (direction) => {
    if (direction === "left") setCarouselIndex(prev => (prev + 1) % slides.length);
    if (direction === "right") setCarouselIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <motion.div
        key={carouselIndex}
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url(${slides[carouselIndex].img})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        drag={isMobile ? "x" : false}          // Enable drag on mobile only
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.x < -50) handleSwipe("left");
          else if (info.offset.x > 50) handleSwipe("right");
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, x: !isMobile ? 50 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: !isMobile ? -50 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#D4AF37] leading-tight">
              {slides[carouselIndex].title}
            </h1>
            <p className="text-md sm:text-lg md:text-xl text-white/90">
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

        {/* Chevrons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
          onClick={() => handleSwipe("right")}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
          onClick={() => handleSwipe("left")}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
