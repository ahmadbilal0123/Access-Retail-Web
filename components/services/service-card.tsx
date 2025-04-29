import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  link: string
  icon: React.ReactNode
}

export default function ServiceCard({ title, description, link, icon }: ServiceCardProps) {
  return (
    <Link href={link}>
      <div className="bg-[#001f4d] hover:bg-[#002a66] transition-colors duration-300 rounded-lg p-6 h-full flex flex-col">
        <div className="text-red-500 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        <div className="flex items-center text-red-500 font-medium">
          Learn more <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}
