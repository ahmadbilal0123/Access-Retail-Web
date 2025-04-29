import Image from "next/image"
import Link from "next/link"
import { BarChart3, LineChart, PieChart, Users, ArrowRight } from "lucide-react"

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#001333]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Research background"
            width={1600}
            height={600}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001333]/80 to-[#001333]"></div>
        </div>

        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Research</h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            We've successfully established ourselves as a credible research solution provider. We offer research
            solutions that provide in-depth insights and deliver value to the business decision-making process.
          </p>
        </div>
      </div>

      {/* Research Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Our Research Approach</h2>
            <p className="text-gray-300 mb-4">
              At Access, we combine innovative methodologies with deep industry expertise to deliver research that
              drives business growth and competitive advantage. Our comprehensive approach ensures that you receive
              actionable insights that can be directly applied to your strategic initiatives.
            </p>
            <p className="text-gray-300 mb-6">
              Our team of experienced researchers employs both qualitative and quantitative methodologies to ensure
              comprehensive data collection and analysis across multiple markets and demographics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">70+</div>
                <div className="text-white text-sm">Districts Covered</div>
              </div>
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">15+</div>
                <div className="text-white text-sm">Years Experience</div>
              </div>
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">500+</div>
                <div className="text-white text-sm">Projects Completed</div>
              </div>
              <div className="bg-[#001f4d] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">98%</div>
                <div className="text-white text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Research Services"
              width={600}
              height={400}
              className="rounded-lg w-full object-cover mb-8"
            />

            <div className="bg-gradient-to-r from-[#001f4d] to-[#002a66] rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose Our Research</h3>
              <p className="text-gray-300 mb-4">
                Whether it's capturing the pulse of evolving markets or optimizing business strategies, our mission is
                to provide actionable insights that drive growth and competitive advantage.
              </p>
              <Link href="/contact" className="inline-flex items-center text-red-500 font-medium hover:text-red-400">
                Contact us to learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Research Methodologies */}
      <div className="bg-[#001a40] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Research Methodologies</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#001f4d] rounded-lg p-6 hover:bg-[#002a66] transition-colors duration-300">
              <div className="text-red-500 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Qualitative Research</h3>
              <p className="text-gray-300">
                In-depth exploration of attitudes, behaviors, and motivations through interviews, focus groups, and
                observational studies.
              </p>
            </div>

            <div className="bg-[#001f4d] rounded-lg p-6 hover:bg-[#002a66] transition-colors duration-300">
              <div className="text-red-500 mb-4">
                <BarChart3 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quantitative Research</h3>
              <p className="text-gray-300">
                Statistical analysis of numerical data to identify patterns, trends, and correlations through surveys
                and structured data collection.
              </p>
            </div>

            <div className="bg-[#001f4d] rounded-lg p-6 hover:bg-[#002a66] transition-colors duration-300">
              <div className="text-red-500 mb-4">
                <LineChart className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Longitudinal Studies</h3>
              <p className="text-gray-300">
                Tracking changes and trends over extended periods to identify evolving patterns and long-term impacts.
              </p>
            </div>

            <div className="bg-[#001f4d] rounded-lg p-6 hover:bg-[#002a66] transition-colors duration-300">
              <div className="text-red-500 mb-4">
                <PieChart className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Market Analysis</h3>
              <p className="text-gray-300">
                Comprehensive evaluation of market conditions, competitor landscapes, and growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Research Areas */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Research Areas</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#001f4d] rounded-lg overflow-hidden">
            <div className="h-48 relative">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Brand Health Tracking"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Brand Health Tracking</h3>
              <p className="text-gray-300 mb-4">
                Monitor and analyze your brand's performance and perception in the market over time.
              </p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Brand awareness measurement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Perception analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Competitive positioning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#001f4d] rounded-lg overflow-hidden">
            <div className="h-48 relative">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Sector Analysis"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Sector Analysis</h3>
              <p className="text-gray-300 mb-4">
                In-depth analysis of industry sectors to identify trends, opportunities, and competitive landscapes.
              </p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Industry trend analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Competitive intelligence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Market opportunity assessment</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#001f4d] rounded-lg overflow-hidden">
            <div className="h-48 relative">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Financial Sector"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Financial Sector</h3>
              <p className="text-gray-300 mb-4">
                Specialized research and analytics solutions for financial institutions and markets.
              </p>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Banking sector analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Investment trend research</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Financial consumer behavior</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#001f4d] to-[#002a66] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Business with Data-Driven Insights?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Contact our research team today to discuss how our research services can help you make informed decisions
            and gain a competitive edge in your industry.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-red-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}
