"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export default function AfghanDirector() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const expertise = [
    "Expert in Afghan market research",
    "Deep understanding of local culture and values",
    "Multiple field visits to Afghanistan",
    "Knowledge of ethnic differences",
    "Experienced in supervising research activities",
  ]

  return (
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Leadership</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.2 }}
                    animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=400&text=Aamir+Shaikh"
                      alt="Aamir Shaikh"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent md:via-blue-900/70 md:to-transparent"></div>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="text-2xl font-bold text-white"
                    >
                      Aamir Shaikh
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="text-blue-300 text-sm"
                    >
                      Director Special Projects
                    </motion.p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="text-blue-100 leading-relaxed mb-6"
                  >
                    Aamir Shaikh, our Director Special Projects has hands on experience of conducting and supervising
                    multitude of Market Research activities in Afghanistan. He has visited Afghanistan many times and is
                    well familiar with local consumers, their culture and values.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="text-blue-100 leading-relaxed mb-6"
                  >
                    He is a rare Market Researcher who is an expert in knowing the country, understanding the ethnic
                    differences and conducting market research surveys.
                  </motion.p>

                  <div className="space-y-3">
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="text-white font-medium"
                    >
                      Areas of Expertise:
                    </motion.h4>

                    <ul className="space-y-2">
                      {expertise.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-100">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

