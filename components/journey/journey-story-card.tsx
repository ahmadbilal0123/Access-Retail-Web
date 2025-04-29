"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Calendar, Award, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface JourneyStoryCardProps {
  data: {
    id: string
    years: string
    title: string
    description: string
    color: string
    image: string
    achievements: string[]
    stats: Record<string, number>
  }
  isRevealed: boolean
}

export function JourneyStoryCard({ data, isRevealed }: JourneyStoryCardProps) {
  const { years, title, description, color, image, achievements, stats } = data

  // Format stats for display
  const formattedStats = Object.entries(stats).map(([key, value]) => {
    // Format the key from camelCase to Title Case with spaces
    const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

    // Format the value (add + for most stats, % for percentages)
    const formattedValue =
      key.toLowerCase().includes("percentage") ||
      key.toLowerCase().includes("accuracy") ||
      key.toLowerCase().includes("coverage")
        ? `${value}%`
        : `${value.toLocaleString()}+`

    return { key: formattedKey, value: formattedValue }
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border shadow-xl transition-all duration-500",
        color === "blue"
          ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 border-blue-800/30"
          : "bg-gradient-to-br from-red-900/80 to-red-950/90 border-red-800/30",
      )}
    >
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section with Parallax Effect */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: isRevealed ? 1 : 1.2 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
              <div
                className={cn(
                  "absolute inset-0",
                  color === "blue"
                    ? "bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent"
                    : "bg-gradient-to-r from-red-950/90 via-red-900/70 to-transparent",
                )}
              ></div>
            </motion.div>

            {/* Year Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: isRevealed ? 0.15 : 0, scale: isRevealed ? 1 : 1.5 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className={cn("text-7xl md:text-8xl font-bold", color === "blue" ? "text-blue-300" : "text-red-300")}
              >
                {years.split(" – ")[0]}
              </div>
            </motion.div>

            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute top-6 left-6"
            >
              <div className="flex items-center gap-2">
                <Calendar className={cn("h-5 w-5", color === "blue" ? "text-blue-300" : "text-red-300")} />
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    color === "blue"
                      ? "bg-blue-900/70 text-blue-100 border border-blue-700/50"
                      : "bg-red-900/70 text-red-100 border border-red-700/50",
                  )}
                >
                  {years}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <motion.div variants={containerVariants} initial="hidden" animate={isRevealed ? "visible" : "hidden"}>
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
                <div className="w-16 h-1 mb-4 bg-gradient-to-r from-blue-500 to-red-500"></div>
              </motion.div>

              <motion.p variants={itemVariants} className="text-blue-100 mb-6">
                {description}
              </motion.p>

              {/* Key Achievements */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className={cn("h-5 w-5", color === "blue" ? "text-blue-300" : "text-red-300")} />
                  <h4 className="text-white font-medium">Key Achievements</h4>
                </div>

                <ul className="space-y-2 pl-7">
                  {achievements.map((achievement, i) => (
                    <motion.li key={i} variants={itemVariants} custom={i} className="flex items-start gap-2 relative">
                      <CheckCircle2
                        className={cn(
                          "absolute -left-7 h-5 w-5 mt-0.5",
                          color === "blue" ? "text-blue-400" : "text-red-400",
                        )}
                      />
                      <span className="text-blue-100">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Stats Section */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className={cn("h-5 w-5", color === "blue" ? "text-blue-300" : "text-red-300")} />
                  <h4 className="text-white font-medium">Key Metrics</h4>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {formattedStats.map((stat, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      custom={i}
                      className={cn(
                        "p-3 rounded-lg text-center",
                        color === "blue"
                          ? "bg-blue-900/50 border border-blue-800/50"
                          : "bg-red-900/50 border border-red-800/50",
                      )}
                    >
                      <div
                        className={cn("text-xl font-bold mb-1", color === "blue" ? "text-blue-300" : "text-red-300")}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-blue-100 line-clamp-2">{stat.key}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-blue-800/30">
                <button
                  className={cn(
                    "flex items-center gap-2 text-sm transition-colors group",
                    color === "blue" ? "text-blue-300 hover:text-blue-200" : "text-red-300 hover:text-red-200",
                  )}
                >
                  <span>Explore this era in detail</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

