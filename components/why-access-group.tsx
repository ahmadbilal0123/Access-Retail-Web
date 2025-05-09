"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { StrengthCard } from "./why-access/strength-card"
import { AnimatedBackground } from "./why-access/animated-background"
import { Lightbulb, Users, CheckCircle, Globe, Clock, Smartphone } from "lucide-react"
import Script from "next/script"

export default function WhyAccessGroup() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Core strengths data
  const strengths = [
    {
      id: "innovation",
      icon: <Lightbulb className="h-6 w-6" />,
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
      icon: <Users className="h-6 w-6" />,
      title: "Client Servicing",
      description:
        "Our senior management remains deeply involved in project design and reporting, ensuring swift responses and top-tier deliverables.",
      color: "red",
      story:
        "Our leadership team personally oversees every major project, with directors participating in client meetings and review sessions to ensure alignment with business objectives and delivery of actionable insights.",
      delay: 0.1,
    },
    {
      id: "quality",
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Quality Focus",
      description:
        "We emphasize quality at every step—from data capture to analysis—backed by independent QC checks and rigorous field management.",
      color: "blue",
      story:
        "Our multi-layered quality control process includes automated validation, manual verification, and field back-checks. This approach helped us achieve commendable data accuracy rates across our nationwide retail researches",
      delay: 0.2,
    },
    {
      id: "network",
      icon: <Globe className="h-6 w-6" />,
      title: "Strong Operations Network",
      description:
        "A proven track record in setting up and managing nationwide audits & trackers, capable of deploying 1,000+ surveyors at any time.",
      color: "red",
      story:
        "During the current (2024-25) Retail Census, we mobilized over 900 field agents in just two weeks across Pakistan with operation control from 70 districts, collecting data from more than 700,000 retail outlets to provide a comprehensive market snapshot.",
      delay: 0.3,
    },
    {
      id: "timelines",
      icon: <Clock className="h-6 w-6" />,
      title: "Adherence to Timelines",
      description:
        "We consistently deliver on time, leveraging an experienced field team and efficient data processing workflows.",
      color: "blue",
      story:
        "When a beverage client needed urgent market insights before a product launch, our team worked round the clock to deliver a comprehensive retail audit across 15 cities in just 10 days—one half of the industry standard timeline.",
      delay: 0.4,
    },
    {
      id: "technology",
      icon: <Smartphone className="h-6 w-6" />,
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
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />

      <section
        ref={sectionRef}
        className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950"
        id="why-access"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
        </div>

        {/* Animated background elements */}
        <AnimatedBackground />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "5rem" } : { width: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
            />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Why <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Access</span>{" "}
              Group?
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
              Discover the six core strengths that set us apart and make us the preferred partner for retail
              intelligence across Pakistan and Afghanistan.
            </motion.p>
          </div>

          {/* Strength Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {strengths.map((strength) => (
              <StrengthCard
                key={strength.id}
                icon={strength.icon}
                emoji={strength.emoji}
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
    </>
  )
}

