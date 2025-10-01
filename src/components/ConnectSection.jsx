import { motion } from 'framer-motion';

const ConnectSection = () => {
  const handleJoinClick = () => {
    const footerForm = document.getElementById('newsletter-form');
    if (footerForm) {
      footerForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-20 bg-[#3E2F1C] text-[#F9F5F0]">
      <div className="container mx-auto px-6 md:px-20 text-center flex flex-col items-center gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Let’s Connect!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl max-w-xl"
        >
          Join our newsletter to stay updated with the latest adventures, safari offers, and travel tips.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleJoinClick}
          className="px-8 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors"
        >
          Join Here
        </motion.button>
      </div>
    </section>
  );
};

export default ConnectSection;
