import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';  // ✅ Import Navbar here

// Pages
import Home from './pages/Home';
import Safari from './pages/Safari';
import Climbing from './pages/Climbing';
import Destinations from './pages/Destinations';
import About from './pages/About';
import Blog from './pages/Blog';
import Enquire from './pages/Enquire';

// Minimal, instant transition
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = { 
  duration: 0.15, // Very fast
  ease: 'linear'
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();
  
  // Hide navbar on the enquire page
  const hideNavbar = location.pathname === '/enquire';

  return (
    <div className="min-h-screen">
      {/* ✅ Navbar stays OUTSIDE animation - prevents cutoff */}
      {!hideNavbar && <Navbar />}

      {/* Animated Routes - only animates page content */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/safari"
            element={
              <AnimatedPage>
                <Safari />
              </AnimatedPage>
            }
          />
          <Route
            path="/climbing"
            element={
              <AnimatedPage>
                <Climbing />
              </AnimatedPage>
            }
          />
          <Route
            path="/destinations"
            element={
              <AnimatedPage>
                <Destinations />
              </AnimatedPage>
            }
          />
          <Route
            path="/about"
            element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            }
          />
          <Route
            path="/blog"
            element={
              <AnimatedPage>
                <Blog />
              </AnimatedPage>
            }
          />
          <Route
            path="/enquire"
            element={
              <AnimatedPage>
                <Enquire />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}