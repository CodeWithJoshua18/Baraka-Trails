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
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  // Detect mobile screens
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.img;
    });
  }, []);

  // Carousel interval only on desktop
  useEffect(() => {
    if (!isMobile) {
      intervalRef.current = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isMobile]);

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover transition-all duration-700"
        style={{ backgroundImage: `url(${slides[carouselIndex].img})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="space-y-4 max-w-2xl mx-auto"
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) nextSlide();
              else if (info.offset.x > 50) prevSlide();
            }}
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

        {/* Chevrons for mobile navigation */}
        {isMobile && (
          <div className="absolute bottom-10 flex gap-6">
            <button onClick={prevSlide} className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button onClick={nextSlide} className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
