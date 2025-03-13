import { ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function OurVision() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
              Our Vision: Empowering Humans Through AI
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              At Carfagno Enterprises, we believe in AI that amplifies human skill&mdash;never replacing it.
            </p>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Empowering, Not Replacing */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Empowering, Not Replacing
              </h2>
              <p className="text-lg text-gray-300">
                Like a hammer that extends a carpenter&apos;s capabilities, our tools amplify human judgment rather than replace it. Zom AI exemplifies this philosophy by rapidly gathering and organizing financial data, allowing you to focus on strategic decision-making.
              </p>
            </div>

            {/* Innovation with Responsibility */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Innovation with Responsibility
              </h2>
              <p className="text-lg text-gray-300">
                We&apos;re committed to using AI ethically, providing transparent insights rather than black-box decisions. Our technology serves as a tool for learning and analysis, empowering you to make informed decisions with confidence.
              </p>
            </div>

            {/* Education & Accessibility */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Focus on Education and Accessibility
              </h2>
              <p className="text-lg text-gray-300">
                Our mission is to democratize financial information and reduce barriers for investors of all levels. We use plain English explanations and intuitive interfaces to make complex financial data accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zom AI Spotlight */}
      <section className="py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-8">
              Spotlight on Zom AI
            </h2>
            <div className="space-y-8">
              <div className="bg-black/40 border border-teal-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-teal-400">The Power of Integration</h3>
                <p className="text-gray-300">
                  Zom AI exemplifies our approach by seamlessly consolidating data from premium providers like Unusual Whales, Alpha Vantage, and FinancialDatasets.ai. What used to take hours of manual research can now be accomplished in minutes.
                </p>
              </div>
              
              <div className="bg-black/40 border border-teal-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-teal-400">Augmentation in Action</h3>
                <p className="text-gray-300">
                  When comparing stocks, Zom pulls fundamentals, options flow, and insider trades in minutes&mdash;but you remain the decision maker. The tool presents key metrics clearly, allowing you to focus on strategy rather than data gathering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Looking Ahead
            </h2>
            <p className="text-lg text-gray-300">
              Our commitment to human-centric AI continues to drive innovation. Future developments will expand our neural networks and global market coverage&mdash;always with humans in control, making the final decisions.
            </p>
            <p className="text-lg text-gray-300">
              We&apos;re forging a future where finance is more transparent, accessible, and empowering for all investors.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              Ready to Experience the Future of Investing?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/zom-ai')}
                className="group bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-6 text-lg hover:scale-[1.02] transition-all duration-300"
              >
                Explore Zom AI
                <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => navigate('/projects')}
                variant="outline"
                className="group border-teal-500/20 text-teal-400 hover:text-teal-300 px-8 py-6 text-lg hover:scale-[1.02] transition-all duration-300"
              >
                View All Projects
                <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
