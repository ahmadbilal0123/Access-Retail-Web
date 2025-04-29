"use client"

import { useEffect, useRef } from "react"
import { Lightbulb, Users, CheckCircle, Globe, Clock, Smartphone } from "lucide-react"

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const gsap = (window as any).gsap

    if (!gsap) return

    // Create floating icons
    const createFloatingIcons = () => {
      // Clear existing elements
      const existingIcons = container.querySelectorAll(".floating-icon")
      existingIcons.forEach((el) => el.remove())

      const icons = [
        { Icon: Lightbulb, color: "blue" },
        { Icon: Users, color: "red" },
        { Icon: CheckCircle, color: "blue" },
        { Icon: Globe, color: "red" },
        { Icon: Clock, color: "blue" },
        { Icon: Smartphone, color: "red" },
      ]

      icons.forEach((iconData, index) => {
        const { Icon, color } = iconData
        const element = document.createElement("div")
        element.classList.add("floating-icon")
        element.style.position = "absolute"
        element.style.width = "40px"
        element.style.height = "40px"
        element.style.color = color === "blue" ? "rgba(59, 130, 246, 0.1)" : "rgba(225, 29, 72, 0.1)"
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
        if (Icon === Lightbulb) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path.setAttribute(
            "d",
            "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14",
          )
          svg.appendChild(path)
        } else if (Icon === Users) {
          const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path1.setAttribute("d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2")
          svg.appendChild(path1)

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", "9")
          circle.setAttribute("cy", "7")
          circle.setAttribute("r", "4")
          svg.appendChild(circle)

          const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path2.setAttribute("d", "M22 21v-2a4 4 0 0 0-3-3.87")
          svg.appendChild(path2)

          const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path3.setAttribute("d", "M16 3.13a4 4 0 0 1 0 7.75")
          svg.appendChild(path3)
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
          opacity: 0.5,
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
    }

    // Create particles
    const createParticles = () => {
      // Clear existing particles
      const existingParticles = container.querySelectorAll(".particle")
      existingParticles.forEach((el) => el.remove())

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle")
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

    // Initialize
    createFloatingIcons()
    createParticles()

    // Update on window resize
    const handleResize = () => {
      createFloatingIcons()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      // Clean up animations
      if (gsap) {
        gsap.killTweensOf(".floating-icon, .particle")
      }

      // Remove elements
      const elements = container.querySelectorAll(".floating-icon, .particle")
      elements.forEach((el) => el.remove())
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" />
}

