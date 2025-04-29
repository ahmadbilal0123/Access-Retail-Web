"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { BarChartIcon as ChartBar, ShoppingBag, Store, TrendingUp, Users } from "lucide-react"
import Script from "next/script"

export default function TransformingSection() {
  // Create multiple refs for different elements to animate
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  const [para1Ref, para1InView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const [para2Ref, para2InView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const [iconsRef, iconsInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const [imageRef, imageInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const sectionRef = useRef(null)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  // GSAP animations for background elements
  useEffect(() => {
    if (!gsapLoaded || !sectionRef.current) return

    const gsap = (window as any).gsap
    if (!gsap) return

    // Create animated background elements
    const createBackgroundElements = () => {
      const section = sectionRef.current
      if (!section) return

      // Clear any existing elements
      const existingElements = section.querySelectorAll(".bg-animated-element")
      existingElements.forEach((el) => el.remove())

      // Create new elements
      const shapes = ["circle", "square", "triangle", "diamond"]
      const colors = ["red", "blue"]

      for (let i = 0; i < 20; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 30 + 10 // 10-40px

        const element = document.createElement("div")
        element.classList.add("bg-animated-element", `shape-${shape}`, `color-${color}`)
        element.style.position = "absolute"
        element.style.width = `${size}px`
        element.style.height = `${size}px`
        element.style.opacity = "0"
        element.style.zIndex = "0"

        if (shape === "circle") {
          element.style.borderRadius = "50%"
          element.style.background =
            color === "red"
              ? "radial-gradient(circle, rgba(225,29,72,0.1) 0%, rgba(225,29,72,0.05) 70%, rgba(225,29,72,0) 100%)"
              : "radial-gradient(circle, rgba(30,64,175,0.1) 0%, rgba(30,64,175,0.05) 70%, rgba(30,64,175,0) 100%)"
        } else if (shape === "square") {
          element.style.background =
            color === "red"
              ? "linear-gradient(135deg, rgba(225,29,72,0.1) 0%, rgba(225,29,72,0) 100%)"
              : "linear-gradient(135deg, rgba(30,64,175,0.1) 0%, rgba(30,64,175,0) 100%)"
        } else if (shape === "triangle") {
          element.style.width = "0"
          element.style.height = "0"
          element.style.borderLeft = `${size / 2}px solid transparent`
          element.style.borderRight = `${size / 2}px solid transparent`
          element.style.borderBottom =
            color === "red" ? `${size}px solid rgba(225,29,72,0.08)` : `${size}px solid rgba(30,64,175,0.08)`
          element.style.background = "transparent"
        } else if (shape === "diamond") {
          element.style.transform = "rotate(45deg)"
          element.style.background =
            color === "red"
              ? "linear-gradient(135deg, rgba(225,29,72,0.1) 0%, rgba(225,29,72,0) 100%)"
              : "linear-gradient(135deg, rgba(30,64,175,0.1) 0%, rgba(30,64,175,0) 100%)"
        }

        section.appendChild(element)

        // Position randomly within the section
        gsap.set(element, {
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          opacity: Math.random() * 0.5 + 0.1,
        })

        // Animate
        gsap.to(element, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 40 + 20,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 5,
        })
      }

      // Create floating icons
      const icons = [
        { icon: "chart-bar", color: "blue" },
        { icon: "shopping-bag", color: "red" },
        { icon: "store", color: "blue" },
        { icon: "trending-up", color: "red" },
        { icon: "pie-chart", color: "blue" },
        { icon: "sparkles", color: "red" },
      ]

      for (let i = 0; i < 8; i++) {
        const iconData = icons[Math.floor(Math.random() * icons.length)]
        const element = document.createElement("div")
        element.classList.add("bg-animated-element", "floating-icon", `icon-${iconData.icon}`)
        element.style.position = "absolute"
        element.style.width = "30px"
        element.style.height = "30px"
        element.style.opacity = "0"
        element.style.zIndex = "0"

        // Add icon SVG
        const iconSvg = ""
        if (iconData.icon === "chart-bar") {
          element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`
        } else if (iconData.icon === "shopping-bag") {
          element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
        } else if (iconData.icon === "store") {
          element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v0"/><path d="M18 12v0a2 2 0 0 1-2-2v0"/><path d="M14 12v0a2 2 0 0 1-2-2v0"/><path d="M10 12v0a2 2 0 0 1-2-2v0"/><path d="M6 12v0a2 2 0 0 1-2-2v0"/><path d="M2 7v3a2 2 0 0 0 2 2v0"/></svg>`
        } else if (iconData.icon === "trending-up") {
          element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`
        } else if (iconData.icon === "pie-chart") {
          element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`
        } else if (iconData.icon === "sparkles") {
          element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
        }

        element.style.color = iconData.color === "red" ? "rgba(225,29,72,0.15)" : "rgba(30,64,175,0.15)"
        section.appendChild(element)

        // Position randomly within the section
        gsap.set(element, {
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          scale: Math.random() * 0.5 + 0.8,
          opacity: Math.random() * 0.2 + 0.05,
        })

        // Animate
        gsap.to(element, {
          x: `+=${Math.random() * 150 - 75}`,
          y: `+=${Math.random() * 150 - 75}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 30 + 15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 5,
        })
      }

      // Create animated gradient overlay
      const gradientOverlay = document.createElement("div")
      gradientOverlay.classList.add("bg-animated-element", "gradient-overlay")
      gradientOverlay.style.position = "absolute"
      gradientOverlay.style.inset = "0"
      gradientOverlay.style.background =
        "radial-gradient(circle at 50% 50%, rgba(30,64,175,0) 0%, rgba(30,64,175,0.03) 70%, rgba(30,64,175,0.05) 100%)"
      gradientOverlay.style.opacity = "0"
      gradientOverlay.style.zIndex = "0"
      section.appendChild(gradientOverlay)

      gsap.to(gradientOverlay, {
        opacity: 0.8,
        duration: 3,
        ease: "sine.inOut",
      })

      // Animate the gradient position
      gsap.to(gradientOverlay, {
        background:
          "radial-gradient(circle at 30% 70%, rgba(30,64,175,0) 0%, rgba(30,64,175,0.03) 70%, rgba(30,64,175,0.05) 100%)",
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Create animated lines
      for (let i = 0; i < 5; i++) {
        const line = document.createElement("div")
        line.classList.add("bg-animated-element", "animated-line")
        line.style.position = "absolute"
        line.style.height = "1px"
        line.style.width = "100%"
        line.style.left = "0"
        line.style.top = `${Math.random() * 100}%`
        line.style.background = "linear-gradient(90deg, transparent 0%, rgba(30,64,175,0.1) 50%, transparent 100%)"
        line.style.opacity = "0"
        line.style.zIndex = "0"
        section.appendChild(line)

        gsap.to(line, {
          opacity: 0.5,
          duration: 2,
          ease: "sine.inOut",
          delay: i * 0.5,
        })

        gsap.fromTo(
          line,
          { x: "-100%" },
          {
            x: "100%",
            duration: Math.random() * 20 + 20,
            ease: "none",
            repeat: -1,
            delay: Math.random() * 10,
          },
        )
      }

      // Create animated dots (particles)
      for (let i = 0; i < 50; i++) {
        const dot = document.createElement("div")
        dot.classList.add("bg-animated-element", "particle")
        dot.style.position = "absolute"
        dot.style.width = `${Math.random() * 3 + 1}px`
        dot.style.height = dot.style.width
        dot.style.borderRadius = "50%"
        dot.style.background = Math.random() > 0.5 ? "rgba(225,29,72,0.2)" : "rgba(30,64,175,0.2)"
        dot.style.opacity = "0"
        dot.style.zIndex = "0"
        section.appendChild(dot)

        gsap.set(dot, {
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          opacity: Math.random() * 0.5 + 0.1,
        })

        // Create random movement path
        const timeline = gsap.timeline({
          repeat: -1,
          yoyo: false,
        })

        const points = []
        const numPoints = Math.floor(Math.random() * 3) + 2

        for (let j = 0; j <= numPoints; j++) {
          points.push({
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          })
        }

        // Add the first point again to close the loop
        points.push({ ...points[0] })

        points.forEach((point, index) => {
          timeline.to(dot, {
            x: point.x,
            y: point.y,
            opacity: point.opacity,
            duration: Math.random() * 10 + 5,
            ease: "sine.inOut",
          })
        })
      }
    }

    createBackgroundElements()

    // Recreate elements on window resize
    const handleResize = () => {
      createBackgroundElements()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      // Clean up animations
      gsap.killTweensOf(".bg-animated-element")
      // Remove elements
      const elements = document.querySelectorAll(".bg-animated-element")
      elements.forEach((el) => el.remove())
    }
  }, [gsapLoaded])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" onLoad={() => setGsapLoaded(true)} />

      <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900">
        {/* Subtle background animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top gradient */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-950 to-transparent"></div>

          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-delay"></div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          {/* Animated lines */}
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scanline-slow"></div>
          <div
            className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-scanline-slow"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating retail icons */}
          <div className="absolute top-[15%] left-[10%] text-blue-500/10 animate-float-slow">
            <ShoppingBag size={40} />
          </div>
          <div
            className="absolute top-[60%] right-[15%] text-red-500/10 animate-float-slow"
            style={{ animationDelay: "1s" }}
          >
            <Store size={50} />
          </div>
          <div
            className="absolute bottom-[20%] left-[20%] text-blue-500/10 animate-float-slow"
            style={{ animationDelay: "2s" }}
          >
            <ChartBar size={45} />
          </div>
        </div>

        
      </section>
    </>
  )
}

// Animated counter component
function StatCounter({ icon, value, label, delay = 0 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    let start = 0
    const duration = 2000 // 2 seconds
    const increment = value / (duration / 16) // Update every ~16ms for smooth animation

    if (inView) {
      // Add a small delay before starting the animation
      const timer = setTimeout(() => {
        const counter = setInterval(() => {
          start += increment
          if (start > value) {
            setCount(value)
            clearInterval(counter)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)

        return () => clearInterval(counter)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [inView, value, delay])

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-lg p-6 border border-blue-700/20 shadow-lg text-center transition-all duration-700 transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{count.toLocaleString()}+</div>
      <div className="text-blue-200 text-sm">{label}</div>
    </div>
  )
}

