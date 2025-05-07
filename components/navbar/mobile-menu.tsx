"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NavItemType } from "./navbar-items"

interface MobileMenuProps {
  navItems: NavItemType[]
  closeMenu: () => void
}

export default function MobileMenu({ navItems, closeMenu }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const renderMenuItems = (items: NavItemType[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className={cn(level > 0 && "pl-4")}>
        {item.children ? (
          <div>
            <button
              onClick={() => toggleExpand(item.id)}
              className={cn(
                "flex items-center justify-between w-full text-white hover:text-red-500 py-3 px-4 font-medium transition-all duration-300 hover:pl-6 rounded-md hover:bg-blue-800/10 group",
                level === 0 ? "text-lg border-b border-blue-800/30" : "text-base",
                level > 0 && "border-l border-blue-800/30 ml-2",
              )}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  expandedItems.includes(item.id) ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {expandedItems.includes(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-blue-900/20 rounded-md mt-1 mb-2"
                >
                  {renderMenuItems(item.children, level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : item.comingSoon ? (
          <div
            className={cn(
              "flex items-center justify-between py-2 px-4 text-blue-300/70 cursor-not-allowed",
              level === 0 ? "text-lg border-b border-blue-800/30" : "text-base",
              level > 0 && "border-l border-blue-800/30 ml-2",
            )}
          >
            <span>{item.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-800/50 text-blue-300">Coming Soon</span>
          </div>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center justify-between hover:text-red-500 py-3 px-4 transition-all duration-300 hover:pl-6 rounded-md hover:bg-blue-800/10 group",
              level === 0 ? "text-lg border-b border-blue-800/30 text-white" : "text-base text-blue-100",
              level > 0 && "border-l border-blue-800/30 ml-2",
              item.featured && (level > 0 ? "text-red-300" : ""),
            )}
            onClick={closeMenu}
          >
            <span>{item.title}</span>
            {item.featured ? (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white">New</span>
            ) : (
              <ChevronRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            )}
          </Link>
        )}
      </div>
    ))
  }

  return (
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
      <div className="px-3 sm:px-6 py-4 sm:py-6 flex-1 overflow-y-auto">
        <div className="space-y-4 sm:space-y-6">{renderMenuItems(navItems)}</div>
      </div>

      {/* Contact button in mobile menu */}
      <div className="p-4 sm:p-6 border-t border-blue-800/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full py-4 sm:py-6 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300"
            onClick={closeMenu}
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
