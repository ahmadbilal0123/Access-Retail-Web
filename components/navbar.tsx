"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Success Story", href: "/success-story" },
  { name: "Our Services", href: "/services" },
  { name: "About Us", href: "/about" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-blue-950/90 backdrop-blur-md py-2 shadow-lg shadow-blue-900/50" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <Link href="/" className="relative flex items-center bg-blue-950 rounded-lg p-1">
              <Image
                src="/placeholder.svg?height=40&width=150"
                alt="Access Retail Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium relative group flex items-center"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400/20"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Contact Button (Desktop) */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full px-6 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300 hover:translate-y-[-2px]">
              Contact
            </Button>
          </motion.div>

          {/* Mobile menu button - Using shadcn Sheet component */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.button
                  type="button"
                  className="text-white hover:text-red-500 transition-colors relative group p-2"
                  aria-expanded={isOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <Menu className="relative block h-6 w-6" aria-hidden="true" />
                </motion.button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gradient-to-b from-blue-950 to-blue-900 border-l border-blue-800/30 p-0 w-[300px] sm:w-[350px]"
              >
                <div className="flex flex-col h-full">
                  {/* Close button */}
                  <div className="flex justify-end p-4">
                    <button
                      onClick={closeMenu}
                      className="text-white hover:text-red-500 transition-colors p-2 rounded-full hover:bg-blue-800/20"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Mobile menu content */}
                  <div className="px-6 py-8 flex-1">
                    <div className="space-y-1">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            className="flex items-center justify-between text-white hover:text-red-500 py-3 px-4 text-lg font-medium border-b border-blue-800/30 transition-all duration-300 hover:pl-6 rounded-md hover:bg-blue-800/10 group"
                            onClick={closeMenu}
                          >
                            <span>{link.name}</span>
                            <ChevronRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Contact button in mobile menu */}
                  <div className="p-6 border-t border-blue-800/30">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full py-6 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300"
                        onClick={closeMenu}
                      >
                        Contact Us
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

