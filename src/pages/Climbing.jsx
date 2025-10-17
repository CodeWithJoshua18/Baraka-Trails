
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const climbingHeroImage = "/images/8.jpg";

/**
 * Route data - concise summary + full itinerary text (long).
 */
const ROUTES = [
  {
    id: "marangu",
    title: "Marangu Route — 6 Days",
    tagline: "Classic route with comfortable huts & a strong success rate.",
    price: "$1,910 / person (group)",
    image: "/images/marangu.jpeg",
    summary: [
      "Duration: 6 days",
      "Habitat zones: Montane forest → Heathland → Alpine desert → Forest",
      "Good for: Beginners who prefer hut accommodation",
    ],
    full: {
      itinerary: [
        {
          day: "DAY 1",
          title: "ARUSHA – MARANGU GATE – MANDARA HUT",
          text:
            "After breakfast and briefing, drive to the Kilimanjaro National Park Gate (about 3 hours), register and commence the climb. Walk through the rainforest to the Mandara encampment. A side trip to Maundi Crater is a good way to see the surroundings including Northern Tanzania and Kenya. In the rainforest, look for towering Eucalyptus trees, bird life, and Colobus monkeys.",
          elevation: "1860m / 6,100 ft → 2700m / 8,875 ft",
          distance: "8 km / 5 mi",
          hikingTime: "3–4 hours",
          habitat: "Montane Forest",
          meals: "Lunch, Dinner",
        },
        {
          day: "DAY 2",
          title: "MANDARA HUT – HOROMBO HUT",
          text:
            "You leave the glades of the rain-forest and follow an ascending path on the open moorlands to the Horombo encampment. Views of Mawenzi and the summit of Kibo are amazing. Look for giant lobelias and groundsels. You may begin to feel the effects of the altitude.",
          elevation: "2700m / 8,875 ft → 3700m / 12,200 ft",
          distance: "12 km / 7.5 mi",
          hikingTime: "5–6 hours",
          habitat: "Heathland",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "DAY 3",
          title: "REST DAY AT HOROMBO HUT",
          text: "Rest day at Horombo Hut with optional hike by Mawenzi Peak.",
          elevation: "3700m / 12,200 ft",
          distance: "0 km",
          hikingTime: "0 hours",
          habitat: "Heathland",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "DAY 4",
          title: "HOROMBO HUT – KIBO HUT",
          text:
            "Ascending, we now pass the last watering point, walking onto the saddle of Kilimanjaro between the peaks of Kibo and Mawenzi. Vegetation begins with upper heathland but then disappears into “moonscape”. Dinner, rest, and prepare for summit climb.",
          elevation: "3700m / 12,200 ft → 4700m / 15,500 ft",
          distance: "9 km / 5.5 mi",
          hikingTime: "5–6 hours",
          habitat: "Alpine Desert",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "DAY 5",
          title: "KIBO HUT – SUMMIT (5895m) – HOROMBO HUT",
          text:
            "Very early in the morning (midnight to 2am), commence the climb to the summit on steep and heavy scree or snow up to Gilman’s point located on the crater rim. Continuing, we now ascend to Uhuru Peak (the highest point in Africa). From here we descend, stopping for lunch and a rest at Kibo before continuing on to Horombo encampment.",
          elevation:
            "4700m / 15,500 ft → 5895m / 19,340 ft (summit) → down to 3700m / 12,200 ft",
          distance: "6 km up / 15 km down",
          hikingTime: "6–8 hours up / 6–8 hours down",
          habitat: "Alpine Desert",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "DAY 6",
          title: "HOROMBO HUT – MARANGU GATE – ARUSHA",
          text:
            "After breakfast, a steady descent takes us down through moorland to the Mandara Hut. Continue descending through lush forest path to the National Park gate at Marangu. At lower elevations, it can be wet and muddy. Gaiters and trekking poles will help.",
          elevation: "3700m / 12,200 ft → 1700m / 5,500 ft",
          distance: "20 km / 12.5 mi",
          hikingTime: "4–5 hours",
          habitat: "Forest",
          meals: "Breakfast",
        },
      ],
      includes: [
        "Private pick up & drop at Kilimanjaro International Airport",
        "Accommodation before & after trek",
        "Park fees, camping fees & rescue fees ($20/climber)",
        "18% VAT on tour fees & services",
        "Forest fee $10/person",
        "Transport to/from Marangu gate",
        "Professional mountain guides, cooks and porters",
        "3 meals daily while on the mountain",
        "Filtered water throughout the trek",
        "Fair wages for mountain crew (KINAPA / KIATO approved)",
        "Hot water for wash everyday at camp",
      ],
      excludes: [
        "International and local flights",
        "Personal items (gear can be rented in Arusha)",
        "Laundry services (optional)",
        "Tips to mountain crew (recommended separately)",
      ],
      priceNotes:
        "Tips recommendation: guide $18–20/day, asst guide $15–18/day, cook $12–15/day, porter $9–12/day (estimate for 6-day trip: ~ $250–$300 total per climber).",
      planningHighlights:
        "Start fitness training 3–6 months before; check vaccinations; ensure passport valid 6+ months; apply for e-Visa 4–5 weeks before; buy/rent gear; purchase high-altitude travel insurance.",
    },
  },

  {
    id: "machame",
    title: "Machame Route — 7 Days",
    tagline:
      "The ‘Whiskey Route’ — scenic, good acclimatization, popular with strong success rates.",
    price: "Solo $2,570 · Group $2,370",
    image: "/images/kili.jpeg",
    summary: [
      "Duration: 7 days",
      "Distance: ~62 km (37 miles)",
      "Difficulty: Challenging — best for fit hikers",
    ],
    full: {
      itinerarySummary:
        "Rich scenery: rainforest → moorland → alpine desert → glacier. Follows a 'climb high, sleep low' strategy for acclimatization.",
      itinerary: [
        {
          day: "Day 1",
          title: "Machame Gate (1,800 m) → Machame Camp (3,010 m)",
          distance: "11 km",
          elevation: "+1,210 m",
        },
        {
          day: "Day 2",
          title: "Machame Camp → Shira Camp (3,840 m)",
          distance: "5 km",
          elevation: "+830 m",
        },
        {
          day: "Day 3",
          title:
            "Shira Camp → Lava Tower (4,630 m) → Barranco Camp (3,976 m)",
          distance: "10 km",
          elevation: "+790 m / -654 m",
        },
        {
          day: "Day 4",
          title: "Barranco Camp → Karanga Camp (3,995 m)",
          distance: "5 km",
          elevation: "+19 m (includes steep up/down)",
        },
        {
          day: "Day 5",
          title: "Karanga Camp → Barafu Camp (4,673 m)",
          distance: "4 km",
          elevation: "+678 m",
        },
        {
          day: "Day 6 (Night)",
          title: "Barafu Camp → Uhuru Peak (5,895 m)",
          distance: "5 km",
          elevation: "+1,222 m",
        },
        {
          day: "Day 6 (Day)",
          title: "Uhuru Peak → Mweka Camp (3,100 m)",
          distance: "12 km",
          elevation: "-2,795 m",
        },
        {
          day: "Day 7",
          title: "Mweka Camp → Mweka Gate (1,640 m)",
          distance: "10 km",
          elevation: "-1,460 m",
        },
      ],
      includes: [
        "Airport pick up & drop off",
        "All transfers to/from the gate",
        "Accommodation on arrival & after the climb (full board)",
        "All trekking fees",
        "All meals & mineral drinking water on the mountain",
        "Guides, porters, cooks & park fees",
        "Portable toilet",
        "Quality mess tents with tables & chairs",
        "English-speaking guide",
        "Sleeping pads, oxygen tank",
      ],
      excludes: [
        "Crew tips (recommended)",
        "Travel insurance",
        "International & local flights",
        "Personal gear (optional)",
      ],
      note:
        "This route is scenic and popular — good acclimatization via 'climb high, sleep low.'",
    },
  },

  {
    id: "rongai",
    title: "Rongai Route — 6 to 7 Days",
    tagline:
      "Approaches from the north (Kenyan side): quieter, drier, and less-traveled.",
    price: "Typical: $2,250 / person (example price)",
    image: "/images/8.jpg",
    summary: [
      "Duration: 6–7 days",
      "Difficulty: Moderate",
      "Crowds: Very low",
      "Success rate: Good (especially on 7-day itinerary)",
    ],
    full: {
      itinerary: [
        {
          day: "Day 1",
          title: "Arusha → Simba Camp",
          text:
            "Drive to Nale Moru village, begin hike through maize fields into pine forest. The forest thins to moorland with views across Kenyan plains.",
          elevation: "2000m → 2650m",
          distance: "6 km",
          hikingTime: "3–4 hours",
          habitat: "Montane Forest",
          meals: "Lunch, Dinner",
        },
        {
          day: "Day 2",
          title: "Simba Camp → Second Cave (3450m)",
          text:
            "Steady ascent with superb views of Kibo and the eastern ice fields on the crater rim.",
          elevation: "2650m → 3450m",
          distance: "6 km",
          hikingTime: "3–4 hours",
          habitat: "Moorland",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "Day 3",
          title: "Second Cave → Kikelewa Camp (3600m)",
          text:
            "Cross moorland to a sheltered valley near Mawenzi; giant Senecios nearby.",
          elevation: "3450m → 3600m",
          distance: "9 km",
          hikingTime: "2–3 hours",
          habitat: "Semi-desert",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "Day 4",
          title: "Kikelewa → Mawenzi Tarn (4330m)",
          text:
            "Steep climb rewarded with superb views; camp beneath Mawenzi spires for acclimatization.",
          elevation: "3600m → 4330m",
          distance: "6 km",
          hikingTime: "3–4 hours",
          habitat: "Semi-desert",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "Day 5",
          title: "Mawenzi Tarn → Kibo Hut (4750m)",
          text:
            "Cross the Saddle between Mawenzi and Kibo. Rest at Kibo in preparation for summit push.",
          elevation: "4330m → 4750m",
          distance: "9 km",
          hikingTime: "4–5 hours",
          habitat: "Alpine Desert",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "Day 6",
          title: "Kibo Hut → Summit → Horombo Hut",
          text:
            "Summit push (midnight start) to Gilman’s Point and Uhuru Peak, then descend to Horombo Hut.",
          elevation: "4700m → 5895m → down to 3700m",
          distance: "6 km up / 15 km down",
          hikingTime: "6–8 hours up / 6–8 hours down",
          habitat: "Alpine Desert",
          meals: "Breakfast, Lunch, Dinner",
        },
        {
          day: "Day 7",
          title: "Horombo Hut → Trailhead → Arusha hotel",
          text:
            "Final descent through rainforest to park gate and transfer back to hotel for hot showers and rest.",
          meals: "Breakfast",
        },
      ],
      includes: [
        "Airport pick up & drop off",
        "All transfers to/from the gate",
        "Accommodation on arrival & after the climb (full board)",
        "All trekking fees & meals",
        "Guides, porters, cooks & park fees",
        "Portable toilet",
        "Quality mess tents, sleeping pads, oxygen tank",
      ],
      excludes: ["Crew tips", "Travel insurance", "International flights"],
    },
  },

  {
    id: "lemosho8",
    title: "Lemosho Route — 8 Days",
    tagline:
      "Remote, scenic & great acclimatization profile — a favorite for summit success.",
    price: "$2,560",
    image: "/images/lemosho.jpeg",
    summary: [
      "Duration: 8 days",
      "Difficulty: Moderate → Challenging",
      "Scenery: Exceptional — remote western approach",
    ],
    full: {
      itinerary: [
        {
          day: "Day 1",
          title: "Londorossi Gate → Mti Mkubwa (Big Tree Camp)",
          text:
            "Forest trail hike to Big Tree Camp after registration at Lemosho Gate.",
          distance: "~6 km",
          elevationGain: "+550 m",
        },
        {
          day: "Day 2",
          title: "Mti Mkubwa → Shira 1 Camp",
          text: "Trek to Shira Plateau with views of Shira Cathedral.",
          distance: "~8 km",
          elevationGain: "+960 m",
        },
        {
          day: "Day 3",
          title: "Shira 1 → Shira 2 Camp",
          text: "Cross Shira Plateau to Shira 2 camp (higher altitude).",
          distance: "~7 km",
          elevationGain: "+240 m",
        },
        {
          day: "Day 4",
          title: "Shira 2 → Lava Tower → Barranco Camp",
          text:
            "Acclimatization to Lava Tower (4,630 m) then descend to Barranco (3,976 m).",
          distance: "~10 km",
          elevationGain: "+780 m / -654 m",
        },
        {
          day: "Day 5",
          title: "Barranco → Karanga Camp",
          text:
            "Scramble up the Great Barranco Wall and traverse to Karanga Valley (3,930 m).",
          distance: "~5 km",
        },
        {
          day: "Day 6",
          title: "Karanga → Barafu Camp",
          text: "Join Southern Circuit, rest at Barafu for summit attempt.",
          distance: "~4 km",
          elevationGain: "+670 m",
        },
        {
          day: "Day 7",
          title:
            "Barafu → Uhuru Peak (5,895 m) → Mweka Camp (3,100 m)",
          text:
            "Night summit push to Uhuru Peak; descend to Mweka Camp after celebrating at summit.",
          distance: "~17 km (combined up + down)",
        },
        {
          day: "Day 8",
          title: "Mweka Camp → Mweka Gate",
          text:
            "Final descent through rainforest; collect summit certificates and transfer to hotel.",
          distance: "~10 km",
        },
      ],
      includes: [
        "Private pick up & drop at JRO",
        "All transfers to/from the gate",
        "Accommodation before & after trek (B&B basis)",
        "Park and camping fees",
        "Rescue fees ($20/climber)",
        "3 meals daily on the mountain & filtered water",
        "Professional guides, cooks & porters",
        "Sleeping mats, tents, portable toilets (optional)",
      ],
      excludes: [
        "Crew tips",
        "International & local flights",
        "Personal tent (optional extra)",
      ],
    },
  },

  {
    id: "lemosho9",
    title: "Lemosho — 9 Days (Crater Camp)",
    tagline:
      "Advanced Lemosho variant with Crater Camp — unique overnight inside the crater.",
    price: "$4,350",
  image: "/images/lemosho-crater.jpeg",
    summary: [
      "Duration: 9 days",
      "Difficulty: Moderate → Challenging (Crater Camp adds altitude exposure)",
      "Ideal for high-altitude training & excellent acclimatization",
    ],
    full: {
      itinerary: [
        {
          day: "Day 1",
          title: "Londorossi Gate → Mti Mkubwa (Big Tree)",
          text: "Forest trail hike and camp at Mti Mkubwa.",
        },
        {
          day: "Day 2",
          title: "Mti Mkubwa → Shira 1 Camp",
          text: "Trek across Shira Plateau to Shira 1.",
        },
        {
          day: "Day 3",
          title: "Shira 1 → Moir Hut (4,200 m)",
          text:
            "Enter moorland; camp near Arrow Glacier to prepare for higher altitude.",
        },
        {
          day: "Day 4",
          title: "Moir Hut → Lava Tower → Barranco Camp",
          text:
            "Acclimatization hike to Lava Tower then descend to Barranco Valley.",
        },
        {
          day: "Day 5",
          title: "Barranco → Karanga Camp",
          text: "Scramble Great Barranco Wall and rest at Karanga.",
        },
        {
          day: "Day 6",
          title: "Karanga → Barafu Camp",
          text: "Continue to Barafu and prepare for summit push.",
        },
        {
          day: "Day 7",
          title: "Barafu → Uhuru Peak → Crater Camp (5,730 m)",
          text:
            "Summit push via Stella Point & Uhuru Peak then descend slightly to camp inside the crater (Crater Camp).",
        },
        {
          day: "Day 8",
          title: "Crater Camp → Mweka Camp",
          text:
            "Sunrise at crater rim then long descent to Mweka Camp after unforgettable views.",
        },
        {
          day: "Day 9",
          title: "Mweka Camp → Mweka Gate → Hotel",
          text:
            "Final descent, collect summit certificates and transfer back to hotel.",
        },
      ],
      includes: [
        "Private airport transfers",
        "1 night before & 1 night after trek (sharing rooms B&B)",
        "Park fees, camping fees & rescue fees",
        "4-season mountain tents, double-layer sleeping mats",
        "Filtered water, hot water for wash where available",
        "Guides, cooks, porters, mess tents, portable toilets (optional)",
      ],
      excludes: [
        "International & local flights + VISA",
        "Personal tent (optional extra)",
        "Personal hotel room upgrade",
      ],
    },
  },

  {
    id: "northern",
    title: "Northern Circuit — 9 Days",
    tagline:
      "Longest route with highest scenic variety and excellent acclimatization.",
    price: "Solo $3,650 · Group $3,150",
    image: "/images/northern.jpeg",
    summary: [
      "Duration: 9 days (8 nights on mountain)",
      "Distance: ~88 km (55 miles)",
      "Best for: climbers wanting maximal acclimatization & solitude",
    ],
    full: {
      itinerary: [
        { day: "Day 1", title: "Londorossi Gate → Mti Mkubwa (6 km, +550 m)", camp: "2,650 m" },
        { day: "Day 2", title: "Mti Mkubwa → Shira 1 (8 km, +960 m)", camp: "3,610 m" },
        { day: "Day 3", title: "Shira 1 → Shira 2 → Moir Hut (14 km)", camp: "4,200 m" },
        { day: "Day 4", title: "Moir Hut → Buffalo Camp via Lent Hills (12 km)" , camp: "4,020 m"},
        { day: "Day 5", title: "Buffalo Camp → Third Cave Camp (8 km)", camp: "3,870 m" },
        { day: "Day 6", title: "Third Cave → School Hut (5 km, +730 m)", camp: "4,750 m" },
        { day: "Day 7–8", title: "School Hut → Uhuru Peak → Mweka Camp (15 km)", camp: "3,100 m" },
        { day: "Day 9", title: "Mweka Camp → Mweka Gate (10 km, -1,460 m)" , camp: "1,640 m"},
      ],
      includes: [
        "Full transfers, park fees, accommodation before/after trek",
        "All meals & water on mountain",
        "Guides, porters, cooks, mess tents, sleeping pads",
      ],
      excludes: ["Crew tips", "Travel insurance", "International flights"],
    },
  },
];

/** Small presentational utilities */
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

/** Component */
export default function Climbing() {
  // track which route IDs are expanded
  const [expanded, setExpanded] = useState({});

  const toggle = (id) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${climbingHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-[1] text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37]">
            Climbing Kilimanjaro
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Reach the Roof of Africa safely with guided climbs — options for beginners and experienced hikers.
          </p>
          <Link
            to="/enquire"
            className="mt-6 inline-block px-6 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors md:hidden"
          >
            Enquire
          </Link>
        </motion.div>
      </section>

      {/* Back button */}
      <div className="text-center mt-6 mb-8">
        <Link
          to="/"
          className="px-6 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Tagline */}
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold !text-[#3E2F1C] mb-3"
        >
          Pick your route — we’ll guide every step
        </motion.h2>
        <p className="text-base md:text-lg text-[#5A4B3A]">
          Choose from classic Marangu huts to scenic Lemosho wilderness or the remote Rongai approach.
          Each route includes experienced guides, balanced meals, and safety-first acclimatization plans.
        </p>
      </div>

      {/* Routes list */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-10 space-y-12">
        {ROUTES.map((route, idx) => {
          const leftImage = idx % 2 === 0; // even index => image left on md+
          return (
            <motion.section
              key={route.id}
              className="w-full"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
            >
              <div className={`flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8`}>
                {/* Image */}
                <div
                  className={`w-full md:w-1/2 ${leftImage ? "md:order-1" : "md:order-2"}`}
                >
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={route.image}
                      alt={route.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={`w-full md:w-1/2 ${leftImage ? "md:order-2" : "md:order-1"}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold !text-[#3E2F1C]">{route.title}</h3>
                        <p className="mt-1 text-sm text-[#5A4B3A]">{route.tagline}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-[#5A4B3A]">From</div>
                        <div className="text-lg font-semibold text-[#3E2F1C]">{route.price}</div>
                      </div>
                    </div>

                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#5A4B3A]">
                      {route.summary.map((s, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block mt-1" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        onClick={() => toggle(route.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition"
                        aria-expanded={!!expanded[route.id]}
                      >
                        {expanded[route.id] ? "Hide Full Itinerary" : "View Full Itinerary"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <Link
                        to="/enquire"
                        className="ml-2 hidden md:inline-block px-4 py-2 border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-md hover:bg-[#D4AF37]/10 transition"
                      >
                        Enquire
                      </Link>
                    </div>

                    {/* Expandable area */}
                    <AnimatePresence initial={false}>
                      {expanded[route.id] && (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.45 }}
                          className="mt-6 overflow-hidden"
                        >
                          {/* Itinerary details */}
                          <div className="space-y-4 text-sm !text-[#3E2F1C]">
                            <h4 className="font-semibold text-lg !text-[#3E2F1C]">Itinerary</h4>

                            <div className="space-y-3">
                              {route.full.itinerary.map((d, i) => (
                                <div key={i} className="p-3 bg-white rounded-md border">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <div className="text-sm font-semibold !text-[#3E2F1C]">
                                        {d.day} — {d.title}
                                      </div>
                                      {d.text && (
                                        <div className="mt-1 text-sm text-[#5A4B3A]">
                                          {d.text}
                                        </div>
                                      )}
                                      {d.distance && (
                                        <div className="mt-1 text-xs text-[#7A6A56]">
                                          Distance: {d.distance} {d.elevation ? `· Elevation: ${d.elevation}` : ""}
                                        </div>
                                      )}
                                      {d.elevation && !d.distance && (
                                        <div className="mt-1 text-xs text-[#7A6A56]">
                                          Elevation: {d.elevation}
                                        </div>
                                      )}
                                      {d.hikingTime && (
                                        <div className="mt-1 text-xs text-[#7A6A56]">Hiking time: {d.hikingTime}</div>
                                      )}
                                      {d.habitat && (
                                        <div className="mt-1 text-xs text-[#7A6A56]">Habitat: {d.habitat}</div>
                                      )}
                                      {d.meals && (
                                        <div className="mt-1 text-xs text-[#7A6A56]">Meals: {d.meals}</div>
                                      )}
                                    </div>

                                    {/* elevation / small meta on the right */}
                                    <div className="text-right text-xs text-[#7A6A56]">
                                      {d.elevation && <div>{d.elevation}</div>}
                                      {d.hikingTime && <div className="mt-1">{d.hikingTime}</div>}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Includes / Excludes */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-semibold">Price & Includes</h5>
                                <div className="mt-2 text-sm text-[#5A4B3A]">
                                  <div className="mb-2">Price: <strong className="!text-[#3E2F1C]">{route.price}</strong></div>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {(route.full.includes || []).map((inc, ii) => (
                                      <li key={ii}>{inc}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div>
                                <h5 className="font-semibold">Not Included</h5>
                                <div className="mt-2 text-sm !text-[#5A4B3A]">
                                  <ul className="list-disc pl-5 space-y-1">
                                    {(route.full.excludes || []).map((ex, ii) => (
                                      <li key={ii}>{ex}</li>
                                    ))}
                                  </ul>
                                  {route.full.priceNotes && (
                                    <div className="mt-2 text-xs !text-[#7A6A56]">{route.full.priceNotes}</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Planning checklist */}
                            <div>
                              <h5 className="font-semibold">Planning & Checklist</h5>
                              <div className="mt-2 text-sm !text-[#5A4B3A]">
                                <p className=" !text-[#5A4B3A]">{route.full.planningHighlights || "See details above for training, visas, insurance, and gear."}</p>
                                {/* You can expand this area with more checklist items if desired */}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Footer small note */}
      <div className="max-w-4xl mx-auto px-6 pb-16 text-center text-sm text-[#5A4B3A]">
        <p>
          <strong>Safety first:</strong> Our guides are certified in wilderness first aid and trained by KINAPA.
          We adapt climbs to individual acclimatization needs to maximize your chance of reaching the summit safely.
        </p>
      </div>

      {/* footer section */}
      <Footer />
    </div>
  );
}
