"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Home,
  Info,
  Layers,
  Zap,
  Award,
  FileText,
  Mail,
  ChevronRight,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navItems, type NavItemType } from "./navbar-items"

export default function ModernNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navbarRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
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

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleSearch = () => setSearchOpen(!searchOpen)

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const toggleMobileExpand = (id: string) => {
    setExpandedMobileItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Update the getIcon function to return larger icons

  // Get icon component based on icon name
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-5 w-5" />
      case "info":
        return <Info className="h-5 w-5" />
      case "layers":
        return <Layers className="h-5 w-5" />
      case "zap":
        return <Zap className="h-5 w-5" />
      case "award":
        return <Award className="h-5 w-5" />
      case "file-text":
        return <FileText className="h-5 w-5" />
      case "mail":
        return <Mail className="h-5 w-5" />
        
      default:
        return null
    }
  }

  // Render mobile menu items recursively
  const renderMobileMenuItems = (items: NavItemType[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className={cn("w-full", level > 0 && "pl-4")}>
        {item.children ? (
          <div className="w-full">
            <button
              onClick={() => toggleMobileExpand(item.id)}
              className={cn(
                "flex items-center justify-between w-full py-3 px-4 text-left transition-all duration-300 rounded-lg",
                level === 0 ? "text-white font-medium hover:bg-white/10" : "text-blue-100 text-sm hover:bg-blue-800/20",
                expandedMobileItems.includes(item.id) && "bg-white/10",
              )}
            >
              <div className="flex items-center">
                {level === 0 && item.icon && <span className="mr-3 text-blue-300">{getIcon(item.icon)}</span>}
                <span>{item.title}</span>
                {item.featured && (
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white">New</span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedMobileItems.includes(item.id) && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {expandedMobileItems.includes(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-1 mb-1 border-l-2 border-blue-800/50 ml-6"
                >
                  {renderMobileMenuItems(item.children, level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : item.comingSoon ? (
          <div
            className={cn(
              "flex items-center justify-between py-3 px-4 text-blue-300/70 cursor-not-allowed rounded-lg",
              level === 0 ? "font-medium" : "text-sm",
            )}
          >
            <div className="flex items-center">
              {level === 0 && item.icon && <span className="mr-3 opacity-50">{getIcon(item.icon)}</span>}
              <span>{item.title}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-800/50 text-blue-300">Soon</span>
          </div>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300",
              level === 0 ? "text-white font-medium hover:bg-white/10" : "text-blue-100 text-sm hover:bg-blue-800/20",
              item.featured && "text-red-300",
            )}
            onClick={closeMobileMenu}
          >
            <div className="flex items-center">
              {level === 0 && item.icon && <span className="mr-3 text-blue-300">{getIcon(item.icon)}</span>}
              <span>{item.title}</span>
              {item.featured && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white">New</span>
              )}
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </Link>
        )}
      </div>
    ))
  }

  return (
    <div ref={navbarRef}>
      {/* Main Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-blue-950/90 backdrop-blur-md py-2 shadow-lg shadow-blue-900/50" : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 relative group mr-auto">
              <Link href="/" className="flex items-center">
                <div className="relative h-8 w-32 md:h-10 md:w-40 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="https://www.accessretailpk.com/wp-content/uploads/2024/03/AR-logo01-trasparent.png"
                    alt="Access Retail Logo"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-blue-600/0 group-hover:from-red-600/10 group-hover:to-blue-600/10 rounded-lg transition-all duration-500"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 whitespace-nowrap  text-sm">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  {item.children ? (
                    <button
                      onClick={() => handleDropdownToggle(item.id)}
                      className={cn(
                        "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
                        activeDropdown === item.id
                          ? "bg-white/10 text-white"
                          : "text-blue-100 hover:text-white hover:bg-white/5",
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "mr-2 transition-transform duration-300",
                            activeDropdown === item.id ? "text-white" : "text-blue-300 group-hover:text-white",
                            "group-hover:scale-110",
                          )}
                        >
                          {getIcon(item.icon)}
                        </span>
                      )}
                      <span className="relative">
                        {item.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "ml-1.5 h-4 w-4 transition-transform duration-300",
                          activeDropdown === item.id && "rotate-180",
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-blue-100 hover:text-white hover:bg-white/5 transition-all duration-300 group"
                    >
                      {item.icon && (
                        <span className="mr-2 text-blue-300 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transition-transform">
                          {getIcon(item.icon)}
                        </span>
                      )}
                      <span className="relative">
                        {item.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  )}

                  {/* Dropdown Menu with fixed positioning */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.id && (
                      <DesktopDropdown items={item.children} parentId={item.id} setActiveDropdown={setActiveDropdown} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center">
              {/* Search Button */}
              <button
                onClick={toggleSearch}
                className="p-2 text-blue-100 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Contact Button (Desktop) */}
              
              <div className="hidden md:block ml-4">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full px-5 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group">
                  <span className="relative z-10">Contact Us</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                </Link>
              </div>
           

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="ml-4 p-2 lg:hidden text-blue-100 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-blue-950/95 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          >
            <div className="w-full max-w-3xl">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/10 border-2 border-blue-800/50 rounded-full py-3 px-6 pr-12 text-white placeholder:text-blue-300/50 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 text-center text-blue-300 text-sm">Press ESC to close</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-blue-950/95 backdrop-blur-md pt-16 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Mobile Navigation */}
              <div className="space-y-1">{renderMobileMenuItems(navItems)}</div>

              {/* Mobile Contact Button */}
              <div className="pt-6 border-t border-blue-800/30">
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full py-6 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300">
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Desktop Dropdown Component
interface DesktopDropdownProps {
  items: NavItemType[]
  parentId: string
  setActiveDropdown: (id: string | null) => void
}

function DesktopDropdown({ items, parentId, setActiveDropdown }: DesktopDropdownProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const submenuRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const handleMouseEnter = (id: string) => {
    setActiveSubmenu(id)
  }

  const handleMouseLeave = () => {
    setActiveSubmenu(null)
  }

  // Check if submenu would go off-screen and adjust position
  useEffect(() => {
    if (activeSubmenu) {
      const submenuElement = submenuRefs.current.get(activeSubmenu)
      if (submenuElement) {
        const rect = submenuElement.getBoundingClientRect()
        const viewportWidth = window.innerWidth

        // If submenu would go off right edge of screen
        if (rect.right > viewportWidth) {
          submenuElement.style.left = "auto"
          submenuElement.style.right = "100%"
        } else {
          submenuElement.style.left = "100%"
          submenuElement.style.right = "auto"
        }
      }
    }
  }, [activeSubmenu])

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 bg-blue-950/95 backdrop-blur-md border border-blue-800/50 rounded-xl shadow-xl z-50 w-[280px] md:w-auto"
    >
      <div className="p-4 min-w-[280px] max-w-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              {item.children ? (
                <div className="relative">
                  <button
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-2.5 text-sm text-blue-100 hover:bg-blue-800/30 hover:text-white transition-all duration-200 rounded-lg group",
                      item.featured && "text-red-300 hover:text-red-200",
                      activeSubmenu === item.id && "bg-blue-800/30 text-white",
                    )}
                  >
                    <span className="font-medium">{item.title}</span>
                    <ChevronRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform duration-200" />

                    {item.featured && (
                      <span className="absolute right-10 top-2 text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white">
                        New
                      </span>
                    )}
                  </button>

                  {activeSubmenu === item.id && (
                    <div
                      ref={(el) => el && submenuRefs.current.set(item.id, el)}
                      className="absolute top-0 left-full bg-blue-950/95 backdrop-blur-md border border-blue-800/50 rounded-xl shadow-xl overflow-hidden min-w-[220px] z-20"
                    >
                      <div className="p-2">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={cn(
                              "flex items-center justify-between px-4 py-2.5 text-sm text-blue-100 hover:bg-blue-800/30 hover:text-white transition-all duration-200 rounded-lg block group",
                              subItem.featured && "text-red-300 hover:text-red-200",
                            )}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="font-medium">{subItem.title}</span>
                            {subItem.featured ? (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white ml-2">
                                New
                              </span>
                            ) : (
                              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : item.comingSoon ? (
                <div className="flex items-center justify-between px-4 py-2.5 text-sm text-blue-300/70 cursor-not-allowed rounded-lg">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-800/50 text-blue-300">Soon</span>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm text-blue-100 hover:bg-blue-800/30 hover:text-white transition-all duration-200 rounded-lg group",
                    item.featured && "text-red-300 hover:text-red-200",
                  )}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span className="font-medium">{item.title}</span>
                  {item.featured ? (
                    <Star className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

