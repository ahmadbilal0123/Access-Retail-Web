"use client"

import { useEffect, useRef, useState } from "react"
import Hero from "@/components/hero"
import TransformingSection from "@/components/transforming-section"
import CompanyProfile from "@/components/company-profile"
import VisionValues from "@/components/vision-values"
import PrestigiousClients from "@/components/prestigious-clients"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(true)

  // Super aggressive approach to prevent scrolling
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0)

    // Disable scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    // Remove any hash from the URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }

    // Temporarily disable scrolling completely
    document.body.style.overflow = "hidden"

    // Create a function to force scroll to top
    const forceScrollTop = () => {
      window.scrollTo(0, 0)
    }

    // Apply repeatedly for a short period
    const scrollInterval = setInterval(forceScrollTop, 50)

    // Re-enable scrolling and clean up after a delay
    setTimeout(() => {
      document.body.style.overflow = loading ? "hidden" : ""
      clearInterval(scrollInterval)
    }, 1000)

    // Also handle popstate events (browser back/forward)
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
        {/* Remove the Navbar component from here since it's already in layout.tsx */}
        <Hero />
        <VisionValues />
        <CompanyProfile />
        <TransformingSection />
        <PrestigiousClients />
        <Footer />
      </main>
    </>
  )
}

