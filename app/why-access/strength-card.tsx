"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StrengthCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: "blue" | "red"
  story: string
  delay: number
}

export function StrengthCard({ icon, title, description, color, story, delay }: StrengthCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  const bgColor = color === "blue" ? "from-blue-900 to-blue-950" : "from-red-900 to-red-950"
  const borderColor = color === "blue" ? "border-blue-700/50" : "border-red-700/50"
  const iconBgColor = color === "blue" ? "bg-blue-800" : "bg-red-800"
  const titleColor = color === "blue" ? "text-blue-300" : "text-red-300"
  const expandBtnColor = color === "blue" ? "text-blue-400 hover:text-blue-300" : "text-red-400 hover:text-red-300"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: 0.2 + delay }}
      className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 border ${borderColor} shadow-lg`}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center shadow-lg`}>{icon}</div>
        <div className="ml-4 h-px flex-grow bg-gradient-to-r from-white/30 to-transparent"></div>
      </div>

      <h3 className={`text-xl font-bold ${titleColor} mb-3`}>{title}</h3>
      <p className="text-white/80 mb-6">{description}</p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center font-medium ${expandBtnColor} transition-colors`}
      >
        {isExpanded ? "Hide Story" : "Our Story"}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1 h-4 w-4"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 pb-2 text-white/70 text-sm">{story}</div>
      </motion.div>
    </motion.div>
  )
}
