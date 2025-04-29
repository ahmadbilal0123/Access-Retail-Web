"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Script from "next/script"

export default function AfghanHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  // Initialize Vanta.js effect
  useEffect(() => {
    if (!vantaLoaded || !heroRef.current) return

    if (!vantaEffect && window.THREE) {
      setVantaEffect(
        window.VANTA.GLOBE({
          el: heroRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3b82f6,
          color2: 0xe11d48,
          backgroundColor: 0x0a1d3b,
          size: 1.5,
          speed: 0.3,
        }),
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect, vantaLoaded])

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        onLoad={() => {
          const vantaScript = document.createElement("script")
          vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
          vantaScript.onload = () => setVantaLoaded(true)
          document.body.appendChild(vantaScript)
        }}
      />

      <div className="relative min-h-[60vh] flex items-center" ref={heroRef}>
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/60 to-blue-950/80 z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 z-20 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-6"
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Our Operations in{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                Afghanistan
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl md:text-2xl text-blue-100 leading-relaxed"
            >
              Expanding research capabilities across borders
            </motion.p>
          </div>
        </div>
      </div>
    </>
  )
}

