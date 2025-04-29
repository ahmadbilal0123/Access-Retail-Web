"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const gsap = (window as any).gsap

    if (!gsap) return

    // Create floating brand elements
    const createFloatingBrands = () => {
      // Clear existing elements
      const existingElements = container.querySelectorAll(".floating-brand")
      existingElements.forEach((el) => el.remove())

      const brandSymbols = ["N", "C", "P", "U", "E", "J", "T", "Z", "S"]

      brandSymbols.forEach((symbol, index) => {
        const element = document.createElement("div")
        element.classList.add("floating-brand")
        element.style.position = "absolute"
        element.style.fontFamily = "sans-serif"
        element.style.fontSize = "80px"
        element.style.fontWeight = "bold"
        element.style.color = "rgba(255, 255, 255, 0.02)"
        element.style.opacity = "0"
        element.style.zIndex = "0"
        element.style.pointerEvents = "none"
        element.textContent = symbol

        // Random position
        element.style.top = `${Math.random() * 80 + 10}%`
        element.style.left = `${Math.random() * 80 + 10}%`

        container.appendChild(element)

        // Animate with GSAP
        gsap.to(element, {
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
        })

        // Floating animation
        gsap.to(element, {
          y: `${Math.random() * 50 - 25}`,
          x: `${Math.random() * 50 - 25}`,
          rotation: Math.random() * 20 - 10,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }

    // Create connection lines between brands
    const createConnectionLines = () => {
      // Clear existing lines
      const existingLines = container.querySelectorAll(".connection-line")
      existingLines.forEach((el) => el.remove())

      const brands = container.querySelectorAll(".floating-brand")
      if (brands.length < 2) return

      // Create SVG container
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.classList.add("connection-line")
      svg.style.position = "absolute"
      svg.style.top = "0"
      svg.style.left = "0"
      svg.style.width = "100%"
      svg.style.height = "100%"
      svg.style.pointerEvents = "none"
      svg.style.zIndex = "0"

      // Create gradient
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
      gradient.setAttribute("id", "line-gradient")
      gradient.setAttribute("gradientTransform", "rotate(90)")

      const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop1.setAttribute("offset", "0%")
      stop1.setAttribute("stop-color", "rgba(59, 130, 246, 0.05)")

      const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop2.setAttribute("offset", "100%")
      stop2.setAttribute("stop-color", "rgba(225, 29, 72, 0.05)")

      gradient.appendChild(stop1)
      gradient.appendChild(stop2)
      defs.appendChild(gradient)
      svg.appendChild(defs)

      // Connect some brands with lines
      const brandsArray = Array.from(brands)
      for (let i = 0; i < brandsArray.length; i++) {
        // Connect to 1-2 other random brands
        const numConnections = Math.floor(Math.random() * 2) + 1

        for (let j = 0; j < numConnections; j++) {
          // Pick a random brand to connect to
          const targetIndex = Math.floor(Math.random() * brandsArray.length)
          if (targetIndex === i) continue // Skip self-connections

          const sourceBrand = brandsArray[i]
          const targetBrand = brandsArray[targetIndex]

          // Get positions
          const sourceRect = sourceBrand.getBoundingClientRect()
          const targetRect = targetBrand.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()

          // Calculate positions relative to container
          const x1 = sourceRect.left + sourceRect.width / 2 - containerRect.left
          const y1 = sourceRect.top + sourceRect.height / 2 - containerRect.top
          const x2 = targetRect.left + targetRect.width / 2 - containerRect.left
          const y2 = targetRect.top + targetRect.height / 2 - containerRect.top

          // Create line
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
          line.setAttribute("x1", x1.toString())
          line.setAttribute("y1", y1.toString())
          line.setAttribute("x2", x2.toString())
          line.setAttribute("y2", y2.toString())
          line.setAttribute("stroke", "url(#line-gradient)")
          line.setAttribute("stroke-width", "1")
          line.setAttribute("stroke-dasharray", "4,4")
          line.setAttribute("opacity", "0.3")

          svg.appendChild(line)

          // Animate the dash offset for a moving dashed line effect
          gsap.to(line, {
            attr: { "stroke-dashoffset": -8 },
            duration: 1,
            repeat: -1,
            ease: "linear",
          })
        }
      }

      container.appendChild(svg)
    }

    // Create particles
    const createParticles = () => {
      // Clear existing particles
      const existingParticles = container.querySelectorAll(".client-particle")
      existingParticles.forEach((el) => el.remove())

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div")
        particle.classList.add("client-particle")
        particle.style.position = "absolute"
        particle.style.width = `${Math.random() * 4 + 1}px`
        particle.style.height = particle.style.width
        particle.style.borderRadius = "50%"

        // Random color from brand palette
        const colors = [
          "rgba(59, 130, 246, 0.1)", // blue
          "rgba(225, 29, 72, 0.1)", // red
          "rgba(168, 85, 247, 0.1)", // purple
          "rgba(16, 185, 129, 0.1)", // green
          "rgba(245, 158, 11, 0.1)", // amber
        ]

        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
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
          y: `${Math.random() * 100 - 50}`,
          x: `${Math.random() * 100 - 50}`,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }

    // Initialize
    createFloatingBrands()
    setTimeout(() => {
      createConnectionLines()
    }, 1000) // Delay to ensure brands are positioned
    createParticles()

    // Update on window resize
    const handleResize = () => {
      createFloatingBrands()
      setTimeout(() => {
        createConnectionLines()
      }, 1000)
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      // Clean up animations
      if (gsap) {
        gsap.killTweensOf(".floating-brand, .client-particle, .connection-line line")
      }

      // Remove elements
      const elements = container.querySelectorAll(".floating-brand, .client-particle, .connection-line")
      elements.forEach((el) => el.remove())
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" />
}

