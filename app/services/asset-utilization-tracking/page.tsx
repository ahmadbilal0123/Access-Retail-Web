"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Layers, CheckCircle, ChevronRight, PieChart, LineChart, MapPin, BarChart3 } from "lucide-react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"

// Update the background pattern in EnhancedAnimatedBackground
const EnhancedAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#001333]">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
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
              backgroundColor: ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.6)"][Math.floor(Math.random() * 2)],
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

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 6 }).map((_, i) => {
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
    </div>
  )
}

// Replace the hero section with a new design without images
export default function AssetUtilizationTrackingPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  // Scroll prevention logic
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
        {/* Navigation */}
        <div className="container mx-auto px-4 pt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
          
          </motion.div>
        </div>

        {/* Redesigned Hero Section - No image */}
        <section className="relative pt-20 pb-2 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <motion.div
                className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              />
            </div>

            <div className="max-w-5xl mx-auto">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Top decorative line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mb-12"
                />

                {/* Title with animated underline */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                    ASSET <span className="text-red-500">UTILIZATION</span>
                  </h1>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                    <span className="text-red-500">TRACKING</span>
                  </h1>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-1 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 mx-auto mb-8"
                  />
                </motion.div>

                {/* Icon and description */}
                <div className="flex flex-col items-center mb-12">
                  

                  <motion.p
                    className="text-lg text-white/80 max-w-2xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Comprehensive monitoring and analysis of your retail assets to ensure maximum return on investment
                    and optimal utilization across all your retail locations.
                  </motion.p>
                </div>

                {/* Action buttons */}
                <motion.div
                  className="flex flex-wrap gap-6 justify-center mb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {/* <Link
                    href="#features"
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
                  >
                    Explore Features
                  </Link>
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                  >
                    Contact Us
                  </Link> */}
                </motion.div>

                {/* Stats cards */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
                >
                
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section - New grid layout */}
        <section id="features" className="py-2">
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
              <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
                Key<span className=" text-white"> - Offerings</span>
              </h2>
              
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Layers className="h-10 w-10 text-red-500" />,
                  title: "Asset Availability",
                  description:
                    "Track availability and deployment of your retail assets across locations to ensure optimal distribution and coverage.",
                  points: ["Asset inventory tracking", "Distribution analysis", "Coverage optimization"],
                },
                {
                  icon: <MapPin className="h-10 w-10 text-red-500" />,
                  title: "Asset Placement at Retail Stores",
                  description:
                    "Evaluate strategic placement within retail environments to maximize visibility and impact.",
                  points: ["Placement optimization", "Visibility assessment", "Traffic flow analysis"],
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-red-500" />,
                  title: "Asset Functionality & Physical Condition",
                  description:
                    "Assess functionality and physical condition to ensure effective operation and brand presentation.",
                  points: ["Functionality verification", "Condition assessment", "Maintenance recommendations"],
                },
                {
                  icon: <PieChart className="h-10 w-10 text-red-500" />,
                  title: "Asset Utilization with Own Products vs. Comp",
                  description: "Monitor how assets are being utilized to ensure they primarily support your products.",
                  points: ["Utilization analysis", "Competitive usage monitoring", "Compliance enforcement"],
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-[#001f4d]/70 to-[#002a66]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 h-full"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="p-6">
                    <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/80 mb-4">{feature.description}</p>
                    <div className="h-0.5 w-full bg-gradient-to-r from-red-500/20 to-red-500/80 mb-4"></div>
                    <ul className="space-y-2">
                      {feature.points.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <div className="text-red-500 mr-2">•</div>
                          <span className="text-white/80 text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>

        <Footer />
      </main>
    </>
  )
}
