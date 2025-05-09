"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function AboutHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Make sure the canvas is available
    if (!canvasRef.current) {
      console.error("Canvas element not found")
      return
    }

    const canvas = canvasRef.current
    // Get 2d context with explicit null check and error handling
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      console.error("Could not get 2D context from canvas")
      return
    }

    if (!containerRef.current) {
      console.error("Container element not found")
      return
    }

    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return
      const { width, height } = containerRef.current.getBoundingClientRect()

      // Set display size
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"

      // Set actual size in memory (scaled for high DPI)
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr

      // Scale context to ensure correct drawing operations
      ctx.scale(dpr, dpr)
    }

    // Initial resize
    resizeCanvas()

    // Add resize listener
    window.addEventListener("resize", resizeCanvas)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      update: () => void
      draw: () => void
    }> = []

    const particleCount = 100
    const maxDistance = 150

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string

      constructor() {
        this.x = Math.random() * (canvas.width / window.devicePixelRatio)
        this.y = Math.random() * (canvas.height / window.devicePixelRatio)
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 1
        this.color = "#3b82f6"
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        const width = canvas.width / window.devicePixelRatio
        const height = canvas.height / window.devicePixelRatio

        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [pathname])

  // // return (
  // //   <div className="relative min-h-[60vh] flex items-center" ref={containerRef} id="animation-container">
  // //     {/* Canvas Background */}
  // //     <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ backgroundColor: "#0a1d3b" }} />

  // //     {/* Dark Overlay with Gradient */}
  // //     <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/60 to-blue-950/80 z-10"></div>

  // //     {/* Content */}
  // //     <div className="container mx-auto px-4 z-20 pt-32 pb-20">
  // //       <div className="max-w-4xl mx-auto text-center">
  // //         <motion.div
  // //           initial={{ width: 0 }}
  // //           animate={{ width: "5rem" }}
  // //           transition={{ duration: 1, ease: "easeInOut" }}
  // //           className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-6"
  // //         />

  // //         <motion.h1
  // //           initial={{ opacity: 0, y: 20 }}
  // //           animate={{ opacity: 1, y: 0 }}
  // //           transition={{ duration: 0.7, delay: 0.3 }}
  // //           className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
  // //         >
  // //           Our <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Team</span>
  // //         </motion.h1>

  // //         <motion.p
  // //           initial={{ opacity: 0, y: 20 }}
  // //           animate={{ opacity: 1, y: 0 }}
  // //           transition={{ duration: 0.7, delay: 0.5 }}
  // //           className="text-xl md:text-2xl text-blue-100 leading-relaxed"
  // //         >
  // //           Dedicated to drive data to achieve greater goals
  // //         </motion.p>
  // //       </div>
  // //     </div>
  // //   </div>
  // )
}
