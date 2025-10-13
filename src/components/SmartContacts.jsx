import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Instagram, MessageSquare, Facebook } from "lucide-react";

export default function SmartContacts() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // 🌀 Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current) {
        setVisible(false); // Hide when scrolling down
      } else {
        setVisible(true); // Show when scrolling up
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="fixed bottom-6 left-6 z-50"
        >
          {/* Bubble button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
            {!open && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-medium hidden sm:block"
              >
                Quickly contact us
              </motion.span>
            )}
          </motion.button>

          {/* Contacts popup */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 bg-white text-gray-800 rounded-2xl shadow-xl p-4 flex flex-col gap-3 border border-gray-200"
              >
                <a
                  href="https://wa.me/255768902606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-green-600"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
                <a
                  href="tel:+255768902606"
                  className="flex items-center gap-3 hover:text-blue-600"
                >
                  <Phone size={20} />
                  Call Us
                </a>
                <a
                  href="https://www.threads.com/@baraka_trails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-sky-500"
                >
                  <MessageSquare size={20} />
                  Threads
                </a>
                <a
                  href="https://www.instagram.com/baraka_trails?igsh=MWZzZnNlczh4ZzZ6Mw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-pink-500"
                >
                  <Instagram size={20} />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/kilitrekking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-blue-800"
                >
                  <Facebook size={20} />
                  Facebook
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}