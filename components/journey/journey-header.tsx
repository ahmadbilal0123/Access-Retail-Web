"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function JourneyHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "5rem" } : { width: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
      />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        Our <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Journey</span>
      </motion.h2>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 text-blue-100 max-w-2xl mx-auto"
      >
        Explore our evolution from a specialized retail audit provider to the comprehensive retail intelligence leader
        we are today. Each milestone represents our commitment to innovation and excellence.
      </motion.p>
    </div>
  )
}

