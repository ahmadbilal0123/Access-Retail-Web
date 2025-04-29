"use client"

import { useRef, useEffect } from "react"
import { motion, type MotionValue, useTransform } from "framer-motion"
import { Calendar, BarChart3, ShoppingBag, Store, MapPin, Building } from "lucide-react"

interface JourneyParallaxBackgroundProps {
  scrollYProgress: MotionValue<number>
}

export function JourneyParallaxBackground({ scrollYProgress }: JourneyParallaxBackgroundProps) {
  // Add this at the beginning of the component function
  useEffect(() => {
    // Prevent any automatic scrolling
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)

  // Transform values for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  // Create floating elements with GSAP
  useEffect(() => {
    if (!containerRef.current) return

    const gsap = (window as any).gsap
    if (!gsap) return

    const container = containerRef.current

    // Create animated background elements
    const createBackgroundElements = () => {
      // Clear any existing elements
      const existingElements = container.querySelectorAll(".bg-element")
      existingElements.forEach((el) => el.remove())

      // Create floating icons
      const icons = [
        { icon: Calendar, color: "blue", size: 40 },
        { icon: BarChart3, color: "red", size: 50 },
        { icon: ShoppingBag, color: "blue", size: 45 },
        { icon: Store, color: "red", size: 55 },
        { icon: MapPin, color: "blue", size: 60 },
        { icon: Building, color: "red", size: 48 },
      ]

      icons.forEach((iconData, index) => {
        const IconComponent = iconData.icon
        const element = document.createElement("div")
        element.classList.add("bg-element", "floating-icon")
        element.style.position = "absolute"
        element.style.width = `${iconData.size}px`
        element.style.height = `${iconData.size}px`
        element.style.color = iconData.color === "blue" ? "rgba(59, 130, 246, 0.1)" : "rgba(225, 29, 72, 0.1)"
        element.style.opacity = "0"
        element.style.zIndex = "0"
        element.style.pointerEvents = "none"

        // Random position
        element.style.top = `${Math.random() * 80 + 10}%`
        element.style.left = `${Math.random() * 80 + 10}%`

        // Create SVG icon
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("width", "100%")
        svg.setAttribute("height", "100%")
        svg.setAttribute("viewBox", "0 0 24 24")
        svg.setAttribute("fill", "none")
        svg.setAttribute("stroke", "currentColor")
        svg.setAttribute("stroke-width", "2")
        svg.setAttribute("stroke-linecap", "round")
        svg.setAttribute("stroke-linejoin", "round")

        // Add icon paths based on type
        if (IconComponent === Calendar) {
          const path1 = document.createElementNS("http://www.w3.org/2000/svg", "rect")
          path1.setAttribute("x", "3")
          path1.setAttribute("y", "4")
          path1.setAttribute("width", "18")
          path1.setAttribute("height", "18")
          path1.setAttribute("rx", "2")
          path1.setAttribute("ry", "2")
          svg.appendChild(path1)

          const path2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
          path2.setAttribute("x1", "16")
          path2.setAttribute("y1", "2")
          path2.setAttribute("x2", "16")
          path2.setAttribute("y2", "6")
          svg.appendChild(path2)

          const path3 = document.createElementNS("http://www.w3.org/2000/svg", "line")
          path3.setAttribute("x1", "8")
          path3.setAttribute("y1", "2")
          path3.setAttribute("x2", "8")
          path3.setAttribute("y2", "6")
          svg.appendChild(path3)

          const path4 = document.createElementNS("http://www.w3.org/2000/svg", "line")
          path4.setAttribute("x1", "3")
          path4.setAttribute("y1", "10")
          path4.setAttribute("x2", "21")
          path4.setAttribute("y2", "10")
          svg.appendChild(path4)
        } else if (IconComponent === ShoppingBag) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path.setAttribute("d", "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 2-2V6l-3-4z")
          svg.appendChild(path)

          const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
          line1.setAttribute("x1", "3")
          line1.setAttribute("y1", "6")
          line1.setAttribute("x2", "21")
          line1.setAttribute("y2", "6")
          svg.appendChild(line1)

          const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path2.setAttribute("d", "M16 10a4 4 0 0 1-8 0")
          svg.appendChild(path2)
        } else {
          // Generic circle for other icons
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", "12")
          circle.setAttribute("cy", "12")
          circle.setAttribute("r", "10")
          svg.appendChild(circle)
        }

        element.appendChild(svg)
        container.appendChild(element)

        // Animate with GSAP
        gsap.to(element, {
          opacity: 0.8,
          duration: 1,
          delay: index * 0.2,
        })

        // Floating animation
        gsap.to(element, {
          y: `${Math.random() * 100 - 50}`,
          x: `${Math.random() * 100 - 50}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      // Create particles
      for (let i = 0; i < 50; i++) {
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
          y: `${Math.random() * 200 - 100}`,
          x: `${Math.random() * 200 - 100}`,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
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
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-blue-900"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Parallax layers */}
      <motion.div className="absolute inset-0" style={{ y: y1, opacity }}>
        <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full bg-red-500/5 blur-3xl"></div>
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: y2, opacity }}>
        <div className="absolute top-[40%] left-[20%] w-72 h-72 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[15%] w-96 h-96 rounded-full bg-red-500/5 blur-3xl"></div>
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: y3, opacity }}>
        <div className="absolute top-[60%] right-[30%] w-48 h-48 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute top-[20%] left-[25%] w-56 h-56 rounded-full bg-red-500/5 blur-3xl"></div>
      </motion.div>
    </div>
  )
}

