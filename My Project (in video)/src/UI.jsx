import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

export function UI() {
  return (
    <motion.main 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col items-center text-center space-y-6">
        
        <motion.h1 
          className="text-6xl md:text-8xl font-extrabold tracking-[0.2em] text-white mix-blend-difference select-none"
          variants={itemVariants}
        >
          TESSERACT
        </motion.h1>
        
        <motion.p 
          className="text-gray-400 font-mono text-sm md:text-base tracking-widest uppercase select-none"
          variants={itemVariants}
        >
          A new dimension of digital artistry.
        </motion.p>
        
        <motion.div 
          className="pt-12 flex space-x-6"
          variants={itemVariants}
        >
          <button className="btn-glass text-white">
            EXPLORE
          </button>
          <button className="btn-glass text-white">
            CONNECT
          </button>
        </motion.div>
        
      </div>
      
      <motion.footer 
        className="absolute bottom-8 text-xs text-white/20 font-mono tracking-widest"
        variants={itemVariants}
      >
        TYPE X AI • 2024
      </motion.footer>
    </motion.main>
  );
}