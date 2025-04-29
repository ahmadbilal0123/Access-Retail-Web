"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface ServicesIntroProps {
  isInView: boolean
}

export default function ServicesIntro({ isInView }: ServicesIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mb-16"
    >
      <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 relative">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 animate-pulse-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XELv9JCJ21sljAzb5OuoHxgp029LDp.png"
                      alt="World map with services"
                      fill
                      className="object-contain opacity-30"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl md:text-2xl font-semibold text-white mb-4 leading-relaxed"
              >
                WITHIN A SPAN OF 9 YEARS, ACCESS CONSUMETRICS HAS SUCCESSFULLY ESTABLISHED ITSELF AS A CREDIBLE RESEARCH
                SOLUTION PROVIDER
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-blue-100 leading-relaxed"
              >
                We offer a comprehensive suite of research solutions designed to provide in-depth insights into market
                performance and deliver value to your business decision-making process. Our services span across retail
                intelligence, consumer behavior analysis, and strategic market research.
              </motion.p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

