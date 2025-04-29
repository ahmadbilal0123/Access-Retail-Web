"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Award, Users, Calendar, Gift, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

// Define animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "reverse" as const,
  },
}

// Define card item interface with emoji property
interface CardItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
  story: string
  delay: number
  emoji?: string // Added emoji as optional property
}

// Define testimonial interface
interface TestimonialItem {
  id: string
  text: string
  author: {
    name: string
    initials: string
    role: string
  }
  color: string
  delay: number
}

// Define activity cards
const activityCards: CardItem[] = [
  {
    id: "monthly-workshops",
    icon: <Calendar className="text-blue-300" size={24} />,
    title: "Monthly Workshops",
    description: "Skill-building sessions to enhance professional growth and foster innovation.",
    color: "blue",
    story: "Our workshops have led to numerous innovations",
    delay: 0.2,
    emoji: "🔧", // Added emoji
  },
  {
    id: "community-service",
    icon: <Users className="text-red-300" size={24} />,
    title: "Community Service",
    description: "Quarterly initiatives to give back to our community and make a positive impact.",
    color: "red",
    story: "We've helped over 20 local organizations",
    delay: 0.4,
    emoji: "🤝", // Added emoji
  },
  {
    id: "seasonal-celebrations",
    icon: <Gift className="text-purple-300" size={24} />,
    title: "Seasonal Celebrations",
    description: "Festive gatherings to celebrate holidays, milestones, and company achievements.",
    color: "purple",
    story: "Our holiday parties are legendary",
    delay: 0.6,
    emoji: "🎉", // Added emoji
  },
]

// Define testimonials
const testimonials: TestimonialItem[] = [
  {
    id: "1",
    text: "AR Day is the highlight of our year! The team games are so much fun, and it's amazing to see everyone's hidden talents during the show. Can't wait for the next one!",
    author: {
      name: "Maria Santos",
      initials: "MS",
      role: "Customer Success Manager",
    },
    color: "blue",
    delay: 0.2,
  },
  {
    id: "2",
    text: "Winning the Innovation Champion award last AR Day was a career highlight. The recognition from peers and leadership team meant everything to me and my team.",
    author: {
      name: "David Kim",
      initials: "DK",
      role: "Product Development Lead",
    },
    color: "red",
    delay: 0.4,
  },
]

export default function LifeAtAccess() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  // State for visibility
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({})
  const observerRefs = useRef<(HTMLElement | null)[]>([])

  // Scroll prevention logic during loading
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

  // Intersection observer for animations
  useEffect(() => {
    const observers = observerRefs.current
      .map((ref, index) => {
        if (!ref) return null

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible((prev) => ({ ...prev, [index]: true }))
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.1 },
        )

        observer.observe(ref)
        return observer
      })
      .filter(Boolean) // Filter out null observers

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  // Properly type the addToRefs function
  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !observerRefs.current[index]) {
      observerRefs.current[index] = el
    }
  }

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}
      <main
        ref={mainRef}
        className="min-h-screen bg-[#001333] text-white overflow-hidden"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Hero Section with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2252]/80 to-[#8b2e2e]/80 z-10"></div>
          <Image
            src="/collaborative-success.png"
            alt="Life at Access Retail"
            width={1600}
            height={800}
            className="w-full h-full object-cover"
          />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Life @ <span className="text-red-600">Access </span><span className="text-blue-600">Retail</span></h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-red-500 to-blue-500 my-4"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl md:text-2xl max-w-2xl"
            >
              Where Work Meets Fun, Growth, and Recognition
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto max-w-6xl px-4 py-16">
          {/* Activities Section */}
          <motion.section
            ref={(el) => addToRefs(el, 0)}
            initial="hidden"
            animate={isVisible[0] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={{
                  rotate: [0, 10, 0],
                  transition: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse" as const,
                  },
                }}
                className="w-12 h-12 rounded-full bg-[#0a2252] flex items-center justify-center mr-4"
              >
                <Calendar className="text-blue-300" size={24} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">Our Activities</h2>
            </div>

            <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Map through activity cards */}
              {activityCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-[#0a2252]/30 rounded-lg overflow-hidden border border-[#0a2252] group hover:bg-[#0a2252]/50 transition-all duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={
                        index === 0
                          ? "/collaborative-puzzle.png"
                          : index === 1
                            ? "/interconnected-responsibility.png"
                            : "/office-cheer.png"
                      }
                      alt={card.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">{card.emoji}</span>
                      <h3 className="text-xl font-bold">{card.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{card.description}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-blue-400 group-hover:text-blue-300"
                    >
                      Learn more <ChevronRight size={16} className="ml-1" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Rewards Section */}
          <motion.section
            ref={(el) => addToRefs(el, 1)}
            initial="hidden"
            animate={isVisible[1] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse" as const,
                  },
                }}
                className="w-12 h-12 rounded-full bg-[#8b2e2e] flex items-center justify-center mr-4"
              >
                <Award className="text-red-300" size={24} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">Rewards & Recognition</h2>
            </div>

            <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rewards Card 1 */}
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                className="bg-gradient-to-r from-[#0a2252]/20 to-[#0a2252]/40 p-8 rounded-lg border-l-4 border-blue-500 hover:from-[#0a2252]/30 hover:to-[#0a2252]/50 transition-all duration-300"
              >
                <div className="flex items-start">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="bg-blue-500/20 p-3 rounded-full mr-4"
                  >
                    <Award className="text-blue-400" size={32} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Employee of the Month</h3>
                    <p className="text-gray-300">
                      Recognizing outstanding performance and dedication with special perks and company-wide
                      acknowledgment.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full"
                      >
                        Recognition
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full"
                      >
                        Bonus
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full"
                      >
                        Perks
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Rewards Card 2 */}
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                className="bg-gradient-to-r from-[#8b2e2e]/20 to-[#8b2e2e]/40 p-8 rounded-lg border-l-4 border-red-500 hover:from-[#8b2e2e]/30 hover:to-[#8b2e2e]/50 transition-all duration-300"
              >
                <div className="flex items-start">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="bg-red-500/20 p-3 rounded-full mr-4"
                  >
                    <Gift className="text-red-400" size={32} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Innovation Awards</h3>
                    <p className="text-gray-300">
                      Celebrating creative solutions and breakthrough ideas that drive our company forward.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full"
                      >
                        Creativity
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full"
                      >
                        Problem-Solving
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full"
                      >
                        Recognition
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

                
                

          {/* AR Day Special Section */}
          <motion.section
            ref={(el) => addToRefs(el, 3)}
            initial="hidden"
            animate={isVisible[3] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={pulseAnimation}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0a2252] to-[#8b2e2e] flex items-center justify-center mr-4"
              >
                <Calendar className="text-white" size={24} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">AR Day Celebration</h2>
            </div>

            {/* AR Day Hero Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible[3] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a2252]/70 to-[#8b2e2e]/70 z-10"></div>
              <Image
                src="/ar-day-celebration.png"
                alt="AR Day Celebration"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isVisible[3] ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Annual AR Day</h3>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible[3] ? { width: "4rem" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="h-1 bg-gradient-to-r from-red-500 to-blue-500 my-3"
                ></motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isVisible[3] ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-lg md:text-xl max-w-2xl"
                >
                  A day of celebration, recognition, and team bonding
                </motion.p>
              </motion.div>
            </motion.div>

           

           

            {/* AR Day Memories */}
            <motion.div
              ref={(el) => addToRefs(el, 6)}
              initial="hidden"
              animate={isVisible[6] ? "visible" : "hidden"}
              variants={fadeInUp}
              className="mb-10"
            >
              <h3 className="text-2xl font-bold mb-6">Memories from Past AR Days</h3>
              <motion.div variants={staggerChildren} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <motion.div
                    key={`memory-${num}`}
                    variants={fadeIn}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    className="relative overflow-hidden rounded-lg group"
                  >
                    <Image
                      src={`/ar-day-memory${num}.png`}
                      alt={`AR Day Memory ${num}`}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white p-3 text-sm">AR Day {2023 - num + 1}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* AR Day Testimonials */}
            <motion.div
              ref={(el) => addToRefs(el, 7)}
              initial="hidden"
              animate={isVisible[7] ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
        <Footer />
      </main>
    </>
  )
}
