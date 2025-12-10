import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

function UIOverlay() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col items-center justify-center text-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl md:text-6xl text-white font-bold tracking-tighter mb-4 font-sans"
        variants={itemVariants}
      >
        DIMENSION X
      </motion.h1>
      <motion.p
        className="text-lg text-gray-300 mb-8 max-w-lg font-mono"
        variants={itemVariants}
      >
        A hyper-realistic crystal tesseract floating in a reactive particle void. The pinnacle of cyberpunk luxury and ethereal sci-fi design.
      </motion.p>
      <motion.button
        className="glassmorphism text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline pointer-events-auto font-mono uppercase tracking-widest"
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        Explore
      </motion.button>
    </motion.div>
  );
}

export default UIOverlay;