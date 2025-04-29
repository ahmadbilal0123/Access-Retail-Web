"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useInView, useTransform } from "framer-motion"
import {
  ArrowLeft,
  Home,
  PlayCircle,
  Info,
  Eye,
  Calendar,
  ShoppingBag,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base background color */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000c1f] to-[#001333]">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(239, 68, 48, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(239, 68, 48, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0zMCAwaDMwdjMwSDMweiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 48, 0.6)", "rgba(255, 255, 255, 0.4)"][
                Math.floor(Math.random() * 3)
              ],
              boxShadow: `0 0 ${Math.random() * 8 + 3}px ${
                ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 48, 0.5)"][Math.floor(Math.random() * 2)]
              }`,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, 0],
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

// Research method card component
const ResearchMethodCard = ({ method, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  // Alternate colors between blue and red
  const isBlue = index % 2 === 0
  const cardColor = isBlue ? "from-blue-900/80 to-blue-950/80" : "from-red-900/80 to-red-950/80"
  const borderColor = isBlue ? "border-blue-700/50" : "border-red-700/50"
  const iconBgColor = isBlue ? "bg-blue-700" : "bg-red-700"
  const iconRingColor = isBlue ? "ring-blue-500/30" : "ring-red-500/30"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cardColor} backdrop-blur-sm border ${borderColor} shadow-xl h-full`}
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div
            className={`w-16 h-16 rounded-full ${iconBgColor} ring-2 ${iconRingColor} flex items-center justify-center shadow-lg`}
          >
            {method.icon}
          </div>
          <h3 className="text-xl font-bold text-white ml-4">{method.title}</h3>
        </div>

        <ul className="space-y-3 text-white/80">
          {method.points.map((point, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className={`h-5 w-5 text-${isBlue ? "blue" : "red"}-400 mr-2 flex-shrink-0 mt-0.5`} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">{method.decorativeIcon}</div>
    </motion.div>
  )
}

// Animated counter component
const AnimatedCounter = ({ value, label, color }) => {
  const counterRef = useRef(null)
  const isInView = useInView(counterRef, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = Number.parseInt(value.toString().replace(/,/g, ""))
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start > end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div
        className={`text-4xl md:text-5xl font-bold mb-2 ${
          color === "blue" ? "text-blue-500" : color === "red" ? "text-red-500" : "text-white"
        }`}
      >
        {formattedCount}
        <span className="text-2xl">+</span>
      </div>
      <div className="text-white/70">{label}</div>
    </motion.div>
  )
}

// Parallax section component
const ParallaxSection = ({ children }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

// Research methods data
const researchMethods = [
  {
    title: "Household Surveys",
    icon: <Home className="h-8 w-8 text-white" />,
    decorativeIcon: <Home className="h-24 w-24 text-white" />,
    points: [
      "HHSs are useful for studying consumers daily usage and attitude behavior with the same profile.",
      "Listing helps in identifying the incidence rate of any particular brand.",
      "Mostly used technique to interact with the target segment.",
    ],
  },
  {
    title: "Central Location Tests",
    icon: <PlayCircle className="h-8 w-8 text-white" />,
    decorativeIcon: <PlayCircle className="h-24 w-24 text-white" />,
    points: [
      "CLTs are usually performed for product, pack, and ad tests for 1 – 3 brands, along with competitive analysis.",
      "Arranged in a controlled environment.",
      "Eliminates most of business elements",
    ],
  },
  {
    title: "Home Usage Tests",
    icon: <Info className="h-8 w-8 text-white" />,
    decorativeIcon: <Info className="h-24 w-24 text-white" />,
    points: [
      "HUTs are performed specifically for products which are to be used at homes over a longer period of time (cannot be tested in CLTs).",
      "Consumers test these products in their real life time experience and provide their feedback.",
    ],
  },
  {
    title: "Exit Observations/Interviews",
    icon: <Eye className="h-8 w-8 text-white" />,
    decorativeIcon: <Eye className="h-24 w-24 text-white" />,
    points: [
      "Observations and interviews at exit points of stores enable to gauge 1st hand knowledge about customer shopping experiences.",
      "This is being vastly used to understand shopper behaviors.",
    ],
  },
  {
    title: "Appointment based F2F Interviews",
    icon: <Calendar className="h-8 w-8 text-white" />,
    decorativeIcon: <Calendar className="h-24 w-24 text-white" />,
    points: [
      "In high profile socio-economic-classes, this technique helps in initially taking an appointment and then conducting the F2F Quantitative interview.",
      "Usually conducted with MDs and CEOs of companies.",
    ],
  },
  {
    title: "Mystery Shopping",
    icon: <ShoppingBag className="h-8 w-8 text-white" />,
    decorativeIcon: <ShoppingBag className="h-24 w-24 text-white" />,
    points: [
      "MS is useful to ascertain the performance of a specific branded outlets/stores versus their competitors and highlight key areas of improvement to cater the shoppers more effectively.",
      "Usually conducted for retail stores, banks and service centers.",
    ],
  },
]

// Benefits data
const benefits = [
  {
    title: "Data-Driven Decision Making",
    description:
      "Our quantitative research provides robust data that enables confident, evidence-based business decisions.",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "blue",
  },
  {
    title: "Market Trend Identification",
    description:
      "Identify emerging consumer trends and market shifts before your competitors to gain strategic advantage.",
    icon: <LineChart className="h-6 w-6" />,
    color: "red",
  },
  {
    title: "Consumer Behavior Insights",
    description:
      "Understand the 'why' behind consumer choices and behaviors to develop more effective marketing strategies.",
    icon: <PieChart className="h-6 w-6" />,
    color: "blue",
  },
]

export default function QuantitativeConsumermetricsPage() {
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

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}

      {/* Custom animated background */}
      <AnimatedBackground />

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

        {/* Hero Section with Unique Design */}
        <section className="relative py-16 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-block mb-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-full blur-xl"></div>
                    
                  </div>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Quantitative{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                    Consumermetrics
                  </span>
                </h1>

                <motion.div
                  className="h-1 w-32 bg-gradient-to-r from-red-500 to-blue-500 mb-6 mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />

                <motion.p
                  className="text-lg text-white/80 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Our comprehensive suite of quantitative research methodologies delivers actionable consumer insights
                  that drive strategic business decisions and market success.
                </motion.p>
              </motion.div>

            </div>
          </div>
        </section>

      
        {/* Research Methods Section */}
        <section id="research-methods" className="py-2">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Research Methods</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                We employ a diverse range of quantitative research methodologies to gain comprehensive insights into
                consumer behavior and market dynamics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchMethods.map((method, index) => (
                <ResearchMethodCard key={index} method={method} index={index} />
              ))}
            </div>
          </div>
        </section>

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
