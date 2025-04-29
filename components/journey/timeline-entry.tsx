"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, CheckCircle2 } from "lucide-react"
import type { TimelineEntry as TimelineEntryType } from "./journey-data"

interface TimelineEntryProps {
  entry: TimelineEntryType
  isActive: boolean
}

export default function TimelineEntry({ entry, isActive }: TimelineEntryProps) {
  const { period, achievements, color } = entry

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={`bg-gradient-to-br ${
              color === "blue"
                ? "from-blue-900/80 to-blue-950/90 border-blue-800/30"
                : "from-red-900/80 to-red-950/90 border-red-800/30"
            } border shadow-xl overflow-hidden mb-8`}
          >
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    color === "blue"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                      : "bg-gradient-to-br from-red-600 to-red-700 text-white"
                  }`}
                >
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{period}</h3>
                  <div className={color === "blue" ? "text-blue-300" : "text-red-300"}>Research Achievements</div>
                </div>
              </div>

              <div className="space-y-4">
                <ul className="space-y-3 pl-2">
                  {achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                          color === "blue" ? "text-blue-400" : "text-red-400"
                        }`}
                      />
                      <span className="text-blue-100">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

