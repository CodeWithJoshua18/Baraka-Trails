import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingGuide from './components/BookingGuide';
import ImageCarousel from './components/ImageCarousel';
import ConnectSection from './components/ConnectSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <BookingGuide />
      <ImageCarousel />
      <ConnectSection />
      <Footer />
    </div>
  );
}

export default App;
