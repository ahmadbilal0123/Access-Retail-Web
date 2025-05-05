"use client"

import { useEffect, useRef, useState } from "react"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import {
  Clock,
  Briefcase,
  ChevronDown,
  Award,
  GraduationCap,
  Globe,
  MapPin,
  Mail,
  Phone,
  Target,
  Users,
  BookOpen,
} from "lucide-react"
import Image from "next/image"

// Leadership profile card component
const LeadershipCard = ({ leader, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isFirstCard = index === 0
  const cardColor = isFirstCard ? "bg-blue-900/20" : "bg-red-900/20"
  const textColor = isFirstCard ? "text-blue-300" : "text-red-300"
  const buttonBg = isFirstCard ? "bg-blue-800/50 hover:bg-blue-700/50" : "bg-red-800/50 hover:bg-red-700/50"
  const borderColor = isFirstCard ? "border-blue-700" : "border-red-700"
  const hoverBg = isFirstCard ? "hover:bg-blue-800/30" : "hover:bg-red-800/30"

  return (
    <div
      className={`overflow-hidden rounded-xl shadow-xl border-2 ${borderColor} max-w-md mx-auto transition-all duration-300 ${hoverBg}`}
    >
      {/* Image section with gradient overlay */}
      <div className="relative h-80 w-full bg-gradient-to-b from-white to-gray-300">
        {leader.image && (
          <Image
            src={leader.image || "/placeholder.svg"}
            alt={leader.name}
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        {/* Name and title positioned at bottom of image */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-2xl font-bold text-white mb-1">{leader.name}</h3>
          <p className={`text-lg ${textColor}`}>{leader.position}</p>
        </div>
      </div>

      {/* Details section */}
      <div className={`p-6 ${cardColor}`}>
        <div className="space-y-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-white/60 mr-2 flex-shrink-0" />
            <p className="text-white/80">Experience: {leader.experience || "20+ years"}</p>
          </div>

          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-white/60 mr-2 flex-shrink-0" />
            <p className="text-white/80">Expertise</p>
          </div>
          <p className="text-white/80 pl-7">{leader.expertise}</p>

          

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center justify-between w-full ${buttonBg} text-white p-3 rounded transition-colors mt-2`}
          >
            <span>Read More</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>

          {isExpanded && (
            <div className="mt-4 text-white/80 space-y-4">
              <p className="mb-3">{leader.description}</p>
              <p className="mb-3">{leader.additionalInfo}</p>

  
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Leadership team data
const leadershipTeam = [
  {
    id: 1,
    name: "Haroon Ahmed",
    position: "Chief Executive Officer",
    experience: "30+ years",
    expertise: "Design, Insights and Commercial Lead",
    description:
      "Over the last three decades, Mr. Haroon Ahmad has remained instrumental in developing retail market measurement in Pakistan. Prior to coming into entrepreneurial role in 2009, he headed Retail Measurement Services division of global leader in Retail Research.Having travelled to countries across North America, Europe, and Asia, he has got exposure to international best practices. With demonstrated capability to blend research expertise with insightful analysis, he has contributed to success stories of some of the key FMCG brands in the country. His passion for research, vision and strategic thinking make him an exemplary Leader.",
      image: "https://www.accessretailpk.com/wp-content/uploads/2024/03/Haroon-Ahmed.jpg",
    color: "blue",
  },
  {
    id: 2,
    name: "Muhammad Irfan Butt",
    position: "Executive Director",
    experience: "25+ years",
    expertise: "Operations Design & Leadership, Insights",
    description:
      "Mr. Muhammad Irfan Butt carries to his credit extensive experience of managing large scale operations (in research & sales) inside and outside Pakistan.He co-founded Access Retail in 2009 that later became market leader in its domain. Earlier he has handled retail audit and census operations for global leader in retail research covering Middle East, North Africa & Pakistan region. Also headed regional Sales & Marketing function of a key beverage player, where he won Performance Excellence Award for 2 years consecutively. He is a go-getter and a strong leader habitual of pushing boundaries for continuous rise in performance, ",
      image: "https://www.accessretailpk.com/wp-content/uploads/2023/11/IRFAN-BUTT.jpg",
    color: "red",
  },
]

export default function ServicesPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  // Same scroll prevention logic as your home page
  useEffect(() => {
    window.scrollTo(0, 0)

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }

    document.body.style.overflow = "hidden"

    const forceScrollTop = () => {
      window.scrollTo(0, 0)
    }

    const scrollInterval = setInterval(forceScrollTop, 50)

    setTimeout(() => {
      document.body.style.overflow = loading ? "hidden" : ""
      clearInterval(scrollInterval)
    }, 1000)

    const handlePopState = () => {
      window.scrollTo(0, 0)
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      clearInterval(scrollInterval)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [loading])

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}
      <main
        ref={mainRef}
        className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Leadership Section with increased top margin */}
        <section className="pt-40 pb-20 bg-[#001333]/70">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Leadership</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">Passionate About Excellence In Research</p>
          
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {leadershipTeam.map((leader, index) => (
                <LeadershipCard key={leader.id} leader={leader} index={index} />
              ))}
            </div>

           
          </div>
        </section>
<br></br>
<br></br>

        <Footer />
      </main>
    </>
  )
}
