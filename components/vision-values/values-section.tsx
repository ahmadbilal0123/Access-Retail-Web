"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Lightbulb, ArrowUpCircle, ChevronDown, ChevronUp } from "lucide-react"

export default function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [expandedValue, setExpandedValue] = useState<number | null>(null)

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity",
      description: "Firm adherence to our code of ethics in every aspect of our operation.",
      color: "blue",
      details:
        "We believe that honesty and ethical conduct form the foundation of lasting business relationships. Our commitment to integrity means that we approach every project with transparency, accountability, and a dedication to delivering accurate, unbiased research results.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Teamwork",
      description:
        "Individuals play the game, but unified team win the championship. Value and respect towards differences in ideas, experiences, and culture with a view to support one another in delivering on common goals.",
      color: "red",
      details:
        "Our diverse team brings together different perspectives, skills, and experiences. We foster an environment of mutual respect and collaboration, recognizing that our collective strength far exceeds the sum of our individual talents. By working together, we deliver comprehensive solutions that address complex market challenges.",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Drive to do things in new ways that bring efficiencies and enhanced value for our clients.",
      color: "blue",
      details:
        "We constantly explore new methodologies, technologies, and approaches to market research. Our innovation mindset allows us to stay ahead of industry trends and provide our clients with cutting-edge solutions that deliver deeper insights and greater value.",
    },
    {
      icon: <ArrowUpCircle className="h-8 w-8" />,
      title: "Kaizen",
      description:
        "Drive to always improve on the way we do things. Building on work flow, processes or individuals' performances.",
      color: "red",
      details:
        "Embracing the Japanese concept of continuous improvement, we are never satisfied with the status quo. We regularly evaluate and refine our processes, methodologies, and skills to ensure we're delivering the highest quality research and insights. This commitment to ongoing enhancement ensures that we grow alongside our clients.",
    },
  ]

  const toggleExpand = (index: number) => {
    setExpandedValue(expandedValue === index ? null : index)
  }

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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-blue-100 max-w-2xl mx-auto">
            The principles that define our connection – within & outside

            </p>
          </motion.div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card
                  className={`bg-${value.color === "blue" ? "blue" : "red"}-900/30 backdrop-blur-sm border-${value.color === "blue" ? "blue" : "red"}-700/20 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <div
                        className={`w-16 h-16 rounded-full bg-${value.color === "blue" ? "blue" : "red"}-950/80 flex items-center justify-center flex-shrink-0`}
                      >
                        <div className={`text-${value.color === "blue" ? "blue" : "red"}-300`}>{value.icon}</div>
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 text-${value.color === "blue" ? "blue" : "red"}-300`}>
                          {value.title}
                        </h3>
                        <p className="text-blue-100 mb-4">{value.description}</p>

                        <button
                          onClick={() => toggleExpand(index)}
                          className={`flex items-center gap-2 text-sm ${value.color === "blue" ? "text-blue-300 hover:text-blue-200" : "text-red-300 hover:text-red-200"} transition-colors`}
                        >
                          <span>{expandedValue === index ? "Read Less" : "Learn More"}</span>
                          {expandedValue === index ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedValue === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div
                                className={`mt-4 p-4 rounded-md bg-${value.color === "blue" ? "blue" : "red"}-950/50 border border-${value.color === "blue" ? "blue" : "red"}-800/30`}
                              >
                                <p className="text-blue-100 text-sm">{value.details}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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

