"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { TrendingUp, Building, Construction, DollarSign } from "lucide-react"

export default function AfghanIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const economyPoints = [
    {
      icon: <TrendingUp className="h-5 w-5 text-blue-300" />,
      title: "Economic Recovery",
      description: "Significant improvements in key urban centers",
    },
    {
      icon: <Construction className="h-5 w-5 text-red-300" />,
      title: "Active Construction",
      description: "Ongoing rehabilitation work across the country",
    },
    {
      icon: <DollarSign className="h-5 w-5 text-blue-300" />,
      title: "Foreign Investments",
      description: "Growing investments in multiple sectors",
    },
    {
      icon: <Building className="h-5 w-5 text-red-300" />,
      title: "Infrastructure Development",
      description: "Expanding telecommunications and power generation",
    },
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Afghanistan's Economic Landscape</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <Card className="bg-blue-900/30 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div
                  className="md:w-1/3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=300&text=Afghanistan"
                      alt="Afghanistan Map"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="md:w-2/3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <p className="text-lg text-blue-100 leading-relaxed mb-6">
                    Afghanistan's economy is recovering and has improved significantly in key urban centers of
                    Afghanistan. The construction sector is very active in Afghanistan and rehabilitation work is in
                    progress.
                  </p>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Foreign Direct Investments are being made in real estate, construction, infrastructure development,
                    telecommunications and power generation sectors.
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Economy Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {economyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-blue-900/20 backdrop-blur-sm border-blue-800/20 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-950/80 flex items-center justify-center mb-4">
                        {point.icon}
                      </div>
                      <h3 className="text-white font-semibold mb-2">{point.title}</h3>
                      <p className="text-blue-200 text-sm">{point.description}</p>
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

