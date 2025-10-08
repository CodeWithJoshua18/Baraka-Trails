import React, { useEffect } from "react";
import { motion } from "framer-motion";

const TripAdvisorWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.jscache.com/wejs?wtype=linkingWidgetRedesign&uniq=446&locationId=12176563&lang=en_US&border=true&display_version=2";
    script.async = true;
    script.dataset.loadtrk = "";
    script.onload = () => {
      script.loadtrk = true;
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.section
      className="w-full py-16 flex flex-col items-center justify-center relative"
      style={{ backgroundColor: "#f9f9f9" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3
        className="text-2xl font-semibold mb-8 text-center"
        style={{ color: "#222" }}
      >
        What Travelers Say About Us
      </h3>

      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="p-6 rounded-xl cursor-pointer hover:bg-white"
        onClick={() =>
          window.open(
            "https://www.tripadvisor.com/Attraction_Review-g297913-d12176563-Reviews-Baraka_Trails-Arusha_Arusha_Region.html",
            "_blank"
          )
        }
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          id="TA_linkingWidgetRedesign446"
          className="TA_linkingWidgetRedesign"
          dangerouslySetInnerHTML={{
            __html: `
              <ul id="jph6hurNnHI" class="TA_links 4qSvss6jtr">
                <li id="90XfWDmD" class="4zsFGzv">
                  <a target="_blank" href="https://www.tripadvisor.com/Attraction_Review-g297913-d12176563-Reviews-Baraka_Trails-Arusha_Arusha_Region.html">
                    <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
                    alt="TripAdvisor" style="width:260px;"/>
                  </a>
                </li>
              </ul>
            `,
          }}
        ></motion.div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Click to view our reviews on TripAdvisor →
        </p>
      </motion.div>
    </motion.section>
  );
};

export default TripAdvisorWidget;

