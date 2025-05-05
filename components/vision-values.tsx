"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Target, Zap, Users, Compass, Star, ChevronRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function VisionValues() {
  const sectionRef = useRef<HTMLElement>(null)
  const [gsapLoaded, setGsapLoaded] = useState(false)
  const [activeStory, setActiveStory] = useState(0)
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize GSAP animations
  useEffect(() => {
    if (!gsapLoaded || !sectionRef.current) return

    const gsap = (window as any).gsap
    if (!gsap) return

    // Create subtle background animations
    const createBackgroundElements = () => {
      const section = sectionRef.current
      if (!section) return

      // Clear any existing elements
      const existingElements = section.querySelectorAll(".bg-element")
      existingElements.forEach((el) => el.remove())

      // Create subtle grid pattern
      const gridPattern = document.createElement("div")
      gridPattern.classList.add("bg-element", "grid-pattern")
      gridPattern.style.position = "absolute"
      gridPattern.style.inset = "0"
      gridPattern.style.backgroundImage =
        "linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)"
      gridPattern.style.backgroundSize = "40px 40px"
      gridPattern.style.opacity = "0"
      gridPattern.style.pointerEvents = "none"
      section.appendChild(gridPattern)

      // Fade in grid pattern very subtly
      gsap.to(gridPattern, {
        opacity: 0.03,
        duration: 3,
      })

      // Create a single, very subtle gradient orb
      const blueOrb = document.createElement("div")
      blueOrb.classList.add("bg-element", "gradient-orb")
      blueOrb.style.position = "absolute"
      blueOrb.style.top = "30%"
      blueOrb.style.right = "-10%"
      blueOrb.style.width = "70vh"
      blueOrb.style.height = "70vh"
      blueOrb.style.borderRadius = "50%"
      blueOrb.style.background =
        "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 50%, rgba(59, 130, 246, 0) 70%)"
      blueOrb.style.opacity = "0"
      blueOrb.style.pointerEvents = "none"
      section.appendChild(blueOrb)

      const redOrb = document.createElement("div")
      redOrb.classList.add("bg-element", "gradient-orb")
      redOrb.style.position = "absolute"
      redOrb.style.bottom = "20%"
      redOrb.style.left = "-10%"
      redOrb.style.width = "60vh"
      redOrb.style.height = "60vh"
      redOrb.style.borderRadius = "50%"
      redOrb.style.background =
        "radial-gradient(circle, rgba(225, 29, 72, 0.05) 0%, rgba(225, 29, 72, 0.02) 50%, rgba(225, 29, 72, 0) 70%)"
      redOrb.style.opacity = "0"
      redOrb.style.pointerEvents = "none"
      section.appendChild(redOrb)

      // Fade in orbs very subtly
      gsap.to([blueOrb, redOrb], {
        opacity: 0.7,
        duration: 3,
      })

      // Extremely subtle movement
      gsap.to(blueOrb, {
        y: "3%",
        x: "-2%",
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(redOrb, {
        y: "-3%",
        x: "2%",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      })

      // Create animated particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div")
        particle.classList.add("bg-element", "particle")
        particle.style.position = "absolute"
        particle.style.width = `${Math.random() * 4 + 1}px`
        particle.style.height = particle.style.width
        particle.style.borderRadius = "50%"
        particle.style.backgroundColor =
          Math.random() > 0.5
            ? `rgba(59, 130, 246, ${Math.random() * 0.1 + 0.05})`
            : `rgba(225, 29, 72, ${Math.random() * 0.1 + 0.05})`
        particle.style.opacity = "0"
        particle.style.pointerEvents = "none"

        // Random position
        particle.style.top = `${Math.random() * 100}%`
        particle.style.left = `${Math.random() * 100}%`

        section.appendChild(particle)

        // Fade in
        gsap.to(particle, {
          opacity: 1,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 3,
        })

        // Floating animation
        gsap.to(particle, {
          y: `${Math.random() * 100 - 50}px`,
          x: `${Math.random() * 100 - 50}px`,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5,
        })
      }
    }

    // Initial creation
    createBackgroundElements()

    // Update on window resize
    const handleResize = () => {
      createBackgroundElements()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      // Clean up animations
      gsap.killTweensOf(".bg-element")

      // Remove elements
      const elements = document.querySelectorAll(".bg-element")
      elements.forEach((el) => el.remove())
    }
  }, [gsapLoaded])

  // Auto-advance story
  useEffect(() => {
    const startStoryTimer = () => {
      if (storyTimerRef.current) {
        clearTimeout(storyTimerRef.current)
      }

      storyTimerRef.current = setTimeout(() => {
        setActiveStory((prev) => (prev + 1) % 3)
      }, 8000) // Change story every 8 seconds
    }

    startStoryTimer()

    return () => {
      if (storyTimerRef.current) {
        clearTimeout(storyTimerRef.current)
      }
    }
  }, [activeStory])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" onLoad={() => setGsapLoaded(true)} />

      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900"
        id="vision-values"
      >
        <div className="container mx-auto px-4 relative z-10">
          <VisionHeader />
          <JourneyStory activeStory={activeStory} setActiveStory={setActiveStory} />
          <VisionContent />
          <CoreValues />
        </div>
      </section>
    </>
  )
}

function VisionHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.5 })

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "5rem" } : { width: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
      />

      <motion.h2
        id="evolution"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        The <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Evolution</span>
      </motion.h2>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 text-blue-100 max-w-2xl mx-auto"
      >
        Our journey of innovation and excellence in retail insights
      </motion.p>
    </div>
  )
}

function JourneyStory({ activeStory, setActiveStory }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const stories = [
    {
      title: "Our Beginning",
      content:
        "Access Retail began with a vision to transform how retail insights are gathered and utilized. Starting with a small team of dedicated researchers, we set out to revolutionize retail intelligence for our clients.",
      image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600",
      color: "blue",
    },
    {
      title: "Our Growth",
      content:
        "Over the years, we have developed custom-designed research solutions that deliver actionable insights to our clients, expanded our team to ~300 FTEs nationwide, and ensured client servicing par excellence.",
      image:
        "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      color: "red",
    },
    {
      title: "Our Future",
      content:
        "Looking ahead, we are committed to pushing boundaries, embracing new technologies & solutions, and further raising the bar for retail research excellence across the board.",
      image:
        "https://images.pexels.com/photos/3192640/pexels-photo-3192640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      color: "blue",
    },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <Card className="bg-blue-950/80 border-blue-800/30 shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[300px] md:h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={stories[activeStory].image || "/placeholder.svg"}
                  alt={stories[activeStory].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/80 to-transparent"></div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStory(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeStory
                          ? stories[activeStory].color === "blue"
                            ? "bg-blue-500 scale-125"
                            : "bg-red-500 scale-125"
                          : "bg-white/30"
                      }`}
                      aria-label={`View story ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="text-white/70 text-sm">
                  {activeStory + 1} / {stories.length}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3
                    className={`text-2xl md:text-3xl font-bold mb-3 ${
                      stories[activeStory].color === "blue" ? "text-blue-300" : "text-red-300"
                    }`}
                  >
                    {stories[activeStory].title}
                  </h3>

                  <p className="text-white text-lg md:text-xl max-w-3xl">{stories[activeStory].content}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="p-4 bg-blue-950/90 border-t border-blue-800/30">
            <div className="flex justify-between items-center">
              <div className="text-blue-300 font-medium">Our Journey</div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveStory((prev) => (prev - 1 + stories.length) % stories.length)}
                  className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-white hover:bg-blue-800/50 transition-colors"
                  aria-label="Previous story"
                >
                  <ChevronRight className="w-4 h-4 transform rotate-180" />
                </button>

                <button
                  onClick={() => setActiveStory((prev) => (prev + 1) % stories.length)}
                  className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-white hover:bg-blue-800/50 transition-colors"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function VisionContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
      {/* Vision Statement */}
    </div>
  )
}

function VisionItem({ icon, title, color }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg ${color === "blue" ? "bg-blue-900/50 border border-blue-800/50" : "bg-red-900/50 border border-red-800/50"}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${color === "blue" ? "bg-blue-800/70 text-blue-300" : "bg-red-800/70 text-red-300"}`}
      >
        {icon}
      </div>
      <span className="text-white text-sm font-medium">{title}</span>
    </div>
  )
}

function CoreValues() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description:
        "We constantly seek new methodologies and technologies to improve our research capabilities and deliver better insights.",
      story:
        "When traditional retail audits weren't capturing the full picture, our team developed a proprietary mobile data collection system that revolutionized our field operations.",
      color: "blue",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality",
      description:
        "We're committed to delivering accurate, reliable, and actionable insights that our clients can trust completely.",
      story:
        "Our rigorous quality control process includes multiple validation steps, ensuring that every insight we deliver is backed by reliable data.",
      color: "red",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Operational Excellence",
      description:
        "We continuously optimize our processes to ensure efficiency and effectiveness in all our operations.",
      story:
        "By streamlining our field operations and implementing real-time monitoring, we've reduced data collection time by 40% while improving accuracy.",
      color: "blue",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Teamwork",
      description:
        "We foster collaboration and unity to achieve collective success and growth. Our diverse team brings together different perspectives for better solutions.",
      story:
        "Our field teams and analysts work hand-in-hand, with real-time communication ensuring that insights flow seamlessly from collection to analysis to client delivery.",
      color: "red",
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our business practices and relationships, building trust with every interaction.",
      story:
        "When faced with challenging data that contradicted a client's expectations, we chose transparency, presenting the unvarnished truth that ultimately helped them correct course.",
      color: "blue",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Client Focus",
      description:
        "We prioritize our clients' needs and continuously strive to exceed their expectations with every project we undertake.",
      story:
        "When a major FMCG client needed insights on a tight deadline, our team worked around the clock to deliver actionable data that informed a successful product launch.",
      color: "red",
    },
  ]

  const [expandedValue, setExpandedValue] = useState(null)

  return (
    <div>
      {/* <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
        className="text-2xl md:text-3xl font-bold text-white mb-4 text-center"
      >
        Our Core Values
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-blue-100 max-w-3xl mx-auto text-center mb-10"
      >
        These six principles guide everything we do at Access Retail, from how we conduct research to how we interact
        with our clients and each other.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <ValueCard
              icon={value.icon}
              title={value.title}
              description={value.description}
              story={value.story}
              color={value.color}
              isExpanded={expandedValue === index}
              onClick={() => setExpandedValue(expandedValue === index ? null : index)}
            />
          </motion.div>
        ))}
      </div> */}
    </div>
  )
}

function ValueCard({ icon, title, description, story, color, isExpanded, onClick }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.5 })

  return (
    <Card
      ref={cardRef}
      className={cn(
        "h-full transition-all duration-300 hover:shadow-xl cursor-pointer relative overflow-hidden",
        isExpanded ? "transform-none" : "hover:translate-y-[-5px]",
        color === "blue"
          ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 border-blue-800/30"
          : "bg-gradient-to-br from-red-900/80 to-red-950/90 border-red-800/30",
      )}
      onClick={onClick}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div
          className={`absolute -top-16 -right-16 w-32 h-32 rounded-full ${
            color === "blue" ? "bg-blue-500/10" : "bg-red-500/10"
          } blur-xl`}
        ></div>

        {/* Subtle corner accent */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 ${
            color === "blue" ? "bg-blue-500/5" : "bg-red-500/5"
          } transform rotate-45 translate-x-8 -translate-y-8`}
        ></div>
      </div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative ${
              color === "blue"
                ? "bg-gradient-to-br from-blue-800 to-blue-900 text-blue-300"
                : "bg-gradient-to-br from-red-800 to-red-900 text-red-300"
            }`}
          >
            {/* Add subtle glow behind icon */}
            <div
              className={`absolute inset-0 rounded-full ${
                color === "blue" ? "bg-blue-500/20" : "bg-red-500/20"
              } blur-sm`}
            ></div>
            <div className="relative z-10">{icon}</div>
          </div>

          <div>
            <h4 className={`text-xl font-bold mb-2 ${color === "blue" ? "text-blue-300" : "text-red-300"}`}>{title}</h4>

            <p className="text-blue-100 text-sm leading-relaxed">{description}</p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className={`mt-4 pt-4 border-t ${color === "blue" ? "border-blue-800/30" : "border-red-800/30"}`}
                  >
                    <h5 className="text-white text-sm font-medium mb-2">Our Story:</h5>
                    <p className="text-blue-100 text-sm italic">{story}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className={`w-0 h-1 mt-4 transition-all duration-1000 ${isInView ? "w-16" : "w-0"} ${
                color === "blue"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700"
                  : "bg-gradient-to-r from-red-500 to-red-700"
              }`}
            ></div>

            <div className="mt-4 flex items-center">
              <button
                className={`text-xs flex items-center ${color === "blue" ? "text-blue-300" : "text-red-300"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onClick()
                }}
              >
                {isExpanded ? "Read less" : "Read our story"}
                <ChevronRight className={`ml-1 h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
