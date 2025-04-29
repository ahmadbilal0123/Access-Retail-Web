"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ArrowRight } from "lucide-react"

export default function AfghanContact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 backdrop-blur-sm border-blue-700/20 shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Get in Touch</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-6"></div>
                <p className="text-blue-100">
                  We look forward to getting a call from you when next time you have a research requirement in
                  Afghanistan.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-blue-950/50 rounded-lg p-6 border border-blue-800/30 hover:border-blue-700/50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-900/70 flex items-center justify-center mb-4">
                      <Phone className="h-5 w-5 text-blue-300" />
                    </div>
                    <h3 className="text-white font-medium mb-2">Call Us</h3>
                    <p className="text-blue-200 mb-4">+92 123 456 7890</p>
                    <Button
                      variant="outline"
                      className="border-blue-700/50 text-blue-300 hover:text-white hover:bg-blue-800/50"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Call Now</span>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-red-950/50 rounded-lg p-6 border border-red-800/30 hover:border-red-700/50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-900/70 flex items-center justify-center mb-4">
                      <Mail className="h-5 w-5 text-red-300" />
                    </div>
                    <h3 className="text-white font-medium mb-2">Email Us</h3>
                    <p className="text-blue-200 mb-4">info@accessretail.com</p>
                    <Button
                      variant="outline"
                      className="border-red-700/50 text-red-300 hover:text-white hover:bg-red-800/50"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      <span>Send Email</span>
                    </Button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-8 text-center"
              >
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-6 rounded-full shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300 hover:translate-y-[-2px] group">
                  <span>Contact Us For Afghanistan Research</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

