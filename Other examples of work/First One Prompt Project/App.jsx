import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Scene from './components/Scene'

export default function App() {
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: 'easeOut'
      }
    })
  }

  return (
    <>
      <header className="absolute top-0 left-0 z-10 w-full p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-mono text-lg tracking-widest"
        >
          TESSERACT
        </motion.div>
      </header>

      <main className="relative z-10 flex h-screen w-full flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <motion.h1
            className="mb-4 text-6xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl"
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={1}
          >
            ETHEREAL DYNAMICS
          </motion.h1>
          <motion.p
            className="max-w-xl font-mono text-lg text-cyan-200/80"
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={2}
          >
            A new dimension of interactive art. Fusing cyberpunk luxury with ethereal sci-fi aesthetics.
          </motion.p>
          <motion.div
            className="mt-8"
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={3}
          >
            <button className="glassmorphism rounded-full px-8 py-3 font-mono uppercase tracking-widest text-white transition-colors hover:bg-white/20">
              Explore
            </button>
          </motion.div>
        </div>
      </main>

      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  )
}