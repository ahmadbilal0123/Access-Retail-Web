import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle, BarChart3, PieChart, Users, LineChart, ClipboardList } from "lucide-react"

export default function ResearchServicesPage() {
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
          <Link href="/services" className="inline-flex items-center text-gray-300 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Research Services</h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            We've successfully established ourselves as a credible research solution provider. We offer research
            solutions that provide in-depth insights and deliver value to the business decision-making process.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Our Research Approach</h2>
            <p className="text-gray-300 mb-4">
              At Access, we combine innovative methodologies with deep industry expertise to deliver research that
              drives business growth and competitive advantage. Our comprehensive approach ensures that you receive
              actionable insights that can be directly applied to your strategic initiatives.
            </p>
            <p className="text-gray-300 mb-4">
              Our team of experienced researchers employs both qualitative and quantitative methodologies to ensure
              comprehensive data collection and analysis across multiple markets and demographics.
            </p>
            <p className="text-gray-300 mb-6">
              We tailor our research approach to meet your specific business objectives, ensuring that the insights
              generated are relevant, timely, and actionable for your organization.
            </p>

            <div className="bg-[#001f4d] rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Data-driven decision making</h4>
                    <p className="text-gray-300 text-sm">
                      Transform raw data into strategic insights that guide your business decisions
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Comprehensive market understanding</h4>
                    <p className="text-gray-300 text-sm">
                      Gain deep insights into market dynamics, customer preferences, and competitive landscapes
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Competitive advantage</h4>
                    <p className="text-gray-300 text-sm">
                      Stay ahead of industry trends and competitor strategies with actionable intelligence
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Risk mitigation</h4>
                    <p className="text-gray-300 text-sm">
                      Identify potential challenges and opportunities before they impact your business
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Research Services"
              width={600}
              height={400}
              className="rounded-lg w-full object-cover"
            />

            <div className="bg-gradient-to-r from-[#001f4d] to-[#002a66] rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Our Research Expertise</h3>
              <p className="text-gray-300 mb-4">
                With over 15 years of experience in research across multiple industries, our team brings unparalleled
                expertise to every project. We've conducted research across 70+ districts in Pakistan & Afghanistan,
                giving us unique insights into regional markets and consumer behaviors.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">70+</div>
                  <div className="text-white text-sm">Districts Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">15+</div>
                  <div className="text-white text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">500+</div>
                  <div className="text-white text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">98%</div>
                  <div className="text-white text-sm">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-[#001a40] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Research Methodologies</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#001f4d] rounded-lg p-6 hover:bg-[#002a66] transition-colors duration-300">
              <div className="text-red-500 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Qualitative Research</h3>
              <p className="text-gray-300">
                In-depth exploration of attitudes, behaviors, and motivations through interviews, focus groups, and
                observational studies.
              </p>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>In-depth interviews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Focus group discussions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Ethnographic research</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Observational studies</span>
                </li>
              </ul>
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
              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Surveys and questionnaires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Statistical analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Data mining</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Experimental research</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#001f4d] rounded-lg p-6 hover:bg-[#002a66] transition-colors duration-300">
              <div className="text-red-500 mb-4">
                <LineChart className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Longitudinal Studies</h3>
              <p className="text-gray-300">
                Tracking changes and trends over extended periods to identify evolving patterns and long-term impacts.
              </p>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Panel studies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Trend analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Cohort studies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Time series analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Research Process Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Research Process</h2>

        <div className="relative">
          {/* Process Timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500/30 transform -translate-x-1/2"></div>

          <div className="space-y-12 relative">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="md:text-right md:pr-12">
                <div className="hidden md:block absolute right-0 top-0 w-4 h-4 rounded-full bg-red-500 transform translate-x-2"></div>
                <h3 className="text-xl font-bold text-white mb-3">1. Discovery & Planning</h3>
                <p className="text-gray-300">
                  We begin by understanding your business objectives, research needs, and desired outcomes. Our team
                  works closely with you to define the scope, methodology, and timeline for the research project.
                </p>
              </div>
              <div className="md:hidden h-4"></div>
              <div className="bg-[#001f4d] rounded-lg p-6 md:pl-12">
                <ClipboardList className="h-8 w-8 text-red-500 mb-3" />
                <h4 className="text-white font-medium mb-2">Key Deliverables:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Research brief</li>
                  <li>• Project timeline</li>
                  <li>• Methodology selection</li>
                  <li>• Sampling strategy</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="order-2 md:order-1 bg-[#001f4d] rounded-lg p-6 md:pr-12">
                <Users className="h-8 w-8 text-red-500 mb-3" />
                <h4 className="text-white font-medium mb-2">Key Deliverables:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Research instruments</li>
                  <li>• Field reports</li>
                  <li>• Raw data collection</li>
                  <li>• Quality assurance reports</li>
                </ul>
              </div>
              <div className="md:hidden h-4"></div>
              <div className="order-1 md:order-2 md:text-left md:pl-12">
                <div className="hidden md:block absolute left-0 top-0 w-4 h-4 rounded-full bg-red-500 transform -translate-x-2"></div>
                <h3 className="text-xl font-bold text-white mb-3">2. Data Collection</h3>
                <p className="text-gray-300">
                  Our field teams execute the research plan, collecting data through surveys, interviews, focus groups,
                  or other methodologies. We maintain rigorous quality control throughout the data collection process.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="md:text-right md:pr-12">
                <div className="hidden md:block absolute right-0 top-0 w-4 h-4 rounded-full bg-red-500 transform translate-x-2"></div>
                <h3 className="text-xl font-bold text-white mb-3">3. Analysis & Insights</h3>
                <p className="text-gray-300">
                  Our analysts process and analyze the collected data using advanced statistical methods and analytical
                  frameworks to extract meaningful insights and identify key patterns and trends.
                </p>
              </div>
              <div className="md:hidden h-4"></div>
              <div className="bg-[#001f4d] rounded-lg p-6 md:pl-12">
                <PieChart className="h-8 w-8 text-red-500 mb-3" />
                <h4 className="text-white font-medium mb-2">Key Deliverables:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Data analysis</li>
                  <li>• Statistical reports</li>
                  <li>• Key findings</li>
                  <li>• Trend identification</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="order-2 md:order-1 bg-[#001f4d] rounded-lg p-6 md:pr-12">
                <BarChart3 className="h-8 w-8 text-red-500 mb-3" />
                <h4 className="text-white font-medium mb-2">Key Deliverables:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Comprehensive report</li>
                  <li>• Executive summary</li>
                  <li>• Visual presentations</li>
                  <li>• Strategic recommendations</li>
                </ul>
              </div>
              <div className="md:hidden h-4"></div>
              <div className="order-1 md:order-2 md:text-left md:pl-12">
                <div className="hidden md:block absolute left-0 top-0 w-4 h-4 rounded-full bg-red-500 transform -translate-x-2"></div>
                <h3 className="text-xl font-bold text-white mb-3">4. Reporting & Recommendations</h3>
                <p className="text-gray-300">
                  We present our findings in a clear, actionable format with strategic recommendations tailored to your
                  business objectives. Our reports include visual data representations and executive summaries.
                </p>
              </div>
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
