import React from "react";
import { motion } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa";

const GlassButton = ({ text = "Details", onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="group relative px-6 py-2 rounded-xl 
                 bg-[#0b0d17]/80 backdrop-blur-md border border-white/10 
                 flex items-center gap-2 overflow-hidden 
                 text-white font-medium transition-all duration-500 
                 shadow-[0_0_20px_rgba(0,0,0,0.7)]"
    >
      {/* --- Top soft light beam (exact as screenshot) --- */}
      <span
        className="absolute -top-20 left-1/2 -translate-x-1/2 
                   w-[250px] h-[200px]
                   bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.05)_60%,transparent_100%)]
                   opacity-70 group-hover:opacity-100 
                   transition-all duration-700 blur-lg pointer-events-none"
      ></span>

      {/* --- Inner subtle reflection --- */}
      <span className="absolute border inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-30"></span>

      {/* --- Gradient Text --- */}
      <span className="relative bg-gradient-to-r from-[#b6c5ff] to-[#00d4ff] bg-clip-text text-transparent">
        {text}
      </span>

      {/* --- Arrow --- */}
      {/* <FaArrowRight className="relative text-[#a8bfff]" /> */}
    </motion.button>
  );
};

export default GlassButton;
