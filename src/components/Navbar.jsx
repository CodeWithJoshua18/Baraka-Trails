import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Debounced scroll handler to prevent excessive re-renders
    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    {name: 'Home', path:'/'},
    { name: 'Climbing Kilimanjaro', path: '/climbing' },
    { name: 'Safari', path: '/safari' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  const textColor = isScrolled ? 'text-black' : 'text-white';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div
        className={`transition-all duration-300 pointer-events-auto ${
          isScrolled ? 'bg-white/90 shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-2 ${textColor}`}>
            <Mountain className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-xl font-bold">Baraka Trails</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 group ${textColor} hover:text-[#D4AF37]`}
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
            className={`md:hidden relative z-[10001] ${textColor} transition-colors`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Full-Screen with Blur Effect */}
      <div
        className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-8 backdrop-blur-xl bg-black/60 pointer-events-auto transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
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