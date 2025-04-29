"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useInView } from "framer-motion"
import {
  ArrowLeft,
  Users,
  UserRound,
  Microscope,
  ShoppingCart,
  Network,
  Store,
  ChevronRight,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

// Hexagonal background pattern component
const HexagonalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base background color */}
      <div className="absolute inset-0 bg-[#001333]">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 60% 70%, rgba(239, 68, 48, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 30%, rgba(239, 68, 48, 0.4) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Hexagonal pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-5">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path
              d="M25 0 L50 14.4 L50 38.6 L25 53 L0 38.6 L0 14.4 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
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
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              backgroundColor: ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 48, 0.6)", "rgba(255, 255, 255, 0.4)"][
                Math.floor(Math.random() * 3)
              ],
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                ["rgba(59, 130, 246, 0.6)", "rgba(239, 68, 48, 0.5)"][Math.floor(Math.random() * 2)]
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

// Research method card component
const ResearchMethodCard = ({ method, index, totalMethods }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  // Calculate position for hexagonal layout
  const row = Math.floor(index / 3)
  const col = index % 3
  const isEvenRow = row % 2 === 0
  const offset = isEvenRow ? 0 : 1

  // Alternate colors between blue and red
  const isBlue = index % 2 === 0
  const cardColor = isBlue ? "from-blue-900/80 to-blue-950/80" : "from-red-900/80 to-red-950/80"
  const borderColor = isBlue ? "border-blue-700/50" : "border-red-700/50"
  const iconBgColor = isBlue ? "bg-blue-800/50" : "bg-red-800/50"
  const iconRingColor = isBlue ? "ring-blue-500/30" : "ring-red-500/30"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cardColor} backdrop-blur-sm border ${borderColor} shadow-xl h-full`}
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div
            className={`w-16 h-16 rounded-full ${iconBgColor} ring-4 ${iconRingColor} flex items-center justify-center shadow-lg`}
          >
            {method.icon}
          </div>
          <div className="ml-4 h-px flex-grow bg-gradient-to-r from-white/30 to-transparent"></div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4">{method.title}</h3>

        <ul className="space-y-3 text-white/80">
          {method.points.map((point, i) => (
            <li key={i} className="flex items-start">
              <span className={`text-${isBlue ? "blue" : "red"}-400 mr-2`}>•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative corner */}
      <div
        className={`absolute top-0 right-0 w-16 h-16 ${
          isBlue ? "bg-blue-600/30" : "bg-red-600/30"
        } transform translate-x-8 -translate-y-8 rotate-45`}
      ></div>
    </motion.div>
  )
}

// Data visualization component
const DataVisualization = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const [graphProgress, setGraphProgress] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setGraphProgress(value > 0.5 ? 1 : value * 2)
    })

    return () => {
      unsubscribe()
    }
  }, [scrollYProgress])

  const graphProgressValue = Math.min(graphProgress, 1)
  const lineDashOffset = 240 * (1 - graphProgressValue)

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl bg-[#001f4d]/60 backdrop-blur-sm border border-blue-900/50 shadow-xl"
    >
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="border-b border-r border-white/10"></div>
        ))}
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0,80 Q10,70 20,75 T40,65 T60,55 T80,35 T100,30"
          fill="none"
          stroke="rgba(239, 68, 48, 0.8)"
          strokeWidth="2"
          strokeDasharray="240"
          strokeDashoffset={240}
          style={{ strokeDashoffset: lineDashOffset }}
        />
        <motion.path
          d="M0,90 Q15,85 30,80 T50,70 T70,50 T100,40"
          fill="none"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          strokeDasharray="240"
          strokeDashoffset={240}
          style={{ strokeDashoffset: lineDashOffset }}
        />

        {/* Data points */}
        {[
          { x: 0, y: 80, color: "bg-red-500", progress: 0.1 },
          { x: 20, y: 75, color: "bg-red-500", progress: 0.3 },
          { x: 40, y: 65, color: "bg-red-500", progress: 0.5 },
          { x: 60, y: 55, color: "bg-red-500", progress: 0.7 },
          { x: 80, y: 35, color: "bg-red-500", progress: 0.9 },
          { x: 100, y: 30, color: "bg-red-500", progress: 1 },
          { x: 0, y: 90, color: "bg-blue-500", progress: 0.15 },
          { x: 30, y: 80, color: "bg-blue-500", progress: 0.35 },
          { x: 50, y: 70, color: "bg-blue-500", progress: 0.55 },
          { x: 70, y: 50, color: "bg-blue-500", progress: 0.75 },
          { x: 100, y: 40, color: "bg-blue-500", progress: 1 },
        ].map((point, i) => {
          const pointOpacity = point.progress <= graphProgressValue ? 1 : 0
          const pointScale = point.progress <= graphProgressValue ? 1 : 0

          return (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 ${point.color} rounded-full shadow-lg`}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: pointOpacity,
                scale: pointScale,
              }}
            />
          )
        })}
      </svg>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-white/80 text-sm">Qualitative Insights</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-white/80 text-sm">Quantitative Data</span>
        </div>
      </div>
    </div>
  )
}

// Research methods data
const researchMethods = [
  {
    title: "Focused Group Discussions",
    icon: <Users className="h-8 w-8 text-white" />,
    points: [
      "FGDs are useful for studying concepts, perceptions, and beliefs of people sharing the same profile.",
      "It is a widely used qualitative research technique",
    ],
  },
  {
    title: "In-Depth Interviews",
    icon: <UserRound className="h-8 w-8 text-white" />,
    points: [
      "In-depth interviews are detailed/lengthy",
      "Interviews covering a wide range of information",
      "Usually, these interviews are conducted with experts or when the target audience is difficult to find.",
    ],
  },
  {
    title: "Ethnography",
    icon: <Microscope className="h-8 w-8 text-white" />,
    points: [
      "Ethnography is the study of social interactions, behaviors, and perceptions that occur within groups, teams, organizations, and communities.",
      "It provides rich, holistic insights into people's views and actions, as well as the nature of the location they inhabit, through the collection of detailed observations and interviews.",
    ],
  },
  {
    title: "Shopnography",
    icon: <ShoppingCart className="h-8 w-8 text-white" />,
    points: ["Unveiling consumer choices and attitudes through accompanied shopping trips."],
  },
  {
    title: "Consumer Connects",
    icon: <Network className="h-8 w-8 text-white" />,
    points: ["If the client team wants to conduct the research themselves, we provide recruitment services too."],
  },
  {
    title: "Market Visit",
    icon: <Store className="h-8 w-8 text-white" />,
    points: ["Observational market visits or intercepts to understand why consumers make different decisions."],
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

      {/* Custom hexagonal background */}
      <HexagonalBackground />

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
                  Qualitative
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                  Consumetrics
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
                  Our comprehensive approach to understanding consumer behavior combines rigorous quantitative analysis
                  with deep qualitative insights. We employ a diverse range of research methodologies to uncover the
                  motivations, preferences, and decision-making processes that drive consumer choices.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Link
                    href="#research-methods"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
                  >
                    Explore Methods
                  </Link>
                  
                </motion.div>
              </motion.div>

              {/* Right side animated visualization */}
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-2xl blur-xl transform rotate-3"></div>
                  <div className="relative bg-[#001f4d]/60 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-white/80 text-sm">Qualitative</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-white/80 text-sm">Quantitative</span>
                      </div>
                    </div>

                    {/* Animated hexagonal visualization */}
                    <div className="relative h-64 w-full">
                      <svg width="100%" height="100%" viewBox="0 0 400 300" className="opacity-20">
                        <defs>
                          <pattern id="smallHex" width="20" height="17.32" patternUnits="userSpaceOnUse">
                            <path
                              d="M10 0 L20 5.77 L20 15.47 L10 21.24 L0 15.47 L0 5.77 Z"
                              fill="none"
                              stroke="rgba(255, 255, 255, 0.5)"
                              strokeWidth="0.5"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#smallHex)" />
                      </svg>

                      {/* Animated hexagons */}
                      {[
                        { x: 200, y: 150, size: 80, color: "rgba(59, 130, 246, 0.6)", delay: 0 },
                        { x: 140, y: 100, size: 60, color: "rgba(239, 68, 48, 0.6)", delay: 0.2 },
                        { x: 260, y: 100, size: 60, color: "rgba(239, 68, 48, 0.6)", delay: 0.4 },
                        { x: 140, y: 200, size: 60, color: "rgba(239, 68, 48, 0.6)", delay: 0.6 },
                        { x: 260, y: 200, size: 60, color: "rgba(239, 68, 48, 0.6)", delay: 0.8 },
                        { x: 80, y: 150, size: 40, color: "rgba(59, 130, 246, 0.4)", delay: 1 },
                        { x: 320, y: 150, size: 40, color: "rgba(59, 130, 246, 0.4)", delay: 1.2 },
                      ].map((hex, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            left: hex.x,
                            top: hex.y,
                            width: hex.size,
                            height: hex.size,
                            marginLeft: -hex.size / 2,
                            marginTop: -hex.size / 2,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 1 + hex.delay }}
                        >
                          <svg width="100%" height="100%" viewBox="0 0 100 100">
                            <motion.path
                              d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
                              fill={hex.color}
                              stroke="rgba(255, 255, 255, 0.5)"
                              strokeWidth="1"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 1 + hex.delay }}
                            />
                            {i === 0 && (
                              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                Consumer
                              </text>
                            )}
                            {i === 1 && (
                              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10">
                                FGDs
                              </text>
                            )}
                            {i === 2 && (
                              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10">
                                Interviews
                              </text>
                            )}
                            {i === 3 && (
                              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10">
                                Ethnography
                              </text>
                            )}
                            {i === 4 && (
                              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10">
                                Market Visit
                              </text>
                            )}
                          </svg>
                        </motion.div>
                      ))}

                      {/* Connecting lines */}
                      <svg width="100%" height="100%" className="absolute inset-0">
                        {[
                          { x1: 200, y1: 150, x2: 140, y2: 100, delay: 1.5 },
                          { x1: 200, y1: 150, x2: 260, y2: 100, delay: 1.7 },
                          { x1: 200, y1: 150, x2: 140, y2: 200, delay: 1.9 },
                          { x1: 200, y1: 150, x2: 260, y2: 200, delay: 2.1 },
                          { x1: 140, y1: 100, x2: 80, y2: 150, delay: 2.3 },
                          { x1: 260, y1: 100, x2: 320, y2: 150, delay: 2.5 },
                        ].map((line, i) => (
                          <motion.line
                            key={i}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: line.delay }}
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="text-center mt-4">
                      <div className="text-white font-medium">Integrated Research Approach</div>
                      <div className="text-white/60 text-sm">
                        Combining multiple methodologies for comprehensive insights
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Research Methods Section with Hexagonal Grid */}
        <section id="research-methods" className="py-20">
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
                We employ a diverse range of qualitative and quantitative research methodologies to gain comprehensive
                insights into consumer behavior and market dynamics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchMethods.map((method, index) => (
                <ResearchMethodCard key={index} method={method} index={index} totalMethods={researchMethods.length} />
              ))}
            </div>
          </div>
        </section>

        {/* Data Visualization Section */}
        <section className="py-16 bg-[#001a40]/50 backdrop-blur-sm">
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
             
             
            </motion.div>

           
          </div>
        </section>

       

        <Footer />
      </main>
    </>
  )
}
