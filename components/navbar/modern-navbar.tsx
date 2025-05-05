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
  Loader2,
  Briefcase,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navItems, type NavItemType } from "./navbar-items"

// Add this array of all pages at the top of the file, after the imports and before the flattenNavItems function
const allPages = [
  // Main pages
  { id: "home", title: "Home", href: "/", category: "Main" },
  { id: "about", title: "About Us", href: "/about#company-profile", category: "Main" },
  { id: "leadership", title: "Leadership", href: "/why-access/leadership", category: "Main" },
  { id: "why-access", title: "Why Access Retail?", href: "/why-access/success-story", category: "Main" },
  { id: "life-at-access", title: "Life @ Access Retail", href: "/why-access/life-in-access", category: "Main" },
  { id: "careers", title: "Careers", href: "/why-access/career", category: "Main" },
  { id: "contact", title: "Contact Us", href: "/contact", category: "Main" },

  // About Us pages
  { id: "company-profile", title: "Company Profile", href: "/about#company-profile", category: "About Us" },
  { id: "vision-values", title: "Vision & Values", href: "/about/vision-values", category: "About Us" },
  { id: "journey", title: "Our Journey", href: "/journey", category: "About Us" },

  // Services pages
  {
    id: "retail-audit",
    title: "Retail Audit Studies",
    href: "/services/retail-audit-studies",
    category: "Key Offerings",
  },
  { id: "retail-census", title: "Retail Census", href: "/services/retail-census", category: "Key Offerings" },
  {
    id: "merchandizing-audits",
    title: "Merchandizing Audits",
    href: "/services/merchandizing-audits",
    category: "Key Offerings",
  },
  {
    id: "trade-margin-studies",
    title: "Trade Margin Studies",
    href: "/services/trade-margin-studies",
    category: "Key Offerings",
  },
  {
    id: "asset-utilization",
    title: "Asset Utilization Tracking",
    href: "/services/asset-utilization-tracking",
    category: "Key Offerings",
  },

  // Why Access pages
  { id: "success-story", title: "Success Story", href: "/why-access/success-story", category: "Why Access Retail?" },
  { id: "leadership-team", title: "Leadership Team", href: "/why-access/leadership", category: "Why Access Retail?" },
  {
    id: "life-in-access",
    title: "Life in Access",
    href: "/why-access/life-in-access",
    category: "Life @ Access Retail",
  },
  { id: "career-opportunities", title: "Career Opportunities", href: "/why-access/career", category: "Careers" },
]

// Enhanced function to flatten nested navigation items for search
// This now properly handles multiple levels of nesting and ensures all items are included
const flattenNavItems = (
  items: NavItemType[],
  parentPath: string[] = [],
): Array<{ id: string; title: string; href: string; category?: string; breadcrumb?: string }> => {
  let result: Array<{ id: string; title: string; href: string; category?: string; breadcrumb?: string }> = []

  items.forEach((item) => {
    // Skip commented out items
    if (item.href === "#" && !item.children) return

    // Create breadcrumb path for better context in search results
    const currentPath = [...parentPath]
    if (item.title) currentPath.push(item.title)
    const breadcrumb = currentPath.length > 1 ? currentPath.join(" > ") : undefined

    // Add the current item if it has a valid href
    if (item.href && item.href !== "#" && !item.comingSoon) {
      result.push({
        id: item.id,
        title: item.title,
        href: item.href,
        category: currentPath.length > 1 ? currentPath[0] : "Main",
        breadcrumb,
      })
    }

    // Recursively process children with updated parent path
    if (item.children) {
      const childItems = flattenNavItems(item.children, currentPath)
      result = [...result, ...childItems]

      // For items like "Key Offerings", add them as a separate category
      if (item.title === "Key Offerings") {
        childItems.forEach((child) => {
          child.category = "Key Offerings"
        })
      }
    }
  })

  return result
}

export default function ModernNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navbarRef = useRef<HTMLDivElement>(null)
  const [showKeyOfferings, setShowKeyOfferings] = useState(false)

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; title: string; href: string; category?: string; breadcrumb?: string }>
  >([])
  const [isSearching, setIsSearching] = useState(false)
  // Replace the searchableItems initialization in the ModernNavbar component with this:
  // Change from:
  // const searchableItems = useRef(flattenNavItems(navItems))
  // To:
  const searchableItems = useRef([...allPages, ...flattenNavItems(navItems)])

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

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false)
      }

      // Open search with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchOpen])

  // Update the search functionality to search through all pages
  // Replace the useEffect for search with this enhanced version:
  // Find this useEffect:
  // useEffect(() => {
  //   const searchTimeout = setTimeout(() => {
  //     if (searchQuery.trim() === "") {
  //       setSearchResults([])
  //       setIsSearching(false)
  //       return
  //     }

  //     setIsSearching(true)

  //     // Simulate a search delay for a more realistic experience
  //     setTimeout(() => {
  //       const query = searchQuery.toLowerCase()

  //       // Enhanced search that checks both title and breadcrumb
  //       const results = searchableItems.current.filter(
  //         (item) =>
  //           item.title.toLowerCase().includes(query) ||
  //           (item.breadcrumb && item.breadcrumb.toLowerCase().includes(query)),
  //       )

  //       setSearchResults(results)
  //       setIsSearching(false)
  //     }, 300)
  //   }, 200)

  //   return () => clearTimeout(searchTimeout)
  // }, [searchQuery])

  // Replace with this enhanced version:
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)

      // Simulate a search delay for a more realistic experience
      setTimeout(() => {
        const query = searchQuery.toLowerCase()

        // Enhanced search that checks title, breadcrumb, and category
        const results = searchableItems.current.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            (item.breadcrumb && item.breadcrumb.toLowerCase().includes(query)) ||
            (item.category && item.category.toLowerCase().includes(query)),
        )

        // Remove duplicates based on href
        const uniqueResults = Array.from(new Map(results.map((item) => [item.href, item])).values())

        setSearchResults(uniqueResults)
        setIsSearching(false)
      }, 300)
    }, 200)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      setSearchQuery("")
      setSearchResults([])
      setShowKeyOfferings(false)
    }
  }

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const toggleMobileExpand = (id: string) => {
    setExpandedMobileItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleKeyOfferingsClick = () => {
    setShowKeyOfferings(true)
    setSearchQuery("")
  }

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
      case "briefcase":
        return <Briefcase className="h-5 w-5" />
      case "careers":
        return <Heart className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" /> // Default icon if none matches
    }
  }

  // Enhanced grouping of search results by category
  const groupedSearchResults = searchResults.reduce(
    (acc, item) => {
      const category = item.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, typeof searchResults>,
  )

  // Get all key offerings
  const keyOfferings = navItems.find((item) => item.id === "services")?.children?.[0]?.children || []

  // Get all main navigation items (excluding those with children)
  const mainNavItems = navItems.filter((item) => item.href !== "#")

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

      {/* Enhanced Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-blue-950/95 backdrop-blur-md flex flex-col items-start justify-start pt-20 px-4"
          >
            <div className="w-full max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300/70 h-5 w-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search pages, products, docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border-2 border-blue-800/50 rounded-full py-3 px-12 text-white placeholder:text-blue-300/50 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-2 text-center text-blue-300/70 text-sm">
                <kbd className="px-2 py-1 text-xs font-semibold text-blue-200 bg-blue-800/30 rounded-md">ESC</kbd> to
                close or press{" "}
                <kbd className="px-2 py-1 text-xs font-semibold text-blue-200 bg-blue-800/30 rounded-md">⌘K</kbd> to
                search anytime
              </div>

              {/* Enhanced Search Results with Breadcrumbs */}
              <div className="mt-6 overflow-y-auto max-h-[calc(100vh-180px)]">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                  </div>
                ) : searchQuery && searchResults.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-blue-300 text-lg">No results found for "{searchQuery}"</p>
                    <p className="text-blue-400/70 mt-2">Try a different search term</p>
                  </div>
                ) : searchQuery ? (
                  <div className="space-y-6">
                    {Object.entries(groupedSearchResults).map(([category, items]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="text-blue-300 text-sm font-medium px-2">{category}</h3>
                        <div className="bg-blue-900/20 rounded-xl overflow-hidden">
                          {items.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setSearchOpen(false)}
                              className="flex flex-col px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30 last:border-0"
                            >
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{item.title}</p>
                                <ChevronRight className="h-4 w-4 text-blue-400/70" />
                              </div>
                              {item.breadcrumb && <p className="text-xs text-blue-300/70 mt-1">{item.breadcrumb}</p>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : showKeyOfferings ? (
                  <div className="space-y-6">
                    {/* Main Navigation Links */}
                    <div className="space-y-2">
                      <h3 className="text-blue-300 text-sm font-medium px-2">Main Navigation</h3>
                      <div className="bg-blue-900/20 rounded-xl overflow-hidden">
                        {mainNavItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30 last:border-0"
                          >
                            <div className="flex-1">
                              <div className="flex items-center">
                                {item.icon && <span className="mr-2 text-blue-300">{getIcon(item.icon)}</span>}
                                <p className="font-medium">{item.title}</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-blue-400/70" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Key Offerings */}
                    <div className="space-y-2">
                      <h3 className="text-blue-300 text-sm font-medium px-2">Key Offerings</h3>
                      <div className="bg-blue-900/20 rounded-xl overflow-hidden">
                        {keyOfferings.map((offering) => (
                          <Link
                            key={offering.id}
                            href={offering.href}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30 last:border-0"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{offering.title}</p>
                              <p className="text-xs text-blue-300/70 mt-0.5">
                                What We Offer/Our Services &gt; Key Offerings &gt; {offering.title}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-blue-400/70" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Update the Quick Links section to include more pages */}
                    {/* Find the Quick Links section in the search overlay and replace it with this: */}
                    <div className="space-y-2">
                      <h3 className="text-blue-300 text-sm font-medium px-2">Quick Links</h3>
                      <div className="bg-blue-900/20 rounded-xl overflow-hidden">
                        <Link
                          href="/"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Home className="h-5 w-5 mr-2 text-blue-300" />
                              <p className="font-medium">Home</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-blue-400/70" />
                        </Link>
                        <Link
                          href="/about#company-profile"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Info className="h-5 w-5 mr-2 text-blue-300" />
                              <p className="font-medium">About Us</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-blue-400/70" />
                        </Link>
                        <Link
                          href="/why-access/leadership"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Award className="h-5 w-5 mr-2 text-blue-300" />
                              <p className="font-medium">Leadership</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-blue-400/70" />
                        </Link>
                        <Link
                          href="/why-access/success-story"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Heart className="h-5 w-5 mr-2 text-blue-300" />
                              <p className="font-medium">Why Access Retail?</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-blue-400/70" />
                        </Link>
                        <Link
                          href="/why-access/life-in-access"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Zap className="h-5 w-5 mr-2 text-blue-300" />
                              <p className="font-medium">Life @ Access Retail</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-blue-400/70" />
                        </Link>
                        <Link
                          href="/why-access/career"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Briefcase className="h-5 w-5 mr-2 text-blue-300" />
                              <p className="font-medium">Careers</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-blue-400/70" />
                        </Link>
                      </div>
                    </div>

                    {/* Add a new section for Popular Pages */}
                    <div className="space-y-2 mt-6">
                      <h3 className="text-blue-300 text-sm font-medium px-2">Popular Pages</h3>
                      <div className="bg-blue-900/20 rounded-xl overflow-hidden">
                        {keyOfferings.map((offering) => (
                          <Link
                            key={offering.id}
                            href={offering.href}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800/40 transition-colors border-b border-blue-800/30 last:border-0"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{offering.title}</p>
                              <p className="text-xs text-blue-300/70 mt-0.5">
                                What We Offer/Our Services &gt; Key Offerings &gt; {offering.title}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-blue-400/70" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
                              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
