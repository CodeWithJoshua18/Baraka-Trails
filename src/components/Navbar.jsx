import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mountain } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Climbing Kilimanjaro', href: '#climbing' },
    { name: 'Safari', href: '#safari' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'About Us', href: '#about' },
    { name: 'Blog', href: '#blog' },
  ];

  const textColor = isScrolled ? 'text-black' : 'text-white';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          isScrolled ? 'bg-white/90 shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 cursor-pointer ${textColor}`}
          >
            <Mountain className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-xl font-bold">Baraka Trails</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-colors duration-300 group ${textColor} group-hover:text-[#D4AF37]`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D4AF37] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <Button className="bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C]">
              Enquire
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden z-50 ${textColor}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Full-Screen Blur */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Full-Screen Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-In Menu Fullscreen */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="fixed top-0 left-0 right-0 bottom-0 z-50 flex flex-col items-center justify-center gap-8 bg-transparent backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white z-50"
              >
                <X className="w-8 h-8" />
              </button>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-2xl font-bold hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button
                className="bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C] px-8 py-3 font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Enquire
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
