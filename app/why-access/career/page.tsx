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
  ChevronDown,
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/confident-leader-USHTxs6brk9xOF7V6oSCch7WpqFEJY.png",
    color: "blue",
  },
  {
    id: "2",
    quote:
      "I joined as a junior researcher and have grown into a team lead in just three years. The mentorship and learning opportunities here are unmatched in the industry.",
    name: "Imran Khan",
    position: "Research Team Lead",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/confident-leader-USHTxs6brk9xOF7V6oSCch7WpqFEJY.png",
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

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [currentJobId, setCurrentJobId] = useState<string | null>(null)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

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

  const handleApplyNow = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation()
    setCurrentJobId(jobId)
    setIsApplyModalOpen(true)
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Join <span className="text-red-500 ">Our</span> Team
            </h1>
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
                        <motion.div
                          animate={{ rotate: activeJob === job.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-2 bg-blue-900/30 rounded-full p-1 flex items-center justify-center"
                        >
                          <ChevronDown size={18} className="text-blue-400" />
                        </motion.div>
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
                          onClick={(e) => handleApplyNow(e, job.id)}
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
                  onClick={() => {
                    setCurrentJobId(null)
                    setIsApplyModalOpen(true)
                  }}
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
        {/* Application Modal */}
        {isApplyModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0a2252] border border-blue-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  Apply for: {jobPostings.find((job) => job.id === currentJobId)?.title}
                </h3>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setIsSubmitSuccess(true)

                  // Close the modal after showing success message for 3 seconds
                  setTimeout(() => {
                    setIsApplyModalOpen(false)
                    setIsSubmitSuccess(false)
                  }, 3000)
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-2 bg-[#001333] border border-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-2 bg-[#001333] border border-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 bg-[#001333] border border-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      className="w-full px-4 py-2 bg-[#001333] border border-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-1">
                      Upload Resume (PDF)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full px-4 py-2 bg-[#001333] border border-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="cover" className="block text-sm font-medium text-gray-300 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      id="cover"
                      rows={4}
                      className="w-full px-4 py-2 bg-[#001333] border border-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                    ></textarea>
                  </div>
                </div>
                {isSubmitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-md"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-300">Application submitted successfully!</h3>
                        <div className="mt-2 text-sm text-green-200">
                          <p>
                            Thank you for your interest. Our team will review your application and contact you soon.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="mr-4 px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-md transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </>
  )
}
