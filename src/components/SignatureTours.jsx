import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const tours = [
{
title: "12 - Day Grand Tour",
subtitle: "(Cultural Experience • Local Cuisine • Wildlife Safari • Zanzibar Escape)",
price: "$4,620 / Person sharing",
description:
"Experience the best of Tanzania in one unforgettable journey. The Grand Tour combines thrilling wildlife safaris, immersive cultural encounters, and culinary discoveries, topped off with a relaxing Zanzibar beach getaway.",
images: ["/images/food.jpeg", "/images/hadzbe.jpg", "/images/zanzibar.jpg", "/images/safari.jpg"],
},
{
title: "14 - Day Premium & Experiential",
subtitle: "(From Jungles to Savannahs to Shores: Gorilla Trekking, Serengeti Safari & Zanzibar Escape)",
price: "$7,870 / Person sharing (All Inclusive)",
description:
"Experience the ultimate East African journey, from trekking mountain gorillas in lush rainforests to exploring the vast Serengeti savannahs and unwinding on Zanzibar’s white-sand beaches. This carefully curated itinerary blends wildlife encounters, cultural immersion, and luxury relaxation, giving you the best of Uganda and Tanzania in one seamless adventure.",
images: ["/images/serengeti.jpeg", "/images/gorilla.jpg"],
},
{
title: "11 - Day Kilimanjaro & Serengeti Adventure",
subtitle: "(Marangu Route Trek • Serengeti Safari)",
price: "$4,090 / Person sharing (All Inclusive)",
description:
"Experience the ultimate Tanzanian adventure — conquer Africa’s highest peak and witness the world’s most breathtaking wildlife spectacle. This 11-day journey combines a 6-day Kilimanjaro trek via the Marangu Route with a 5-day Serengeti safari, offering the perfect balance of challenge, discovery, and relaxation.",
images: ["/images/kilimanjaro.jpg", "/images/serengeti2.jpg"],
},
];

const TourCard = ({ tour }) => {
const [currentImg, setCurrentImg] = useState(0);

useEffect(() => {
if (tour.images.length > 1) {
const interval = setInterval(() => {
setCurrentImg((prev) => (prev + 1) % tour.images.length);
}, 4000);
return () => clearInterval(interval);
}
}, [tour.images.length]);

return (
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="bg-white rounded-2xl p-6 shadow-md"
> <div className="overflow-hidden rounded-xl mb-4 relative h-56">
<motion.img
key={currentImg}
src={tour.images[currentImg]}
alt={tour.title}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.8 }}
className="w-full h-56 object-cover rounded-xl absolute inset-0"
/> </div>
<h3 className="text-2xl font-bold" style={{ color: "#000" }}>
{tour.title} </h3>
<p className="italic text-sm mt-1" style={{ color: "#000" }}>
{tour.subtitle} </p>
<p className="font-semibold mt-2" style={{ color: "#000" }}>
{tour.price} </p>
<p className="mt-4" style={{ color: "#000" }}>
{tour.description} </p>
</motion.div>
);
};

const SignatureTours = () => {
return ( <section className="w-full bg-white py-16"> <div className="max-w-6xl mx-auto px-6">
<h2 className="text-3xl font-bold mb-10 text-center drop-shadow-sm" style={{ color: "#000" }}>
Signature Journeys </h2> <div className="grid md:grid-cols-2 gap-10">
{tours.map((tour, idx) => ( <TourCard key={idx} tour={tour} />
))} </div> </div> </section>
);
};

export default SignatureTours;
