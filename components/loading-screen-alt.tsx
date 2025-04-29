"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  finishLoading: () => void
}

export default function LoadingScreenAlt({ finishLoading }: LoadingScreenProps) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => finishLoading(), 3000)
    return () => clearTimeout(timer)
  }, [finishLoading])

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevCounter + 4
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Animation variants
  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const accessLetters = "Access".split("")
  const retailLetters = "Retail".split("")

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading-screen"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-blue-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="relative flex flex-col items-center">
          {/* Animated logo */}
          <div className="relative mb-8">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer circle */}
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                stroke="url(#loading-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Inner circle */}
              <motion.circle
                cx="60"
                cy="60"
                r="40"
                stroke="url(#loading-gradient-reverse)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />

              {/* A stylized "A" for Access */}
              <motion.path
                d="M45 75L55 45L65 75"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              />

              {/* Crossbar of the "A" */}
              <motion.path
                d="M49 65H61"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1.3 }}
              />

              {/* Stylized "R" for Retail */}
              <motion.path
                d="M70 45V75"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
              />

              <motion.path
                d="M70 45H80C83.3137 45 86 47.6863 86 51V51C86 54.3137 83.3137 57 80 57H70"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
              />

              <motion.path
                d="M70 57L85 75"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 2.1 }}
              />

              <defs>
                <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#0077ff" />
                </linearGradient>
                <linearGradient id="loading-gradient-reverse" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0077ff" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-blue-500/20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>

          {/* Animated text */}
          <div className="flex justify-center space-x-3 mb-8">
            <motion.div className="flex" variants={letterContainerVariants} initial="hidden" animate="visible">
              {accessLetters.map((letter, index) => (
                <motion.span
                  key={`access-${index}`}
                  variants={letterVariants}
                  className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <motion.div className="flex" variants={letterContainerVariants} initial="hidden" animate="visible">
              {retailLetters.map((letter, index) => (
                <motion.span
                  key={`retail-${index}`}
                  variants={letterVariants}
                  className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Progress bar with animated gradient */}
          <div className="w-64 h-1.5 bg-blue-900/50 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full relative" style={{ width: `${counter}%` }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 rounded-full"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
                style={{ backgroundSize: "200% 200%" }}
              />
            </motion.div>
          </div>

          {/* Loading text with dot animation */}
          <motion.div
            className="text-blue-200 mt-3 text-sm flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {counter === 100 ? (
              <span>Ready</span>
            ) : (
              <>
                <span>Loading</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  className="ml-0.5"
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.2 }}
                  className="ml-0.5"
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.4 }}
                  className="ml-0.5"
                >
                  .
                </motion.span>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

