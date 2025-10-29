import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaThreads, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Animation variants for staggered icons
  const iconContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const iconItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="relative w-full bg-gradient-to-t from-[#3B2A1F] to-[#2B1F0F] text-[#F9F5F0] py-20">
      <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row gap-10 justify-between">
        
        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col gap-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37]">Quick Links</h3>
          <ul className="space-y-2 text-[#F9F5F0]/90">
            <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-[#D4AF37] transition-colors">Destinations</Link></li>
            <li><Link to="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link></li>
            <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Contact & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col gap-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37]">Contact Us</h3>
          <p className="text-[#F9F5F0]/90">Email: info@barakatrails.com</p>
          <p className="text-[#F9F5F0]/90">Phone: +255768902606</p>

          {/* Animated Social Icons */}
          <motion.div
            className="flex gap-5 mt-4 text-[#D4AF37] text-xl"
            variants={iconContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.a
              variants={iconItem}
              href="https://www.facebook.com/kilitrekking"
              aria-label="Facebook"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              variants={iconItem}
              href="https://www.instagram.com/baraka_trails"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              variants={iconItem}
              href="https://www.threads.net/@baraka_trails"
              aria-label="Threads"
              className="hover:scale-110 transition-transform"
            >
              <FaThreads />
            </motion.a>
            {/* <motion.a
              variants={iconItem}
              href="#"
              aria-label="Twitter"
              className="hover:scale-110 transition-transform"
            >
              <FaTwitter />
            </motion.a> */}
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-10 text-center text-sm text-[#F9F5F0]/70">
        &copy; {new Date().getFullYear()} Baraka Trails. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
