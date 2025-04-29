"use client"

import { useEffect, useRef } from "react"

export function JourneyBackground({ gsapLoaded }: { gsapLoaded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // GSAP animations for background elements
  useEffect(() => {
    if (!gsapLoaded || !containerRef.current) return

    const gsap = (window as any).gsap
    if (!gsap) return

    // Create background elements
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
      gridPattern.style.pointerEvents = "none"
      container.appendChild(gridPattern)

      // Fade in grid pattern very subtly
      gsap.to(gridPattern, {
        opacity: 0.03,
        duration: 3,
      })

      // Create timeline path
      const timelinePath = document.createElement("div")
      timelinePath.classList.add("bg-element", "timeline-path")
      timelinePath.style.position = "absolute"
      timelinePath.style.left = "50%"
      timelinePath.style.top = "0"
      timelinePath.style.bottom = "0"
      timelinePath.style.width = "1px"
      timelinePath.style.backgroundImage =
        "linear-gradient(to bottom, rgba(59, 130, 246, 0.1), rgba(225, 29, 72, 0.1), rgba(59, 130, 246, 0.1))"
      timelinePath.style.opacity = "0"
      timelinePath.style.pointerEvents = "none"
      container.appendChild(timelinePath)

      // Fade in timeline path
      gsap.to(timelinePath, {
        opacity: 0.7,
        duration: 2,
      })

      // Create floating year markers
      const years = ["2009", "2013", "2017", "2021", "2024"]
      years.forEach((year, index) => {
        const yearMarker = document.createElement("div")
        yearMarker.classList.add("bg-element", "year-marker")
        yearMarker.style.position = "absolute"
        yearMarker.style.left = `${Math.random() * 30 + 10}%`
        yearMarker.style.top = `${(index / (years.length - 1)) * 80 + 10}%`
        yearMarker.style.fontSize = "64px"
        yearMarker.style.fontWeight = "bold"
        yearMarker.style.color = index % 2 === 0 ? "rgba(59, 130, 246, 0.03)" : "rgba(225, 29, 72, 0.03)"
        yearMarker.style.opacity = "0"
        yearMarker.style.pointerEvents = "none"
        yearMarker.textContent = year
        container.appendChild(yearMarker)

        // Fade in year marker
        gsap.to(yearMarker, {
          opacity: 1,
          duration: 2,
          delay: index * 0.2,
        })

        // Subtle floating animation
        gsap.to(yearMarker, {
          y: `${Math.random() * 20 - 10}px`,
          x: `${Math.random() * 20 - 10}px`,
          rotation: Math.random() * 5 - 2.5,
          duration: Math.random() * 20 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      // Create gradient orbs
      const blueOrb = document.createElement("div")
      blueOrb.classList.add("bg-element", "gradient-orb")
      blueOrb.style.position = "absolute"
      blueOrb.style.top = "20%"
      blueOrb.style.right = "-10%"
      blueOrb.style.width = "50vh"
      blueOrb.style.height = "50vh"
      blueOrb.style.borderRadius = "50%"
      blueOrb.style.background =
        "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 50%, rgba(59, 130, 246, 0) 70%)"
      blueOrb.style.opacity = "0"
      blueOrb.style.pointerEvents = "none"
      container.appendChild(blueOrb)

      const redOrb = document.createElement("div")
      redOrb.classList.add("bg-element", "gradient-orb")
      redOrb.style.position = "absolute"
      redOrb.style.bottom = "30%"
      redOrb.style.left = "-10%"
      redOrb.style.width = "40vh"
      redOrb.style.height = "40vh"
      redOrb.style.borderRadius = "50%"
      redOrb.style.background =
        "radial-gradient(circle, rgba(225, 29, 72, 0.05) 0%, rgba(225, 29, 72, 0.02) 50%, rgba(225, 29, 72, 0) 70%)"
      redOrb.style.opacity = "0"
      redOrb.style.pointerEvents = "none"
      container.appendChild(redOrb)

      // Fade in orbs
      gsap.to([blueOrb, redOrb], {
        opacity: 0.7,
        duration: 3,
      })

      // Subtle movement
      gsap.to(blueOrb, {
        y: "5%",
        x: "-3%",
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(redOrb, {
        y: "-5%",
        x: "3%",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      })

      // Create animated particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div")
        particle.classList.add("bg-element", "particle")
        particle.style.position = "absolute"
        particle.style.width = `${Math.random() * 4 + 1}px`
        particle.style.height = particle.style.width
        particle.style.borderRadius = "50%"
        particle.style.backgroundColor =
          Math.random() > 0.5
            ? `rgba(59, 130, 246, ${Math.random() * 0.1 + 0.05})`
            : `rgba(225, 29, 72, ${Math.random() * 0.1 + 0.05})`
        particle.style.opacity = "0"
        particle.style.pointerEvents = "none"

        // Random position
        particle.style.top = `${Math.random() * 100}%`
        particle.style.left = `${Math.random() * 100}%`

        container.appendChild(particle)

        // Fade in
        gsap.to(particle, {
          opacity: 1,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 3,
        })

        // Floating animation
        gsap.to(particle, {
          y: `${Math.random() * 100 - 50}px`,
          x: `${Math.random() * 100 - 50}px`,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5,
        })
      }
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

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" />
}

