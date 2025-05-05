"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import TeamMember from "./team-member"

// Team data
const teamMembers = [
  {
    id: 1,
    name: "Haroon Ahmed",
    position: "Chief Executive Officer",
    experience: "30 years",
    expertise:
      "Design, Insights and Commercial Lead",
    description:
      "Over the last three decades, Mr. Haroon Ahmad has remained instrumental in developing retail market measurement in Pakistan. Prior to coming into entrepreneurial role in 2009, he headed Retail Measurement Services division of global leader in Retail Research.Having travelled to countries across North America, Europe, and Asia, he has got exposure to international best practices. With demonstrated capability to blend research expertise with insightful analysis, he has contributed to success stories of some of the key FMCG brands in the country. His passion for research, vision and strategic thinking make him an exemplary Leader.",
    image: "/placeholder.svg?height=400&width=400&text=Haroon",
    color: "blue",
  },
  {
    id: 2,
    name: "Muhammad Irfan Butt",
    position: "Executive Director",
    experience: "25 years",
    expertise: "Operations Design & Leadership, Insights",
    description:
      "Mr. Muhammad Irfan Butt carries to his credit extensive experience of managing large scale operations (in research & sales) inside and outside Pakistan.He co-founded Access Retail in 2009 that later became market leader in its domain. Earlier he has handled retail audit and census operations for global leader in retail research covering Middle East, North Africa & Pakistan region.Also headed regional Sales & Marketing function of a key beverage player, where he won Performance Excellence Award for 2 years consecutively. He is a go-getter and a strong leader habitual of pushing boundaries for continuous rise in performance.",
    image: "/placeholder.svg?height=400&width=400&text=Sarah",
    color: "red",
  },
 
]

export default function TeamSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

   
    </section>

    
  )
}

