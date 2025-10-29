// src/pages/Blog.jsx
import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";


const heroImage = "/images/moments2.jpeg";

/* 6 images per section — local paths where available, Unsplash placeholders otherwise.
   Replace these with your own /public/images/* files as you like. */
const kenyaImages = [
  "/images/kenya1.jpg",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "/images/kenya2.jpg",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80",
  "/images/kenya3.jpg",
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1400&q=80",
];

const ugandaImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
  "/images/uganda4.jpg",
  "/images/uganda5.jpg",
  "/images/uganda6.jpg",
];

const rwandaImages = [
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
  "/images/rwanda2.jpg",
  "/images/rwanda3.jpg",
  "/images/rwanda4.jpg",
  "/images/rwanda5.jpg",
  "/images/rwanda6.jpg",
];

const tanzaniaImages = [
  "/images/serengeti3.jpg",
  "/images/ngororo2.jpeg",
  "/images/tarangire.jpg",
  "/images/ngorongoro3.jpg",
  "/images/zanzibar.jpg",
  "/images/mahale.jpg",
];

const lodgesImages = [
  "/images/lodge1.jpg",
  "/images/lodge2.jpg",
  "/images/lodge3.jpg",
  "https://images.unsplash.com/photo-1501117716987-c8e9f6be1d09?auto=format&fit=crop&w=1400&q=80",
  "/images/lodge5.jpg",
  "/images/lodge6.jpg",
];

const wildlifeImages = [
  "/images/lion1.jpg",
  "/images/elephant1.jpg",
  "/images/leopard1.jpg",
  "/images/giraffe1.jpg",
  "/images/hippo1.jpg",
  "https://images.unsplash.com/photo-1501706362039-c06a0b1d3a71?auto=format&fit=crop&w=1400&q=80",
];

/* Motion variants */
const sectionVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const gridItemVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

/* Lightbox image slide variants (directional) */
const imageVariants = {
  enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

/* Safe src helper */
const safeSrc = (src) =>
  src || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80";

export default function Blog() {
  // Lightbox modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);
  // direction: 1 => forward (next), -1 => backward (prev)
  const [direction, setDirection] = useState(0);

  // touch refs for gestures
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // keyboard navigation while modal open
  useEffect(() => {
    const onKey = (e) => {
      if (!modalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") slideTo(modalIndex + 1);
      if (e.key === "ArrowLeft") slideTo(modalIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, modalIndex, modalImages]);

  // open the modal with images array and start index
  const openModal = (imagesArray, startIndex = 0) => {
    setModalImages(imagesArray);
    setModalIndex(startIndex);
    setDirection(0);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
    // preload neighbours
    preload(imagesArray[(startIndex + 1) % imagesArray.length]);
    preload(imagesArray[(startIndex - 1 + imagesArray.length) % imagesArray.length]);
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
  };

  // helper to safely set index with wrap and direction
  const slideTo = (newIndex) => {
    if (!modalImages.length) return;
    const len = modalImages.length;
    const wrapped = ((newIndex % len) + len) % len;
    const dir = wrapped > modalIndex || (modalIndex === len - 1 && wrapped === 0) ? 1 : -1;
    setDirection(dir);
    setModalIndex(wrapped);
    // preload next neighbour
    preload(modalImages[(wrapped + dir + len) % len]);
  };

  const nextImage = () => slideTo(modalIndex + 1);
  const prevImage = () => slideTo(modalIndex - 1);

  const preload = (src) => {
    const img = new Image();
    img.src = src;
  };

  /* Touch handlers */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // px
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // swipe left — next
        nextImage();
      } else {
        // swipe right — prev
        prevImage();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* Grid component for sections */
  const Grid = ({ title, subtitle, images, highlight = false }) => (
    <motion.section
      className="max-w-7xl mx-auto mb-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariant}
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-bold !text-[#3E2F1C]">{title}</h3>
        <p className="text-md md:text-lg text-[#5A4B3A] mt-2 max-w-2xl mx-auto">{subtitle}</p>
        <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 rounded" />
      </div>

      <motion.div className={`grid gap-4 ${highlight ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"}`}>
        {images.map((src, i) => (
          <motion.figure
            key={src + i}
            className="relative group rounded-xl overflow-hidden bg-gray-100"
            variants={gridItemVariant}
          >
            <button
              className="block w-full h-full text-left"
              onClick={() => openModal(images, i)}
              aria-label={`${title} image ${i + 1}`}
            >
              <img
                src={safeSrc(src)}
                alt={`${title} ${i + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80";
                }}
                className={`w-full object-cover h-48 transform group-hover:scale-105 transition-transform duration-700`}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <figcaption className="text-white text-sm font-semibold">
                  {title} — {i + 1}
                </figcaption>
              </div>
            </button>
          </motion.figure>
        ))}
      </motion.div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <header
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] drop-shadow-xl">Captured Moments</h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl mx-auto">
            Step into the stories we’ve lived — from golden savannahs to tranquil coastlines.
          </p>
        </motion.div>

        
      </header>

      <main className="py-12">
        {/* Safaris — Kenya */}
        <Grid
          title="Kenya — The Heart of the Wild"
          subtitle="From Masai Mara’s golden plains to Amboseli’s elephant panoramas."
          images={kenyaImages}
        />

        {/* Safaris — Uganda */}
        <Grid
          title="Uganda — The Pearl of Africa"
          subtitle="Lush forests, mountain trails, and unforgettable encounters."
          images={ugandaImages}
        />

        {/* Safaris — Rwanda */}
        <Grid
          title="Rwanda — Land of a Thousand Hills"
          subtitle="Volcanic peaks, tranquil lodges, and the rare mountain gorilla."
          images={rwandaImages}
        />

        {/* Safaris — Tanzania (last among safaris, slightly highlighted) */}
        <Grid
          title="Tanzania — Where Adventure Meets Serenity"
          subtitle="Expansive Serengeti plains, Ngorongoro’s hush, and Zanzibar’s blue shores."
          images={tanzaniaImages}
          highlight
        />

        {/* Lodgings */}
        <Grid
          title="Lodgings — Where Comfort Meets the Wild"
          subtitle="Hand-picked camps and lodges that blend comfort with wilderness."
          images={lodgesImages}
        />

        {/* Wildlife */}
        <Grid
          title="Wildlife Closeups — The Pulse of the Wilderness"
          subtitle="Moments that change how you see the wild — close, candid, and unforgettable."
          images={wildlifeImages}
        />
      </main>

      {/* Outro: split layout (left image, right text) */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#3E2F1C] to-[#5A442A] rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Left: image */}
              <motion.div className="w-full h-72 md:h-auto" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img
                  src={safeSrc("/images/bush2beach.jpg")}
                  alt="Lodging"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1501117716987-c8e9f6be1d09?auto=format&fit=crop&w=1400&q=80";
                  }}
                />
              </motion.div>

              {/* Right: text */}
              <motion.div className="p-8 md:p-16 flex flex-col justify-center text-white" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">Travel that Stays with You</h2>

                <div className="prose prose-invert max-w-none text-sm md:text-base text-[#F6EFE6]">
                  <p>
                    Travel not just to see, but to feel — to wake with the savannah at your window,
                    to taste spices on an island breeze, to listen to the hush before sunrise in a crater.
                    At Baraka Trails, every step is a story waiting to be told. We craft journeys that honor
                    the land, the wildlife, and the people who call these places home.
                  </p>

                  <p>
                    Our itineraries are designed to give you space for wonder: gentle mornings with guides who
                    know the rhythms of these places, afternoons that invite quiet exploration, and evenings
                    where stories are shared beneath the stars. Whether it’s your first safari or your fifteenth,
                    we promise an experience that stays with you long after the journey ends.
                  </p>

                  <p className="mt-4 font-semibold text-[#F9E9C0]">
                    Baraka Trails — your story awaits.
                  </p>
                </div>

                <div className="mt-8">
                  <Link to="/enquire" className="inline-block px-8 py-3 rounded-full bg-[#D4AF37] text-[#3E2F1C] font-bold shadow hover:bg-white transition-colors">
                    Plan Your Journey
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

    

      {/* Lightbox Modal */}
      <AnimatePresence initial={false}>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // click outside -> close
              if (e.target === e.currentTarget) closeModal();
            }}
            aria-modal="true"
            role="dialog"
            aria-label="Image viewer"
          >
            {/* cinematic 80% black backdrop */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            />

            <motion.div
              className="relative z-10 max-w-[92vw] max-h-[92vh] w-full"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative rounded-md overflow-hidden bg-black/90">
                {/* directional image animation */}
                <div className="flex items-center justify-center w-full h-[75vh] bg-black">
                  <AnimatePresence custom={direction} initial={false}>
                    <motion.img
                      key={modalImages[modalIndex] + "-" + modalIndex}
                      src={safeSrc(modalImages[modalIndex])}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35 }}
                      alt={`Modal ${modalIndex + 1}`}
                      className="max-h-[75vh] max-w-full object-contain select-none"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80";
                      }}
                    />
                  </AnimatePresence>
                </div>

                {/* nav */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* close */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 rounded-full p-2"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* index */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-3 px-4 py-2 rounded-full bg-black/40 text-white text-sm">
                  {modalIndex + 1} / {modalImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* footer */}
      <Footer />
    </div>
  );
}
