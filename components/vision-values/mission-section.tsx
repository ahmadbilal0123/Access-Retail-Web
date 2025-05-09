"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Target, TrendingUp, Handshake, BarChart } from "lucide-react"

export default function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (

    
    <section  className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      <div id="mission" className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="h-40 w-40 text-red-500/30" />
                </div>

                {/* Animated rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 border-red-500/20"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0.2, 0.7],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border-2 border-blue-500/20"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 0.2, 0.7],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                  <motion.div
                    className="absolute w-44 h-44 rounded-full border-2 border-red-500/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0.2, 0.7],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Card className="bg-red-900/30 backdrop-blur-sm border-red-700/20 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="relative">
                    {/* Decorative quote marks */}
                    <div className="absolute -top-10 -left-4 text-6xl text-red-500/20 font-serif">"</div>
                    <div className="absolute -bottom-10 -right-4 text-6xl text-red-500/20 font-serif">"</div>

                    <p className="text-white text-lg lg:text-base md:text-lg italic px-4 sm:px-6 md:px-8 py-2 sm:py-4">
                      Build partnership with our clients by providing enhanced value to their marketing decision making.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          
        </div>
      </div>
    </section>
  )
}

