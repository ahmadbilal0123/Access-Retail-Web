"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, CheckCircle, BarChart3, ChevronRight, Layers, Store } from "lucide-react"
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

export default function MerchandizingAuditsPage() {
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

        {/* Hero Section - Centered with image below */}
        <section className="relative pt-16 pb-24">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                MERCHANDIZING
                <br />
                <span className="text-red-500">AUDITS</span>
              </h1>
              

              <motion.div
                className="mt-8 flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="#features"
                  className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all shadow-lg"
                >
                  Explore Features
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
             
            </motion.div>
          </div>
        </section>

        {/* Features Section - Grid layout with large icons */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
                Key<span className=" text-white"> - Offerings</span>
              </h2>
             
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-[#001f4d]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 group text-center p-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center">
                    <Store className="h-12 w-12 text-red-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">On-Shelf Availability</h3>
                <p className="text-white/80 mb-6">
                  We monitor and measure the availability of your products on retail shelves to ensure consistent
                  presence and minimize out-of-stock situations.
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Regular stock level monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Out-of-stock reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Replenishment recommendations</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-[#001f4d]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 group text-center p-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-red-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Share of Shelf</h3>
                <p className="text-white/80 mb-6">
                  We measure your brand's share of shelf space compared to competitors, helping you optimize visibility
                  and presence in key retail locations.
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Competitive shelf space analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Category share tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Shelf optimization recommendations</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-[#001f4d]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 group text-center p-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-red-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Plan-o-gram Compliance</h3>
                <p className="text-white/80 mb-6">
                  We verify that your products are displayed according to agreed planograms, ensuring optimal product
                  placement and visibility.
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Plan-o-gram implementation verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Compliance reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Corrective action recommendations</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-[#001f4d]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 group text-center p-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center">
                    <Layers className="h-12 w-12 text-red-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Point of Sales Materials Availability</h3>
                <p className="text-white/80 mb-6">
                  We track the presence and condition of your point of sales materials to ensure effective in-store
                  marketing and brand visibility.
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">POS materials inventory</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Condition assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Placement optimization</span>
                  </li>
                </ul>
              </motion.div>
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
