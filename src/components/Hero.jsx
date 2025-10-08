import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { title: "Climb Kilimanjaro", desc: "Reach the roof of Africa with guided tours.", href: "#climbing", img: "/images/8.jpg", imgMobile: "/images/8-small.jpg" },
  { title: "Safari Adventures", desc: "Experience the wild like never before.", href: "#safari", img: "/images/7.jpg", imgMobile: "/images/7-small.jpg" },
  { title: "Discover Destinations", desc: "Breathtaking locations curated for you.", href: "#destinations", img: "/images/9.jpg", imgMobile: "/images/9-small.jpg" },
];

const Hero = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [dragDirection, setDragDirection] = useState(0);
  const intervalRef = useRef(null);

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
      img.src = isMobile ? (slide.imgMobile || slide.img) : slide.img;
    });
  }, [isMobile]);

  // Autoplay only on desktop
  useEffect(() => {
    if (!isMobile) {
      intervalRef.current = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(intervalRef.current);
    }
  }, [isMobile]);

  // Hide swipe hint after first interaction
  useEffect(() => {
    if (isMobile && carouselIndex > 0) {
      setShowSwipeHint(false);
    }
  }, [carouselIndex, isMobile]);

  // Hide hint on first touch
  useEffect(() => {
    if (isMobile) {
      const handleTouch = () => setShowSwipeHint(false);
      window.addEventListener("touchstart", handleTouch, { once: true });
      return () => window.removeEventListener("touchstart", handleTouch);
    }
  }, [isMobile]);

  const handleSwipe = (direction) => {
    if (direction === "left") setCarouselIndex(prev => (prev + 1) % slides.length);
    if (direction === "right") setCarouselIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: isMobile ? (direction > 0 ? 300 : -300) : 0,
      opacity: isMobile ? 1 : 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: isMobile ? (direction < 0 ? 300 : -300) : 0,
      opacity: isMobile ? 1 : 0,
    }),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={dragDirection} mode="wait">
        <motion.div
          key={carouselIndex}
          custom={dragDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: isMobile ? 0.2 : 0.8 },
          }}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={(event, info) => {
            const swipeThreshold = 50;
            if (info.offset.x < -swipeThreshold) {
              setDragDirection(1);
              handleSwipe("left");
            } else if (info.offset.x > swipeThreshold) {
              setDragDirection(-1);
              handleSwipe("right");
            }
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white"
          style={{ cursor: isMobile ? "grab" : "default" }}
        >
          <motion.img
            src={isMobile ? (slides[carouselIndex].imgMobile || slides[carouselIndex].img) : slides[carouselIndex].img}
            alt={slides[carouselIndex].title}
            className="absolute inset-0 w-full h-full object-cover select-none"
            draggable={false}
            loading={carouselIndex === 0 ? "eager" : "lazy"}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10 space-y-4 max-w-2xl px-6 md:px-20 pointer-events-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#D4AF37] leading-tight drop-shadow-lg">
              {slides[carouselIndex].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 drop-shadow-md">
              {slides[carouselIndex].desc}
            </p>
            <a
              href={slides[carouselIndex].href}
              className="inline-block px-8 py-3 mt-6 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-lg hover:bg-[#C49E2C] transition-all hover:scale-105 shadow-lg"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Positioned better on mobile */}
      <button
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 md:p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all active:scale-95"
        onClick={() => {
          setDragDirection(-1);
          handleSwipe("right");
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 md:p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all active:scale-95"
        onClick={() => {
          setDragDirection(1);
          handleSwipe("left");
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Swipe Hint - Mobile Only */}
      <AnimatePresence>
        {isMobile && showSwipeHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <motion.div
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white/80 text-sm font-medium"
            >
              
              ← Swipe →
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDragDirection(index > carouselIndex ? 1 : -1);
              setCarouselIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === carouselIndex
                ? "w-8 bg-[#D4AF37]"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;