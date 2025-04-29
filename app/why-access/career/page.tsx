"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import {
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  Zap,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Send,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Job posting interface
interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
  isNew: boolean
}

// Benefits interface
interface Benefit {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

// Testimonial interface
interface Testimonial {
  id: string
  quote: string
  name: string
  position: string
  image: string
  color: string
}

// Job postings data
const jobPostings: JobPosting[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    department: "Research",
    location: "Lahore, Pakistan",
    type: "Full-time",
    experience: "2+ years",
    description: "Join our research team to analyze retail data and provide actionable insights to our clients.",
    responsibilities: [
      "Analyze large datasets using statistical methods",
      "Create visualizations and reports for clients",
      "Collaborate with research teams to identify trends",
      "Present findings to stakeholders",
    ],
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, or related field",
      "2+ years of experience in data analysis",
      "Proficiency in SQL, Excel, and data visualization tools",
      "Strong analytical and problem-solving skills",
    ],
    isNew: true,
  },
  {
    id: "field-researcher",
    title: "Field Researcher",
    department: "Operations",
    location: "Multiple Locations, Pakistan",
    type: "Full-time",
    experience: "1+ years",
    description:
      "Conduct field research and collect retail data across various markets to support our research initiatives.",
    responsibilities: [
      "Visit retail outlets to collect data according to research protocols",
      "Ensure data accuracy and completeness",
      "Maintain relationships with retail partners",
      "Report field observations and insights",
    ],
    requirements: [
      "Bachelor's degree in any discipline",
      "1+ years of field experience preferred",
      "Strong attention to detail",
      "Excellent communication skills",
      "Willingness to travel locally",
    ],
    isNew: true,
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Lahore, Pakistan",
    type: "Full-time",
    experience: "3+ years",
    description: "Drive our marketing initiatives to promote our research services and build our brand presence.",
    responsibilities: [
      "Develop and implement marketing strategies",
      "Create content for digital and traditional channels",
      "Manage social media presence",
      "Analyze marketing performance metrics",
    ],
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "3+ years of marketing experience",
      "Experience with digital marketing tools",
      "Strong creative and analytical skills",
    ],
    isNew: false,
  },
]

// Benefits data
const benefits: Benefit[] = [
  {
    id: "growth",
    icon: <GraduationCap size={24} />,
    title: "Professional Growth",
    description:
      "Continuous learning opportunities through workshops, courses, and mentorship programs to advance your career.",
    color: "blue",
  },
  {
    id: "health",
    icon: <Heart size={24} />,
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance, wellness programs, and work-life balance initiatives for your wellbeing.",
    color: "red",
  },
  {
    id: "team",
    icon: <Users size={24} />,
    title: "Collaborative Culture",
    description: "Work with talented professionals in a supportive environment that values teamwork and innovation.",
    color: "purple",
  },
  {
    id: "impact",
    icon: <Zap size={24} />,
    title: "Meaningful Impact",
    description:
      "Contribute to projects that shape the retail landscape and help businesses make data-driven decisions.",
    color: "green",
  },
]

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Working at Access Retail has been a transformative experience. The collaborative environment and opportunities for growth have helped me develop both professionally and personally.",
    name: "Sarah Ahmed",
    position: "Senior Data Analyst",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/confident-leader-USHTxs6brk9xOF7V6oSCch7WpqFEJY.png",
    color: "blue",
  },
  {
    id: "2",
    quote:
      "I joined as a junior researcher and have grown into a team lead in just three years. The mentorship and learning opportunities here are unmatched in the industry.",
    name: "Imran Khan",
    position: "Research Team Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/confident-leader-USHTxs6brk9xOF7V6oSCch7WpqFEJY.png",
    color: "red",
  },
]

export default function CareersPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)
  const [activeJob, setActiveJob] = useState<string | null>(null)

  // State for visibility
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({})
  const observerRefs = useRef<(HTMLElement | null)[]>([])

  // Scroll prevention logic during loading
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

  // Intersection observer for animations
  useEffect(() => {
    const observers = observerRefs.current
      .map((ref, index) => {
        if (!ref) return null

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible((prev) => ({ ...prev, [index]: true }))
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.1 },
        )

        observer.observe(ref)
        return observer
      })
      .filter(Boolean) // Filter out null observers

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  // Properly type the addToRefs function
  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !observerRefs.current[index]) {
      observerRefs.current[index] = el
    }
  }

  // Toggle job details
  const toggleJobDetails = (jobId: string) => {
    if (activeJob === jobId) {
      setActiveJob(null)
    } else {
      setActiveJob(jobId)
    }
  }

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}
      <main
        ref={mainRef}
        className="min-h-screen bg-[#001333] text-white overflow-hidden"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2252]/80 to-[#8b2e2e]/80 z-10"></div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/collaborative-office-brainstorm-q7MKmhk3kHOcTzsmJVu9aTBod80juP.png"
            alt="Careers at Access Retail"
            width={1600}
            height={800}
            className="w-full h-full object-cover"
          />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Join <span className="text-red-500 ">Our</span> Team</h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-red-500 to-blue-500 my-4"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl md:text-2xl max-w-2xl"
            >
              Build Your Career at Pakistan's Leading Retail Research Company
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto max-w-6xl px-4 py-16">
          {/* Why Join Us Section */}
          <motion.section
            ref={(el) => addToRefs(el, 0)}
            initial="hidden"
            animate={isVisible[0] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={{
                  rotate: [0, 10, 0],
                  transition: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse" as const,
                  },
                }}
                className="w-12 h-12 rounded-full bg-[#0a2252] flex items-center justify-center mr-4"
              >
                <Star className="text-blue-300" size={24} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">Why Join Access Retail</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible[0] ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold mb-4">Shape the Future of Retail Research</h3>
                <p className="text-gray-300 mb-6">
                  At Access Retail, we're pioneering innovative approaches to retail market research. Join our team of
                  passionate professionals who are dedicated to providing actionable insights that drive business
                  decisions across Pakistan's retail landscape.
                </p>
                <p className="text-gray-300">
                  Whether you're an experienced analyst, a field researcher, or a marketing professional, you'll find
                  opportunities to grow, innovate, and make a meaningful impact in our collaborative environment.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isVisible[0] ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative h-64 md:h-auto overflow-hidden rounded-lg"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/collaborative-data-review-jKJbtQznPn4Zz0tqS9Fns3CrP8VH75.png"
                  alt="Team collaboration"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Benefits Grid */}
            <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.id}
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={`p-6 rounded-lg border ${
                    benefit.color === "blue"
                      ? "border-blue-700 bg-blue-900/20"
                      : benefit.color === "red"
                        ? "border-red-700 bg-red-900/20"
                        : benefit.color === "purple"
                          ? "border-purple-700 bg-purple-900/20"
                          : "border-green-700 bg-green-900/20"
                  } hover:bg-opacity-30 transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      benefit.color === "blue"
                        ? "bg-blue-900/50 text-blue-300"
                        : benefit.color === "red"
                          ? "bg-red-900/50 text-red-300"
                          : benefit.color === "purple"
                            ? "bg-purple-900/50 text-purple-300"
                            : "bg-green-900/50 text-green-300"
                    }`}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Current Openings Section */}
          <motion.section
            ref={(el) => addToRefs(el, 1)}
            initial="hidden"
            animate={isVisible[1] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse" as const,
                  },
                }}
                className="w-12 h-12 rounded-full bg-[#8b2e2e] flex items-center justify-center mr-4"
              >
                <Briefcase className="text-red-300" size={24} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">Current Openings</h2>
            </div>

            <motion.div variants={staggerChildren} className="space-y-6">
              {jobPostings.map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeIn}
                  className="bg-[#0a2252]/30 border border-[#0a2252]/50 rounded-lg overflow-hidden transition-all duration-300"
                >
                  <div
                    onClick={() => toggleJobDetails(job.id)}
                    className="p-6 cursor-pointer hover:bg-[#0a2252]/40 transition-colors duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold mr-3">{job.title}</h3>
                          {job.isNew && (
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">New</span>
                          )}
                        </div>
                        <p className="text-blue-300">{job.department}</p>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1 text-gray-400" />
                          <span className="text-gray-300">{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase size={16} className="mr-1 text-gray-400" />
                          <span className="text-gray-300">{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1 text-gray-400" />
                          <span className="text-gray-300">{job.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {activeJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-4 border-t border-[#0a2252]">
                        <p className="text-gray-300 mb-6">{job.description}</p>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-blue-300">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle size={18} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-blue-300">Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle size={18} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-2 px-6 rounded-md flex items-center transition-colors duration-300"
                        >
                          Apply Now <ArrowRight size={16} className="ml-2" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Employee Testimonials */}
          <motion.section
            ref={(el) => addToRefs(el, 2)}
            initial="hidden"
            animate={isVisible[2] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse" as const,
                  },
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0a2252] to-[#8b2e2e] flex items-center justify-center mr-4"
              >
                <Users className="text-white" size={24} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">Our Team Stories</h2>
            </div>

            <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className={`p-6 rounded-lg ${
                    testimonial.color === "blue"
                      ? "bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-l-4 border-blue-500"
                      : "bg-gradient-to-br from-red-900/30 to-red-900/10 border-l-4 border-red-500"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{testimonial.name}</h3>
                      <p className={`${testimonial.color === "blue" ? "text-blue-300" : "text-red-300"} text-sm`}>
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Application Process */}
          <motion.section
            ref={(el) => addToRefs(el, 3)}
            initial="hidden"
            animate={isVisible[3] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  transition: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
                className="w-12 h-12 rounded-full bg-[#0a2252] flex items-center justify-center mr-4"
              >
                <CheckCircle className="text-blue-300" size={24} />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">Application Process</h2>
            </div>

            <div className="relative">
              <motion.div
                initial={{ height: 0 }}
                animate={isVisible[3] ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-0 bottom-0 left-[20px] md:left-[50%] w-0.5 bg-gradient-to-b from-blue-500 to-red-500 hidden md:block"
              ></motion.div>

              <motion.div variants={staggerChildren} className="space-y-12">
                {/* Step 1 */}
                <motion.div variants={fadeIn} className="md:flex items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisible[3] ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="w-10 h-10 bg-blue-600 rounded-full absolute left-[-5px] top-0 md:left-auto md:right-[-5px] md:top-1/2 md:transform md:-translate-y-1/2 flex items-center justify-center text-white font-bold z-10"
                    >
                      1
                    </motion.div>
                    <motion.div
                      whileHover={{ x: -10, transition: { duration: 0.3 } }}
                      className="pl-12 md:pl-0 bg-[#0a2252]/30 p-6 rounded-lg border border-[#0a2252]/50 hover:bg-[#0a2252]/40 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold mb-2">Application Submission</h3>
                      <p className="text-gray-300">
                        Browse our open positions and submit your application with your resume and cover letter through
                        our online portal.
                      </p>
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                </motion.div>

                {/* Step 2 */}
                <motion.div variants={fadeIn} className="md:flex items-center">
                  <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisible[3] ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="w-10 h-10 bg-blue-600 rounded-full absolute left-[-5px] top-0 md:left-[-5px] md:top-1/2 md:transform md:-translate-y-1/2 flex items-center justify-center text-white font-bold z-10"
                    >
                      2
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10, transition: { duration: 0.3 } }}
                      className="pl-12 md:pl-0 bg-[#0a2252]/30 p-6 rounded-lg border border-[#0a2252]/50 hover:bg-[#0a2252]/40 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold mb-2">Initial Screening</h3>
                      <p className="text-gray-300">
                        Our HR team reviews applications and conducts initial phone interviews with qualified
                        candidates.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div variants={fadeIn} className="md:flex items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisible[3] ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                      className="w-10 h-10 bg-blue-600 rounded-full absolute left-[-5px] top-0 md:left-auto md:right-[-5px] md:top-1/2 md:transform md:-translate-y-1/2 flex items-center justify-center text-white font-bold z-10"
                    >
                      3
                    </motion.div>
                    <motion.div
                      whileHover={{ x: -10, transition: { duration: 0.3 } }}
                      className="pl-12 md:pl-0 bg-[#0a2252]/30 p-6 rounded-lg border border-[#0a2252]/50 hover:bg-[#0a2252]/40 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold mb-2">Technical Assessment</h3>
                      <p className="text-gray-300">
                        Shortlisted candidates complete a skills assessment relevant to the position they've applied
                        for.
                      </p>
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                </motion.div>

                {/* Step 4 */}
                <motion.div variants={fadeIn} className="md:flex items-center">
                  <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisible[3] ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 2.0 }}
                      className="w-10 h-10 bg-blue-600 rounded-full absolute left-[-5px] top-0 md:left-[-5px] md:top-1/2 md:transform md:-translate-y-1/2 flex items-center justify-center text-white font-bold z-10"
                    >
                      4
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10, transition: { duration: 0.3 } }}
                      className="pl-12 md:pl-0 bg-[#0a2252]/30 p-6 rounded-lg border border-[#0a2252]/50 hover:bg-[#0a2252]/40 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold mb-2">Interview Process</h3>
                      <p className="text-gray-300">
                        Candidates meet with hiring managers and team members for in-depth discussions about their
                        experience and fit for the role.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Step 5 */}
                <motion.div variants={fadeIn} className="md:flex items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisible[3] ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 2.4 }}
                      className="w-10 h-10 bg-blue-600 rounded-full absolute left-[-5px] top-0 md:left-auto md:right-[-5px] md:top-1/2 md:transform md:-translate-y-1/2 flex items-center justify-center text-white font-bold z-10"
                    >
                      5
                    </motion.div>
                    <motion.div
                      whileHover={{ x: -10, transition: { duration: 0.3 } }}
                      className="pl-12 md:pl-0 bg-[#0a2252]/30 p-6 rounded-lg border border-[#0a2252]/50 hover:bg-[#0a2252]/40 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold mb-2">Offer & Onboarding</h3>
                      <p className="text-gray-300">
                        Successful candidates receive an offer and begin our comprehensive onboarding program to set
                        them up for success.
                      </p>
                    </motion.div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            ref={(el) => addToRefs(el, 4)}
            initial="hidden"
            animate={isVisible[4] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="bg-gradient-to-r from-[#0a2252]/50 to-[#8b2e2e]/50 p-8 md:p-12 rounded-xl border border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Don't See a Perfect Fit?</h3>
                  <p className="text-gray-300 max-w-xl">
                    We're always looking for talented individuals to join our team. Send us your resume, and we'll
                    contact you when a suitable position becomes available.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-8 rounded-md flex items-center justify-center transition-colors duration-300 whitespace-nowrap"
                >
                  <Send size={18} className="mr-2" />
                  Submit Your Resume
                </motion.button>
              </div>
            </motion.div>
          </motion.section>
        </div>
        <Footer />
      </main>
    </>
  )
}
