"use client"

import { useRef, useEffect } from "react"
import { motion, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface JourneyProgressBarProps {
  progress: MotionValue<number>
  milestones: Array<{
    id: string
    years: string
    color: string
  }>
  activeIndex: number
}

export function JourneyProgressBar({ progress, milestones, activeIndex }: JourneyProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Add this at the beginning of the component function
  useEffect(() => {
    // Prevent any automatic scrolling
    const preventAutoScroll = () => {
      // Force scroll to top
      window.scrollTo(0, 0)
    }

    preventAutoScroll()

    // Also prevent scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  }, [])

  // Draw the SVG path connecting the milestones
  useEffect(() => {
    if (!progressBarRef.current) return

    const container = progressBarRef.current
    const containerWidth = container.offsetWidth
    const segmentWidth = containerWidth / (milestones.length - 1)

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.style.position = "absolute"
    svg.style.top = "0"
    svg.style.left = "0"
    svg.style.zIndex = "0"

    // Create path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.classList.add("journey-path")

    // Generate path data
    let pathData = `M 0,10 `

    for (let i = 1; i < milestones.length; i++) {
      const x = i * segmentWidth
      pathData += `L ${x},10 `
    }

    path.setAttribute("d", pathData)
    path.setAttribute("stroke", "url(#journeyGradient)")
    path.setAttribute("stroke-width", "2")
    path.setAttribute("fill", "none")
    path.setAttribute("stroke-dasharray", "1000")
    path.setAttribute("stroke-dashoffset", "1000")

    // Create gradient
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
    gradient.setAttribute("id", "journeyGradient")
    gradient.setAttribute("x1", "0%")
    gradient.setAttribute("y1", "0%")
    gradient.setAttribute("x2", "100%")
    gradient.setAttribute("y2", "0%")

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
    stop1.setAttribute("offset", "0%")
    stop1.setAttribute("stop-color", "#3b82f6") // blue-500

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
    stop2.setAttribute("offset", "50%")
    stop2.setAttribute("stop-color", "#ef4444") // red-500

    const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
    stop3.setAttribute("offset", "100%")
    stop3.setAttribute("stop-color", "#3b82f6") // blue-500

    gradient.appendChild(stop1)
    gradient.appendChild(stop2)
    gradient.appendChild(stop3)
    defs.appendChild(gradient)

    svg.appendChild(defs)
    svg.appendChild(path)
    container.appendChild(svg)

    return () => {
      if (container.contains(svg)) {
        container.removeChild(svg)
      }
    }
  }, [milestones.length])

  return (
    <div className="sticky top-[200px] z-30 container mx-auto px-4">
      <div ref={progressBarRef} className="relative h-20 flex items-center justify-between">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative z-10">
            <motion.div
              className={cn(
                "journey-milestone w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                milestone.color === "blue"
                  ? "bg-blue-600 border-2 border-blue-400"
                  : "bg-red-600 border-2 border-red-400",
                index <= activeIndex ? "opacity-100 scale-100" : "opacity-50 scale-75",
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>

              {/* Pulse effect for active milestone */}
              {index === activeIndex && (
                <div
                  className={cn(
                    "absolute inset-0 rounded-full animate-ping opacity-30",
                    milestone.color === "blue" ? "bg-blue-500" : "bg-red-500",
                  )}
                ></div>
              )}
            </motion.div>

            {/* Year label */}
            <motion.div
              className={cn(
                "absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-all duration-300",
                index <= activeIndex
                  ? milestone.color === "blue"
                    ? "text-blue-300"
                    : "text-red-300"
                  : "text-blue-200/50",
                index === activeIndex ? "scale-110" : "scale-100",
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            >
              {milestone.years}
            </motion.div>
          </div>
        ))}

        {/* Progress indicator */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-full"
          style={{
            width: progress.get() * 100 + "%",
            opacity: progress.get() * 0.7 + 0.3,
          }}
        />
      </div>
    </div>
  )
}

