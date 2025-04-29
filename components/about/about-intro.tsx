"use client"

import { HandshakeIcon, LineChartIcon, BarChart3Icon } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import OurJourney from "@/components/our-journey"
import Vision from "@/components/vision-values/vision-section"

export default function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <>
      {/* About Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div ref={ref} className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who We Are</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
            </motion.div>

            <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-blue-100 leading-relaxed"
                >
                  Our team of experts combine decades of experience in retail research, data analytics, and market
                  intelligence to deliver actionable insights that drive business growth. We take pride in our project
                  design capabilities, extensive operations and deep understanding of local markets.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-lg text-blue-100 leading-relaxed mt-4"
                >
                  Our commitment to excellence and innovation has made us the trusted partner for leading brands seeking
                  to optimize their retail strategies.
                </motion.p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#001333] py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl">
          {/* Heading with underline */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Our Mission</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
          </div>

          {/* Main content area */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Target icon card */}
            <div className="bg-[#2a1e4a] rounded-lg p-8 flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-30"></div>
                <div className="absolute inset-[15%] rounded-full border-4 border-red-500 opacity-60"></div>
                <div className="absolute inset-[30%] rounded-full border-4 border-red-500 opacity-80"></div>
                <div className="absolute inset-[45%] rounded-full bg-red-500"></div>
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-[#3d1a2d] rounded-lg p-8 flex items-center">
              <div className="relative">
                <div className="text-red-500 text-6xl font-serif absolute -top-8 -left-2">"</div>
                <p className="text-white text-xl md:text-2xl italic pl-6 pr-2">
                  Build partnership with our clients by providing enhanced value to their marketing decision making.
                </p>
                <div className="text-red-500 text-6xl font-serif absolute -bottom-16 right-0">"</div>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      <Vision/>
  {/* Values Section */}
  {/* <ValuesSection /> */}
      {/* Our Journey Section */}
      <OurJourney />
    </>
  )
}
