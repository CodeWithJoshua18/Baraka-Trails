import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-t from-[#3B2A1F] to-[#2B1F0F] text-[#F9F5F0] py-20">
      <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row gap-10 justify-between">
        
        {/* Newsletter Form */}
        <motion.div
          id="newsletter-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col gap-4"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37]">Subscribe to our Newsletter</h3>
          <p className="text-[#F9F5F0]/90">
            Get updates, travel tips, and exclusive safari offers straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-md border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-md hover:bg-[#C49E2C] transition-colors"
            >
              Subscribe
            </button>
          </form>
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
          <p>Email: info@barakatrails.com</p>
          <p>Phone: +254 700 000 000</p>
          <div className="flex gap-4 mt-2 text-[#D4AF37]">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 text-center text-sm text-[#F9F5F0]/70">
        &copy; {new Date().getFullYear()} Baraka Trails. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
