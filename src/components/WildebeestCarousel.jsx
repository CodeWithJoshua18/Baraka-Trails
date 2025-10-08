import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const wildebeestSlides = [
  { image: "/images/wildebeest1.jpg", caption: "The Great Migration – a timeless spectacle of survival and endurance." },
  { image: "/images/wildebeest2.jpg", caption: "Rivers crossed, horizons chased – witness Africa’s heartbeat." },
  { image: "/images/wildebeest3.jpg", caption: "Thousands moving as one across endless plains." },
];

const WildebeestCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % wildebeestSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2
          className="text-3xl font-bold mb-6 text-center drop-shadow-sm"
          style={{ color: "#000" }}
        >
          The Great Migration
        </h2>
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <motion.div
            key={current}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <img
              src={wildebeestSlides[current].image}
              alt="Wildebeest Migration"
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
            <p className="mt-4 text-center" style={{ color: "#000" }}>
              {wildebeestSlides[current].caption}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WildebeestCarousel;
