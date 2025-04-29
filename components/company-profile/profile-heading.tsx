"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function ProfileHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const handleAnimation = (e: Event) => {
      const { masterTimeline } = (e as CustomEvent).detail
      if (!masterTimeline || !headingRef.current) return

      // Add heading animation to master timeline
      masterTimeline.from(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      )
    }

    window.addEventListener("companyProfileInView", handleAnimation)
    return () => window.removeEventListener("companyProfileInView", handleAnimation)
  }, [])

  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "5rem" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
      />

      <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
      Corporate <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Profile</span>
      </h2>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4"
      />
    </div>
  )
}

