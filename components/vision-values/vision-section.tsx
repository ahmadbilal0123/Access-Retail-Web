"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Lightbulb, Sparkles } from "lucide-react"

export default function VisionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Vision & Values</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
            <p className="mt-2">The principles that define our connection - within & outside</p>
          </motion.div>

          <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden mb-16">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div
                  className="md:w-1/3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 animate-pulse-slow"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Eye className="h-32 w-32 text-blue-500/30" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="md:w-2/3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <div className="relative">
                    {/* Decorative quote marks */}
                    <div className="absolute -top-10 -left-4 text-6xl text-blue-500/20 font-serif">"</div>
                    <div className="absolute -bottom-10 -right-4 text-6xl text-blue-500/20 font-serif">"</div>

                    <p className="text-xl md:text-2xl text-blue-100 leading-relaxed italic">
                      To deliver most innovative methodologies & research solutions and superior client servicing in
                      customized research, to ensure enduring relationships with our clients.
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Vision Elements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {[
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Pioneering methodologies that set new standards in market research",
      color: "blue",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Kaizen",
      description: "Delivering superior solutions that exceed client expectations",
      color: "red",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Integrity",
      description: "Anticipating market trends to provide forward-thinking insights",
      color: "blue",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Team Work",
      description: "Anticipating market trends to provide forward-thinking insights",
      color: "red",
    },
  ].map((element, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
    >
      <Card
        className={`bg-${element.color === "blue" ? "blue" : "red"}-900/20 backdrop-blur-sm border-${element.color === "blue" ? "blue" : "red"}-800/20 h-full hover:shadow-lg transition-shadow duration-300`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-16 h-16 rounded-full bg-${element.color === "blue" ? "blue" : "red"}-950/80 flex items-center justify-center mb-4`}
            >
              <div className={`text-${element.color === "blue" ? "blue" : "red"}-300`}>
                {element.icon}
              </div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{element.title}</h3>
            <p className="text-blue-200 text-sm">{element.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>

        </div>
      </div>
    </section>
  )
}

