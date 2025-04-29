"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  LineChart,
  PieChart,
  ChevronRight,
  Target,
  Zap,
  BarChart2,
  MapPin,
  CheckCircle,
  DollarSign,
  Briefcase,
} from "lucide-react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"

// Animated background with diagonal lines pattern
const DiagonalLinesBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base background color */}
      <div className="absolute inset-0 bg-[#001333]">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 60% 70%, rgba(239, 68, 68, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Diagonal lines pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-5">
        <defs>
          <pattern
            id="diagonalLines"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              backgroundColor: ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.6)", "rgba(255, 255, 255, 0.4)"][
                Math.floor(Math.random() * 3)
              ],
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
        {Array.from({ length: 5 }).map((_, i) => {
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

export default function TransformingMarketPerformancePage() {
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

      {/* Custom background */}
      <DiagonalLinesBackground />

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

        {/* Hero Section - Unique design with animated elements */}
        <section className="relative pt-16 pb-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            {/* Animated decorative elements */}
            <motion.div
              className="absolute top-20 right-0 w-64 h-64 rounded-full bg-red-500/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
            />

            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left side content */}
                <motion.div
                  className="lg:w-1/2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="inline-block mb-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    
                  </motion.div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                    Transforming
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                      Retail Experiences
                    </span>
                  </h1>

                  <motion.div
                    className="h-1 w-32 bg-gradient-to-r from-red-500 to-blue-500 mb-6"
                    initial={{ width: 0 }}
                    animate={{ width: 128 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />

                  <motion.p
                    className="text-lg text-white/80 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    At Access Retail, we empower brands and retailers through extensive mapping of retail landscape,
                    retail profiling & segmentation, actionable insights via market measurement, innovative in-store
                    compliance audits, and comprehensive tracking of price implementation as well as tools of trade.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                 
                  </motion.div>
                </motion.div>

                {/* Right side animated chart */}
                <motion.div
                  className="lg:w-1/2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-2xl blur-xl transform rotate-3"></div>
                    <div className="relative bg-[#001f4d]/60 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
                      {/* Animated chart visualization */}
                      <div className="h-64 w-full relative">
                        {/* Chart background grid */}
                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                          {Array.from({ length: 42 }).map((_, i) => (
                            <div key={i} className="border-b border-r border-white/10"></div>
                          ))}
                        </div>

                        {/* Animated chart lines */}
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <motion.path
                            d="M0,50 Q25,20 50,50 T100,50"
                            fill="none"
                            stroke="rgba(239, 68, 68, 0.8)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                          />
                          <motion.path
                            d="M0,70 Q30,40 60,30 T100,20"
                            fill="none"
                            stroke="rgba(59, 130, 246, 0.8)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, delay: 1.5 }}
                          />
                        </svg>

                        {/* Data points */}
                        {[
                          { x: 0, y: 50, color: "bg-red-500" },
                          { x: 25, y: 20, color: "bg-red-500" },
                          { x: 50, y: 50, color: "bg-red-500" },
                          { x: 75, y: 50, color: "bg-red-500" },
                          { x: 100, y: 50, color: "bg-red-500" },
                          { x: 0, y: 70, color: "bg-blue-500" },
                          { x: 30, y: 40, color: "bg-blue-500" },
                          { x: 60, y: 30, color: "bg-blue-500" },
                          { x: 100, y: 20, color: "bg-blue-500" },
                        ].map((point, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-3 h-3 ${point.color} rounded-full shadow-lg`}
                            style={{
                              left: `${point.x}%`,
                              top: `${point.y}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
                          />
                        ))}
                      </div>

                      <div className="mt-4 flex justify-between text-white/80 text-sm">
                        <div>Q1</div>
                        <div>Q2</div>
                        <div>Q3</div>
                        <div>Q4</div>
                      </div>

                      <div className="mt-6 flex items-center justify-center gap-8">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-white/80 text-sm">Market Share</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-white/80 text-sm">Revenue Growth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Services Section */}
        <section id="services" className="py-20">
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Market Transformation Services</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Comprehensive solutions designed to optimize your market presence and drive sustainable growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <MapPin className="h-10 w-10 text-white" />,
                  title: "Retail Landscape Mapping",
                  description:
                    "Comprehensive mapping of retail environments to identify opportunities and optimize distribution strategies.",
                  details: [
                    "Geographic distribution analysis",
                    "Store density mapping",
                    "Competitive landscape assessment",
                    "Market penetration opportunities",
                  ],
                  color: "from-blue-600 to-blue-800",
                },
                {
                  icon: <PieChart className="h-10 w-10 text-white" />,
                  title: "Retail Profiling & Segmentation",
                  description:
                    "Strategic categorization of retail outlets to tailor your approach and maximize impact.",
                  details: [
                    "Store classification by size and type",
                    "Customer demographic analysis",
                    "Purchase behavior segmentation",
                    "Targeted marketing strategies",
                  ],
                  color: "from-red-600 to-red-800",
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-white" />,
                  title: "Market Measurement",
                  description:
                    "Data-driven insights to understand market dynamics and track performance against competitors.",
                  details: [
                    "Market share analysis",
                    "Competitive benchmarking",
                    "Sales performance tracking",
                    "Growth opportunity identification",
                  ],
                  color: "from-blue-600 to-blue-800",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-white" />,
                  title: "In-Store Compliance Audits",
                  description:
                    "Innovative audit methodologies to ensure brand guidelines and merchandising standards are maintained.",
                  details: [
                    "Planogram compliance verification",
                    "Brand presence assessment",
                    "Promotional material implementation",
                    "Visual merchandising standards",
                  ],
                  color: "from-red-600 to-red-800",
                },
                {
                  icon: <DollarSign className="h-10 w-10 text-white" />,
                  title: "Price Implementation Tracking",
                  description:
                    "Comprehensive monitoring of pricing strategies to ensure consistency and competitiveness.",
                  details: [
                    "Price compliance monitoring",
                    "Discount implementation tracking",
                    "Competitive price analysis",
                    "Pricing strategy optimization",
                  ],
                  color: "from-blue-600 to-blue-800",
                },
                {
                  icon: <Briefcase className="h-10 w-10 text-white" />,
                  title: "Tools of Trade Tracking",
                  description: "Effective management and utilization tracking of marketing assets and trade tools.",
                  details: [
                    "Asset deployment monitoring",
                    "Utilization effectiveness",
                    "Condition assessment",
                    "ROI optimization",
                  ],
                  color: "from-red-600 to-red-800",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-xl"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  {/* Background gradient with animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#001f4d]/90 to-[#002a66]/90 group-hover:from-[#002a66]/90 group-hover:to-[#003380]/90 transition-all duration-300"></div>

                  {/* Decorative corner */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.color} transform translate-x-10 -translate-y-10 rotate-45`}
                  ></div>

                  <div className="relative p-8">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                      >
                        {service.icon}
                      </div>
                      <div className="ml-4 h-px flex-grow bg-gradient-to-r from-white/30 to-transparent"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/80 mb-6">{service.description}</p>

                    <ul className="space-y-2 mb-6">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div className="text-red-500 mr-2">•</div>
                          <span className="text-white/80 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-white font-medium hover:text-red-400 transition-colors"
                    >
                      Learn more <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Approach</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                A strategic methodology designed to deliver measurable results and sustainable market growth
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Central line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-blue-500 to-red-500 transform -translate-x-1/2 hidden md:block"></div>

                {[
                  {
                    
                    title: "Comprehensive Assessment",
                    description:
                      "We begin with a thorough analysis of your current market position, competitive landscape, and retail presence to identify strengths, weaknesses, and opportunities.",
                    icon: <Target className="h-8 w-8 text-white" />,
                    color: "from-red-600 to-red-700",
                  },
                  {
                    
                    title: "Strategic Planning",
                    description:
                      "Based on our assessment, we develop a tailored strategy to address your specific challenges and capitalize on identified opportunities for market growth.",
                    icon: <LineChart className="h-8 w-8 text-white" />,
                    color: "from-blue-600 to-blue-700",
                  },
                  {
                  
                    title: "Implementation & Execution",
                    description:
                      "Our experienced team works closely with you to implement the strategic plan, ensuring all elements are executed with precision and attention to detail.",
                    icon: <Zap className="h-8 w-8 text-white" />,
                    color: "from-red-600 to-red-700",
                  },
                  {
                    
                    title: "Monitoring & Optimization",
                    description:
                      "We continuously monitor performance metrics and market dynamics, making data-driven adjustments to optimize results and ensure sustainable growth.",
                    icon: <BarChart2 className="h-8 w-8 text-white" />,
                    color: "from-blue-600 to-blue-700",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 last:mb-0 relative ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {/* Step number with icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                      >
                        {step.number}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                          {step.icon}
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                      <div className="bg-[#001f4d]/70 backdrop-blur-sm rounded-xl p-6 border border-blue-900/50">
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-white/80">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
