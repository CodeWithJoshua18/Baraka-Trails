
import React from "react";
import { motion } from "framer-motion";

const IntroParagraph = () => {
  return (
    <motion.div
      className="w-full bg-white px-6 py-10 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-lg md:text-xl" style={{ color: "#000" }}>
          Travel is more than just visiting places — it’s about creating stories, sharing moments,
          and making a lasting impact. From the towering heights of Mount Kilimanjaro to the endless
          plains of the Serengeti, the turquoise waters of Zanzibar, and the majestic gorillas of Uganda,
          we craft journeys that inspire, empower, and transform.
        </p>
      </div>
    </motion.div>
  );
};

export default IntroParagraph;