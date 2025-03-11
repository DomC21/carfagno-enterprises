
import { Card } from '@/components/ui/card'
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard'
import { PhoneForm } from '@/components/subscription/PhoneForm'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export default function FollowDom() {
  return (
    <div className="container mx-auto py-section-sm sm:py-section px-4">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Mirror Dom's Portfolio in Real-Time
          </h1>
          <p className="text-gray-300 text-xl sm:text-2xl max-w-3xl mx-auto">
            Get SMS alerts for every trade, complete with risk scores
          </p>
        </div>
      </ScrollReveal>
      
      {/* Subscription Tiers */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <ScrollReveal delay={0.1}>
          <SubscriptionCard
            title="Equities Only"
            price="14.99"
            features={[
              'Real-time stock trade alerts',
              'Risk score (0-10) for each trade',
              'SMS notifications',
              'Educational insights'
            ]}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <SubscriptionCard
            title="Equities + Options"
            price="20.99"
            features={[
              'Everything in Equities Only',
              'Options trade alerts',
              'Advanced risk assessment',
              'Priority notifications'
            ]}
          />
        </ScrollReveal>
      </div>

      {/* Phone Registration */}
      <ScrollReveal delay={0.3}>
        <Card className="bg-black border-border p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-primary mb-4">Enter Your Phone Number</h2>
          <PhoneForm />
        </Card>
      </ScrollReveal>

      {/* Example Alert */}
      <ScrollReveal delay={0.4}>
        <Card className="bg-black border-border p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-primary mb-4">Example Alert</h2>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            Dom just BOUGHT 100 shares of AAPL at $150.00
            Risk Score: 3/10
          </div>
        </Card>
      </ScrollReveal>

      {/* Disclaimer */}
      <ScrollReveal delay={0.5}>
        <Card className="bg-red-500/10 p-6 mb-8 max-w-2xl mx-auto">
          <p className="text-gray-300 text-center">
            This is educational content, not professional financial advice.
            Past performance does not guarantee future results. Investing involves risk.
            By subscribing, you acknowledge that you are responsible for your own investment decisions.
          </p>
        </Card>
      </ScrollReveal>
    </div>
  )
}
