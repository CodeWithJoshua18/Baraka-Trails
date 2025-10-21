import { useState, useEffect, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const scrolled = window.scrollY > 50;
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Climbing Kilimanjaro', path: '/climbing' },
    { name: 'Safari', path: '/safari' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  const textColor = isScrolled ? 'text-black' : 'text-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-screen z-[9999] transition-all duration-300 ${
          isScrolled ? 'bg-white/90 shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-8 max-w-screen-2xl mx-auto">
          {/* Logo + Text */}
          <Link
            to="/"
            className={`flex items-center gap-3 ${textColor} flex-shrink-0`}
          >
            <img
              src="/images/logo2.png"
              alt="Baraka Trails Logo"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <span className="font-extrabold tracking-widest uppercase text-lg md:text-xl">
              Baraka Trails
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 group ${textColor} hover:text-[#D4AF37] whitespace-nowrap`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D4AF37] transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link to="/enquire">
              <Button className="bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C]">
                Enquire
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative z-[10002] flex-shrink-0 ${textColor} transition-transform duration-300`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 transform rotate-180 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Smooth Transition */}
      <div
        className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-8 backdrop-blur-xl bg-black/60 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-5 invisible'
        }`}
      >
        {/* Close button inside menu */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-4 text-white z-[10001] p-2"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Animated Links */}
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-white text-2xl font-bold hover:text-[#D4AF37] transition-all duration-300 transform ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0 delay-[' + index * 100 + 'ms]'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {link.name}
          </Link>
        ))}

        <Link to="/enquire">
          <Button className="bg-[#D4AF37] text-[#3E2F1C] hover:bg-[#C49E2C] px-8 py-3 font-bold transition-all duration-300">
            Enquire
          </Button>
        </Link>
      </div>
    </>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
