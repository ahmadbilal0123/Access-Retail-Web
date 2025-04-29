"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  finishLoading: () => void
}

export default function LoadingScreen({ finishLoading }: LoadingScreenProps) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => finishLoading(), 2600)
    return () => clearTimeout(timer)
  }, [finishLoading])

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevCounter + 5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading-screen"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-blue-950"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
      >
        <div className="relative flex flex-col items-center">
          {/* Logo animation */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  strokeLinecap="round"
                  strokeDasharray="1 1"
                />
                <motion.path
                  d="M28 40L36 48L52 32"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#0077ff" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-blue-500/20 blur-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.7 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Text animation */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-white relative"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Access</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Retail</span>
            </motion.h1>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-blue-900/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="text-blue-200 mt-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {counter === 100 ? "Ready" : "Loading..."}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

