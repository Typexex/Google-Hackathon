import { motion } from 'framer-motion'

export default function UI() {
  // Staggered entry animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <main className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-12 select-none">
      {/* Top / Header Area - Could be empty or have a logo */}
      <div className="w-full flex justify-between items-start">
        {/* Placeholder for potential logo or top text */}
      </div>

      {/* Center Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <motion.h1 
          variants={item}
          className="text-8xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference mb-4"
        >
          TESSERACT
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="text-gray-400 font-mono text-sm md:text-base tracking-widest uppercase"
        >
          A new dimension of digital artistry.
        </motion.p>
      </motion.div>

      {/* Bottom Area */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full flex justify-center gap-6 pb-8"
      >
        <motion.button
          variants={item}
          className="glass-panel px-8 py-3 rounded-full text-white font-mono text-sm uppercase tracking-wider hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
        >
          Explore
        </motion.button>
        
        <motion.button
          variants={item}
          className="glass-panel px-8 py-3 rounded-full text-white font-mono text-sm uppercase tracking-wider hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
        >
          Connect
        </motion.button>
      </motion.div>
    </main>
  )
}