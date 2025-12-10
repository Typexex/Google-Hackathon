import React from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

export default function UI() {
  const reducedMotion = usePrefersReducedMotion()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.5 
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  }

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Title */}
      <motion.h1 
        variants={itemVariants}
        className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-white mix-blend-difference mb-4 text-center"
      >
        TESSERACT
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        variants={itemVariants}
        className="text-sm md:text-base lg:text-lg text-gray-400 font-mono mb-12 tracking-wide text-center px-4"
      >
        A new dimension of digital artistry.
      </motion.p>

      {/* Buttons Container */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-6 pointer-events-auto"
      >
        <button className="glass-btn">
          Explore
        </button>
        <button className="glass-btn">
          Connect
        </button>
      </motion.div>

      {/* Footer / Decorative Text */}
      <motion.div 
        variants={itemVariants}
        className="absolute bottom-8 text-xs text-white/30 font-mono tracking-widest uppercase"
      >
        Interactive WebGL Experience
      </motion.div>
    </motion.div>
  )
}