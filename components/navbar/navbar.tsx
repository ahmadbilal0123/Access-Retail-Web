"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import MegaMenu from "./mega-menu"
import MobileMenu from "./mobile-menu"
import { navItems } from "./navbar-items"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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

  const handleMouseEnter = (id: string) => {
    setActiveDropdown(id)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-blue-950/90 backdrop-blur-md py-2 shadow-lg shadow-blue-900/50" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-2 sm:px-4">
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
          <nav className="hidden lg:flex items-center justify-center">
            <ul className="flex space-x-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onMouseEnter={() => item.children && handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        "text-white hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium relative group flex items-center",
                        activeDropdown === item.id && "text-red-500",
                      )}
                      aria-expanded={activeDropdown === item.id}
                    >
                      <span className="relative z-10">{item.title}</span>
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.id && "rotate-180",
                        )}
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400/20"></span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium relative group flex items-center"
                    >
                      <span className="relative z-10">{item.title}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400/20"></span>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.id && (
                      <MegaMenu items={item.children} parentId={item.id} />
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Contact Button (Desktop) */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full px-4 sm:px-6 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300 hover:translate-y-[-2px]">
              Contact
            </Button>
          </motion.div>

          {/* Mobile menu button - Using shadcn Sheet component */}
          <div className="lg:hidden">
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
                className="bg-gradient-to-b from-blue-950 to-blue-900 border-l border-blue-800/30 p-0 w-[280px] sm:w-[300px] md:w-[350px]"
              >
                <MobileMenu navItems={navItems} closeMenu={closeMenu} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
