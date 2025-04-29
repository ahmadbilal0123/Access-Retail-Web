"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ClientDetailModal } from "./client-detail-modal"

interface Client {
  name: string
  industry: string
  logo: string
}

interface ClientCarouselProps {
  clients: Client[]
}

export function ClientCarousel({ clients }: ClientCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const totalPages = Math.ceil(clients.length / itemsPerPage)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Determine items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 768) {
        setItemsPerPage(3)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4)
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(5)
      } else {
        setItemsPerPage(6)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages)
      }, 3000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, totalPages, itemsPerPage])

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

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setAutoplay(false)
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setAutoplay(true), 5000)
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setAutoplay(false)
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setAutoplay(true), 5000)
  }

  // Get current page of clients
  const getCurrentPageClients = () => {
    const start = currentPage * itemsPerPage
    return clients.slice(start, start + itemsPerPage)
  }

  return (
    <div className="relative px-4 py-8">
      {/* Navigation buttons */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          className="bg-blue-900/50 hover:bg-blue-800/70 text-white p-2 rounded-full shadow-lg transition-colors"
          aria-label="Previous clients"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          className="bg-blue-900/50 hover:bg-blue-800/70 text-white p-2 rounded-full shadow-lg transition-colors"
          aria-label="Next clients"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden mx-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {getCurrentPageClients().map((client, index) => {
              const colors = getIndustryColor(client.industry)
              return (
                <motion.div
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedClient(client)
                    setAutoplay(false)
                  }}
                >
                  <div
                    className={`absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md ${colors.glow}`}
                  ></div>
                  <div
                    className={`relative ${colors.bg} ${colors.border} backdrop-blur-sm rounded-lg border p-4 h-28 flex flex-col items-center justify-center transition-all duration-300`}
                  >
                    <div className="relative w-12 h-12 mb-2">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-medium text-sm truncate max-w-full">{client.name}</h3>
                      <p className={`text-xs ${colors.text}`}>{client.industry}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(index)
              setAutoplay(false)
              setTimeout(() => setAutoplay(true), 5000)
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentPage === index ? "bg-red-500 w-6" : "bg-blue-800/70 hover:bg-blue-700/70",
            )}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay progress bar */}
      {autoplay && (
        <div className="w-full max-w-md mx-auto mt-4 h-0.5 bg-blue-900/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-red-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Client detail modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetailModal
            client={selectedClient}
            onClose={() => {
              setSelectedClient(null)
              setTimeout(() => setAutoplay(true), 1000)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

