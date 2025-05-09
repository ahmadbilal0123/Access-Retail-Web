import { HandshakeIcon, LineChartIcon, BarChart3Icon } from "lucide-react"

export default function MissionSection() {
  return (
    <section className="bg-[#001333] py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Heading with underline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Our Mission</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Main content area */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Target icon card */}
          <div className="bg-[#2a1e4a] rounded-lg p-8 flex items-center justify-center">
            <div className="relative w-40 h-40 ml-6">
              <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-30"></div>
              <div className="absolute inset-[15%] rounded-full border-4 border-red-500 opacity-60"></div>
              <div className="absolute inset-[30%] rounded-full border-4 border-red-500 opacity-80"></div>
              <div className="absolute inset-[45%] rounded-full bg-red-500"></div>
            </div>
          </div>

          {/* Quote card */}
          <div className="bg-[#3d1a2d] rounded-lg p-8 flex items-center">
            <div className="relative">
              <div className="text-red-500 text-6xl font-serif absolute -top-8 -left-2">"</div>
              <p className="text-white text-xl md:text-2xl italic pl-6 pr-2">
                Build partnership with our clients by providing enhanced value to their marketing decision making.
              </p>
              <div className="text-red-500 text-6xl font-serif absolute -bottom-16 right-0">"</div>
            </div>
          </div>
        </div>

        {/* Three value cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Partnership card */}
          <div className="bg-[#2a1e4a] rounded-lg p-8 flex flex-col items-center text-center">
            <div className="bg-transparent mb-4">
              <HandshakeIcon className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">Partnership</h3>
            <p className="text-blue-200">Building lasting relationships with our clients</p>
          </div>

          {/* Growth card */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-transparent mb-4">
              <LineChartIcon className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">Growth</h3>
            <p className="text-blue-200">Enabling client success through actionable insights</p>
          </div>

          {/* Value card */}
          <div className="bg-[#2a1e4a] rounded-lg p-8 flex flex-col items-center text-center">
            <div className="bg-transparent mb-4">
              <BarChart3Icon className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">Value</h3>
            <p className="text-blue-200">Enhancing marketing decisions with quality data</p>
          </div>
        </div>
      </div>
      
    </section>
  )
}
