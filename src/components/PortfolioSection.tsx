import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingOrbs from './FloatingOrbs';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

export const projects = [
  {
    slug: 'ai-analytics-platform',
    title: 'AI Analytics Platform',
    category: 'Artificial Intelligence',
    image: portfolio1,
    client: 'DataVision Corp',
    year: '2024',
    description: 'A comprehensive AI-powered analytics platform that transforms raw data into actionable business intelligence using machine learning models and real-time dashboards.',
    challenge: 'DataVision needed to process millions of data points daily and deliver predictive insights to C-suite executives in real-time, replacing outdated BI tools.',
    solution: 'We built a scalable platform using custom ML pipelines, real-time streaming with Apache Kafka, and an intuitive React dashboard with interactive D3.js visualizations.',
    results: ['85% faster insight delivery', '3x increase in data accuracy', '$2.4M annual savings', '40% reduction in decision time'],
    tech: ['Python', 'TensorFlow', 'React', 'Apache Kafka', 'PostgreSQL', 'D3.js', 'AWS'],
  },
  {
    slug: 'ecommerce-redesign',
    title: 'E-Commerce Redesign',
    category: 'Web Development',
    image: portfolio2,
    client: 'LuxeShop International',
    year: '2024',
    description: 'A complete redesign and rebuild of a luxury e-commerce platform with AI-driven recommendations, seamless checkout, and immersive product experiences.',
    challenge: 'The existing platform had a 72% cart abandonment rate and mobile conversion was critically low at 0.8%.',
    solution: 'We redesigned the entire user journey with a mobile-first approach, implemented AI product recommendations, and built a one-tap checkout flow.',
    results: ['156% increase in conversions', '45% lower cart abandonment', '3.2x mobile revenue', '98/100 Lighthouse score'],
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Algolia', 'Sanity CMS', 'Tailwind CSS', 'Vercel'],
  },
  {
    slug: 'mobile-banking-app',
    title: 'Mobile Banking App',
    category: 'App Development',
    image: portfolio3,
    client: 'NeoBank Finance',
    year: '2024',
    description: 'A next-generation mobile banking application with biometric auth, AI fraud detection, instant transfers, and a gamified savings experience.',
    challenge: 'NeoBank needed a secure, feature-rich mobile app that could compete with established fintech players while meeting strict regulatory requirements.',
    solution: 'We developed a cross-platform app with React Native, integrated biometric security, built real-time fraud detection with ML, and designed an engaging savings gamification system.',
    results: ['500K+ downloads in 3 months', '99.99% uptime', '4.8★ App Store rating', '60% increase in savings deposits'],
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'TensorFlow Lite', 'Plaid API', 'AWS'],
  },
  {
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard',
    category: 'Software Engineering',
    image: portfolio4,
    client: 'CloudMetrics Inc',
    year: '2023',
    description: 'An enterprise SaaS dashboard for infrastructure monitoring with real-time alerts, custom reporting, and team collaboration features.',
    challenge: 'CloudMetrics was using fragmented tools for monitoring, costing engineering teams hours of context-switching daily.',
    solution: 'We built a unified monitoring dashboard with WebSocket-powered real-time updates, customizable alert rules, and a collaborative incident response system.',
    results: ['70% reduction in MTTR', '90% less context-switching', '$1.8M operational savings', '12K+ active enterprise users'],
    tech: ['React', 'Go', 'WebSocket', 'InfluxDB', 'Grafana', 'Kubernetes', 'GCP'],
  },
  {
    slug: 'healthcare-ai-system',
    title: 'Healthcare AI System',
    category: 'AI & Healthcare',
    image: portfolio5,
    client: 'MedAI Solutions',
    year: '2024',
    description: 'An AI diagnostic assistant that helps radiologists detect anomalies in medical imaging with 97% accuracy, significantly reducing diagnosis time.',
    challenge: 'Radiologists were overwhelmed with increasing scan volumes, leading to burnout and delayed diagnoses for critical patients.',
    solution: 'We developed a deep learning model trained on 2M+ medical images, integrated into existing PACS workflows, with an intuitive interface highlighting areas of concern.',
    results: ['97.3% detection accuracy', '65% faster diagnoses', '40% reduction in false negatives', 'FDA 510(k) cleared'],
    tech: ['PyTorch', 'DICOM', 'FastAPI', 'React', 'NVIDIA Clara', 'Docker', 'Azure'],
  },
  {
    slug: 'fintech-platform',
    title: 'Fintech Platform',
    category: 'Full Stack',
    image: portfolio6,
    client: 'TradePro Global',
    year: '2023',
    description: 'A high-frequency trading platform with sub-millisecond execution, advanced charting, social trading features, and comprehensive risk management.',
    challenge: 'TradePro needed to process 100K+ trades per second while maintaining sub-millisecond latency and regulatory compliance across 15 markets.',
    solution: 'We architected a low-latency system using Rust for the matching engine, with a React frontend featuring real-time WebGL charts and a social trading network.',
    results: ['0.3ms average latency', '100K+ trades/second', '$50B+ monthly volume', '15 global markets'],
    tech: ['Rust', 'React', 'WebGL', 'Redis', 'PostgreSQL', 'FIX Protocol', 'AWS'],
  },
];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <FloatingOrbs variant="blue" intensity={1.3} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [250, -250]),
          background: 'radial-gradient(ellipse at 30% 60%, hsl(220 100% 60% / 0.07), transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(175 100% 50% / 0.06), transparent 50%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Selected Work
        </p>
        <h2 className="mb-20 text-center font-display text-5xl font-bold text-foreground md:text-7xl">
          Our <span className="text-gradient">Portfolio</span>
        </h2>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Link to={`/portfolio/${project.slug}`} key={project.title}>
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_hsl(260_100%_65%/0.25)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                <span className="absolute right-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View Case Study →
                </span>
              </div>
              <div className="p-6">
                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {project.category}
                </p>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
