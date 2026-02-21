import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import PageTransition from '@/components/PageTransition';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const plans = [
  {
    name: 'Starter',
    price: 'Custom',
    desc: 'Perfect for startups and MVPs',
    features: ['Single platform app', 'Basic AI integration', 'UI/UX design', '3 months support', 'Source code delivery'],
    gradient: 'from-glow-purple to-glow-blue',
    popular: false,
  },
  {
    name: 'Growth',
    price: 'Custom',
    desc: 'For scaling businesses',
    features: ['Multi-platform apps', 'Advanced AI models', 'Full-stack engineering', '6 months support', 'Priority updates', 'Analytics dashboard'],
    gradient: 'from-glow-blue to-glow-cyan',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large-scale operations',
    features: ['Unlimited platforms', 'Custom AI solutions', 'Dedicated team', '12 months support', '24/7 monitoring', 'SLA guarantee', 'On-site consultation'],
    gradient: 'from-glow-cyan to-glow-purple',
    popular: false,
  },
];

export default function PricingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <section ref={ref} className="section-padding relative overflow-hidden pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Pricing
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-7xl">
              Invest in <span className="text-gradient">Growth</span>
            </h1>
            <p className="mx-auto mb-20 max-w-2xl text-lg text-muted-foreground">
              Every project is unique. We offer custom pricing tailored to your scope, complexity, and timeline.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`glass-card group relative overflow-hidden p-8 transition-all duration-500 hover:-translate-y-3 ${
                  plan.popular ? 'glow-border' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className={`mb-6 h-1 w-16 rounded-full bg-gradient-to-r ${plan.gradient}`} />
                <h3 className="mb-2 font-display text-3xl font-bold text-foreground">{plan.name}</h3>
                <p className="mb-2 font-display text-4xl font-bold text-gradient">{plan.price}</p>
                <p className="mb-8 text-muted-foreground">{plan.desc}</p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${plan.gradient}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={`block w-full rounded-full py-3 text-center font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'btn-glow text-primary-foreground'
                    : 'btn-outline-glow'
                }`}>
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </section>
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
