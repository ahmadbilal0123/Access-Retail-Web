import React, { useRef } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import OurJourney from "@/components/our-journey"
import Vision from "@/components/vision-values/vision-section"

export default function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <main className="overflow-x-hidden">
      <div className="pt-8 sm:pt-12 md:pt-16"></div>
      
      {/* Who We Are Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div ref={ref} className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Who We Are</h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
            </motion.div>

            <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-base sm:text-lg text-blue-100 leading-relaxed"
                >
                  Our team of experts accumulate decades of experience in retail research, data analytics, and market intelligence to deliver actionable insights that drive business growth. We take pride in our project design capabilities, extensive operations and deep understanding of local markets.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-base sm:text-lg text-blue-100 leading-relaxed mt-4"
                >
                  Our commitment to excellence and innovation has made us the trusted partner for leading brands seeking to optimize their retail strategies.
                </motion.p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="bg-[#001333] py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Heading with underline */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Our Mission</h2>
            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
          </div>

          {/* Logo and paragraph in one row */}
          <div ref={ref} className="flex flex-col md:flex-row items-center gap-1 mb-10 sm:mb-16">
            {/* Target icon card - on the left, no background */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center md:w-1/6 mb-4 md:mb-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-30"></div>
                <div className="absolute inset-[15%] rounded-full border-4 border-red-500 opacity-60"></div>
                <div className="absolute inset-[30%] rounded-full border-4 border-red-500 opacity-80"></div>
                <div className="absolute inset-[45%] rounded-full bg-red-500"></div>
              </div>
            </motion.div>

            {/* Paragraph - on the right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:w-3/4 flex items-center"
            >
              <p className="text-white text-base sm:text-lg leading-relaxed text-center md:text-left">
                We strive to be the leading provider of retail research and market intelligence solutions. 
              </p>
            </motion.div>
          </div>

          {/* Quote card - centered */}
          <div className="flex justify-center mb-10 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-[#3d1a2d] rounded-lg p-6 sm:p-8 max-w-2xl w-full"
            >
              <div className="relative text-center">
                <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -top-6 sm:-top-8 left-0">"</div>
                <p className="text-white text-base sm:text-lg italic px-4 sm:px-6 md:px-8 py-2 sm:py-4">
                  Build partnership with our clients by providing enhanced value to their marketing decision making.
                </p>
                <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -bottom-10 sm:-bottom-16 right-0">"</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Separation Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      </section>
      
      {/* Vision Component */}
      <Vision />
      
      {/* Our Journey Section */}
      <OurJourney />
    </main>
  )
}
