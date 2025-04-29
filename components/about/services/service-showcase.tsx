"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ServiceItem } from "./service-data"
import ServiceCard from "./service-card"

interface ServiceShowcaseProps {
  services: ServiceItem[]
  isInView: boolean
}

export default function ServiceShowcase({ services, isInView }: ServiceShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  // Determine items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3)
      } else {
        setItemsPerPage(4)
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
        setActiveIndex((prev) => (prev + 1) % (services.length - itemsPerPage + 1))
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, services.length, itemsPerPage])

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
    setAutoplay(false)
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000)
  }

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(services.length - itemsPerPage, prev + 1))
    setAutoplay(false)
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Explore Our Services</h3>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="bg-blue-900/50 border-blue-800/30 text-white hover:bg-blue-800/70 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={activeIndex >= services.length - itemsPerPage}
                className="bg-blue-900/50 border-blue-800/30 text-white hover:bg-blue-800/70 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4"
              initial={{ x: 0 }}
              animate={{ x: `-${activeIndex * (100 / itemsPerPage)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / itemsPerPage}% - ${((itemsPerPage - 1) * 16) / itemsPerPage}px)` }}
                >
                  <ServiceCard
                    service={service}
                    index={index}
                    isVisible={index >= activeIndex && index < activeIndex + itemsPerPage}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination indicators */}
          <div className="flex justify-center mt-6 space-x-1">
            {Array.from({ length: services.length - itemsPerPage + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setAutoplay(false)
                  setTimeout(() => setAutoplay(true), 10000)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-red-500 w-6" : "bg-blue-800/70 hover:bg-blue-700/70"
                }`}
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
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

