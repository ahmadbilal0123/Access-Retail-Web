"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, BarChart3, Activity } from "lucide-react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function CoreServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [activeTab, setActiveTab] = useState("surveyors")
  const [gsapLoaded, setGsapLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Check if GSAP is loaded
  useEffect(() => {
    if ((window as any).gsap) {
      setGsapLoaded(true)
    } else {
      const handleGsapLoad = () => setGsapLoaded(true)
      window.addEventListener("gsapLoaded", handleGsapLoad)
      return () => window.removeEventListener("gsapLoaded", handleGsapLoad)
    }
  }, [])

  // Set up animations
  useEffect(() => {
    const handleAnimation = (e: Event) => {
      const { masterTimeline } = (e as CustomEvent).detail
      if (!masterTimeline || !titleRef.current) return

      // Add title animation to master timeline
      masterTimeline.from(
        titleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.5,
      )
    }

    window.addEventListener("companyProfileInView", handleAnimation)
    return () => window.removeEventListener("companyProfileInView", handleAnimation)
  }, [])

  // Set up background animations
  useEffect(() => {
    if (!gsapLoaded || !sectionRef.current || isMobile) return

    const gsap = (window as any).gsap
    if (!gsap) return

    // Create animated connection lines
    const createConnectionLines = () => {
      const section = sectionRef.current
      if (!section) return

      // Clear existing lines
      const existingLines = section.querySelectorAll(".connection-line")
      existingLines.forEach((el) => el.remove())

      // Get tab positions
      const tabsList = section.querySelector('[role="tablist"]')
      if (!tabsList) return

      const tabTriggers = tabsList.querySelectorAll('[role="tab"]')
      if (tabTriggers.length === 0) return

      // Create SVG container
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.classList.add("connection-line", "absolute", "inset-0", "pointer-events-none")
      svg.style.zIndex = "0"
      svg.setAttribute("width", "100%")
      svg.setAttribute("height", "100%")
      section.appendChild(svg)

      // Create gradient definition
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
      svg.appendChild(defs)

      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
      gradient.setAttribute("id", "connection-gradient")
      gradient.setAttribute("x1", "0%")
      gradient.setAttribute("y1", "0%")
      gradient.setAttribute("x2", "100%")
      gradient.setAttribute("y2", "0%")
      defs.appendChild(gradient)

      const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop1.setAttribute("offset", "0%")
      stop1.setAttribute("stop-color", "rgba(225, 29, 72, 0.5)")
      gradient.appendChild(stop1)

      const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
      stop2.setAttribute("offset", "100%")
      stop2.setAttribute("stop-color", "rgba(59, 130, 246, 0.5)")
      gradient.appendChild(stop2)

      // Create pulsing animation
      const animateOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate")
      animateOpacity.setAttribute("attributeName", "opacity")
      animateOpacity.setAttribute("values", "0.3;0.7;0.3")
      animateOpacity.setAttribute("dur", "4s")
      animateOpacity.setAttribute("repeatCount", "indefinite")

      // Connect tabs with content
      tabTriggers.forEach((tab, index) => {
        const tabRect = tab.getBoundingClientRect()
        const tabContent = section.querySelector(`[data-state="active"][role="tabpanel"]`)

        if (!tabContent) return

        const contentRect = tabContent.getBoundingClientRect()
        const sectionRect = section.getBoundingClientRect()

        // Calculate positions relative to the section
        const x1 = tabRect.left + tabRect.width / 2 - sectionRect.left
        const y1 = tabRect.bottom - sectionRect.top
        const x2 = contentRect.left + contentRect.width / 2 - sectionRect.left
        const y2 = contentRect.top - sectionRect.top

        // Create path
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

        // Create curved path
        const curveX = Math.abs(x2 - x1) * 0.5
        const pathData = `M${x1},${y1} C${x1},${y1 + curveX} ${x2},${y2 - curveX} ${x2},${y2}`

        path.setAttribute("d", pathData)
        path.setAttribute("stroke", "url(#connection-gradient)")
        path.setAttribute("stroke-width", "2")
        path.setAttribute("fill", "none")
        path.setAttribute("stroke-dasharray", "5,5")
        path.setAttribute("opacity", "0.5")

        // Clone the animation for this path
        const animation = animateOpacity.cloneNode(true)
        path.appendChild(animation)

        svg.appendChild(path)

        // Animate the path drawing
        gsap.fromTo(
          path,
          { strokeDashoffset: 1000, strokeDasharray: "5,5" },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3 + index * 0.1,
          },
        )
      })
    }

    // Create floating icons
    const createFloatingIcons = () => {
      const section = sectionRef.current
      if (!section) return

      // Clear existing icons
      const existingIcons = section.querySelectorAll(".floating-service-icon")
      existingIcons.forEach((el) => el.remove())

      const icons = [
        { icon: "users", color: "red" },
        { icon: "tablet", color: "blue" },
        { icon: "chart", color: "red" },
        { icon: "store", color: "blue" },
      ]

      icons.forEach((iconData, index) => {
        const iconContainer = document.createElement("div")
        iconContainer.classList.add("floating-service-icon", "absolute", "pointer-events-none")
        iconContainer.style.zIndex = "0"

        // Position randomly
        iconContainer.style.left = `${Math.random() * 80 + 10}%`
        iconContainer.style.top = `${Math.random() * 80 + 10}%`

        // Create icon SVG
        let iconSvg = ""
        if (iconData.icon === "users") {
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
        } else if (iconData.icon === "tablet") {
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-tablet"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>`
        } else if (iconData.icon === "chart") {
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`
        } else if (iconData.icon === "store") {
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v0"/><path d="M18 12v0a2 2 0 0 1-2-2v0"/><path d="M14 12v0a2 2 0 0 1-2-2v0"/><path d="M10 12v0a2 2 0 0 1-2-2v0"/><path d="M6 12v0a2 2 0 0 1-2-2v0"/><path d="M2 7v3a2 2 0 0 0 2 2v0"/></svg>`
        }

        iconContainer.innerHTML = iconSvg
        iconContainer.style.color = iconData.color === "red" ? "rgba(225, 29, 72, 0.2)" : "rgba(59, 130, 246, 0.2)"
        iconContainer.style.transform = "scale(2)"
        iconContainer.style.opacity = "0"

        section.appendChild(iconContainer)

        // Animate icon
        gsap.to(iconContainer, {
          opacity: 0.7,
          duration: 1,
          delay: 0.5 + index * 0.2,
        })

        // Continuous floating animation
        gsap.to(iconContainer, {
          y: `${Math.random() * 30 - 15}`,
          x: `${Math.random() * 30 - 15}`,
          rotation: Math.random() * 20 - 10,
          duration: Math.random() * 5 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }

    // Initial creation
    createConnectionLines()
    createFloatingIcons()

    // Update on tab change
    const handleTabChange = () => {
      setTimeout(() => {
        createConnectionLines()
      }, 100)
    }

    // Listen for tab changes
    const tabTriggers = sectionRef.current.querySelectorAll('[role="tab"]')
    tabTriggers.forEach((tab) => {
      tab.addEventListener("click", handleTabChange)
    })

    // Update on window resize
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        createConnectionLines()
        createFloatingIcons()
      } else {
        // Clean up animations on mobile
        const lines = document.querySelectorAll(".connection-line")
        lines.forEach((el) => el.remove())

        const icons = document.querySelectorAll(".floating-service-icon")
        icons.forEach((el) => el.remove())
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      tabTriggers.forEach((tab) => {
        tab.removeEventListener("click", handleTabChange)
      })

      // Clean up animations
      gsap.killTweensOf(".connection-line, .floating-service-icon")

      // Remove elements
      const lines = document.querySelectorAll(".connection-line")
      lines.forEach((el) => el.remove())

      const icons = document.querySelectorAll(".floating-service-icon")
      icons.forEach((el) => el.remove())
    }
  }, [gsapLoaded, activeTab, isMobile])

  const services = [
    {
      id: "surveyors",
      icon: <Users className="h-6 w-6" />,
      title: "",
      description: "Deploying over 1,000 surveyors nationwide at any given time.",
      color: "blue",
      stats: [
        {
          label: "Store Audits Monthly",
          value: "48,000",
          icon: <BarChart3 className="h-4 w-4" />,
        },
        {
          label: "Items Covered Monthly",
          value: "40,000+",
          icon: <Activity className="h-4 w-4" />,
        },
        {
          label: "Turnover Reported Annually",
          value: "Over $ 13 Billion",
          icon: <BarChart3 className="h-4 w-4" />,
        },
        {
          label: "Field Auditors",
          value: "250+",
          icon: <Users className="h-4 w-4" />,
        },
        {
          label: "Coverage",
          value: "Pakistan & Afghanistan",
          icon: <Activity className="h-4 w-4" />,
        },
      ],
      features: ["Real-time Analytics", "Data Visualization", "Custom Reporting"],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12 md:mb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto"
      ref={sectionRef}
    >
      <div className="py-8 sm:py-12 md:py-16"></div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4"
      />

      <div className="text-center mb-8 sm:mb-12 mt-4 sm:mt-6">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
          Operational Scope
        </h2>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto"
        />
      </div>

      <div className="relative">
        <Tabs defaultValue="surveyors" className="w-full" onValueChange={setActiveTab}>
          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="relative mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden shadow-2xl bg-[#002147] border border-blue-900/30"
              >
                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-4xl">
                      <h3 className="text-white text-lg sm:text-xl font-medium mb-4 sm:mb-6 pb-2 border-b border-blue-800/30 text-center">
                        Performance Metrics
                      </h3>

                      {/* First row with 3 cards - responsive grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        {service.stats.slice(0, 3).map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                            className="rounded-lg p-3 sm:p-4 md:p-5 bg-[#00326c] border border-blue-800/30 shadow-lg h-auto sm:h-28 md:h-32 flex flex-col justify-center"
                          >
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-white text-center">
                              {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-blue-100 font-medium text-center">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Second row with 2 centered cards - responsive grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
                        {service.stats.slice(3, 5).map((stat, index) => (
                          <motion.div
                            key={index + 3}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 + (index + 3) * 0.1 }}
                            className="rounded-lg p-3 sm:p-4 md:p-5 bg-[#00326c] border border-blue-800/30 shadow-lg h-auto sm:h-28 md:h-32 flex flex-col justify-center"
                          >
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-white text-center">
                              {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-blue-100 font-medium text-center">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-blue-800/30">
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                          <Badge
                            
                            className="bg-blue-900/40 text-blue-100 border-blue-800/30 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                          >
                            Real-time Analytics
                          </Badge>
                          <Badge
                            
                            className="bg-blue-900/40 text-blue-100 border-blue-800/30 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                          >
                            Data Visualization
                          </Badge>
                          <Badge
                            
                            className="bg-blue-900/40 text-blue-100 border-blue-800/30 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                          >
                            Custom Reporting
                          </Badge>
                          <Badge
                           className="bg-blue-900/40 text-blue-100 border-blue-800/30 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                            Premium Service
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </motion.div>
  )
}
