"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, Award, BarChart, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OurJourney() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Aggressive scroll prevention
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0)

    // Disable scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    // Remove any hash from the URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }

    // Create a function to force scroll to top
    const forceScrollTop = () => {
      window.scrollTo(0, 0)
    }

    // Apply immediately and repeatedly for a short period
    forceScrollTop()
    const scrollInterval = setInterval(forceScrollTop, 100)

    // Clean up after a short period
    setTimeout(() => {
      clearInterval(scrollInterval)
    }, 1000)

    return () => {
      clearInterval(scrollInterval)
    }
  }, [])

  // Timeline data
  const timelineData = [
    {
      id: "2009-2011",
      years: "2009 – 2011",
      title: "Retail Merchandizing Audit",
      description:
        "Retail Merchandizing Audit on HHTs, including Perfect Store Audit for major FMCG and Merchandizing Audit for major beverage clients.",
      color: "blue",
      image: "https://images.pexels.com/photos/2251206/pexels-photo-2251206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      achievements: [
        "Launched first digital audit system",
        "Partnered with 3 major FMCG brands",
        "Established field operations in 5 cities",
      ],
      stats: {
        clients: 12,
        cities: 5,
        audits: 5000,
      },
    },
    {
      id: "2012-2013",
      years: "2012 – 2013",
      title: "Largest Retail Census",
      description:
        "Largest Retail Census of Pakistan & first-ever Retail Census in Afghanistan. Covering 15 key cities and 100% Urban, 80% Rural in Pakistan.",
      color: "red",
      image: "https://images.pexels.com/photos/696205/pexels-photo-696205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      achievements: [
        "Mapped 200,000+ retail outlets",
        "First company to conduct retail census in Afghanistan",
        "Developed proprietary geo-mapping technology",
      ],
      stats: {
        outlets: 200000,
        cities: 15,
        coverage: 80,
      },
    },
    {
      id: "2014-2015",
      years: "2014 – 2015",
      title: "Syndicated Retail Measurement",
      description:
        "Syndicated Retail Measurement Service for the Telecom Sector. Multiple census projects for beverage and telecom clients.",
      color: "blue",
      image: "https://images.pexels.com/photos/264502/pexels-photo-264502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      achievements: [
        "Pioneered telecom retail measurement",
        "Expanded to 8 regional offices",
        "Launched real-time data dashboard",
      ],
      stats: {
        telecomClients: 6,
        beverageClients: 4,
        dataPoints: 50000,
      },
    },
    {
      id: "2016-2018",
      years: "2016 – 2018",
      title: "Expanded Measurement Services",
      description:
        "Expanded Syndicated Retail Measurement Service for selected FMCG categories; Retail Audit for Tobacco Top Tier Outlets and RES.",
      color: "red",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      achievements: [
        "Added 5 new FMCG categories",
        "Developed specialized tobacco retail audit",
        "Grew field team to 300+ professionals",
      ],
      stats: {
        categories: 8,
        fieldTeam: 300,
        outlets: 15000,
      },
    },
    {
      id: "2019-2022",
      years: "2019 – 2022",
      title: "Syndicated National Retail Audit",
      description:
        "Syndicated National Retail Audit from 2019. Retail Census 2022, covering 100% Urban & sample rural areas.",
      color: "blue",
      image: "https://images.pexels.com/photos/5912622/pexels-photo-5912622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      achievements: [
        "Launched nationwide syndicated audit",
        "Covered 70+ districts across Pakistan",
        "Introduced AI-powered data validation",
      ],
      stats: {
        districts: 70,
        urbanCoverage: 100,
        dataAccuracy: 99.7,
      },
    },
    {
      id: "2023-2024",
      years: "2023 – 2024",
      title: "Modern Trade Integration",
      description:
        "Inclusion of Modern Trade in National Retail Audit, ensuring a comprehensive measurement of modern retail channels.",
      color: "red",
      image: "https://images.pexels.com/photos/3405456/pexels-photo-3405456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      achievements: [
        "Integrated modern trade channels",
        "Developed omnichannel measurement methodology",
        "Launched predictive retail analytics platform",
      ],
      stats: {
        modernTradeOutlets: 1200,
        predictiveAccuracy: 92,
        insightGeneration: 48,
      },
    },
  ]

  // Navigation functions
  const goToNext = () => {
    setActiveIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1))
  }

  const goToIndex = (index: number) => {
    setActiveIndex(index)
  }

  // Scroll active timeline marker into view
  useEffect(() => {
    if (timelineRef.current) {
      const activeMarker = timelineRef.current.querySelector(`[data-index="${activeIndex}"]`)
      if (activeMarker) {
        activeMarker.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeIndex])

  // Add this useEffect after the existing useEffect for scrolling
  useEffect(() => {
    // Initialize timeline on mobile by ensuring the active marker is visible
    if (timelineRef.current) {
      setTimeout(() => {
        const activeMarker = timelineRef.current.querySelector(`[data-index="${activeIndex}"]`)
        if (activeMarker) {
          activeMarker.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          })
        }
      }, 500) // Small delay to ensure DOM is ready
    }
  }, []) // Empty dependency array means this runs once on mount

  // Format stats for display
  const formatStats = (stats: Record<string, number>) => {
    return Object.entries(stats).map(([key, value]) => {
      // Format the key from camelCase to Title Case with spaces
      const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

      // Format the value (add + for most stats, % for percentages)
      const formattedValue =
        key.toLowerCase().includes("percentage") ||
        key.toLowerCase().includes("accuracy") ||
        key.toLowerCase().includes("coverage")
          ? `${value}%`
          : `${value.toLocaleString()}+`

      return { key: formattedKey, value: formattedValue }
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900"
      data-section="journey"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Journey</span>
          </motion.h2>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-blue-100 max-w-2xl mx-auto"
          >
            Explore our evolution from a specialized retail audit provider to the comprehensive retail intelligence
            leader we are today.
          </motion.p>
        </div>

        {/* Timeline Navigation */}
        <div className="mb-12 relative">
          {/* Timeline Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-900/50 transform -translate-y-1/2 rounded-full"></div>

          {/* Timeline Gradient Progress */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 transform -translate-y-1/2 rounded-full"
            style={{
              width: `${(activeIndex / (timelineData.length - 1)) * 100}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>

          {/* Timeline Markers Container */}
          <div
            ref={timelineRef}
            className="flex overflow-x-auto py-8 hide-scrollbar relative px-4 md:px-12 lg:px-24 xl:px-32 mx-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex justify-between w-full min-w-max mx-auto">
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  data-index={index}
                  className="flex-shrink-0 mx-4 first:ml-0 last:mr-0"
                  style={{ minWidth: "80px" }}
                >
                  <button
                    onClick={() => goToIndex(index)}
                    className="flex flex-col items-center relative group"
                    aria-label={`View ${item.years}`}
                  >
                    {/* Timeline Marker */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 relative",
                        index <= activeIndex
                          ? item.color === "blue"
                            ? "bg-blue-600 border-2 border-blue-400"
                            : "bg-red-600 border-2 border-red-400"
                          : "bg-blue-900/70 border-2 border-blue-800/50 group-hover:border-blue-700/70",
                      )}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full bg-white",
                          index === activeIndex ? "scale-150" : "scale-100",
                          "transition-transform duration-300",
                        )}
                      ></div>

                      {/* Pulse effect for active marker */}
                      {index === activeIndex && (
                        <div
                          className={cn(
                            "absolute inset-0 rounded-full animate-ping opacity-30",
                            item.color === "blue" ? "bg-blue-500" : "bg-red-500",
                          )}
                        ></div>
                      )}
                    </div>

                    {/* Year Label */}
                    <div
                      className={cn(
                        "mt-3 font-medium transition-all duration-300 text-center",
                        index === activeIndex
                          ? item.color === "blue"
                            ? "text-blue-300 scale-110 text-sm md:text-base"
                            : "text-red-300 scale-110 text-sm md:text-base"
                          : "text-blue-200/70 text-xs md:text-sm group-hover:text-blue-200",
                        "whitespace-nowrap",
                      )}
                    >
                      {item.years}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Indicators */}
          <div className="flex justify-center mt-2 md:hidden">
            <div className="flex space-x-1">
              {timelineData.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-blue-500 w-4" : "bg-blue-800/70",
                  )}
                  onClick={() => goToIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Slideshow */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-2 sm:left-0 transform -translate-y-1/2 z-20">
            <Button
              onClick={goToPrev}
              variant="outline"
              size="icon"
              className="bg-blue-900/50 border-blue-700/30 text-white hover:bg-blue-800/70 hover:text-white w-8 h-8 sm:w-10 sm:h-10"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 -right-2 sm:right-0 transform -translate-y-1/2 z-20">
            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="bg-blue-900/50 border-blue-700/30 text-white hover:bg-blue-800/70 hover:text-white w-8 h-8 sm:w-10 sm:h-10"
              aria-label="Next milestone"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Content Cards */}
          <div className="mx-8 sm:mx-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TimelineCard data={timelineData[activeIndex]} stats={formatStats(timelineData[activeIndex].stats)} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineCardProps {
  data: {
    years: string
    title: string
    description: string
    color: string
    image: string
    achievements: string[]
  }
  stats: Array<{ key: string; value: string }>
}

function TimelineCard({ data, stats }: TimelineCardProps) {
  const { years, title, description, color, image, achievements } = data

  return (
    <Card
      className={cn(
        "overflow-hidden border shadow-xl",
        color === "blue"
          ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 border-blue-800/30"
          : "bg-gradient-to-br from-red-900/80 to-red-950/90 border-red-800/30",
      )}
    >
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-48 sm:h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
              <div
                className={cn(
                  "absolute inset-0",
                  color === "blue"
                    ? "bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent md:via-blue-900/70 md:to-transparent"
                    : "bg-gradient-to-r from-red-950/90 via-red-900/70 to-transparent md:via-red-900/70 md:to-transparent",
                )}
              ></div>
            </div>

            {/* Year Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={cn(
                  "text-5xl sm:text-7xl md:text-8xl font-bold opacity-15",
                  color === "blue" ? "text-blue-300" : "text-red-300",
                )}
              >
                {years.split(" – ")[0]}
              </div>
            </div>

            {/* Year Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <div className="flex items-center gap-2">
                <Calendar
                  className={cn("h-4 w-4 sm:h-5 sm:w-5", color === "blue" ? "text-blue-300" : "text-red-300")}
                />
                <div
                  className={cn(
                    "px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium",
                    color === "blue"
                      ? "bg-blue-900/70 text-blue-100 border border-blue-700/50"
                      : "bg-red-900/70 text-red-100 border border-red-700/50",
                  )}
                >
                  {years}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
            <div className="w-16 h-1 mb-4 bg-gradient-to-r from-blue-500 to-red-500"></div>

            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">{description}</p>

            {/* Key Achievements */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Award className={cn("h-4 w-4 sm:h-5 sm:w-5", color === "blue" ? "text-blue-300" : "text-red-300")} />
                <h4 className="text-white font-medium text-sm sm:text-base">Key Achievements</h4>
              </div>

              <ul className="space-y-1 sm:space-y-2 pl-6 sm:pl-7">
                {achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 relative text-xs sm:text-sm">
                    <CheckCircle2
                      className={cn(
                        "absolute -left-6 sm:-left-7 h-4 w-4 sm:h-5 sm:w-5 mt-0.5",
                        color === "blue" ? "text-blue-400" : "text-red-400",
                      )}
                    />
                    <span className="text-blue-100">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <BarChart
                  className={cn("h-4 w-4 sm:h-5 sm:w-5", color === "blue" ? "text-blue-300" : "text-red-300")}
                />
                <h4 className="text-white font-medium text-sm sm:text-base">Key Metrics</h4>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-2 sm:p-3 rounded-lg text-center",
                      color === "blue"
                        ? "bg-blue-900/50 border border-blue-800/50"
                        : "bg-red-900/50 border border-red-800/50",
                    )}
                  >
                    <div
                      className={cn(
                        "text-base sm:text-xl font-bold mb-0.5 sm:mb-1",
                        color === "blue" ? "text-blue-300" : "text-red-300",
                      )}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-blue-100 line-clamp-2">{stat.key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

