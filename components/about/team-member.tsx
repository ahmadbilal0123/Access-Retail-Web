"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Clock, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamMemberProps {
  member: {
    id: number
    name: string
    position: string
    experience: string
    expertise: string
    description: string
    image: string
    color: "red" | "blue"
  }
  index: number
}

export default function TeamMember({ member, index }: TeamMemberProps) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  })

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="h-full"
    >
      <Card
        className={cn(
          "h-full overflow-hidden border shadow-xl transition-all duration-300 hover:shadow-2xl",
          member.color === "blue"
            ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 border-blue-800/30"
            : "bg-gradient-to-br from-red-900/80 to-red-950/90 border-red-800/30",
        )}
      >
        <CardContent className="p-0">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 hover:scale-105"
            />
            <div className={cn("absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent")}></div>

            <div className="absolute bottom-0 left-0 w-full p-4">
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className={cn("text-sm font-medium", member.color === "blue" ? "text-blue-300" : "text-red-300")}>
                {member.position}
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className={cn("h-4 w-4", member.color === "blue" ? "text-blue-400" : "text-red-400")} />
              <span className="text-white text-sm">Experience: {member.experience}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Briefcase className={cn("h-4 w-4", member.color === "blue" ? "text-blue-400" : "text-red-400")} />
              <span className="text-white text-sm">Expertise</span>
            </div>

            <p className="text-blue-100 text-sm line-clamp-2 mb-4">{member.expertise}</p>

            <button
              onClick={toggleExpanded}
              className={cn(
                "flex items-center justify-between w-full py-2 px-3 rounded-md transition-colors text-sm",
                member.color === "blue"
                  ? "bg-blue-900/50 hover:bg-blue-800/50 text-blue-200"
                  : "bg-red-900/50 hover:bg-red-800/50 text-red-200",
              )}
            >
              <span className="font-medium">{expanded ? "Show Less" : "Read More"}</span>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "mt-4 p-3 rounded-md text-sm",
                      member.color === "blue"
                        ? "bg-blue-950/70 border border-blue-900/50 text-blue-100"
                        : "bg-red-950/70 border border-red-900/50 text-blue-100",
                    )}
                  >
                    <h4 className="font-medium text-white mb-2">Background</h4>
                    <p>{member.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

