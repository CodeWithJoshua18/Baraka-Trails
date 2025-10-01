import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const slides = [
  {
    img: 'public/images/2.jpg',
    title: 'Safari Adventures',
    desc: 'Experience the wild like never before with our curated safari trips.',
    href: '#safari',
  },
  {
    img: 'public/images/3.jpg',
    title: 'Mountain Expeditions',
    desc: 'Conquer Africa’s tallest peaks safely with expert guides.',
    href: '#climbing',
  },
  {
    img: 'public/images/4.jpg',
    title: 'Hidden Destinations',
    desc: 'Discover breathtaking locations off the beaten path.',
    href: '#destinations',
  },
  {
    img: 'public/images/5.jpg',
    title: 'Luxury Getaways',
    desc: 'Relax and unwind at premium resorts with amazing views.',
    href: '#offers',
  },
];

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full py-20 bg-[#F9F5F0]">
      <div className="container mx-auto px-6 md:px-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#D4AF37]">
            Explore Our Adventures
          </h2>
          <p className="text-lg md:text-xl text-[#3E2F1C] mt-4">
            At Baraka Trails, we craft unforgettable journeys that bring you closer to Africa’s wild heart. 
            From thrilling safaris to majestic mountains, every adventure is curated to spark wonder, 
            connect with nature, and create memories that last a lifetime.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={slides[index].img}
              alt={`Slide ${index + 1}`}
              loading="lazy"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Overlay Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index + '-overlay'}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white bg-black/30"
            >
              <h3 className="text-2xl md:text-4xl font-extrabold text-[#D4AF37]">
                {slides[index].title}
              </h3>
              <p className="mt-2 md:mt-4 text-md md:text-lg font-semibold text-white/90 max-w-xl">
                {slides[index].desc}
              </p>
              <Button
                className="mt-4 bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C] w-max font-bold"
                onClick={() => window.location.href = slides[index].href}
              >
                Learn More
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Blended with Background */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors z-20 md:bg-[#D4AF37]/80 md:text-[#3E2F1C]"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors z-20 md:bg-[#D4AF37]/80 md:text-[#3E2F1C]"
          >
            ›
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index ? 'bg-[#D4AF37]' : 'bg-white/50 hover:bg-[#D4AF37]/80'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
