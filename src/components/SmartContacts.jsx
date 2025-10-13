import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Phone,
  Instagram,
  MessageSquare,
  Facebook,
} from "lucide-react";

export default function SmartContacts() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // 🌀 Show/hide based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
          {/* Popup container */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key="contacts-popup"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="mb-3 rounded-2xl shadow-xl p-4 flex flex-col gap-3 border border-gray-100
                           bg-white/40 backdrop-blur-md text-gray-800"
              >
                <div className="text-[#3E2F1C] font-semibold text-sm mb-1">
                  Quickly Contact Us
                </div>

                <a
                  href="https://wa.me/255768902606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-green-600 transition"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>

                <a
                  href="tel:+255768902606"
                  className="flex items-center gap-3 hover:text-blue-600 transition"
                >
                  <Phone size={20} />
                  Call Us
                </a>

                <a
                  href="https://www.threads.net/@baraka_trails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-sky-600 transition"
                >
                  <MessageSquare size={20} />
                  Threads
                </a>

                <a
                  href="https://www.instagram.com/baraka_trails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-pink-600 transition"
                >
                  <Instagram size={20} />
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/kilitrekking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-blue-800 transition"
                >
                  <Facebook size={20} />
                  Facebook
                </a>

                {/* Smooth Close Button at Bottom */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  className="mt-3 text-sm text-gray-700 flex items-center justify-center gap-1 hover:text-gray-900 transition"
                >
                  <X size={18} />
                  Close
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main bubble button (always fixed position) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="bg-[#D4AF37] text-[#3E2F1C] rounded-full p-4 shadow-lg flex items-center gap-2 hover:bg-[#C49E2C] transition-all duration-200 font-semibold"
          >
            <MessageCircle size={22} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
