"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Store, Map, BarChart3, ListChecks, ChevronRight, CheckCircle } from "lucide-react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"

// Enhanced Full Page Animation Background
const EnhancedAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#001333]">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <motion.path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="0.5"
                animate={{ strokeWidth: [0.5, 1, 0.5], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              backgroundColor: [
                "rgba(59, 130, 246, 0.6)",
                "rgba(37, 99, 235, 0.6)",
                "rgba(29, 78, 216, 0.6)",
                "rgba(219, 39, 119, 0.5)",
                "rgba(239, 68, 68, 0.5)",
              ][Math.floor(Math.random() * 5)],
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.5)"][Math.floor(Math.random() * 2)]
              }`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
              opacity: [0.1, Math.random() * 0.5 + 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated data lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = Math.random() * 100
          const startY = Math.random() * 100
          const endX = Math.random() * 100
          const endY = Math.random() * 100
          const controlX1 = (startX + endX) / 2 + (Math.random() * 30 - 15)
          const controlY1 = (startY + endY) / 2 + (Math.random() * 30 - 15)

          return (
            <motion.path
              key={i}
              d={`M ${startX}% ${startY}% Q ${controlX1}% ${controlY1}% ${endX}% ${endY}%`}
              fill="none"
              stroke={i % 2 === 0 ? "rgba(59, 130, 246, 0.2)" : "rgba(239, 68, 68, 0.2)"}
              strokeWidth="1.5"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.6, 0.6, 0],
                strokeWidth: [1, 2, 2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1],
                delay: i * 3,
              }}
            />
          )
        })}
      </svg>

      {/* Animated circles */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => {
          const size = Math.random() * 300 + 200
          return (
            <motion.div
              key={i}
              className="absolute rounded-full border opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderColor: i % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(239, 68, 68, 0.3)",
                borderWidth: "1px",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.05, 0.2, 0.05],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          )
        })}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {/* Triangles */}
        {Array.from({ length: 5 }).map((_, i) => {
          const size = Math.random() * 60 + 40
          const posX = Math.random() * 100
          const posY = Math.random() * 100
          const rotation = Math.random() * 360

          return (
            <motion.div
              key={`triangle-${i}`}
              className="absolute opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                opacity: [0, 0.2, 0],
                y: [0, -30, 0],
                rotate: [rotation, rotation + 40, rotation],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 2,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 0L100 100H0L50 0Z"
                  fill={i % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(239, 68, 68, 0.3)"}
                />
              </svg>
            </motion.div>
          )
        })}

        {/* Squares */}
        {Array.from({ length: 5 }).map((_, i) => {
          const size = Math.random() * 50 + 30
          const posX = Math.random() * 100
          const posY = Math.random() * 100
          const rotation = Math.random() * 360

          return (
            <motion.div
              key={`square-${i}`}
              className="absolute opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${size}px`,
                height: `${size}px`,
                border: `1px solid ${i % 2 === 0 ? "rgba(59, 130, 246, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                transform: `rotate(${rotation}deg)`,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [rotation, rotation + 30, rotation],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 1.5 + 3,
              }}
            />
          )
        })}

        {/* Hexagons */}
        {Array.from({ length: 3 }).map((_, i) => {
          const size = Math.random() * 70 + 50
          const posX = Math.random() * 100
          const posY = Math.random() * 100

          return (
            <motion.div
              key={`hex-${i}`}
              className="absolute opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                opacity: [0, 0.25, 0],
                y: [20, -20, 20],
                rotate: [0, 60, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 3 + 2,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
                  stroke={i % 2 === 0 ? "rgba(59, 130, 246, 0.4)" : "rgba(239, 68, 68, 0.4)"}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.div>
          )
        })}

        {/* Data nodes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const posX = Math.random() * 100
          const posY = Math.random() * 100

          return (
            <motion.div
              key={`node-${i}`}
              className="absolute w-3 h-3 opacity-0"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                background: i % 2 === 0 ? "rgba(59, 130, 246, 0.6)" : "rgba(239, 68, 68, 0.6)",
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 2 + Math.random() * 5,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function RetailCensusPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  // Same scroll prevention logic as your home page
  useEffect(() => {
    window.scrollTo(0, 0)

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }

    document.body.style.overflow = "hidden"

    const forceScrollTop = () => {
      window.scrollTo(0, 0)
    }

    const scrollInterval = setInterval(forceScrollTop, 50)

    setTimeout(() => {
      document.body.style.overflow = loading ? "hidden" : ""
      clearInterval(scrollInterval)
    }, 1000)

    const handlePopState = () => {
      window.scrollTo(0, 0)
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      clearInterval(scrollInterval)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [loading])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }


  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}

      {/* Enhanced animated background */}
      <EnhancedAnimatedBackground />

      <main
        ref={mainRef}
        className="min-h-screen relative z-10"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Hero Section */}
        <section className="relative pt-32 pb-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 mb-6 mx-auto md:mx-0"
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Retail{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
                    Census
                  </span>
                </h1>
                <p className="text-lg text-gray-300 max-w-xl">
                Complete Scanning and listing of Retail Stores along with GPS Coordinates

                </p>

                <motion.div
                  className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                <button
                    onClick={() => {
                        const element = document.getElementById("features");
                        if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-red-500/20"
                    >
                    Go to Features
                </button>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="md:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-2xl blur-xl transform -rotate-3"></div>
                  <div className="relative bg-[#001f4d]/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1515338541898-3f66e1659770?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Retail Census Visualization"
                      width={600}
                      height={400}
                      className="rounded-lg w-full object-cover blur-0-{1px}"
                    />
                   
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            
          </motion.div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  className="h-1 w-16 bg-gradient-to-r from-red-500 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Offerings</h2>
              
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <MapPin className="h-8 w-8" />,
                  title: "GPS Coordinates",
                  description: "Precise location data for every retail store in our database",
                },
                {
                  icon: <Store className="h-8 w-8" />,
                  title: "Store Profiling",
                  description: "Detailed classification by size, type, and product categories",
                },
                {
                  icon: <Map className="h-8 w-8" />,
                  title: "Geo Coding",
                  description: "Accurate mapping for spatial analysis and visualization",
                },
                {
                  icon: <BarChart3 className="h-8 w-8" />,
                  title: "Geographic Segmentation",
                  description: "Market segmentation by geographic and demographic factors",
                },
                {
                  icon: <ListChecks className="h-8 w-8" />,
                  title: "Store Business Type",
                  description: "Classification by size, turnover & importance ",
                },
                {
                  icon: <CheckCircle className="h-8 w-8" />,
                  title: "Distribution of Category",
                  description: "Analysis of product category presence across stores",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-[#001f4d]/80 to-[#002a66]/80 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-white/5"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-red-500/80 to-transparent"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-20 bg-[#001a40]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  className="h-1 w-16 bg-gradient-to-r from-red-500 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Methodology</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                A structured approach to ensure comprehensive and accurate data collection
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  number: "01",
                  title: "Planning & Preparation",
                  description:
                    "Define target areas, prepare survey instruments, and train field teams for comprehensive data collection.",
                },
                {
                  number: "02",
                  title: "Field Execution",
                  description:
                    "Systematic scanning of areas, store visits, and data collection with GPS tagging for accurate location data.",
                },
                {
                  number: "03",
                  title: "Data Processing",
                  description:
                    "Cleaning, validation, and organization of collected data to ensure accuracy and reliability.",
                },
                {
                  number: "04",
                  title: "Analysis & Reporting",
                  description:
                    "Geographic segmentation, store ranking, and comprehensive reporting with actionable insights.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start mb-12 last:mb-0"
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="mr-6 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xl font-bold">
                      {step.number}
                    </div>
                    {index < 3 && (
                      <div className="w-0.5 h-12 bg-gradient-to-b from-red-500 to-transparent mx-auto my-2"></div>
                    )}
                  </div>
                  <div className="bg-[#001f4d]/70 backdrop-blur-sm rounded-xl p-6 flex-grow border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <br></br>
        <br></br>
        <br></br>

        <Footer />
      </main>
    </>
  )
}
