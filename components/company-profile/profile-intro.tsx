"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ProfileIntro() {
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const handleAnimation = (e: Event) => {
      const { masterTimeline } = (e as CustomEvent).detail
      if (!masterTimeline || !paragraphRef.current) return

      // Add paragraph animation to master timeline
      masterTimeline.from(
        paragraphRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0.3,
      )
    }

    window.addEventListener("companyProfileInView", handleAnimation)
    return () => window.removeEventListener("companyProfileInView", handleAnimation)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-16"
    >
      <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-red-500/10 blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-blue-500/10 blur-xl"></div>

            <p ref={paragraphRef} className="text-lg text-blue-100 leading-relaxed relative z-10">
              Since 2009, <span className="font-semibold text-white">Access Group</span> has successfully established itself as a credible research solution provider. We offer research solutions that provide <span className="text-red-300">in-depth insights</span> into market performance and deliver value
              to the business <span className="text-blue-300">decision-making process</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

