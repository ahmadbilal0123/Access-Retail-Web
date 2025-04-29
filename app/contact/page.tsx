"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Phone, MapPin, User, Send, Clock, ChevronRight, Briefcase } from "lucide-react"
import Image from "next/image"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

// Contact team data
const contactTeam = [
  {
    id: 1,
    name: "AMNA QASIM",
    position: "Executive Director",
    email: "amna.qasim@accessretailpk.com",
    phone: "+92 42 35201852",
    image: "/placeholder.svg?height=400&width=400&text=AQ",
    color: "blue",
  },
  {
    id: 2,
    name: "MR. JUNAID UR REHMAN",
    position: "Associate Director Client",
    email: "junaid.rehman@accessretailpk.com",
    phone: "+92 300 5004494",
    image: "/placeholder.svg?height=400&width=400&text=JR",
    color: "red",
  },
]

// Contact card component
const ContactCard = ({ contact, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const isBlue = contact.color === "blue"
  const cardBg = isBlue ? "bg-blue-900/20" : "bg-red-900/20"
  const hoverBg = isBlue ? "hover:bg-blue-800/30" : "hover:bg-red-800/30"
  const borderColor = isBlue ? "border-blue-700" : "border-red-700"
  const iconColor = isBlue ? "text-blue-400" : "text-red-400"
  const gradientFrom = isBlue ? "from-blue-500" : "from-red-500"
  const gradientTo = isBlue ? "to-blue-700" : "to-red-700"

  // Animation delay based on index
  const animationDelay = `${index * 150}ms`

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl shadow-lg border ${borderColor} ${cardBg} ${hoverBg} transition-all duration-500 transform hover:scale-105 hover:shadow-xl`}
      style={{
        opacity: 0,
        animation: "fadeInUp 0.6s ease forwards",
        animationDelay: animationDelay,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-10 transition-opacity duration-500 ${
          isHovered ? "opacity-20" : "opacity-10"
        }`}
      ></div>

      <div className="flex flex-col md:flex-row items-center p-6">
        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0 border-2 border-white/20">
          <Image
            src={contact.image || "/placeholder.svg"}
            alt={contact.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 96px"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-30 transition-opacity duration-500 ${
              isHovered ? "opacity-50" : "opacity-30"
            }`}
          ></div>
        </div>

        {/* Contact details */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{contact.name}</h3>
          <p className={`text-lg ${iconColor} mb-3`}>{contact.position}</p>

          <div className="space-y-2">
            <div className="flex items-center group">
              <Mail
                className={`h-5 w-5 ${iconColor} mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              />
              <a
                href={`mailto:${contact.email}`}
                className="text-white/80 hover:text-white transition-colors duration-300 truncate"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center group">
              <Phone
                className={`h-5 w-5 ${iconColor} mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              />
              <a
                href={`tel:${contact.phone}`}
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                {contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Animated arrow on hover */}
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 transform transition-all duration-500 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <ChevronRight className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(null)

  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedIcon || selectedIcon !== "heart") {
      alert("Please select the heart to verify you are human.")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        contact: "",
        email: "",
        subject: "",
        message: "",
      })
      setSelectedIcon(null)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

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
        {/* Hero Section */}
        <section className="pt-40 pb-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-red-500/10 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-40 right-20 w-40 h-40 rounded-full bg-blue-500/5 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 opacity-0 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Get In Touch</h1>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-6"></div>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                We're here to answer your questions and help you find the right solutions for your business needs.
              </p>
            </div>

            {/* Contact Information - CENTERED CARDS */}
            <div className="flex justify-center mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                {contactTeam.map((contact, index) => (
                  <ContactCard key={contact.id} contact={contact} index={index} />
                ))}
              </div>
            </div>

            {/* Contact Form and Office Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Contact Form */}
              <div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl"
                style={{
                  opacity: 0,
                  animation: "fadeInLeft 0.8s ease forwards",
                  animationDelay: "0.6s",
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-white/80">Thank you for reaching out. We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-white/80 mb-2">
                        Your name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                          placeholder="Enter Your Name"
                        />
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact" className="block text-white/80 mb-2">
                        Your contact
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="contact"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                          placeholder="+92 300 1234567"
                        />
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white/80 mb-2">
                        Your email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                          placeholder="abc@example.com"
                        />
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-white/80 mb-2">
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                          placeholder="How can we help you?"
                        />
                        <Briefcase className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white/80 mb-2">
                        Your message (optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Office Information */}
              <div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl"
                style={{
                  opacity: 0,
                  animation: "fadeInRight 0.8s ease forwards",
                  animationDelay: "0.8s",
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Our Office</h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center flex-shrink-0 mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Head Office</h3>
                      <p className="text-white/80">
                        34-M - Royal Complex - 3rd & 4th Floor, Ext, M block Block M Commercial Area Model Town, Lahore,
                        54700
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center flex-shrink-0 mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-white/80">Monday - Friday:</p>
                        <p className="text-white/80">9:00 AM - 6:00 PM</p>
                        <p className="text-white/80">Saturday:</p>
                        <p className="text-white/80">Closed</p>
                        <p className="text-white/80">Sunday:</p>
                        <p className="text-white/80">Closed</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center flex-shrink-0 mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                      <p className="text-white/80">Phone: +92 42 35201852</p>
                      <p className="text-white/80">Email: info@accessretailpk.com</p>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="relative h-64 rounded-lg overflow-hidden border border-white/20 mt-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-red-900/50 flex items-center justify-center">
                      <p className="text-white/60 text-center px-4">Interactive map would be displayed here</p>
                    </div>
                    <Image
                      src="https://tajarat.com.pk/wp-content/uploads/2021/08/d-articles-recent-for-tajarat-model-town-faisalab-3.jpeg"
                      alt="Office Location Map"
                      fill
                      className="object-cover opacity-30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add CSS animations */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeInUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInLeft {
            from { 
              opacity: 0;
              transform: translateX(-20px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInRight {
            from { 
              opacity: 0;
              transform: translateX(20px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }
          
          .animate-pulse {
            animation: pulse 3s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.05);
            }
          }
        `}</style>
        <br></br>
        <Footer />
      </main>
    </>
  )
}
