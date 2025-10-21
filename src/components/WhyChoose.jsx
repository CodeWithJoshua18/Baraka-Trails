import { useEffect, useRef } from "react"
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
  const currentIndexRef = useRef(0)
  const intervalRef = useRef(null)
  const pausedRef = useRef(false)
  const contentRef = useRef(null)

  const updateCard = (index) => {
    const content = contentRef.current
    if (!content) return

    const title = content.querySelector('h3')
    const desc = content.querySelector('p')

    // Fade out
    content.style.opacity = '0'

    setTimeout(() => {
      // Update content
      title.textContent = features[index].title
      desc.textContent = features[index].description

      // Update indicators
      document.querySelectorAll('.why-indicator').forEach((indicator, i) => {
        if (i === index) {
          indicator.className = 'why-indicator h-1 rounded-full transition-all duration-500 w-10 bg-[var(--gold-dark)]'
        } else {
          indicator.className = 'why-indicator h-1 rounded-full transition-all duration-500 w-6 bg-gray-400'
        }
      })

      // Fade in
      content.style.opacity = '1'
    }, 300)
  }

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) {
        currentIndexRef.current = (currentIndexRef.current + 1) % features.length
        updateCard(currentIndexRef.current)
      }
    }, 5000)
  }

  useEffect(() => {
    startInterval()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const nextCard = () => {
    currentIndexRef.current = (currentIndexRef.current + 1) % features.length
    updateCard(currentIndexRef.current)
    
    // Reset interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      startInterval()
    }
  }

  const prevCard = () => {
    currentIndexRef.current = (currentIndexRef.current - 1 + features.length) % features.length
    updateCard(currentIndexRef.current)
    
    // Reset interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      startInterval()
    }
  }

  return (
    <div className="py-20 bg-white text-center">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold !text-black mb-12 px-4">
        Experience Journeys Crafted With Heart & Heritage
      </h2>

      <div
        className="relative max-w-xl mx-auto px-4"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        onTouchStart={() => { pausedRef.current = true }}
        onTouchEnd={() => { pausedRef.current = false }}
      >
        <div
          ref={contentRef}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-[var(--gold-dark)] transition-opacity duration-300"
        >
          <h3 className="text-lg sm:text-xl font-semibold !text-black mb-4">
            {features[0].title}
          </h3>
          <p className="text-black leading-relaxed text-sm sm:text-base">
            {features[0].description}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {features.map((_, i) => (
            <div
              key={i}
              className={`why-indicator h-1 rounded-full transition-all duration-500 ${
                i === 0 ? "w-10 bg-[var(--gold-dark)]" : "w-6 bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevCard}
            className="p-3 rounded-full bg-[var(--gold-dark)] hover:bg-[var(--gold)] transition shadow-lg"
          >
            <ChevronLeft className="text-white" size={20} />
          </button>
          <button
            onClick={nextCard}
            className="p-3 rounded-full bg-[var(--gold-dark)] hover:bg-[var(--gold)] transition shadow-lg"
          >
            <ChevronRight className="text-white" size={20} />
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            to="/about"
            className="inline-block px-6 py-3 bg-[var(--gold-dark)] hover:bg-[var(--gold)] text-white font-semibold rounded-full shadow-md transition text-sm sm:text-base"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WhyChoose