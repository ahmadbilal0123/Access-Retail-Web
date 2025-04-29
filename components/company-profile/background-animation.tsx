"use client"

import { useEffect, useRef, useState } from "react"

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  // GSAP animations for minimal background elements
  useEffect(() => {
    if (!gsapLoaded || !containerRef.current) return

    const gsap = (window as any).gsap
    if (!gsap) return

    // Create extremely subtle background elements
    const createBackgroundElements = () => {
      const container = containerRef.current
      if (!container) return

      // Clear any existing elements
      const existingElements = container.querySelectorAll(".bg-element")
      existingElements.forEach((el) => el.remove())

      // Create subtle grid pattern
      const gridPattern = document.createElement("div")
      gridPattern.classList.add("bg-element", "grid-pattern")
      gridPattern.style.position = "absolute"
      gridPattern.style.inset = "0"
      gridPattern.style.backgroundImage =
        "linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)"
      gridPattern.style.backgroundSize = "40px 40px"
      gridPattern.style.opacity = "0"
      container.appendChild(gridPattern)

      // Fade in grid pattern very subtly
      gsap.to(gridPattern, {
        opacity: 0.03,
        duration: 3,
      })

      // Create a single, very subtle gradient orb
      const blueOrb = document.createElement("div")
      blueOrb.classList.add("bg-element", "gradient-orb")
      blueOrb.style.position = "absolute"
      blueOrb.style.bottom = "30%"
      blueOrb.style.left = "50%"
      blueOrb.style.transform = "translateX(-50%)"
      blueOrb.style.width = "70vh"
      blueOrb.style.height = "70vh"
      blueOrb.style.borderRadius = "50%"
      blueOrb.style.background =
        "radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0.01) 50%, rgba(59, 130, 246, 0) 70%)"
      blueOrb.style.opacity = "0"
      container.appendChild(blueOrb)

      // Fade in orb very subtly
      gsap.to(blueOrb, {
        opacity: 0.5,
        duration: 3,
      })

      // Extremely subtle movement
      gsap.to(blueOrb, {
        y: "3%",
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    // Initial creation
    createBackgroundElements()

    // Update on window resize
    const handleResize = () => {
      createBackgroundElements()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      // Clean up animations
      gsap.killTweensOf(".bg-element")

      // Remove elements
      const elements = document.querySelectorAll(".bg-element")
      elements.forEach((el) => el.remove())
    }
  }, [gsapLoaded])

  useEffect(() => {
    // Check if GSAP is already loaded
    if ((window as any).gsap) {
      setGsapLoaded(true)
    } else {
      // Listen for GSAP load event from parent component
      const handleGsapLoad = () => setGsapLoaded(true)
      window.addEventListener("gsapLoaded", handleGsapLoad)
      return () => window.removeEventListener("gsapLoaded", handleGsapLoad)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* This div will be populated with minimal animated elements via GSAP */}
    </div>
  )
}

