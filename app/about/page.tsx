"use client"

import { useEffect, useState } from "react"
import AboutHero from "@/components/about/about-hero"
import AboutIntro from "@/components/about/about-intro"
import TeamSection from "@/components/about/team-section"
import ServicesSection from "@/components/about/services-section"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"


export default function AboutPage() {
  const [loading, setLoading] = useState(true)

  // Force scroll to top and prevent scrolling during loading
  useEffect(() => {
    window.scrollTo(0, 0)

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ""
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}
      <main
        className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
      >
        <AboutHero />
        <AboutIntro />
        <Footer />
      </main>
    </>
  )
}

