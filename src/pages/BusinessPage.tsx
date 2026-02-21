import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MakersSection from '@/components/MakersSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import PageTransition from '@/components/PageTransition';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const industries = [
  { name: 'Healthcare', desc: 'AI-powered diagnostics, patient management, and telehealth platforms.' },
  { name: 'Finance', desc: 'Secure fintech solutions, trading platforms, and blockchain systems.' },
  { name: 'E-Commerce', desc: 'Scalable storefronts, recommendation engines, and logistics tools.' },
  { name: 'Education', desc: 'EdTech platforms, LMS systems, and AI tutoring solutions.' },
  { name: 'Real Estate', desc: 'Property management, virtual tours, and smart building systems.' },
  { name: 'Logistics', desc: 'Fleet management, route optimization, and supply chain AI.' },
];

export default function BusinessPage() {
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
              Industries We Serve
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-7xl">
              Business <span className="text-gradient">Solutions</span>
            </h1>
            <p className="mx-auto mb-20 max-w-2xl text-lg text-muted-foreground">
              We deliver domain-specific technology solutions across industries, built on deep expertise and modern architecture.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(260_100%_65%/0.15)]"
              >
                <h3 className="mb-3 font-display text-2xl font-bold text-foreground">{ind.name}</h3>
                <p className="text-sm text-muted-foreground">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <MakersSection />
        <PortfolioSection />
        <WhyChooseSection />
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
