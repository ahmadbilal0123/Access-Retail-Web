"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Script from "next/script"

export default function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const circleBackRef = useRef<SVGCircleElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const districtTextRef = useRef<HTMLSpanElement>(null)
  const metric1Ref = useRef<HTMLDivElement>(null)
  const metric2Ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Force visibility of all elements after animations
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".animate-hero")
      elements.forEach((el) => {
        ;(el as HTMLElement).style.opacity = "1"
        ;(el as HTMLElement).style.transform = "none"
      })
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // GSAP animations for the Coverage Network
  useEffect(() => {
    if (!gsapLoaded) return

    // Access the gsap object from the window
    const gsap = (window as any).gsap
    if (!gsap) return

    // Initial animations
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } })

    if (cardRef.current) {
      tl.fromTo(cardRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.7 })
    }

    if (titleRef.current && subtitleRef.current) {
      tl.fromTo(
        [titleRef.current, subtitleRef.current],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
        "-=0.5",
      )
    }

    if (circleBackRef.current) {
      tl.fromTo(circleBackRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.4")
    }

    if (circleRef.current) {
      // Initial draw animation for the circle (one-time only)
      tl.fromTo(
        circleRef.current,
        { strokeDashoffset: 283 },
        { strokeDashoffset: 70, duration: 0.8, ease: "power3.inOut" },
        "-=0.3",
      )
    }

    if (counterRef.current && districtTextRef.current) {
      tl.fromTo(
        [counterRef.current, districtTextRef.current],
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.6",
      )

      // Count up animation
      let start = 0
      const end = 85
      const duration = 1
      const increment = end / (duration * 60) // 60fps

      const counter = setInterval(() => {
        start += increment
        if (start >= end) {
          if (counterRef.current) counterRef.current.textContent = "85+"
          clearInterval(counter)
        } else {
          if (counterRef.current) counterRef.current.textContent = Math.floor(start) + "+"
        }
      }, 1000 / 60)
    }

    if (metric1Ref.current && metric2Ref.current) {
      tl.fromTo(
        [metric1Ref.current, metric2Ref.current],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.4",
      )
    }

    if (glowRef.current) {
      tl.fromTo(glowRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.8")
    }

    // Idle animations that continue after load
    setTimeout(() => {
      // Create a master timeline for coordinated idle animations
      const idleTl = gsap.timeline({ repeat: -1, yoyo: true })

      // Subtle glow animation
      if (glowRef.current) {
        idleTl
          .to(
            glowRef.current,
            {
              opacity: 0.7,
              scale: 1.1,
              filter: "blur(15px)",
              duration: 4,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            glowRef.current,
            {
              opacity: 0.3,
              scale: 0.9,
              filter: "blur(10px)",
              duration: 4,
              ease: "sine.inOut",
            },
            4,
          )
      }

      // Subtle scale animation for the counter
      if (counterRef.current) {
        idleTl
          .to(
            counterRef.current,
            {
              scale: 1.05,
              textShadow: "0 0 10px rgba(255,255,255,0.5)",
              duration: 4,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            counterRef.current,
            {
              scale: 1,
              textShadow: "0 0 0px rgba(255,255,255,0)",
              duration: 4,
              ease: "sine.inOut",
            },
            4,
          )
      }

      // Subtle hover animation for metrics with staggered timing
      if (metric1Ref.current && metric2Ref.current) {
        idleTl
          .to(
            metric1Ref.current,
            {
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(30, 64, 175, 0.3)",
              duration: 4,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            metric1Ref.current,
            {
              y: 0,
              boxShadow: "0 0px 0px 0px rgba(30, 64, 175, 0)",
              duration: 4,
              ease: "sine.inOut",
            },
            4,
          )
          .to(
            metric2Ref.current,
            {
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.3)",
              duration: 4,
              ease: "sine.inOut",
            },
            2,
          )
          .to(
            metric2Ref.current,
            {
              y: 0,
              boxShadow: "0 0px 0px 0px rgba(225, 29, 72, 0)",
              duration: 4,
              ease: "sine.inOut",
            },
            6,
          )
      }

      // Subtle border glow animation for the card
      if (cardRef.current) {
        idleTl
          .to(
            cardRef.current,
            {
              boxShadow: "0 0 30px 0px rgba(30, 64, 175, 0.2), inset 0 0 0px 1px rgba(59, 130, 246, 0.3)",
              duration: 4,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            cardRef.current,
            {
              boxShadow: "0 0 10px 0px rgba(30, 64, 175, 0.1), inset 0 0 0px 1px rgba(59, 130, 246, 0.1)",
              duration: 4,
              ease: "sine.inOut",
            },
            4,
          )
      }

      // Create floating particles with GSAP
      const particles = document.querySelectorAll(".network-particle")
      particles.forEach((particle, i) => {
        // Random starting position
        gsap.set(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          opacity: gsap.utils.random(0.1, 0.5),
        })

        // Continuous random movement
        gsap.to(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          opacity: gsap.utils.random(0.1, 0.5),
          duration: gsap.utils.random(10, 20),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        })
      })
    }, 1000) // Start idle animations after 1 second
  }, [gsapLoaded])

  useEffect(() => {
    if (!vantaLoaded) return

    // Make sure THREE is available
    if (!vantaEffect && vantaRef.current && window.THREE) {
      // @ts-ignore - Vanta is loaded via script
      setVantaEffect(
        window.VANTA.WAVES({
          el: vantaRef.current,
          THREE: window.THREE, // Explicitly pass THREE
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0a1d3b, // Dark blue color
          shininess: 60.0,
          waveHeight: 20.0,
          waveSpeed: 1.0,
          zoom: 0.65,
        }),
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect, vantaLoaded])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        onLoad={() => {
          console.log("Three.js loaded")
          // Only load Vanta after THREE is loaded
          const vantaScript = document.createElement("script")
          vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
          vantaScript.onload = () => setVantaLoaded(true)
          document.body.appendChild(vantaScript)
        }}
      />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" onLoad={() => setGsapLoaded(true)} />

      <div className="relative min-h-screen flex items-center">
        {/* Vanta.js Background */}
        <div ref={vantaRef} className="absolute inset-0 z-0" aria-hidden="true"></div>

        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/60 to-blue-950/80 z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 z-20 pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white space-y-6 md:space-y-8 max-w-2xl mx-auto text-center lg:text-left">
              <div className="space-y-2">
                {/* Animated red line */}
                <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-blue-500 animate-hero animate-quick-width mx-auto lg:mx-0"></div>

                {/* Headline with quick animation */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-hero animate-quick-fade">
                  Insights That Make a{" "}
                  <span className="text-red-500 relative inline-block">
                    <span className="relative z-10">Difference.</span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500"></span>
                  </span>
                </h1>
              </div>

              <p
                className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed animate-hero animate-quick-fade"
                style={{ animationDelay: "0.2s" }}
              >
               We empower your Retail performance with Extensive Reporting Capability, and Cutting Edge Insights Befitting your Information Needs

              </p>

              <div
                className="pt-4 md:pt-6 animate-hero animate-quick-fade flex justify-center lg:justify-start"
                style={{ animationDelay: "0.3s" }}
              >
                <Button
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 
                text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-lg shadow-red-600/20 
                transition-all duration-300 hover:shadow-red-600/40 hover:translate-y-[-2px]"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Network Visualization - Only show on large screens */}
            <div className="hidden lg:flex justify-center items-center">
              <div
                ref={cardRef}
                className="bg-blue-950/40 backdrop-blur-sm rounded-xl border border-blue-400/10 shadow-xl p-4 sm:p-6 md:p-8 opacity-0 relative overflow-hidden w-full max-w-md"
              >
                {/* Animated background particles - fewer on mobile */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="network-particle absolute w-1 h-1 rounded-full bg-blue-400/30"></div>
                ))}

                <div className="text-center mb-4 md:mb-6">
                  <h3 ref={titleRef} className="text-lg sm:text-xl font-medium text-blue-100 mb-1 sm:mb-2 opacity-0">
                    Market Coverage
                  </h3>
                  <p ref={subtitleRef} className="text-blue-200/80 text-xs sm:text-sm opacity-0">
                    Operational presence across Pakistan
                  </p>
                </div>

                <div className="flex justify-center items-center mb-4 sm:mb-6 md:mb-8 relative">
                  {/* Animated background glow */}
                  <div
                    ref={glowRef}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 rounded-full blur-xl opacity-0"
                  ></div>

                  <div className="relative">
                    {/* Circular progress indicator - NO IDLE ANIMATION */}
                    <svg className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        ref={circleBackRef}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#1e3a8a"
                        strokeWidth="8"
                        opacity="0"
                      />
                      {/* Progress circle - only initial animation, no continuous animation */}
                      <circle
                        ref={circleRef}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        strokeLinecap="round"
                      />
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#e11d48" />
                          <stop offset="50%" stopColor="#db2777" />
                          <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center content with counter animation */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        ref={counterRef}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white opacity-0"
                      >
                        0+
                      </span>
                      <span ref={districtTextRef} className="text-sm text-blue-100 mt-1 opacity-0">
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key metrics with enhanced GSAP animations */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div
                    ref={metric1Ref}
                    className="bg-blue-900/30 rounded-lg p-2 sm:p-3 border border-blue-800/20 opacity-0 transition-all duration-300"
                  >
                    <div className="text-blue-200 text-xs mb-1">Urban</div>
                    <div className="text-white text-base sm:text-xl font-semibold">100%</div>
                    <div className="text-blue-300/70 text-xs">Coverage</div>
                  </div>
                  <div
                    ref={metric2Ref}
                    className="bg-blue-900/30 rounded-lg p-2 sm:p-3 border border-blue-800/20 opacity-0 transition-all duration-300"
                  >
                    <div className="text-blue-200 text-xs mb-1">Rural</div>
                    <div className="text-white text-base sm:text-xl font-semibold">80%</div>
                    <div className="text-blue-300/70 text-xs">Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mouse-shaped Scroll Indicator */}
        <div className="scroll-indicator-container">
          <button onClick={scrollToContent} className="scroll-indicator-button">
            <svg width="20" height="35" viewBox="0 0 20 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer rect for the mouse shape */}
              <rect x="1" y="1" width="18" height="33" rx="9" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1" />
              {/* Inner circle for the scroll wheel */}
              <circle cx="10" cy="10" r="1.5" fill="rgba(255, 255, 255, 0.7)" />
            </svg>
            <span className="scroll-indicator-text">scroll</span>
          </button>
        </div>
      </div>
    </>
  )
}

