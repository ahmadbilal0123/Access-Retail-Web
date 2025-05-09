"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Users, CheckCircle, Globe, Clock, Smartphone, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import Script from "next/script"

// Animated background component with enhanced visuals
const EnhancedAnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base grid pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-red-500/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-red-500/5 blur-2xl"
        animate={{
          scale: [1.2, 0.9, 1.2],
          x: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
      />

      {/* Animated lines */}
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

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.6)"][Math.floor(Math.random() * 2)],
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 68, 0.5)"][Math.floor(Math.random() * 2)]
              }`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
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

// Enhanced strength card component
const EnhancedStrengthCard = ({ icon, title, description, color, story, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  const bgColor = color === "blue" ? "from-blue-900/80 to-blue-950/80" : "from-red-900/80 to-red-950/80"
  const borderColor = color === "blue" ? "border-blue-700/50" : "border-red-700/50"
  const iconBgColor = color === "blue" ? "bg-blue-800" : "bg-red-800"
  const titleColor = color === "blue" ? "text-blue-300" : "text-red-300"
  const expandBtnColor = color === "blue" ? "text-blue-400 hover:text-blue-300" : "text-red-400 hover:text-red-300"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: 0.2 + delay }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${bgColor} backdrop-blur-sm border ${borderColor} shadow-xl`}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
          <div className="ml-4 h-px flex-grow bg-gradient-to-r from-white/30 to-transparent"></div>
        </div>

        <h3 className={`text-xl font-bold ${titleColor} mb-3`}>{title}</h3>
        <p className="text-white/80 mb-6">{description}</p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center font-medium ${expandBtnColor} transition-colors`}
        >
          {isExpanded ? "Hide Story" : "Our Story"}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 h-4 w-4"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 pb-2 text-white/70 text-sm">{story}</div>
        </motion.div>
      </div>

      {/* Decorative corner */}
      <div
        className={`absolute top-0 right-0 w-16 h-16 ${
          color === "blue" ? "bg-blue-600/30" : "bg-red-600/30"
        } transform translate-x-8 -translate-y-8 rotate-45`}
      ></div>
    </motion.div>
  )
}

export default function WhyAccessPage() {
  const mainRef = useRef<HTMLElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

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

  // Core strengths data
  const strengths = [
    {
      id: "innovation",
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Innovation & Customization",
      description:
        "We tailor solutions to match your unique needs, adopting cutting-edge approaches to gather and interpret retail data.",
      color: "blue",
      story:
        "When a major retail client needed insights on potential for chain extensions, we developed a custom methodology that combined area level trade concentration & profiling analysis together with demographic research, revealing potential customer footfall and likely growth patterns.",
      delay: 0,
    },
    {
      id: "client-servicing",
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Client Servicing",
      description:
        "Our senior management remains deeply involved in project design and reporting, ensuring swift response and value-added deliverables.",
      color: "red",
      story:
        "Our leadership team personally oversees every major project, with directors participating in client meetings and review sessions to ensure alignment with business objectives and delivery of actionable insights.",
      delay: 0.1,
    },
    {
      id: "quality",
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Quality Focus",
      description:
        "We emphasize quality at every stage—from data capture to processing through analysis & reporting—backed by independent QC checks and rigorous validations.",
      color: "blue",
      story:
        "Our multi-layered quality control process includes automated validation, manual verification, and field back-checks. This approach helped us achieve commendable data accuracy rates across our nationwide retail researches",
      delay: 0.2,
    },
    {
      id: "network",
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Strong Operations Network",
      description:
        "A proven track record in setting up and managing nationwide audits/trackers, as well as mega census projects with capability to deploy 1,000+ surveyors at any given time.",
      color: "red",
      story:
        "During the current (2024-25) Retail Census, we mobilized over 900 field agents in just two weeks across Pakistan with operation control from 70 districts, collecting data from more than 700,000 retail outlets to provide a comprehensive market snapshot.",
      delay: 0.3,
    },
    {
      id: "timelines",
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Adherence to Timelines",
      description:
        "We consistently deliver on time, leveraging an experienced field team and efficient data processing workflows.",
      color: "blue",
      story:
        "When a beverage client needed urgent market insights before a product launch, our team worked round the clock to deliver a comprehensive retail studies across 15 cities in just 10 days—one half of the industry standard timeline.",
      delay: 0.4,
    },
    {
      id: "technology",
      icon: <Smartphone className="h-6 w-6 text-white" />,
      title: "Adoption of Technology",
      description:
        "Handheld terminals, geo-tagging, and real-time dashboards power our innovative approach to retail research.",
      color: "red",
      story:
        "Our proprietary mobile data collection platform integrates GPS validation, image recognition, and real-time analytics, allowing our teams to undertake QC/validations as data is being collected in the field",
      delay: 0.5,
    },
  ]

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />

      <main
        ref={mainRef}
        className="min-h-screen bg-[#001333]"
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

        {/* Hero Section */}
        <section className="relative py-16">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
          
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  leading-tight tracking-tight animate-hero animate-quick-fade">
                Why{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">Access</span>{" "}
                <span className="text-white">Retail?</span>
              </h1>

              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              <motion.p
                className="text-lg text-white/80 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Discover the six core strengths that set us apart and make us the preferred partner for our valued clients
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Core Strengths Section */}
        <section ref={sectionRef} className="relative py-2 overflow-hidden">
          {/* Enhanced animated background */}
          <EnhancedAnimatedBackground />

          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}


            {/* Enhanced Strength Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {strengths.map((strength) => (
                <EnhancedStrengthCard
                  key={strength.id}
                  icon={strength.icon}
                  title={strength.title}
                  description={strength.description}
                  color={strength.color}
                  story={strength.story}
                  delay={strength.delay}
                />
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
