import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#001333]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Services</h1>
        <p className="text-lg text-gray-300 max-w-3xl">
          We offer comprehensive research and analytics solutions that provide in-depth insights and deliver value to
          the business decision-making process.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Research Services */}
          <ServiceCard
            title="Research Services"
            description="Comprehensive research methodologies to gather actionable insights for your business needs."
            link="/services/research-services"
            icon={<ResearchIcon />}
          />

          {/* Retail Services */}
          <ServiceCard
            title="Retail Services"
            description="Specialized solutions for retail businesses to optimize operations and increase customer satisfaction."
            link="/services/retail-services"
            icon={<RetailIcon />}
          />

          {/* Brand Health Tracking */}
          <ServiceCard
            title="Brand Health Tracking"
            description="Monitor and analyze your brand's performance and perception in the market over time."
            link="/services/brand-health-tracking"
            icon={<BrandHealthIcon />}
          />

          {/* Sector Analysis */}
          <ServiceCard
            title="Sector Analysis"
            description="In-depth analysis of industry sectors to identify trends, opportunities, and competitive landscapes."
            link="/services/sector-analysis"
            icon={<SectorAnalysisIcon />}
          />

          {/* Segmentation */}
          <ServiceCard
            title="Segmentation"
            description="Customer segmentation strategies to target the right audience with the right message."
            link="/services/segmentation"
            icon={<SegmentationIcon />}
          />

          {/* Financial Sector */}
          <ServiceCard
            title="Financial Sector"
            description="Specialized research and analytics solutions for financial institutions and markets."
            link="/services/financial-sector"
            icon={<FinancialIcon />}
          />
        </div>
      </div>
    </main>
  )
}

// Service Card Component
function ServiceCard({ title, description, link, icon }) {
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

// Icons for services
function ResearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  )
}

function RetailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
      <path d="M12 3v6"></path>
    </svg>
  )
}

function BrandHealthIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
      <circle cx="20" cy="10" r="2"></circle>
    </svg>
  )
}

function SectorAnalysisIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M3 3v18h18"></path>
      <path d="m19 9-5 5-4-4-3 3"></path>
    </svg>
  )
}

function SegmentationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M16.5 9.4 7.55 4.24"></path>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.29 7 12 12 20.71 7"></polyline>
      <line x1="12" y1="22" x2="12" y2="12"></line>
    </svg>
  )
}

function FinancialIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
      <line x1="2" x2="22" y1="10" y2="10"></line>
    </svg>
  )
}
