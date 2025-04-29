"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, BarChart3, ChevronRight, TrendingUp, PieChart, Percent, LineChart } from "lucide-react"
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
                "rgba(239, 68, 68, 0.5)",
                "rgba(219, 39, 119, 0.5)",
              ][Math.floor(Math.random() * 4)],
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
    </div>
  )
}

export default function TradeMarginStudiesPage() {
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
        <section className="relative pt-20 pb-2">
          <div className="container mx-auto px-4 relative z-10">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-5xl mx-auto">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
               

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8"
                ></motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                  TRADE MARGIN
                  <br />
                  <span className="text-red-500">STUDIES</span>
                </h1>

                <motion.p
                  className="text-lg text-white/80 max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Comprehensive analysis of pricing strategies, discount patterns, and margin structures to optimize
                  your pricing and promotional strategies.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section - Hexagonal grid */}
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
                  className="h-1 w-16 bg-red-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Features</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Our trade margin studies provide comprehensive insights into pricing strategies and market dynamics
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: <BarChart3 className="h-10 w-10 text-red-500" />,
                  title: "Numeric Availability of Products",
                  description:
                    "We measure the availability of your products across retail channels to identify distribution gaps and opportunities.",
                },
                {
                  icon: <Percent className="h-10 w-10 text-red-500" />,
                  title: "Discount Incidence & Level",
                  description:
                    "We analyze the frequency and depth of discounts to help you optimize promotional strategies.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-red-500" />,
                  title: "In-Market Discounting & Patterns",
                  description:
                    "We track market-wide discounting patterns to help you stay competitive and responsive to market dynamics.",
                },
                {
                  icon: <DollarSign className="h-10 w-10 text-red-500" />,
                  title: "Net Trade Price",
                  description:
                    "We analyze the actual prices paid by retailers after all discounts and promotions to understand true pricing dynamics.",
                },
                {
                  icon: <PieChart className="h-10 w-10 text-red-500" />,
                  title: "Retail Price to Consumer",
                  description:
                    "We track the final prices paid by consumers to understand price positioning and value perception.",
                },
                {
                  icon: <LineChart className="h-10 w-10 text-red-500" />,
                  title: "Retailer's Margins",
                  description:
                    "We analyze retailer margins to help you develop pricing strategies that balance profitability with market competitiveness.",
                },
                {
                  icon: <LineChart className="h-10 w-10 text-red-500" />,
                  title: "Trade/ Consumer Promo",
                  description:
                    " Trade promotions are discounts offered by manufacturers to retailers, encouraging retailers to buy more and potentially pass on savings to consumers.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="w-full md:w-[30%] bg-[#001f4d]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 p-6 text-center"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
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
