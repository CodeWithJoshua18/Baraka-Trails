import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

const features = [
  {
    title: "Locally Operated Expertise",
    description: "Founded and run by passionate Tanzanians who know Kilimanjaro inside out."
  },
  {
    title: "Certified & Safety-Focused Guides",
    description: "Experienced professionals trained in high-altitude trekking and emergency response."
  },
  {
    title: "Customized Adventures",
    description: "From Kilimanjaro climbs to Serengeti safaris, cultural tours, Chimpanzee treks, Gorilla trekking in Uganda and Zanzibar escapes."
  },
  {
    title: "Ethical & Responsible Travel",
    description: "Fair treatment of porters and sustainable tourism practices."
  },
  {
    title: "Exceptional Guest Experience",
    description: "Highly rated on TripAdvisor, Trustpilot, and Google for professionalism and warmth. Also featured in the American Fork Citizen magazine."
  }
]

function WhyChoose() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % features.length)
      }, 5000)
    }
    return () => clearInterval(intervalRef.current)
  }, [paused])

  const nextCard = () => setIndex((prev) => (prev + 1) % features.length)
  const prevCard = () => setIndex((prev) => (prev - 1 + features.length) % features.length)

  return (
    <div className="py-20 bg-[var(--dark-gray)] text-center text-[var(--soft-white)]">
      {/* Alternative title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--gold)] mb-12 px-4">
        Experience Journeys Crafted With Heart & Heritage
      </h2>

      <div
        className="relative max-w-xl mx-auto px-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="bg-[#2a2a2a] rounded-2xl shadow-xl p-6 sm:p-8 border border-[var(--gold-dark)]"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--gold)] mb-4">
              {features[index].title}
            </h3>
            <p className="text-[var(--soft-white)] leading-relaxed text-sm sm:text-base">
              {features[index].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Indicators - gold line bars */}
        <div className="flex justify-center gap-2 mt-6">
          {features.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-10 bg-[var(--gold)]" : "w-6 bg-gray-500"
              }`}
            ></div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevCard}
            className="p-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] transition shadow-lg"
          >
            <ChevronLeft className="text-[var(--dark-gray)]" size={20} />
          </button>
          <button
            onClick={nextCard}
            className="p-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] transition shadow-lg"
          >
            <ChevronRight className="text-[var(--dark-gray)]" size={20} />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            to="/about"
            className="inline-block px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--dark-gray)] font-semibold rounded-full shadow-md transition text-sm sm:text-base"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WhyChoose
