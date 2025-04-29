"use client"

import { useRef, useEffect, useState } from "react"
import Script from "next/script"
import { ProfileHeading } from "./company-profile/profile-heading"
import { ProfileIntro } from "./company-profile/profile-intro"
import { CoreServices } from "./company-profile/core-services"
import { CompanySpecialization } from "./company-profile/company-specialization"
import { BackgroundAnimation } from "./company-profile/background-animation"

export default function CompanyProfile() {
  const sectionRef = useRef<HTMLElement>(null)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  // Initialize GSAP animations
  useEffect(() => {
    if (!gsapLoaded || !sectionRef.current) return

    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger

    if (!gsap || !ScrollTrigger) return

    // Create a master timeline
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Dispatch a custom event that child components can listen for
    const event = new CustomEvent("companyProfileInView", { detail: { masterTimeline } })
    window.dispatchEvent(event)

    // Dispatch GSAP loaded event for background animations
    window.dispatchEvent(new Event("gsapLoaded"))

    return () => {
      // Clean up ScrollTrigger
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [gsapLoaded])

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        onLoad={() => {
          // Load ScrollTrigger plugin after GSAP loads
          const script = document.createElement("script")
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          script.onload = () => setGsapLoaded(true)
          document.body.appendChild(script)
        }}
      />

      <section
        ref={sectionRef}
        className="relative py-13 overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950"
        id="company-profile"
      >
        {/* Enhanced background animations */}
        <BackgroundAnimation />

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <ProfileHeading />

          {/* Introduction */}
          <ProfileIntro />

          {/* Company Specialization */}
          <CompanySpecialization />
          
          {/* Core Services */}
          <CoreServices />

        </div>
      </section>
    </>
  )
}

