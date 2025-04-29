"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, BarChart, ShoppingBag, FileText, Database } from "lucide-react"

export default function AfghanCapabilities() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const provinces = ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad", "Kunduz", "Ghazni", "Lashkar Gah"]

  const capabilities = [
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      title: "Retail Research",
      color: "blue",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Consumer Research",
      color: "red",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Urban Coverage",
      color: "blue",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Rural Coverage",
      color: "red",
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      title: "Market Analysis",
      color: "blue",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Field Surveys",
      color: "red",
    },
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Afghan Capabilities</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Access Retail has established comprehensive research capabilities across Afghanistan
            </p>
          </motion.div>

          <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden mb-12">
            <CardContent className="p-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-blue-100 leading-relaxed mb-6"
              >
                Access Retail has commenced its operations in Afghanistan. We have now developed capabilities to provide
                market research solutions for Afghanistan market in both Retail and Consumer research sectors.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg text-blue-100 leading-relaxed"
              >
                We have field network in both urban & rural areas and can conduct surveys in top eight provinces of the
                country.
              </motion.p>
            </CardContent>
          </Card>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card
                  className={`bg-${capability.color === "blue" ? "blue" : "red"}-900/20 backdrop-blur-sm border-${capability.color === "blue" ? "blue" : "red"}-800/20 h-full hover:shadow-lg transition-shadow duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-12 h-12 rounded-full bg-${capability.color === "blue" ? "blue" : "red"}-950/80 flex items-center justify-center mb-4`}
                      >
                        <div className={`text-${capability.color === "blue" ? "blue" : "red"}-300`}>
                          {capability.icon}
                        </div>
                      </div>
                      <h3 className="text-white font-semibold">{capability.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Provinces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-center mb-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Provinces We Cover</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {provinces.map((province, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-blue-900/20 backdrop-blur-sm border border-blue-800/20 rounded-lg p-3 text-center"
              >
                <span className="text-blue-100">{province}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

