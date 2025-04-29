"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Info, X } from "lucide-react"
import type { ServiceItem } from "./service-data"

interface ServiceCardProps {
  service: ServiceItem
  index: number
  isVisible: boolean
}

export default function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  const [showInfo, setShowInfo] = useState(false)

  // Map color string to Tailwind classes
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
      blue: {
        bg: "bg-blue-900/50",
        border: "border-blue-700/30",
        text: "text-blue-300",
      },
      red: {
        bg: "bg-red-900/50",
        border: "border-red-700/30",
        text: "text-red-300",
      },
      green: {
        bg: "bg-green-900/50",
        border: "border-green-700/30",
        text: "text-green-300",
      },
      purple: {
        bg: "bg-purple-900/50",
        border: "border-purple-700/30",
        text: "text-purple-300",
      },
      indigo: {
        bg: "bg-indigo-900/50",
        border: "border-indigo-700/30",
        text: "text-indigo-300",
      },
      teal: {
        bg: "bg-teal-900/50",
        border: "border-teal-700/30",
        text: "text-teal-300",
      },
      orange: {
        bg: "bg-orange-900/50",
        border: "border-orange-700/30",
        text: "text-orange-300",
      },
      cyan: {
        bg: "bg-cyan-900/50",
        border: "border-cyan-700/30",
        text: "text-cyan-300",
      },
      pink: {
        bg: "bg-pink-900/50",
        border: "border-pink-700/30",
        text: "text-pink-300",
      },
    }

    return colorMap[color] || colorMap.blue
  }

  const colors = getColorClasses(service.color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Card
        className={`${colors.bg} backdrop-blur-sm ${colors.border} shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl group relative`}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">{service.icon}</div>
            <h4 className={`font-bold ${colors.text}`}>{service.name}</h4>
          </div>

          <button
            onClick={() => setShowInfo(true)}
            className="mt-auto flex items-center justify-center gap-2 text-sm text-blue-100 hover:text-white transition-colors py-2 px-3 rounded-md bg-blue-950/50 hover:bg-blue-900/50"
          >
            <Info className="h-4 w-4" />
            <span>Learn More</span>
          </button>

          {/* Info Modal */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-blue-950/95 backdrop-blur-sm p-4 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{service.icon}</span>
                    <h4 className={`font-bold ${colors.text}`}>{service.name}</h4>
                  </div>

                  <button
                    onClick={() => setShowInfo(false)}
                    className="text-blue-300 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-blue-100 text-sm flex-grow">{service.description}</p>

                <div className="mt-4 pt-4 border-t border-blue-800/30">
                  <button
                    onClick={() => setShowInfo(false)}
                    className="w-full flex items-center justify-center gap-2 text-sm text-white py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-colors"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

