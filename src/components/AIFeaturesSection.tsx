import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import MiniScene3D from './MiniScene3D';
import FloatingOrbs from './FloatingOrbs';

// Animated counter hook
function useCounter(end: number, duration: number, start: boolean, suffix = '', prefix = '') {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration]);
  return `${prefix}${value}${suffix}`;
}

function AnimatedStat({ value, suffix, prefix = '', started }: { value: number; suffix: string; prefix?: string; started: boolean }) {
  const display = useCounter(value, 2, started, suffix, prefix);
  return <span className="font-display text-4xl font-bold text-gradient md:text-5xl">{display}</span>;
}

const heroStats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: '+', label: 'AI Models Deployed' },
  { value: 12, suffix: 'M+', label: 'Users Impacted' },
];

const aiFeatures = [
  {
    title: 'AI Chatbots & Assistants',
    desc: 'Custom conversational AI that understands your business context, handles customer queries 24/7, and learns from every interaction.',
    icon: '🤖',
    statValue: 95,
    statSuffix: '%',
    statLabel: 'Resolution Rate',
    scene: 'torusKnot' as const,
  },
  {
    title: 'Predictive Analytics',
    desc: 'Forecast trends, customer behavior, and market shifts with ML models trained on your proprietary data.',
    icon: '📊',
    statValue: 3,
    statSuffix: 'x',
    statLabel: 'Faster Decisions',
    scene: 'dodeca' as const,
  },
  {
    title: 'Computer Vision',
    desc: 'Image recognition, object detection, and visual inspection systems for manufacturing, healthcare, and retail.',
    icon: '👁️',
    statValue: 97,
    statSuffix: '%',
    statLabel: 'Accuracy',
    scene: 'ico' as const,
  },
  {
    title: 'NLP & Text Intelligence',
    desc: 'Sentiment analysis, document processing, content generation, and multilingual understanding at scale.',
    icon: '🧠',
    statValue: 50,
    statSuffix: '+',
    statLabel: 'Languages',
    scene: 'grid' as const,
  },
  {
    title: 'AI-Powered Automation',
    desc: 'End-to-end workflow automation that eliminates repetitive tasks, reduces errors, and frees your team for high-value work.',
    icon: '⚡',
    statValue: 80,
    statSuffix: '%',
    statLabel: 'Time Saved',
    scene: 'torusKnot' as const,
  },
  {
    title: 'Recommendation Engines',
    desc: 'Personalized product, content, and service recommendations that increase engagement and revenue.',
    icon: '🎯',
    statValue: 35,
    statSuffix: '%',
    statLabel: 'More Conversions',
    scene: 'dodeca' as const,
  },
];

export default function AIFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <FloatingOrbs variant="mixed" intensity={1.5} />
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [300, -300]),
          background: 'radial-gradient(ellipse at 30% 40%, hsl(260 100% 65% / 0.1), transparent 60%), radial-gradient(ellipse at 70% 60%, hsl(175 100% 50% / 0.08), transparent 50%)',
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            AI-Powered Solutions
          </p>
          <h2 className="mb-6 font-display text-5xl font-bold text-foreground md:text-7xl">
            Supercharge with <span className="text-gradient">AI</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            We don't just build software — we infuse it with intelligence. Our AI solutions
            learn, adapt, and deliver measurable business impact from day one.
          </p>
        </motion.div>

        {/* Animated Stats Counter Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-5xl"
        >
          <div className="glass-card glow-border grid grid-cols-2 gap-6 p-8 md:grid-cols-4 md:gap-8 md:p-10">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <AnimatedStat value={stat.value} suffix={stat.suffix} started={statsInView} />
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl"
        >
          <div className="glass-card glow-border flex flex-col items-center gap-6 p-8 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl">
              🚀
            </div>
            <div>
              <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                AI Integration in Every Product We Build
              </h3>
              <p className="text-muted-foreground">
                Whether it's a website, mobile app, or enterprise platform — we integrate AI capabilities
                that give your product an unfair competitive advantage.
              </p>
            </div>
            <Link to="/contact" className="btn-glow shrink-0 text-sm text-primary-foreground">
              Get AI Quote
            </Link>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card group relative overflow-hidden p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_hsl(260_100%_65%/0.2)]"
            >
              {/* Mini 3D background */}
              <div className="absolute -right-4 -top-4 h-28 w-28 opacity-10 transition-opacity duration-500 group-hover:opacity-25">
                <MiniScene3D variant={feature.scene} className="h-full w-full" />
              </div>

              <div className="relative z-10">
                <span className="mb-4 block text-4xl">{feature.icon}</span>
                <h3 className="mb-2 font-display text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-gradient">
                    <AnimatedStat value={feature.statValue} suffix={feature.statSuffix} started={isInView} />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{feature.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link to="/services" className="btn-outline-glow inline-block">
            Explore All AI Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
