// src/pages/Enquire.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const questions = [
  { id: 1, text: 'Where would you like to travel?', options: ['Safari', 'Climbing', 'Destinations', 'Open to ideas'] },
  { id: 2, text: 'What is your budget per person?', options: ['<$500', '$500-$1000', '$1000-$2000', '>$2000'] },
  { id: 3, text: 'When do you want to travel?', options: ['Next month', 'In 3 months', 'In 6 months', 'No preference'] },
  { id: 4, text: 'Duration of the travel?', options: ['1-3 days', '4-7 days', '1-2 weeks', '2+ weeks'] },
  { id: 5, text: 'Who are you travelling with?', options: ['Alone', 'Friends', 'Family', 'Couple'] },
  { id: 6, text: 'Your age?', options: ['<18', '18-25', '26-40', '41-60', '60+'] },
];

const countryCodes = [
  { code: '+1', name: 'USA' },
  { code: '+44', name: 'UK' },
  { code: '+254', name: 'Kenya' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+81', name: 'Japan' },
  { code: '+7', name: 'Russia' },
  { code: '+39', name: 'Italy' },
  { code: '+27', name: 'South Africa' },
  { code: '+55', name: 'Brazil' },
  { code: '+34', name: 'Spain' },
  { code: '+86', name: 'China' },
];

export default function Enquire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedCode, setSelectedCode] = useState('+254');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
  });

  const handleOptionClick = (option) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      country: formData.country,
      phone: `${selectedCode} ${formData.phone}`,
      answers: JSON.stringify(answers, null, 2),
    };

    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then(() => {
        alert('Form submitted successfully!');
        navigate('/');
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('Failed to send email. Please try again.');
      });
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="min-h-screen bg-[#fefcf7] flex flex-col items-center px-6 py-10">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <img src="/images/logo.png" alt="Baraka Trails" className="w-12 h-12" />
        <h1 className="text-3xl font-bold text-gray-800">Baraka Trails</h1>
      </div>

      {/* Back arrow */}
      {currentStep > 0 && (
        <button
          onClick={handleBack}
          className="self-start mb-6 flex items-center gap-1 text-gray-700 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" /> Back
        </button>
      )}

      <section className="w-full max-w-4xl flex flex-col items-center">
        {/* Questions */}
        <AnimatePresence exitBeforeEnter>
          {currentStep < questions.length && (
            <motion.div
              key={questions[currentStep].id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-10 mb-10 w-full text-center"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{questions[currentStep].text}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentStep].options.map((opt) => (
                  <Button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    className="bg-[#D4AF37] text-white hover:bg-[#C49E2C] py-3 px-6 rounded-xl font-semibold shadow-md transition"
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3 mt-8">
                <div
                  className="bg-[#D4AF37] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / questions.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terms */}
        {currentStep === questions.length && !acceptedTerms && (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-10 w-full text-gray-800"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🌍 Adventure Awaits - Let's Go!</h2>
            <div className="max-h-96 overflow-y-auto mb-6 text-left space-y-4 text-gray-700 leading-relaxed px-4">
              <p className="font-semibold text-lg text-[#D4AF37]">Terms & Conditions</p>
              <p>
                {/* ===== YOUR TERMS AND CONDITIONS GO HERE ===== */}
                Welcome, adventurer! Before we embark on this incredible journey together, please take a moment to review our terms and conditions.
              </p>
              <p>
                [INSERT YOUR FULL TERMS AND CONDITIONS HERE - Include sections about bookings, cancellations, travel policies, liability, payment terms, etc.]
              </p>
              <p className="italic text-sm">
                By clicking "I'm Ready to Explore", you acknowledge that you have read, understood, and agree to these terms.
              </p>
              {/* ===== END OF TERMS AND CONDITIONS ===== */}
            </div>
            <div className="text-center">
              <Button
                onClick={() => setAcceptedTerms(true)}
                className="bg-[#D4AF37] text-white hover:bg-[#C49E2C] py-4 px-12 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                🚀 I'm Ready to Explore!
              </Button>
            </div>
          </motion.div>
        )}

        {/* Form */}
        {acceptedTerms && (
          <motion.form
            key="enquire-form"
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-10 w-full space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">✨ Tell Us About You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
                className="border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-[#D4AF37] focus:outline-none transition"
                onChange={handleChange}
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
                className="border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-[#D4AF37] focus:outline-none transition"
                onChange={handleChange}
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-[#D4AF37] focus:outline-none transition"
              onChange={handleChange}
            />
            <input
              name="country"
              type="text"
              placeholder="Country of Residence"
              required
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-[#D4AF37] focus:outline-none transition"
              onChange={handleChange}
            />
            
            {/* Phone with country code */}
            <div className="flex gap-2">
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-[#D4AF37] focus:outline-none transition"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-[#D4AF37] focus:outline-none transition"
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="bg-[#D4AF37] text-white hover:bg-[#C49E2C] py-4 px-8 rounded-xl font-bold text-lg w-full shadow-lg transition-all transform hover:scale-105"
            >
              🏔️ Start My Adventure!
            </Button>
          </motion.form>
        )}
      </section>
    </div>
  );
}