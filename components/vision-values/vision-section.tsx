"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Eye } from "lucide-react"
import Image from "next/image"

export default function VisionSection() {
  const ref = useRef(null)
  const valuesRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    // Set initial values
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {/* Vision Section */}
      <section className="bg-[#001333] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-2xl">
          {/* Heading with underline */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Our Vision</h2>
            <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
          </div>

          {/* Logo and paragraph in one row */}
          <div ref={ref} className="flex flex-col md:flex-row items-center gap-10 mb-8 sm:mb-10 md:mb-12">
            {/* Vision icon - on the left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center md:w-1/5 mb-4 md:mb-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto md:mx-0">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-30"></div>
                <div className="absolute inset-[15%] rounded-full border-4 border-blue-500 opacity-60"></div>
                <div className="absolute inset-[40%] rounded-full border-4 border-blue-500 opacity-80"></div>
                <div className="absolute inset-[45%] rounded-full bg-blue-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Paragraph - on the right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:w-4/5 flex items-center"
            >
              <p className="text-white text-base sm:text-lg leading-relaxed text-center md:text-left ">
                Visualisation of our client relationships
              </p>
            </motion.div>
          </div>

          {/* Quote card - centered */}
          <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-[#1a2d3d] rounded-lg p-4 sm:p-6 md:p-8 w-full"
            >
              <div className="relative text-center px-2 sm:px-4">
                <div className="text-blue-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -top-6 sm:-top-8 left-0 sm:left-2">
                  "
                </div>
                <p className="text-white text-base sm:text-lg italic px-4 sm:px-5 md:px-1 py-4 sm:py-4 ">
                  To deliver most innovative methodologies & research solutions and superior client servicing in
                  customized research, to ensure enduring relationships with our clients.
                </p>
                <div className="text-blue-500 text-4xl sm:text-5xl md:text-6xl font-serif absolute -bottom-6 sm:-bottom-10 md:-bottom-12 right-0 sm:right-2">
                  "
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Separation Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      {/* Values Section with PNG Images and Rounded Connections */}
      <section className="bg-[#001333] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 border-t border-blue-900/30">
        <div className="container mx-auto">
          {/* Heading with underline */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Our Values</h2>
            <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
          </div>

          {/* Logo and paragraph in one row - with logo on left */}
          <div
            ref={valuesRef}
            className="flex flex-col sm:flex-row items-center justify-center mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto"
          >
            {/* Values icon - on the left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center sm:w-1/5 mb-4 sm:mb-0 sm:pr-4"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/values.png"
                    alt="Values"
                    width={40}
                    height={40}
                    className="h-8 w-8 sm:h-10 sm:w-10 text-white"
                  />
                </div>
              </div>
            </motion.div>

            {/* Paragraph - on the right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="sm:w-4/5 text-center sm:text-left"
            >
              <p className="text-white text-base sm:text-lg leading-relaxed">
                The principles that define our connection – within & outside.
              </p>
            </motion.div>
          </div>

          {/* Values Diagram with PNG Images and Rounded Connections */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={valuesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="relative w-full values-diagram-container"
                style={{ paddingBottom: "100%" }} // Square aspect ratio
              >
                {/* Base SVG Structure with Rounded Connections */}
                <svg
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Define gradients for the stroke */}
                  <defs>
                    {/* Gradient for the outer ring */}
                    <linearGradient id="redBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.8" />
                      <stop offset="25%" stopColor="#1e3a8a" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#7f1d1d" stopOpacity="0.8" />
                      <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Center Circle */}
                  <circle cx="300" cy="300" r="60" fill="transparent" stroke="#0076CE" strokeWidth="2" />
                  <text
                    x="300"
                    y="295"
                    textAnchor="middle"
                    fill="white"
                    fontSize="20"
                    fontWeight="500"
                    className="values-text"
                  >
                    Our
                  </text>
                  <text
                    x="300"
                    y="320"
                    textAnchor="middle"
                    fill="white"
                    fontSize="20"
                    fontWeight="500"
                    className="values-text"
                  >
                    Values
                  </text>

                  {/* Outer Ring with Multi-Color Gradient */}
                  <path
                    d="M300,150 A150,150 0 0,1 450,300 A150,150 0 0,1 300,450 A150,150 0 0,1 150,300 A150,150 0 0,1 300,150"
                    fill="none"
                    stroke="url(#redBlueGradient)"
                    strokeWidth="20"
                  />

                  {/* Integrity - Top */}
                  <text
                    x="300"
                    y="60"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="500"
                    className="values-label"
                  >
                    Integrity
                  </text>
                  <circle cx="300" cy="150" r="40" fill="#7f1d1d" fillOpacity="0.8" />

                  {/* Teamwork - Right */}
                  <text
                    x="540"
                    y="300"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="500"
                    className="values-label"
                  >
                    Teamwork
                  </text>
                  <circle cx="450" cy="300" r="40" fill="#1e3a8a" fillOpacity="0.7" />

                  {/* Innovation - Bottom */}
                  <text
                    x="300"
                    y="540"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="500"
                    className="values-label"
                  >
                    Innovation
                  </text>
                  <circle cx="300" cy="450" r="40" fill="#7f1d1d" fillOpacity="0.8" />

                  {/* Kaizen - Left */}
                  <text
                    x="60"
                    y="300"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="500"
                    className="values-label"
                  >
                    Kaizen
                  </text>
                  <circle cx="150" cy="300" r="40" fill="#1e3a8a" fillOpacity="0.7" />
                </svg>

                {/* PNG Images positioned over the circles - Using relative positioning with CIRCULAR CONTAINERS */}
                <div className="absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[12%] h-0 pb-[12%] rounded-full overflow-hidden flex items-center justify-center bg-red-900/900 shadow-lg icon-circle">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[60%] h-[60%]">
                      <Image
                        src="/honesty.png"
                        alt="Integrity"
                        fill
                        sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Teamwork - Right - ADJUSTED POSITION */}
                <div className="absolute top-[50%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 w-[12%] h-0 pb-[12%] rounded-full overflow-hidden flex items-center justify-center bg-blue-900/900 shadow-lg icon-circle ">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[60%] h-[60%]">
                      <Image
                        src="/teemwork.png"
                        alt="Teamwork"
                        fill
                        sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[12%] h-0 pb-[12%] rounded-full overflow-hidden flex items-center justify-center bg-red-900/900 shadow-lg icon-circle">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[60%] h-[60%]">
                      <Image
                        src="/innovation.png"
                        alt="Innovation"
                        fill
                        sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Kaizen - Left - ADJUSTED POSITION */}
                <div className="absolute top-[50%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 w-[12%] h-0 pb-[12%] rounded-full overflow-hidden flex items-center justify-center bg-blue-900/900 shadow-lg icon-circle ">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[60%] h-[60%]">
                      <Image
                        src="/kaizen.png"
                        alt="Kaizen"
                        fill
                        sizes="(max-width: 640px) 24px, (max-width: 1024px) 36px, 48px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Separation Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      {/* Add CSS for responsive SVG text - LARGER FONT SIZES */}
      <style jsx global>{`
        .values-text {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .values-label {
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        
        /* Responsive text scaling */
        @media (max-width: 768px) {
          .values-text {
            font-size: 1.25rem;
          }
          .values-label {
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .values-text {
            font-size: 1rem;
          }
          .values-label {
            font-size: 0.875rem;
          }
        }
        
        /* Fix for SVG rendering */
        svg {
          overflow: visible;
        }
        svg circle {
          vector-effect: non-scaling-stroke;
        }
        
        /* Ensure icons scale properly */
        .icon-circle img {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          object-position: center !important;
        }
      `}</style>
    </>
  )
}
