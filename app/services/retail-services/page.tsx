import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function RetailServicesPage() {
  return (
    <main className="min-h-screen bg-[#001333]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link href="/services" className="inline-flex items-center text-gray-300 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Retail Services</h1>
        <p className="text-lg text-gray-300 max-w-3xl">
          Specialized solutions for retail businesses to optimize operations and increase customer satisfaction.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Redefining Retail Excellence</h2>
            <p className="text-gray-300 mb-4">
              Our retail services are designed to help businesses optimize their operations, enhance customer
              experience, and drive growth in an increasingly competitive market.
            </p>
            <p className="text-gray-300 mb-6">
              With comprehensive solutions across 70+ districts in Pakistan & Afghanistan, we provide actionable
              insights that enable retailers to make informed decisions.
            </p>

            <div className="bg-[#001f4d] rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Our Retail Solutions</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">In-Store Audits</h4>
                    <p className="text-gray-300 text-sm">
                      Comprehensive evaluations ensuring brand compliance and visibility
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Merchandising</h4>
                    <p className="text-gray-300 text-sm">Strategic product placement and display optimization</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Market Insights</h4>
                    <p className="text-gray-300 text-sm">
                      Data-driven analytics to understand consumer behavior and trends
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Growth Strategy</h4>
                    <p className="text-gray-300 text-sm">Tailored approaches to maximize market presence and sales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Retail Services"
              width={600}
              height={300}
              className="rounded-lg w-full object-cover"
            />

            <div className="bg-gradient-to-r from-[#001f4d] to-[#002a66] rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose Our Retail Services</h3>
              <p className="text-gray-300 mb-4">
                Whether it's capturing the pulse of evolving markets or optimizing store layouts, our mission is to
                redefine what's possible in retail—always adapting to changing consumer behaviors and modern trade
                dynamics.
              </p>
              <p className="text-gray-300">
                Our dedicated team ensures optimal brand compliance and delivers consumer insights that drive growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">70+</div>
                <div className="text-white text-sm">Districts Covered</div>
              </div>
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
                <div className="text-white text-sm">Data Accuracy</div>
              </div>
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
                <div className="text-white text-sm">Support</div>
              </div>
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">15+</div>
                <div className="text-white text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
