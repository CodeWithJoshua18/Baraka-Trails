import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SmartContacts from './components/SmartContacts';

// Pages
import Home from './pages/Home';
import Safari from './pages/Safari';
import Climbing from './pages/Climbing';
import Destinations from './pages/Destinations';
import Kenya from './pages/destinations/Kenya';
import Tanzania from './pages/destinations/Tanzania';
import Uganda from './pages/destinations/Uganda';
import About from './pages/About';
import Blog from './pages/Blog';
import Enquire from './pages/Enquire';

export default function App() {
  
  const location = useLocation();

  const hideNavbar = location.pathname === '/enquire';
  const hideSmartContacts = location.pathname === '/enquire';

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}

      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/safari" element={<Safari />} />
        <Route path="/climbing" element={<Climbing />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/kenya" element={<Kenya />} />
        <Route path="/destinations/tanzania" element={<Tanzania />} />
        <Route path="/destinations/uganda" element={<Uganda />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/enquire" element={<Enquire />} />
      </Routes>

      {!hideSmartContacts && <SmartContacts />}
    </div>
  );
}