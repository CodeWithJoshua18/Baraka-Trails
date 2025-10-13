// src/pages/About.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function About() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const team = [
    {
      name: "John Mushi",
      role: "Lead Guide",
      img: "/images/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg",
      desc: "John is a seasoned mountain expert with over 12 years of guiding experience on Kilimanjaro. He ensures every climb is both safe and memorable.",
    },
    {
      name: "Sarah Nyerere",
      role: "Coordinator",
      img: "https://via.placeholder.com/400x400?text=Coordinator",
      desc: "Sarah handles all expedition logistics and client coordination, ensuring smooth communication and seamless preparation before and during climbs.",
    },
    {
      name: "David Mwita",
      role: "Mountain Porter",
      img: "https://via.placeholder.com/400x400?text=Mountain+Porter",
      desc: "David is one of our most trusted porters, known for his strength, reliability, and warm support that uplifts every climber's experience.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-inter">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/images/10.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-playfair !text-[#D4AF37] drop-shadow-lg">
            About Baraka Trails
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-100">
            Baraka Trails is a premier inbound travel company crafting personalized African adventures. 
            From safaris and mountain treks to luxury and mid-range stays, 
            we curate unique itineraries tailored to your interests — including special occasions like proposals, weddings, and anniversaries.
          </p>
        </motion.div>

        {/* Scroll Down Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-[#D4AF37] text-sm mb-2 font-medium">Scroll Down</span>
            <svg
              className="w-6 h-6 text-[#D4AF37]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Back to Home */}
      <div className="text-center mt-6">
        <Link
          to="/"
          className="px-6 py-2 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* --- MAIN CONTENT --- */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-16">
        {/* Tanzania Intro */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-playfair !text-[#D4AF37] mb-4">
            The Beauty of Tanzania
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Tanzania offers a unique blend of adventure and natural beauty, from the iconic safaris of the Serengeti
            and the breathtaking climb up Mount Kilimanjaro to the idyllic beaches of Zanzibar and the thrilling
            chimpanzee treks in Gombe and Mahale. Each destination provides its own set of unforgettable experiences,
            making Tanzania a top travel destination for nature and adventure enthusiasts.
          </p>
        </motion.div>

        {/* Guides Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-playfair !text-[#D4AF37] mb-4">
            Our Kilimanjaro Guides
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Baraka Trails takes pride in the expertise and professionalism of our Kilimanjaro guides. Each guide is
            fluent in English and has undergone extensive training in first aid, mountain rescue, and local flora and
            fauna knowledge. Their passion and deep understanding of the mountain make every climb educational and safe.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            All our guides are registered with Kilimanjaro National Park, meeting regulatory standards. Climbing
            Kilimanjaro without a guide is forbidden, and our team ensures your ascent is both safe and memorable.
          </p>
        </motion.div>

        {/* Meet Our Team */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-playfair !text-[#D4AF37] mb-2">Meet Our Team</h2>
          <p className="text-gray-600 mb-4">The faces behind every successful climb</p>
          <p className="text-sm text-gray-500 md:hidden">Tap a card to learn more</p>
          <p className="text-sm text-gray-500 hidden md:block">Hover over a card to learn more</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {team.map((member, index) => (
              <div
                key={index}
                className="relative group perspective-1000 cursor-pointer h-96"
                onClick={() =>
                  setFlippedIndex(flippedIndex === index ? null : index)
                }
                onMouseEnter={() => window.innerWidth >= 768 && setFlippedIndex(index)}
                onMouseLeave={() => window.innerWidth >= 768 && setFlippedIndex(null)}
              >
                <div
                  className={`relative w-full h-full transition-all duration-700 preserve-3d ${
                    flippedIndex === index ? "[transform:rotateY(180deg)]" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT */}
                  <div 
                    className="absolute inset-0 bg-gray-200 rounded-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 w-full text-center py-6 px-4">
                      <h3 className="text-2xl font-playfair text-[#D4AF37] mb-1">{member.name}</h3>
                      <p className="text-sm uppercase tracking-wider text-white/90 mb-2">{member.role}</p>
                      <p className="text-xs italic text-white/70">
                        {window.innerWidth < 768 ? "Tap" : "Hover"} to learn more
                      </p>
                    </div>
                  </div>

                  {/* BACK */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <h3 className="text-2xl font-playfair mb-3 text-black">{member.name}</h3>
                    <p className="text-sm uppercase tracking-wider mb-4 text-black/80">{member.role}</p>
                    <p className="text-base leading-relaxed text-center text-black">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Porters */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-playfair !text-[#D4AF37] mb-4">
            Our Porters (The Dream Team)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Baraka Trails porters play a crucial role in ensuring the success and safety of expeditions. Their duties
            include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
            <li>Carrying equipment and supplies, including tents, food, and climbers' gear.</li>
            <li>Setting up and packing camp at each stage of the trek.</li>
            <li>Assisting cooks and maintaining hygiene at campsites.</li>
            <li>Fetching and treating water for cooking and drinking.</li>
            <li>Offering support and motivation to climbers.</li>
            <li>Monitoring health and safety and alerting guides when needed.</li>
          </ul>
        </motion.div>

        {/* Tanzania Porters Association */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-playfair !text-[#D4AF37] mb-4">
            Tanzania Porters Association (TPA)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Baraka Trails is deeply committed to the ethical treatment and well-being of our porters. In alignment with
            the Tanzania Porters Association (TPA) and Kilimanjaro Guides Association (KGA) guidelines, we follow strict
            practices for fair working conditions:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
            <li>Adherence to TPA guidelines on wages, weight limits, and staffing ratios.</li>
            <li>Proper staffing to prevent overloading of porters.</li>
            <li>Provision of nutritious meals, quality tents, and proper trekking gear.</li>
            <li>Daily health checks and adequate rest for all staff.</li>
            <li>Evacuation protocol for any medical emergencies.</li>
          </ul>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair !text-[#D4AF37] mb-4">
            Our Mission
          </h2>
          <ul className="list-none text-gray-800 space-y-3 text-lg">
            <li>• Deliver safe, unforgettable Kilimanjaro climbs and safari adventures.</li>
            <li>• Ensure every member of our team is treated with dignity and respect.</li>
            <li>• Promote sustainable tourism that benefits clients and local communities.</li>
          </ul>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-black py-16 mt-12">
        <div className="absolute inset-0">
          <img
            src="/images/safari.jpg"
            alt="Baraka Trails Safari"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-6">
            Book any adventure you will choose
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Whether it's conquering Kilimanjaro, witnessing the Great Migration, or relaxing on Zanzibar's beaches —
            your journey of a lifetime begins here.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/destinations"
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors"
            >
              Explore Baraka Trails
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}