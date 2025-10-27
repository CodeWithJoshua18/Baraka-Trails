import React, { useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Camera, Heart, Sparkles } from "lucide-react";

const destinations = [
  {
    name: "Maasai Mara",
    tagline: "Where the Great Migration Unfolds",
    description: "Witness nature's greatest spectacle in the Maasai Mara, where over two million wildebeest, zebras, and gazelles thunder across the plains in their annual migration. Beyond the migration, the Mara offers year-round exceptional wildlife viewing with its resident populations of lions, elephants, leopards, and cheetahs. Experience game drives at golden hour, hot air balloon safaris at dawn, and authentic cultural encounters with Maasai warriors.",
    image: "/images/wildebeest1.jpg",
    highlights: ["Great Migration (July-Oct)", "Big Five sightings", "Hot air balloon safaris", "Maasai cultural visits"],
    reverse: false
  },
  {
    name: "Amboseli National Park",
    tagline: "Elephants Against Kilimanjaro",
    description: "Amboseli offers one of Africa's most iconic scenes: magnificent elephants roaming with the snow-capped peak of Mount Kilimanjaro as a backdrop. Known as the land of giants, Amboseli is home to some of Africa's largest elephant herds. The park's diverse habitats—from the dried-up Lake Amboseli to wetlands and savannah—support over 400 bird species and provide stunning photographic opportunities at every turn.",
    image: "/images/amboseli.jpg",
    highlights: ["Kilimanjaro views", "Large elephant herds", "400+ bird species", "Observation Hill viewpoint"],
    reverse: true
  },
  {
    name: "Lake Naivasha",
    tagline: "A Freshwater Paradise",
    description: "Nestled in the Great Rift Valley, Lake Naivasha is a serene freshwater lake surrounded by acacia forests and volcanic landscapes. Take a boat safari to see hippos basking in the shallows and marvel at over 400 bird species including fish eagles, pelicans, and flamingos. Visit nearby Crescent Island for walking safaris among zebras, giraffes, and wildebeest, or explore Hell's Gate National Park with its dramatic gorges and geothermal springs.",
    image: "/images/naivasha.jpg",
    highlights: ["Boat safaris with hippos", "Walking safaris on Crescent Island", "Hell's Gate cycling", "400+ bird species"],
    reverse: false
  },
  {
    name: "Samburu National Reserve",
    tagline: "Land of the Samburu Warriors",
    description: "Discover the untamed beauty of Kenya's northern frontier in Samburu, where rare wildlife thrives in a dramatic semi-arid landscape. Home to the 'Samburu Special Five'—Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, and Beisa oryx—this reserve offers wildlife encounters you won't find anywhere else. The Ewaso Nyiro River attracts elephants, crocodiles, and diverse birdlife, while visits to Samburu villages provide authentic cultural immersion.",
    image: "/images/samburu.jpg",
    highlights: ["Samburu Special Five", "Ewaso Nyiro River", "Cultural encounters", "Unique wildlife species"],
    reverse: true
  }
];

const carouselImages = [
  { src: "/images/mara2.jpg", caption: "Maasai Mara" },
  { src: "/images/amboseli.jpg", caption: "Amboseli" },
  { src: "/images/naivasha.jpg", caption: "Lake Naivasha" },
  { src: "/images/samburu.jpg", caption: "Samburu" },
  { src: "/images/safari.jpg", caption: "Safari Adventure" }
];

export default function Kenya() {
  const currentIndexRef = useRef(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % carouselImages.length;
      updateCarousel();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const updateCarousel = () => {
    if (carouselRef.current) {
      const img = carouselRef.current.querySelector('img');
      const caption = carouselRef.current.querySelector('.carousel-caption');
      
      carouselRef.current.style.opacity = '0';
      
      setTimeout(() => {
        img.src = carouselImages[currentIndexRef.current].src;
        caption.textContent = carouselImages[currentIndexRef.current].caption;
        carouselRef.current.style.opacity = '1';
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-[url('/images/mara2.jpg')] bg-cover bg-center h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-6 drop-shadow-2xl">
            Kenya Safari Adventures
          </h1>
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8">
            Where legends are born and every sunrise brings a new story. 
          </p>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold !text-[#3E2F1C] mb-6">
            Why Kenya? Why Now? Why Baraka Trails?
          </h2>
          <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-10"></div>
          
          <p className="text-lg md:text-xl !text-[#5A4B3A] leading-relaxed mb-8">
            Kenya isn't just a destination—it's a <span className="font-semibold text-[#D4AF37]">transformation</span>. Every moment feels alive, every landscape tells a story, and every encounter stays with you forever.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold !text-[#3E2F1C] mb-3">Crafted With Care</h3>
              <p className="text-[#5A4B3A]">
                Every journey is thoughtfully designed by locals who know Kenya's hidden gems and how to create unforgettable moments.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Camera className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold !text-[#3E2F1C] mb-3">Picture-Perfect Moments</h3>
              <p className="text-[#5A4B3A]">
                From golden sunrises to wildlife encounters, we position you for those once-in-a-lifetime shots and memories.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold !text-[#3E2F1C] mb-3">Beyond Ordinary</h3>
              <p className="text-[#5A4B3A]">
                We don't just show you Kenya—we help you feel it, understand it, and carry it in your heart long after you leave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold !text-[#3E2F1C] mb-4">
              Iconic Destinations Await
            </h2>
            <p className="text-lg text-[#5A4B3A] max-w-3xl mx-auto">
              Each destination is a chapter in your Kenyan story. Which one will capture your heart?
            </p>
          </div>

          {destinations.map((dest, index) => (
            <div
              key={index}
              className={`flex flex-col ${dest.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 mb-24 items-center`}
            >
              {/* Image */}
              <div className="md:w-1/2">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-2xl font-bold">{dest.name}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:w-1/2">
                <h3 className="text-3xl md:text-4xl font-bold !text-[#D4AF37] mb-3">
                  {dest.name}
                </h3>
                <p className="text-xl italic text-[#5A4B3A] mb-6">
                  {dest.tagline}
                </p>
                <p className="text-lg text-[#5A4B3A] leading-relaxed mb-6">
                  {dest.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {dest.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                      <span className="text-[#5A4B3A]">{highlight}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/enquire"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#3E2F1C] text-white font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#3E2F1C] transition-all"
                >
                  Plan Your Visit <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#3E2F1C] to-[#2A1F14]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">
            Your Kenya Story Begins Here
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Every image is a promise. Every landscape is an invitation. Every moment is yours to discover with Baraka Trails.
          </p>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-opacity duration-500"
          >
            <img
              src={carouselImages[0].src}
              alt="Kenya Safari"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="carousel-caption text-3xl font-bold text-white drop-shadow-2xl">
                {carouselImages[0].caption}
              </p>
            </div>
          </div>

          <Link
            to="/enquire"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#D4AF37] text-[#3E2F1C] font-bold rounded-full hover:bg-white transition-all shadow-2xl text-xl mt-12"
          >
            Let's Create Your Adventure <ChevronRight size={28} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}