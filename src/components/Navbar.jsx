import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Climbing Kilimanjaro', path: '/climbing' },
    { name: 'Safari', path: '/safari' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  const textColor = isScrolled ? 'text-black' : 'text-white';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
      <div
        className={`transition-all duration-300 ${
          isScrolled ? 'bg-white/90 shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <div className={`flex items-center gap-2 cursor-pointer ${textColor}`}>
            <Mountain className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-xl font-bold">Baraka Trails</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 group ${textColor} group-hover:text-[#D4AF37]`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D4AF37] transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link to="/enquire">
              <Button className="bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C]">Enquire</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden z-50 ${textColor}`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Full-Screen - always rendered but toggled by CSS */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black/80 pointer-events-auto transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white z-50"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-white text-2xl font-bold hover:text-[#D4AF37] transition-colors"
          >
            {link.name}
          </Link>
        ))}

        <Link to="/enquire">
          <Button
            className="bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C] px-8 py-3 font-bold"
          >
            Enquire
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
