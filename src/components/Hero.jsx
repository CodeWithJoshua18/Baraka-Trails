import React from 'react';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

// This component will be mounted in a separate React tree
class HeroCore extends React.Component {
  constructor(props) {
    super(props);
    this.currentIndex = 0;
    this.slides = [
      {
        title: "Explore the Heights",
        desc: "Climb Kilimanjaro with expert guides and unmatched local insight.",
        btn: "Start Your Ascent",
        href: "/climbing",
      },
      {
        title: "Journey Through the Wild",
        desc: "Embark on immersive safaris across Africa's legendary landscapes.",
        btn: "Plan Your Safari",
        href: "/safari",
      },
      {
        title: "Discover Hidden Destinations",
        desc: "From serene lakes to cultural villages — your next story awaits.",
        btn: "View Destinations",
        href: "/destinations",
      },
      {
        title: "Baraka Trails Experience",
        desc: "Luxury, authenticity, and adventure — crafted for every traveler.",
        btn: "Learn More",
        href: "/about",
      },
    ];
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateDOM();
    }, 5000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  updateDOM = () => {
    const container = document.getElementById('hero-content');
    if (!container) return;

    container.style.opacity = '0';
    
    setTimeout(() => {
      const slide = this.slides[this.currentIndex];
      
      const title = container.querySelector('h1');
      const desc = container.querySelector('p');
      const btn = container.querySelector('button');
      
      if (title) title.textContent = slide.title;
      if (desc) desc.textContent = slide.desc;
      if (btn) {
        btn.textContent = slide.btn;
        btn.onclick = () => this.props.navigate(slide.href);
      }

      // Update dots
      document.querySelectorAll('.hero-dot').forEach((dot, i) => {
        if (i === this.currentIndex) {
          dot.className = 'hero-dot w-3 h-3 rounded-full transition-all bg-[#D4AF37] scale-110';
        } else {
          dot.className = 'hero-dot w-3 h-3 rounded-full transition-all bg-white/60 hover:bg-white';
        }
      });

      container.style.opacity = '1';
    }, 300);
  };

  handleDotClick = (index) => {
    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.updateDOM();
    
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateDOM();
      }, 5000);
    }
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const firstSlide = this.slides[0];
    
    return (
      <section
        className="relative w-full h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('/images/3.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-0"></div>

        <div className="relative z-[1] flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <div id="hero-content" className="max-w-2xl mx-auto space-y-6 transition-opacity duration-300">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#D4AF37] leading-tight drop-shadow-2xl">
              {firstSlide.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              {firstSlide.desc}
            </p>
            <button
              type="button"
              onClick={() => this.props.navigate(firstSlide.href)}
              className="px-8 py-3 bg-[#D4AF37] text-[#3E2F1C] font-semibold rounded-lg hover:bg-[#C49E2C] transition-all shadow-lg"
            >
              {firstSlide.btn}
            </button>
          </div>

          <div className="absolute bottom-10 flex justify-center gap-3 z-[1]">
            {this.slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => this.handleDotClick(i)}
                className={`hero-dot w-3 h-3 rounded-full transition-all ${
                  i === 0 ? "bg-[#D4AF37] scale-110" : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const Hero = () => {
  const navigate = useNavigate();
  return <HeroCore navigate={navigate} />;
};

export default Hero;