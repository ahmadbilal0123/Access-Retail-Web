"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItemType } from "./navbar-items"
import { useState } from "react"

interface MegaMenuProps {
  items: NavItemType[]
  parentId: string
}

export default function MegaMenu({ items, parentId }: MegaMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const handleMouseEnter = (id: string) => {
    setActiveSubmenu(id)
  }

  const handleMouseLeave = () => {
    setActiveSubmenu(null)
  }

  return (
    <motion.div
      className="absolute top-full left-0 mt-1 bg-blue-950/95 backdrop-blur-md border border-blue-800/50 rounded-lg shadow-xl overflow-hidden z-50"
      initial={{ opacity: 0, y: 10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 10, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2 min-w-[250px] sm:min-w-[280px] md:min-w-[560px]">
        <div className="col-span-1 md:col-span-2 px-4 py-2 border-b border-blue-800/30">
          <h3 className="text-sm font-medium text-blue-300">{parentId.charAt(0).toUpperCase() + parentId.slice(1)}</h3>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="relative px-2"
            onMouseEnter={() => item.children && handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            {item.children ? (
              <div className="relative">
                <button
                  className={cn(
                    "flex items-center justify-between w-full px-3 sm:px-4 py-2.5 text-sm text-blue-100 hover:bg-blue-800/30 hover:text-white transition-colors rounded-md group",
                    item.featured && "text-red-300 hover:text-red-200",
                    activeSubmenu === item.id && "bg-blue-800/30 text-white",
                  )}
                >
                  <span>{item.title}</span>
                  <ChevronRight className="h-4 w-4 opacity-70" />

                  {item.featured && (
                    <span className="absolute right-10 top-2 text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white">
                      New
                    </span>
                  )}
                </button>

                {activeSubmenu === item.id && (
                  <div className="absolute left-full top-0 ml-1 bg-blue-950/95 backdrop-blur-md border border-blue-800/50 rounded-lg shadow-xl overflow-hidden min-w-[200px]">
                    <div className="py-2">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          className={cn(
                            "flex items-center justify-between px-4 py-2 text-sm text-blue-100 hover:bg-blue-800/30 hover:text-white transition-colors block",
                            subItem.featured && "text-red-300 hover:text-red-200",
                          )}
                        >
                          <span>{subItem.title}</span>
                          {subItem.featured && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white ml-2">
                              New
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : item.comingSoon ? (
              <div className="flex items-center px-4 py-2 text-sm text-blue-300/70 cursor-not-allowed rounded-md">
                <span className="mr-2">{item.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-800/50 text-blue-300">Coming Soon</span>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-2 text-sm text-blue-100 hover:bg-blue-800/30 hover:text-white transition-colors rounded-md group",
                  item.featured && "text-red-300 hover:text-red-200",
                )}
              >
                <span>{item.title}</span>
                {item.featured ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/80 text-white">New</span>
                ) : (
                  <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                )}
              </Link>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
