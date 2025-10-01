import { motion } from 'framer-motion';
import Button from './Button';

const BookingGuide = () => {
  // Variants for text animation with stagger
  const textVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { staggerChildren: 0.2, duration: 0.8 } 
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  
  return (
    <section className="relative w-full py-20 bg-[#F9F5F0]">
      <div className="container mx-auto flex flex-col md:flex-row items-stretch gap-10 px-6 md:px-20">
        {/* Text Content */}
        <motion.div
          className="flex-1 space-y-6 flex flex-col justify-center"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className="text-3xl md:text-5xl font-bold text-[#3E2F1C]" variants={itemVariant}>
            Plan Your Adventure
          </motion.h2>

          <motion.p className="text-lg md:text-xl text-[#5A4B3A]" variants={itemVariant}>
            Discover curated safari experiences, climb Africa’s highest peaks, and explore breathtaking destinations. Let us guide you through every step of your journey.
          </motion.p>

          <motion.p className="text-lg md:text-xl text-[#5A4B3A]" variants={itemVariant}>
            Our expert guides ensure a safe and unforgettable adventure, from planning to execution. Enjoy personalized itineraries, cultural insights, and exclusive experiences.
          </motion.p>

          <motion.p className="text-lg md:text-xl text-[#5A4B3A]" variants={itemVariant}>
            Whether you’re a first-time traveler or a seasoned explorer, we provide all the tools, tips, and insider knowledge you need for a seamless and memorable trip.
          </motion.p>

          <motion.p className="text-lg md:text-xl text-[#5A4B3A]" variants={itemVariant}>
            From thrilling safaris to scenic hikes, immerse yourself in the beauty and culture of Africa. Every journey is customized for a once-in-a-lifetime adventure.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={itemVariant}>
            <Button className="bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C]">
              Explore Trips
            </Button>
            <Button className="bg-[#3E2F1C] text-[#D4AF37] hover:bg-[#5A4B3A]">
              See Offers
            </Button>
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/images/1.jpg"
            alt="Booking guide"
            className="w-full h-full rounded-xl shadow-lg object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BookingGuide;
