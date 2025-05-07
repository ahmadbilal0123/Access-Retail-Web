"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItemType } from "./navbar-items"

interface NavbarDropdownProps {
  items: NavItemType[]
}

export default function NavbarDropdown({ items }: NavbarDropdownProps) {
  return (
    <motion.div
      className="absolute top-full left-0 mt-1 bg-blue-950/95 backdrop-blur-md border border-blue-800/50 rounded-lg shadow-xl overflow-hidden z-50"
      initial={{ opacity: 0, y: 10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 10, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="py-2 min-w-[220px] max-w-[90vw] sm:max-w-[300px]">
        {items.map((item, index) => (
          <div key={item.id} className="relative">
            {item.featured && (
              <span className="absolute right-3 top-2 text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white">
                New
              </span>
            )}
            {item.comingSoon ? (
              <div className="flex items-center px-4 py-2 text-sm text-blue-300/70 cursor-not-allowed">
                <span className="mr-2">{item.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-800/50 text-blue-300">Coming Soon</span>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 sm:px-4 py-2.5 text-sm text-blue-100 hover:bg-blue-800/30 hover:text-white transition-colors group",
                  item.featured && "text-red-300 hover:text-red-200",
                )}
              >
                <span>{item.title}</span>
                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
