"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export function CompanySpecialization() {
  const contentRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleAnimation = (e: Event) => {
      const { masterTimeline } = (e as CustomEvent).detail
      if (!masterTimeline || !contentRef.current || !leftCardRef.current || !rightCardRef.current) return

      // Add content animation to master timeline
      masterTimeline.from(
        contentRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        1.2,
      )

      // Add card animations
      masterTimeline.from(
        leftCardRef.current,
        {
          x: -50,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.2)",
        },
        1.4,
      )

      masterTimeline.from(
        rightCardRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.2)",
        },
        1.4,
      )
    }

    window.addEventListener("companyProfileInView", handleAnimation)
    return () => window.removeEventListener("companyProfileInView", handleAnimation)
  }, [])

  return (
    <div>
      <div ref={contentRef} className="mb-10 text-center">
        <p className="text-lg text-blue-100 leading-relaxed max-w-3xl mx-auto">
          <span className="text-red-400 font-medium">Access Retail</span> specializes in retail research, while its
          sister concern, <span className="text-blue-400 font-medium">Access Consumetrics</span>, focuses on consumer
          research.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Access Retail Card */}
        <div ref={leftCardRef}>
          <SpecializationCard
            title="Access Retail"
            description="Specialized in comprehensive retail research solutions across multiple sectors"
            imageSrc="https://www.accessretailpk.com/wp-content/uploads/2024/03/AR-logo01-trasparent.png"
            color="red"
          />
        </div>

        {/* Access Consumetrics Card */}
        <div ref={rightCardRef}>
          <SpecializationCard
            title="Access Consumetrics"
            description="Focused on in-depth consumer research and behavior analysis"
            imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfv9CeZ2_5FgNhnRpZKtKyawo6Ufa7ri0eQg&s"
            color="blue"
          />
        </div>
      </motion.div>
    </div>
  )
}

function SpecializationCard({ title, description, imageSrc, color }) {
  const colorClasses = {
    red: {
      gradient: "from-red-900/40 to-red-800/40",
      border: "border-red-700/20",
      title: "text-red-300",
      glow: "bg-red-500/10",
    },
    blue: {
      gradient: "from-blue-900/40 to-blue-800/40",
      border: "border-blue-700/20",
      title: "text-blue-300",
      glow: "bg-blue-500/10",
    },
  }

  const classes = colorClasses[color]

  return (
    <Card
      className={`bg-gradient-to-br ${classes.gradient} backdrop-blur-sm ${classes.border} shadow-xl overflow-hidden h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group`}
    >
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent"></div>

          {/* Animated glow effect */}
          <div
            className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${classes.glow} blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700`}
          ></div>

          <div className="absolute bottom-0 left-0 w-full p-4">
            <h3 className={`text-2xl font-bold ${classes.title}`}>{title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-blue-100">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

