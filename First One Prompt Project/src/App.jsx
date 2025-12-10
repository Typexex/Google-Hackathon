import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { motion } from 'framer-motion'
import Scene from './components/Scene'

const UI = () => {
  const title = "TESSERACT"
  const subtitle = "A new dimension of digital artistry."
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
      <div className="text-center">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold font-sans tracking-widest text-white mix-blend-difference"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p 
          className="text-md md:text-lg font-mono tracking-wide text-gray-300 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {subtitle}
        </motion.p>
      </div>
      <motion.div 
        className="absolute bottom-10 flex space-x-4 pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <button className="px-6 py-2 font-mono text-sm uppercase tracking-wider glassmorphism rounded-md hover:bg-white/10 transition-colors duration-300">
          Explore
        </button>
        <button className="px-6 py-2 font-mono text-sm uppercase tracking-wider glassmorphism rounded-md hover:bg-white/10 transition-colors duration-300">
          Connect
        </button>
      </motion.div>
    </div>
  )
}


function App() {
  return (
    <>
      <UI />
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
      <Leva collapsed />
    </>
  )
}

export default App