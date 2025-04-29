"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Client {
  name: string
  industry: string
  logo: string
}

interface ClientDetailModalProps {
  client: Client | null
  onClose: () => void
}

export function ClientDetailModal({ client, onClose }: ClientDetailModalProps) {
  if (!client) return null

  // Get industry color scheme
  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "FMCG":
        return {
          bg: "bg-blue-900/30",
          border: "border-blue-700/30",
          glow: "bg-blue-500/30",
          text: "text-blue-300",
        }
      case "Beverages":
        return {
          bg: "bg-red-900/30",
          border: "border-red-700/30",
          glow: "bg-red-500/30",
          text: "text-red-300",
        }
      case "Telecom":
        return {
          bg: "bg-purple-900/30",
          border: "border-purple-700/30",
          glow: "bg-purple-500/30",
          text: "text-purple-300",
        }
      case "Food":
        return {
          bg: "bg-green-900/30",
          border: "border-green-700/30",
          glow: "bg-green-500/30",
          text: "text-green-300",
        }
      case "Conglomerate":
        return {
          bg: "bg-amber-900/30",
          border: "border-amber-700/30",
          glow: "bg-amber-500/30",
          text: "text-amber-300",
        }
      default:
        return {
          bg: "bg-blue-900/30",
          border: "border-blue-700/30",
          glow: "bg-blue-500/30",
          text: "text-blue-300",
        }
    }
  }

  const colors = getIndustryColor(client.industry)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-gradient-to-br from-blue-900/90 to-blue-950/90 border border-blue-800/50 rounded-xl p-6 max-w-md w-full shadow-xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-blue-300 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>

        {/* Client info */}
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 mr-4 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={client.logo || "/placeholder.svg"}
              alt={client.name}
              fill
              className="object-contain"
              crossOrigin="anonymous"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{client.name}</h3>
            <div className={cn("text-sm", colors.text)}>{client.industry}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-blue-800/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Partnership Highlights</h4>
            <p className="text-blue-100 text-sm">
              Access Retail has been a trusted partner for {client.name}, providing comprehensive retail intelligence
              and market insights that have helped drive strategic decision-making and business growth.
            </p>
          </div>

          <div className="bg-blue-900/30 border border-blue-800/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Services Provided</h4>
            <ul className="text-blue-100 text-sm space-y-1">
              <li>• Retail Audit & Merchandising</li>
              <li>• Market Share Analysis</li>
              <li>• Competitor Intelligence</li>
              <li>• Consumer Insights</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

