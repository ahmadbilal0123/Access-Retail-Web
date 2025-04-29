"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StrengthCardProps {
  icon: React.ReactNode
  emoji: string
  title: string
  description: string
  color: "blue" | "red"
  story: string
  delay: number
}

export function StrengthCard({ icon, emoji, title, description, color, story, delay }: StrengthCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3, margin: "-100px" })

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: "easeOut",
      }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className={cn(
          "h-full overflow-hidden border shadow-xl transition-all duration-300",
          color === "blue"
            ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 border-blue-800/30"
            : "bg-gradient-to-br from-red-900/80 to-red-950/90 border-red-800/30",
        )}
      >
        <CardContent className="p-6 h-full flex flex-col">
          {/* Card Header with Icon and Emoji */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  color === "blue"
                    ? "bg-blue-900/70 text-blue-300 border border-blue-700/50"
                    : "bg-red-900/70 text-red-300 border border-red-700/50",
                )}
              >
                {icon}
              </div>
              <div className="text-3xl">{emoji}</div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.5, type: "spring" }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                color === "blue" ? "bg-blue-800/50 text-blue-200" : "bg-red-800/50 text-red-200",
              )}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </motion.div>
          </div>

          {/* Title with animated underline */}
          <div className="mb-3">
            <h3 className={cn("text-xl font-bold", color === "blue" ? "text-blue-300" : "text-red-300")}>{title}</h3>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "3rem" } : { width: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.4 }}
              className={cn(
                "h-0.5 mt-2",
                color === "blue"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700"
                  : "bg-gradient-to-r from-red-500 to-red-700",
              )}
            />
          </div>

          {/* Description */}
          <p className="text-blue-100 mb-4 flex-grow">{description}</p>

          {/* Expandable Story Section */}
          <div className="mt-auto">
            <button
              onClick={toggleExpand}
              className={cn(
                "w-full text-left flex items-center justify-between py-2 px-3 rounded-md transition-colors",
                color === "blue"
                  ? "bg-blue-900/50 hover:bg-blue-800/50 text-blue-200"
                  : "bg-red-900/50 hover:bg-red-800/50 text-red-200",
              )}
            >
              <span className="text-sm font-medium">Our Story</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "mt-3 p-3 rounded-md text-sm italic",
                      color === "blue"
                        ? "bg-blue-950/70 border border-blue-900/50 text-blue-100"
                        : "bg-red-950/70 border border-red-900/50 text-blue-100",
                    )}
                  >
                    {story}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

