

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

/**
 * NOTE:
 * - If you want full international phone input with flags + search, replace the select + input
 *   with `react-phone-input-2` as discussed earlier.
 */

const questions = [
  { id: 1, text: 'Where would you like to travel?', options: ['Safari', 'Climbing', 'Destinations', 'Open to ideas'] },
  { id: 2, text: 'What is your budget per person?', options: ['<$500', '$500-$1000', '$1000-$2000', '>$2000'] },
  { id: 3, text: 'When do you want to travel?', options: ['Next month', 'In 3 months', 'In 6 months', 'No preference'] },
  { id: 4, text: 'Duration of the travel?', options: ['1-3 days', '4-7 days', '1-2 weeks', '2+ weeks'] },
  { id: 5, text: 'Who are you travelling with?', options: ['Alone', 'Friends', 'Family', 'Couple'] },
  { id: 6, text: 'Your age?', options: ['<18', '18-25', '26-40', '41-60', '60+'] },
];

// small fallback list — can be swapped out for a full dataset or react-phone-input-2
const countryCodes = [
  { name: "Kenya", code: "+254" },
  { name: "Tanzania", code: "+255" },
  { name: "Uganda", code: "+256" },
  { name: "USA", code: "+1" },
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
    setAnswers((prev) => ({ ...prev, [questions[currentStep].id]: option }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (acceptedTerms) {
      // if showing form, go back to terms
      setAcceptedTerms(false);
      setCurrentStep(questions.length);
      return;
    }
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    // Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY with your EmailJS credentials
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
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // mobile progress percent
  const percent = Math.round((Math.min(currentStep, questions.length) / questions.length) * 100);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image side (visible on mobile as top banner, and left-half on md+) */}
      <div className="w-full md:w-1/2 relative h-56 md:h-screen">
        <img
          src="/images/safari.jpg"
          alt="Baraka Trails - Safari"
          className="w-full h-full object-cover"
        />
        {/* overlay text (blend with image but readable) */}
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center px-6">
          <div className="text-center">
            <h1
              style={{ color: '#fff' }}
              className="text-2xl md:text-4xl font-extrabold drop-shadow-lg"
            >
              Baraka Trails
            </h1>
            <p
              style={{ color: '#fff' }}
              className="mt-2 text-sm md:text-lg drop-shadow-sm"
            >
              Travel is more than visiting places — it’s creating stories that last a lifetime.
            </p>
          </div>
        </div>
      </div>

      {/* Questionnaire side */}
      <div
        className="flex-1 flex flex-col items-center px-4 py-8 md:px-10 relative min-h-screen w-full"
        style={{ background: "linear-gradient(to bottom right, #f9f9f9, #eaeaea)" }}
      >
        {/* floating Home button (glowing) */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.06, boxShadow: "0 0 18px rgba(212,175,55,0.9)" }}
          whileTap={{ scale: 0.97 }}
          className="fixed top-4 right-4 md:top-6 md:right-6 bg-[#D4AF37] text-white p-3 rounded-full shadow-lg z-40"
          aria-label="Back to home"
        >
          <Home className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        <div className="relative z-10 w-full">
          {/* small back link (inside content) */}
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="self-start mb-4 flex items-center gap-2"
              style={{ color: '#000' }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span style={{ color: '#000' }}>Back</span>
            </button>
          )}

          {/* push down on mobile so the home icon doesn't float in a big empty space */}
          <section className={`w-full max-w-2xl flex flex-col items-center ${currentStep < questions.length ? 'mt-16 md:mt-0' : ''}`}>
            <AnimatePresence initial={false}>
              {currentStep < questions.length && (
                <motion.div
                  key={questions[currentStep].id}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6 w-full text-center"
                >
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#000' }}>
                    {questions[currentStep].text}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {questions[currentStep].options.map((opt) => (
                      <Button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="bg-[#D4AF37] text-white hover:bg-[#C49E2C] py-3 px-4 rounded-xl font-semibold shadow-md transition"
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>

                  {/* progress bar placed lower to help fill visual gap on mobile */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-8">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / questions.length) * 100}%`, background: '#D4AF37' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TERMS / ACCEPT */}
            {currentStep === questions.length && !acceptedTerms && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6 w-full"
              >
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center" style={{ color: '#000' }}>
                  🌍 Adventure Awaits — Let's Go!
                </h2>

                <div className="max-h-64 overflow-y-auto mb-4 text-left leading-relaxed" style={{ color: '#000' }}>
                  <p style={{ color: '#000', fontWeight: 600 }}>Terms & Conditions</p>
                  <p className="mt-2">Welcome, adventurer! Before we embark, please review our terms and conditions.</p>
                  <p className="mt-2">[Terms and Conditions – Baraka Trails
 Read Baraka Trails’ terms and conditions for Kilimanjaro climbs and Tanzania safaris. Learn about bookings, payments, cancellations, liability, health requirements, and travel insurance.
Introduction
Welcome to Baraka Trails. These Terms and Conditions outline the rules and responsibilities when booking a Kilimanjaro climb, Tanzania safari, chimpanzee trekking tour, or any other travel package with us. By confirming a booking, you agree to abide by these terms.
1. Booking and Confirmation
	A booking is confirmed once Baraka Trails receives a deposit as specified in your quotation.
	The balance payment must be made before the start of your trip (usually 30 days prior to departure unless stated otherwise).
	Failure to pay the balance on time may result in cancellation of your booking.
2. Payments
	Payments can be made via bank transfer, credit card, or other approved methods.
	All transaction fees, including bank charges, are the responsibility of the client.
	Prices are quoted in USD unless otherwise stated.
3. Cancellations and Refunds
	60+ days before departure: Deposit refundable minus administrative fees.
	30–59 days before departure: 50% of the tour price is refundable.
	Less than 30 days before departure: No refund.
	Refunds may take up to 7 days to process.
4. Travel Insurance
	All clients must have travel insurance covering:
o	Medical emergencies
o	Evacuation (including helicopter rescue from Kilimanjaro)
o	Trip cancellations and delays
	Proof of insurance may be requested before departure.
5. Health and Fitness Requirements
	Clients are responsible for ensuring they are in good health before joining a Kilimanjaro trek or safari.
	A medical check-up is recommended prior to climbing Mount Kilimanjaro.
	Baraka Trails reserves the right to refuse participation if a client is deemed unfit to travel.

6. Risks and Liability
	While Baraka Trails takes every precaution to ensure your safety, participation in Kilimanjaro climbs, wildlife safaris, and trekking adventures carries inherent risks.
	Baraka Trails is not liable for:
o	Illness, injury, or death
o	Loss or damage of personal property
o	Delays or cancellations caused by weather, strikes, political unrest, or natural disasters
	Clients are required to follow guide instructions at all times.
7. Changes to Itinerary
	Baraka Trails reserves the right to alter itineraries due to weather, safety, park regulations, or unforeseen circumstances.
	Any additional costs incurred will be the client’s responsibility.
8. Porter and Crew Welfare
	Baraka Trails follows Tanzania Porters Association (TPA) and Kilimanjaro Guides Association (KGA) standards to ensure fair treatment of porters and crew.
	This includes fair wages, proper gear, reasonable loads, and adequate food.
9. Client Responsibility
	Clients must ensure valid passports, visas, vaccinations, and other entry requirements.
	Clients must respect local customs, wildlife regulations, and environmental guidelines (Leave No Trace principles).
10. Governing Law
	These Terms and Conditions are governed by the laws of the United Republic of Tanzania.
	Any disputes shall be resolved under Tanzanian jurisdiction.
Contact Us
For questions regarding these Terms and Conditions, please contact:

]</p>
                  <p className="mt-2 italic text-sm">By clicking "I'm Ready to Explore", you agree to these terms.</p>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setAcceptedTerms(true)}
                    className="bg-[#D4AF37] text-white hover:bg-[#C49E2C] py-3 px-6 rounded-xl font-bold shadow-md"
                  >
                    🚀 I'm Ready to Explore!
                  </Button>
                </div>
              </motion.div>
            )}

            {/* FINAL FORM */}
            {acceptedTerms && (
              <motion.form
                key="enquire-form"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-10 w-full space-y-4"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-center" style={{ color: '#000' }}>
                  ✨ Tell Us About You
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    style={{ color: '#000' }}
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                    style={{ color: '#000' }}
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  style={{ color: '#000' }}
                />

                <input
                  name="country"
                  type="text"
                  placeholder="Country of Residence"
                  required
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  style={{ color: '#000' }}
                />

                <div className="flex flex-col md:flex-row gap-2">
                  <select
                    value={selectedCode}
                    onChange={(e) => setSelectedCode(e.target.value)}
                    className="border rounded-lg p-3 w-full md:w-1/3"
                    style={{ color: '#000' }}
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                    ))}
                  </select>

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    onChange={handleChange}
                    className="flex-1 border rounded-lg p-3"
                    style={{ color: '#000' }}
                  />
                </div>

                <Button type="submit" className="bg-[#D4AF37] text-white hover:bg-[#C49E2C] py-3 px-6 rounded-xl font-bold w-full">
                  🏔️ Start My Adventure!
                </Button>
              </motion.form>
            )}
          </section>
        </div>

        {/* Mobile sticky progress (visible on small screens only) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95">
          <div className="max-w-xl mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: `${percent}%`, background: '#D4AF37' }}
              />
            </div>
            <div className="text-center text-xs mt-2" style={{ color: '#000' }}>
              {percent}% complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
