"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ClientLogoProps {
  name: string
  industry: string
  delay: number
}

export function ClientLogo({ name, industry, delay }: ClientLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(logoRef, { once: false, amount: 0.5 })

  // Generate a consistent color based on industry
  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "FMCG":
        return {
          gradient: "from-blue-600/20 to-blue-800/20",
          border: "border-blue-700/30",
          glow: "bg-blue-500/30",
          text: "text-blue-300",
        }
      case "Beverages":
        return {
          gradient: "from-red-600/20 to-red-800/20",
          border: "border-red-700/30",
          glow: "bg-red-500/30",
          text: "text-red-300",
        }
      case "Telecom":
        return {
          gradient: "from-purple-600/20 to-purple-800/20",
          border: "border-purple-700/30",
          glow: "bg-purple-500/30",
          text: "text-purple-300",
        }
      case "Food":
        return {
          gradient: "from-green-600/20 to-green-800/20",
          border: "border-green-700/30",
          glow: "bg-green-500/30",
          text: "text-green-300",
        }
      case "Conglomerate":
        return {
          gradient: "from-amber-600/20 to-amber-800/20",
          border: "border-amber-700/30",
          glow: "bg-amber-500/30",
          text: "text-amber-300",
        }
      default:
        return {
          gradient: "from-blue-600/20 to-blue-800/20",
          border: "border-blue-700/30",
          glow: "bg-blue-500/30",
          text: "text-blue-300",
        }
    }
  }

  const colors = getIndustryColor(industry)

  return (
    <motion.div
      ref={logoRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="relative group"
    >
      {/* Animated glow effect on hover */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md",
          colors.glow,
        )}
      ></div>

      <div
        className={cn(
          "relative bg-gradient-to-br backdrop-blur-sm rounded-lg border p-4 h-32 flex flex-col items-center justify-center transition-all duration-300",
          colors.gradient,
          colors.border,
        )}
      >
        {/* Logo placeholder - replace with actual logos */}
        <div className="relative w-16 h-16 mb-2">
          <Image
            src={`/placeholder.svg?height=64&width=64&text=${name}`}
            alt={`${name} logo`}
            fill
            className="object-contain"
          />
        </div>

        <div className="text-center">
          <h3 className="text-white font-medium text-sm">{name}</h3>
          <p className={cn("text-xs", colors.text)}>{industry}</p>
        </div>
      </div>
    </motion.div>
  )
}

