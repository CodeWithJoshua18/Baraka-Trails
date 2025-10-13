// src/pages/Safari.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";

export default function Safari() {
  const [openIndex, setOpenIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [carouselIndexes, setCarouselIndexes] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  // Detect mobile with debounce
  useEffect(() => {
    let timeout;
    const checkMobile = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "🌦️ December – March",
      content: `December – January (Short Rains Ending): Light rains leave the landscape lush — perfect for photography.
January – March (Green Season): Over 500,000 wildebeest calves are born, drawing predators.
Temperature: 25–30°C daytime, cooler nights.
Experience: Fewer tourists, dramatic skies, and lush views.`,
    },
    {
      title: "🦓 April – June",
      content: `Heavy showers bring peace and greenery. Ideal for solitude and discounted lodges.
Temperature: 25–30°C days, 15–18°C nights.
Experience: Vivid landscapes, tranquil parks, and amazing photo ops.`,
    },
    {
      title: "📸 July – November",
      content: `Dry season with best wildlife visibility and golden light.
Experience: Peak wildlife, perfect weather, but higher rates.`,
    },
  ];

  const safariPackages = [
    {
      title: "Tarangire, Manyara and Ngorongoro Crater (3-day safari)",
      desc: "Experience Tanzania's best parks up close — ideal for first-timers.",
      images: ["/images/tarangire.jpg", "/images/manyara.jpg", "/images/crater.jpg"],
      price: "$1,140",
    },
    {
      title: "Tarangire, Ngorongoro & Serengeti Adventure (5-day safari)",
      desc: "Extended safari exploring Tarangire, Ngorongoro, and the Serengeti plains.",
      images: ["/images/ngororo2.jpeg", "/images/serengeti2.jpg"],
      price: "$2,250",
    },
    {
      title: "Ngorongoro & Migration Watching in Serengeti (6-day safari)",
      desc: "Witness the Great Migration — includes flight from Serengeti to Arusha.",
      images: ["/images/4.jpg", "/images/5.jpg"],
      price: "$3,280",
    },
    {
      title: "Ndutu – The Heart of the Southern Serengeti (10-day safari)",
      desc: "In-depth exploration of Southern Serengeti. All-inclusive luxury safari.",
      images: ["/images/ndutu1.jpg", "/images/ndutu2.jpeg", "/images/ndutu3.jpg"],
      price: "$4,210",
    },
    {
      title: "Bush2Beach & Cultural Tour (15-day safari)",
      desc: "Experience wildlife, culture, and the coast — the complete Tanzanian journey.",
      images: ["/images/bush2beach.jpg", "/images/tour.jpg"],
      price: "$6,420",
    },
  ];

  const titleOffset = isMobile ? 0 : scrollY * 0.15;
  const subtitleOffset = isMobile ? 0 : scrollY * 0.1;

  // Preload carousel images
  useEffect(() => {
    safariPackages.forEach((pkg) => {
      pkg.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  // Auto carousel
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
      {/* HERO */}
      <section
        className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center overflow-hidden"
        style={{ backgroundImage: "url('/images/7.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <motion.div
          style={{ y: -titleOffset }}
          initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.6 : 1, ease: "easeOut", delay: 0.5 }}
          className="relative z-[1] px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Tanzania Safari Experience
          </h1>
        </motion.div>
        <motion.p
          style={{ y: -subtitleOffset }}
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.8, ease: "easeOut" }}
          className="relative z-[1] mt-4 text-lg md:text-xl italic text-[#D4AF37]"
        >
          Where wilderness meets wonder
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 text-white flex flex-col items-center space-y-1 z-[1]"
        >
          <ArrowDown className="w-6 h-6 animate-bounce text-[#D4AF37]" />
          <span className="text-sm text-[#D4AF37] font-semibold">Scroll Down</span>
        </motion.div>
      </section>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="px-6 py-2 bg-[#0f0f0f] text-[#e9e8e6] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors shadow-md"
        >
          Back to Home
        </Link>
      </div>

      {/* CONTENT - Optimized glassmorphism */}
      <section
        className="relative py-20 mt-12 px-6 md:px-20 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/serengeti2.jpg')",
          backgroundAttachment: "scroll", // Smooth on mobile
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-[1] w-full max-w-4xl space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-3xl shadow-xl"
            style={{ willChange: 'auto' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold !text-white mb-4 drop-shadow-lg">
              Tanzania Safari Highlights
            </h2>
            <p className="!text-white text-lg md:text-xl leading-relaxed drop-shadow-md">
              Tanzania offers unmatched wildlife viewing, rich culture, and breathtaking landscapes — all wrapped in the warmth of its people.
            </p>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold !text-amber-300 drop-shadow-lg"
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
                className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-xl"
                style={{ willChange: 'auto' }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left px-6 py-4 text-lg font-semibold !text-white hover:bg-white/30 transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-6 !text-white text-base md:text-lg leading-relaxed whitespace-pre-line">
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

      {/* PACKAGES - Glassmorphism cards */}
      <section className="py-20 px-6 md:px-20 bg-[#f5f2ed]">
        <h2 className="text-3xl !text-black md:text-4xl font-bold text-center mb-12">
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
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px", amount: 0.2 }}
                className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden shadow-xl"
                style={{ willChange: 'auto' }}
              >
                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                  {pkg.images.map((img, imgIndex) => (
                    <motion.img
                      key={imgIndex}
                      src={img}
                      alt={`${pkg.title} - Image ${imgIndex + 1}`}
                      animate={{ opacity: currentIndex === imgIndex ? 1 : 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="w-full h-48 object-cover absolute top-0 left-0"
                      loading="eager"
                    />
                  ))}
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
                <div className="p-6 text-left bg-white/80 backdrop-blur-sm">
                  <h3 className="text-xl font-bold !text-black">{pkg.title}</h3>
                  <p className="mt-2 !text-black">{pkg.desc}</p>
                  <p className="mt-4 font-semibold !text-black">{pkg.price}</p>
                  <div className="mt-4 flex gap-3 flex-wrap">
                    <Link
                      to="/book"
                      className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-[#C49E2C] transition"
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/enquire"
                      className="px-4 py-2 bg-[#3E2F1C] text-white font-semibold rounded-md hover:bg-[#5A4B3A] transition"
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

      {/* UPDATED QUICK LINKS */}
<section className="py-20 px-6 md:px-20 bg-[#EFEFEF]">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 !text-black">
    Quick Links
  </h2>

  <div className="space-y-10 max-w-5xl mx-auto">
    {/* Safari Packing List */}
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-md"
    >
      <h3 className="text-2xl font-bold mb-4 !text-[#3E2F1C]">
        Safari Packing List
      </h3>
      <p className="text-gray-800 leading-relaxed mb-4">
        Packing the right clothing for your Tanzania safari is essential for both comfort and safety. The African bush can be hot during the day, cool in the evenings, and dusty throughout. Choosing practical clothing ensures you enjoy your wildlife adventure to the fullest.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Recommended Safari Clothing
      </h4>

      <div className="space-y-4">
        <div>
          <h5 className="font-semibold text-lg !text-gray-900 mb-2">1. Colors to Wear</h5>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Option for neutral tones: khaki, beige, olive, and light brown</li>
            <li>Avoid bright colors (can attract insects) and dark blue/black (attracts tsetse flies)</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-lg !text-gray-900 mb-2">2. Daytime Outfits</h5>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Lightweight, breathable long-sleeve shirts for sun and insect protection</li>
            <li>Comfortable cotton or quick-dry trousers</li>
            <li>T-shirts for layering when cooler</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-lg !text-gray-900 mb-2">3. Evening & Early Morning</h5>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>A warm fleece or light jacket (mornings and evenings can be chilly)</li>
            <li>A scarf or buff to keep dust out</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-lg !text-gray-900 mb-2">4. Footwear</h5>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Sturdy closed-toe walking shoes or boots for game walks</li>
            <li>Comfortable sandals for relaxing at the lodge or camp</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-lg !text-gray-900 mb-2">5. Accessories</h5>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Wide-brimmed hat for sun protection</li>
            <li>Sunglasses with UV protection</li>
            <li>Lightweight rain jacket (especially if traveling during the green season)</li>
          </ul>
        </div>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Safari Essentials
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Binoculars for wildlife spotting</li>
        <li>Sunscreen & insect repellent</li>
        <li>Small daypack for water, camera, and personal items</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Final Tips
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Keep clothing light, practical, and layered</li>
        <li>Avoid overpacking – most lodges and camps offer laundry service</li>
        <li>Respect local culture by wearing modest clothing in towns and villages</li>
      </ul>

      <p className="text-gray-800 leading-relaxed mt-6 italic">
        At Baraka Trails, we provide not only exceptional safari experiences but also practical guidance on how to prepare for your journey. From packing advice to personalized itineraries, we make sure your Tanzania safari is comfortable and unforgettable.
      </p>
    </motion.div>

    {/* Safari Accommodations */}
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-md"
    >
      <h3 className="text-2xl font-bold mb-4 !text-[#3E2F1C]">
        Safari Accommodation Styles with Baraka Trails
      </h3>
      <p className="text-gray-800 leading-relaxed mb-6">
        From luxury lodges, tented camps, mid-range lodges, and budget camping for your Tanzania safari or Kilimanjaro adventure. Your accommodation is an essential part of your safari or trekking experience. Whether you're climbing Mount Kilimanjaro or exploring the Serengeti, Ngorongoro, Tarangire, or Mahale Mountains, we offer a range of safari accommodation styles to suit your comfort, budget, and travel style.
      </p>

      <div className="space-y-5">
        <div>
          <h4 className="text-xl font-semibold mb-2 !text-[#3E2F1C]">1. Luxury Lodges</h4>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Spacious rooms with en-suite bathrooms</li>
            <li>Fine dining and personalized service</li>
            <li>Has swimming pool in the park</li>
            <li>It has gym</li>
            <li>Stunning locations overlooking savannahs or crater views</li>
            <li>Perfect for honeymooners, families, or travelers seeking comfort and exclusivity</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2 !text-[#3E2F1C]">2. Tented Camps</h4>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Authentic safari experience in stylish, furnished tents</li>
            <li>En-suite bathrooms with hot showers</li>
            <li>Comfortable beds and private verandas</li>
            <li>Some has swimming pool</li>
            <li>Close to wildlife action while still offering modern comforts</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2 !text-[#3E2F1C]">3. Mid-Range Lodges</h4>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Comfortable lodges with good facilities at affordable rates</li>
            <li>Great value for couples, small groups, and families</li>
            <li>Ideal for travelers looking for a balance of comfort and price</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2 !text-[#3E2F1C]">4. Budget Camping</h4>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>Dome tents with sleeping mats and camping gear provided</li>
            <li>Nutritious meals prepared by our safari chefs</li>
            <li>Experience the wild under the African night sky</li>
            <li>Ideal for adventure seekers and budget-conscious travelers</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-2 !text-[#3E2F1C]">5. Kilimanjaro Mountain Camps</h4>
          <p className="text-gray-800 mb-2">During a Kilimanjaro climb, accommodation is in tented camps along the routes.</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
            <li>High-quality mountain tents provided by Baraka Trails</li>
            <li>Dining tents and hygienic facilities available</li>
            <li>Porters carry and set up camp each day</li>
          </ul>
        </div>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Why Choose Baraka Trails Accommodation?
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Handpicked lodges and camps for quality and safety</li>
        <li>Options to match luxury, mid-range, or budget preferences</li>
        <li>Focus on authentic Tanzanian hospitality</li>
        <li>Ethical and sustainable practices supporting local communities</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Book Your Safari with the Right Style
      </h4>
      <p className="text-gray-800 leading-relaxed">
        Whether you dream of sipping a glass of wine at a luxury lodge with a sparkling swimming pool as elephants gather at a nearby waterhole, or waking up to the breathtaking sounds of nature in the heart of the African wilderness, Tanzania makes it possible. From sleeping under canvas in an elegant tented camp to camping beneath the stars, Baraka Trails offers the perfect safari accommodation style for you.
      </p>
      <p className="text-gray-800 leading-relaxed mt-4 font-semibold">
        Start planning your Tanzania safari or Kilimanjaro climb today with Baraka Trails.
      </p>
    </motion.div>

    {/* Coffee Tour */}
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-md"
    >
      <h3 className="text-2xl font-bold mb-4 !text-[#3E2F1C]">Coffee Trip Tour</h3>
      <p className="text-gray-800 leading-relaxed mb-4">
        Tanzania is world-renowned for its rich, aromatic coffee — and with Baraka Trails, you can experience the journey from bean to cup. Our coffee tours in Moshi and Arusha take you into the heart of local farms where you'll learn traditional methods of cultivation, roasting, and brewing while connecting with the farmers who keep this tradition alive.
      </p>
      <p className="text-gray-800 leading-relaxed mb-6">
        This is the perfect cultural add-on to a Kilimanjaro climb or Tanzania safari.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Highlights of the Coffee Tour
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Visit local Chagga coffee farms at the base of Mount Kilimanjaro or in Arusha</li>
        <li>Participate in coffee harvesting, roasting, and grinding</li>
        <li>Learn how locals brew coffee over an open fire</li>
        <li>Explore the scenic foothills of Kilimanjaro or the lush Arusha highlands</li>
        <li>Connect with local farmers and enjoy traditional songs and stories</li>
        <li>Taste the freshest cup of Tanzanian coffee you'll ever experience</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Coffee Tour Itinerary (Half-Day Experience)
      </h4>
      <ol className="list-decimal list-inside text-gray-800 space-y-1 ml-2">
        <li>Morning pickup from your hotel in Moshi or Arusha</li>
        <li>Guided walk through local coffee plantations</li>
        <li>Introduction to traditional and modern coffee farming practices</li>
        <li>Participate in harvesting, roasting, and grinding beans</li>
        <li>Share a cup of freshly brewed organic coffee with the farmers</li>
        <li>Optional add-on: visit nearby Materuni Waterfall or combine with a Kilimanjaro day hike</li>
        <li>Return transfer to your hotel</li>
      </ol>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="text-lg font-semibold mb-2 !text-[#3E2F1C]">What's Included</h4>
          <ul className="text-gray-800 space-y-1">
            <li>✔️ Guided farm tour with local coffee farmers</li>
            <li>✔️ Coffee-making experience from bean to cup</li>
            <li>✔️ Fresh coffee tasting</li>
            <li>✔️ Traditional Chagga snacks or lunch (optional)</li>
            <li>✔️ Transfers from Moshi or Arusha</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 !text-[#3E2F1C]">What's Not Included</h4>
          <ul className="text-gray-800 space-y-1">
            <li>❌ International flights</li>
            <li>❌ Travel insurance</li>
            <li>❌ Personal purchases (bags of coffee available for purchase on-site)</li>
          </ul>
        </div>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Best Time for a Coffee Tour
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Coffee tours run year-round</li>
        <li>Harvest season (October – February) is the best time to experience hands-on harvesting</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Why Choose Baraka Trails?
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Authentic partnership with local coffee farmers</li>
        <li>Ethical tourism that directly benefits farming communities</li>
        <li>Flexible tours that can be combined with Kilimanjaro treks, safaris, or cultural experiences</li>
        <li>Personalized service for individuals, families, and groups</li>
      </ul>

      <p className="text-gray-800 leading-relaxed mt-6 font-semibold">
        Book Your Coffee Tour Today — Add a flavorful twist to your Tanzanian adventure. Join Baraka Trails for an authentic coffee tour and experience the rich tradition behind one of the world's favorite beverages.
      </p>
    </motion.div>

    {/* Kikuletwa Hot Springs */}
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-md"
    >
      <h3 className="text-2xl font-bold mb-4 !text-[#3E2F1C]">
        Kikuletwa Hot Springs (Chemka Hot Springs)
      </h3>
      <p className="text-gray-800 leading-relaxed mb-6">
        Hidden between Moshi and Arusha, the Kikuletwa Hot Springs (Chemka Hot Springs) are a natural oasis in Tanzania. Known for their crystal-clear turquoise waters, shaded fig trees, and serene atmosphere, these springs are the perfect place to swim, relax, and unwind after a Kilimanjaro trek or safari. With Baraka Trails, you can enjoy a refreshing day trip to this natural paradise, combining relaxation with local cultural experiences.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Highlights of the Kikuletwa Day Trip
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Swim in natural hot springs with crystal-clear waters</li>
        <li>Relax under shaded fig and palm trees</li>
        <li>Spot tiny fish that give a natural "foot spa"</li>
        <li>Picnic lunch and fresh local snacks by the springs</li>
        <li>Scenic drive through Tanzanian villages and landscapes</li>
        <li>Perfect add-on after a Kilimanjaro climb or safari</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Kikuletwa Hot Springs Day Trip Itinerary
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li><strong>Morning Pickup:</strong> From your hotel in Moshi or Arusha</li>
        <li><strong>Scenic Drive:</strong> Pass through local villages and Maasai land with views of Mount Kilimanjaro and Mount Meru on clear days</li>
        <li><strong>Arrive at Chemka Springs:</strong> Enjoy swimming, relaxing, or just soaking your feet in the clear waters</li>
        <li><strong>Picnic Lunch:</strong> Provided on-site, with time to enjoy snacks and drinks</li>
        <li><strong>Afternoon Relaxation:</strong> Swim, explore, or simply unwind in the peaceful surroundings</li>
        <li><strong>Return Transfer:</strong> Drive back to Moshi or Arusha in the late afternoon</li>
      </ul>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="text-lg font-semibold mb-2 !text-[#3E2F1C]">What's Included</h4>
          <ul className="text-gray-800 space-y-1">
            <li>✔️ Transfers from Moshi or Arusha</li>
            <li>✔️ Entrance fees to Kikuletwa Hot Springs</li>
            <li>✔️ Picnic lunch and bottled drinking water</li>
            <li>✔️ Professional driver-guide</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 !text-[#3E2F1C]">What's Not Included</h4>
          <ul className="text-gray-800 space-y-1">
            <li>❌ Personal expenses (souvenirs, extra drinks)</li>
            <li>❌ Tips for driver/guide</li>
            <li>❌ International flights and travel insurance</li>
          </ul>
        </div>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Best Time to Visit
      </h4>
      <p className="text-gray-800 leading-relaxed mb-2">
        Kikuletwa Hot Springs can be visited year-round.
      </p>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li><strong>Dry season (June – October):</strong> Sunny weather, clear skies</li>
        <li><strong>Green season (November – May):</strong> Lush landscapes and fewer crowds</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Why Choose Baraka Trails?
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Comfortable transfers with experienced drivers</li>
        <li>Flexible itineraries – combine with coffee tours, cultural visits, or Kilimanjaro day hikes</li>
        <li>Authentic local experiences with a personal touch</li>
        <li>Ideal relaxation stop after your Tanzanian adventures</li>
      </ul>

      <p className="text-gray-800 leading-relaxed mt-6 font-semibold">
        Book Your Kikuletwa Hot Springs Day Trip — Escape the bustle and discover Tanzania's natural swimming paradise with Baraka Trails. Whether as a relaxing break or a fun family outing, the Kikuletwa Hot Springs Day Trip is a refreshing highlight of any journey.
      </p>
    </motion.div>

    {/* Tanzanite Tour */}
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-md"
    >
      <h3 className="text-2xl font-bold mb-4 !text-[#3E2F1C]">Tanzanite Tour</h3>
      <p className="text-gray-800 leading-relaxed mb-6">
        Did you know that Tanzanite is found only in one place on Earth? The small town of Mererani, near Arusha, is home to the world's only Tanzanite mines. On this unique day trip with Baraka Trails, you'll explore the history, mining, and cultural significance of this rare gemstone, making it a fascinating addition to your Tanzanian adventure. Perfect for gemstone enthusiasts, cultural explorers, and anyone looking for a once-in-a-lifetime experience.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Highlights of the Tanzanite Day Trip
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Visit the Tanzanite mining area in Mererani</li>
        <li>Learn about traditional and modern mining methods</li>
        <li>Scenic drive through Maasai villages and landscapes</li>
        <li>Discover the history and rarity of Tanzanite</li>
        <li>Opportunity to purchase authentic Tanzanite jewelry from trusted sources</li>
        <li>Cultural interaction with local miners and community members</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Itinerary – Tanzanite Day Trip (Full Day)
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li><strong>Morning Pickup:</strong> From your hotel in Arusha or Moshi</li>
        <li><strong>Scenic Drive:</strong> Through Maasai land to Mererani mining area</li>
        <li><strong>Guided Tour of Mines:</strong> Learn about how Tanzanite is extracted and the challenges miners face</li>
        <li><strong>Cultural Experience:</strong> Meet local miners and hear their stories</li>
        <li><strong>Lunch:</strong> Enjoy a picnic or local restaurant meal in the Mererani area</li>
        <li><strong>Afternoon Visit:</strong> Stop at the Tanzanite Experience center (optional) to learn more about gemstone grading and polishing</li>
        <li><strong>Return Transfer:</strong> Back to Arusha or Moshi in the late afternoon</li>
      </ul>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="text-lg font-semibold mb-2 !text-[#3E2F1C]">What's Included</h4>
          <ul className="text-gray-800 space-y-1">
            <li>✔️ Transfers from Arusha or Moshi</li>
            <li>✔️ Professional guide</li>
            <li>✔️ Mererani mining area visit</li>
            <li>✔️ Lunch and bottled drinking water</li>
            <li>✔️ Entry fees where applicable</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 !text-[#3E2F1C]">What's Not Included</h4>
          <ul className="text-gray-800 space-y-1">
            <li>❌ International flights</li>
            <li>❌ Travel insurance</li>
            <li>❌ Personal purchases of gemstones or jewelry</li>
            <li>❌ Tips for guide/driver</li>
          </ul>
        </div>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Best Time to Visit
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Tanzanite day trips run year-round</li>
        <li><strong>Dry season (June – October)</strong> is best for easy travel and clear views</li>
        <li><strong>November – March:</strong> Great for combining with a safari or Kilimanjaro trek</li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-3 !text-[#3E2F1C]">
        Why Choose Baraka Trails?
      </h4>
      <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
        <li>Authentic and ethical tours to the world's only Tanzanite source</li>
        <li>Knowledgeable guides who explain geology, mining, and culture</li>
        <li>Safe and well-organized logistics from Arusha or Moshi</li>
        <li>Opportunities to combine with cultural tours or safaris</li>
      </ul>

      <p className="text-gray-800 leading-relaxed mt-6 font-semibold">
        Book Your Tanzanite Day Trip in Mererani — Discover the story of Tanzania's rare blue gemstone with Baraka Trails. From mine to market, this tour gives you a unique perspective on one of the world's most precious and beautiful minerals.
      </p>
    </motion.div>
  </div>
</section>

      <Footer />
    </div>
  );
}