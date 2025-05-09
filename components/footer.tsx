"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real implementation, you would send this to your API
      console.log("Subscribing email:", email)
      setSubscribed(true)
      setEmail("")

      // Reset the subscribed state after 3 seconds
      setTimeout(() => {
        setSubscribed(false)
      }, 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative bg-gradient-to-b from-blue-950 to-blue-900 pt-16 overflow-hidden mt-[-80px]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      {/* Top wave separator */}
      <div className="absolute top-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-blue-900 translate-y-[-99%]">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="https://www.accessretailpk.com/wp-content/uploads/2024/03/AR-logo01-trasparent.png"
                  alt="Access Retail Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            <p className="text-blue-100 mb-6">
              Empowering retail operations with extensive capabilities, wide networks, and operational strength across
              Pakistan & Afghanistan.
            </p>

            <div className="flex space-x-3">
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/" label="What We Offer/Our Services" />
              {/* <FooterLink href="/capabilities" label="Capabilities" /> */}
              <FooterLink href="/why-access/leadership" label="Leadership" />
              <FooterLink href="/why-access/success-story" label="Why Access Retail?" />
              {/* <FooterLink href="/why-access/life-in-access" label="Life @ Access Retail  " />
              <FooterLink href="/why-access/career" label="Careers" /> */}
              {/* <FooterLink href="/blog" label="Blog" /> */}
              <FooterLink href="/contact" label="Contact" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-red-400 mr-3 h-5 w-5 flex-shrink-0 mt-1" />
                <span className="text-blue-100">34-M - Royal Complex - 3rd & 4th Floor, Ext, M block Block M Commercial Area Model Town, Lahore, 54700</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-red-400 mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-blue-100">(042) 35201852</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-red-400 mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-blue-100">info@accessretail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Newsletter</h3>
            <p className="text-blue-100 mb-4">Subscribe to newsletter for the latest updates and insights.</p>

            <form onSubmit={handleSubscribe} className="relative">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-blue-900/50 border-blue-800/50 text-white placeholder:text-blue-300/50 pr-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 p-1"
                disabled={subscribed}
              >
                {subscribed ? <span className="text-xs">✓</span> : <ArrowRight size={16} />}
              </Button>
            </form>

            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-400 text-sm mt-2"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Access Retail. All rights reserved.
            </p>

            <div className="flex items-center space-x-4">
            <Link href="https://www.gen-tsolutions.com/" className="text-blue-200 hover:text-white text-sm transition-colors">
                Powered By <span className="text-white" >Gen-T AI Solutions</span>
              </Link>
              <Link href="/privacy-policy" className="text-blue-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-blue-200 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="bg-blue-800/50 hover:bg-blue-700/50 text-white p-2 rounded-full transition-colors"
                aria-label="Scroll to top"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-8 h-8 rounded-full bg-blue-900/70 hover:bg-red-600 flex items-center justify-center text-white transition-colors duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </Link>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center group"
      >
        <span className="w-0 h-0.5 bg-red-500 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2"></span>
        {label}
      </Link>
    </li>
  )
}

