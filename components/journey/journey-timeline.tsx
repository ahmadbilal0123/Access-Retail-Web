"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { timelineData } from "./journey-data"
import TimelineEntry from "./timeline-entry"

export default function JourneyTimeline() {
  const [activeEntry, setActiveEntry] = useState<string>("2023-2024")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Research Journey</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Explore our decade-long journey of innovation and excellence in market research
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="mb-12 relative">
          {/* Timeline Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-900/50 transform -translate-y-1/2 rounded-full"></div>

          {/* Timeline Markers */}
          <div className="flex justify-between relative">
            {timelineData.map((entry, index) => (
              <div key={entry.id} className="flex-1 flex justify-center">
                <button
                  onClick={() => setActiveEntry(entry.id)}
                  className="relative flex flex-col items-center"
                  aria-label={`View ${entry.period}`}
                >
                  {/* Timeline Marker */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      activeEntry === entry.id
                        ? entry.color === "blue"
                          ? "bg-blue-600 border-2 border-blue-400"
                          : "bg-red-600 border-2 border-red-400"
                        : "bg-blue-900/70 border-2 border-blue-800/50 hover:border-blue-700/70"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-white ${
                        activeEntry === entry.id ? "scale-150" : "scale-100"
                      } transition-transform duration-300`}
                    ></div>

                    {/* Pulse effect for active marker */}
                    {activeEntry === entry.id && (
                      <div
                        className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                          entry.color === "blue" ? "bg-blue-500" : "bg-red-500"
                        }`}
                      ></div>
                    )}
                  </div>

                  {/* Year Label */}
                  <div
                    className={`mt-3 font-medium transition-all duration-300 ${
                      activeEntry === entry.id
                        ? entry.color === "blue"
                          ? "text-blue-300 scale-110"
                          : "text-red-300 scale-110"
                        : "text-blue-200/70 hover:text-blue-200"
                    }`}
                  >
                    {entry.period}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="max-w-4xl mx-auto">
          {timelineData.map((entry) => (
            <TimelineEntry key={entry.id} entry={entry} isActive={activeEntry === entry.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

