import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    title: 'Innovation-Driven',
    desc: 'We leverage cutting-edge technology to build solutions that push boundaries.',
    icon: '◆',
  },
  {
    title: 'Scalable Architecture',
    desc: 'Systems designed to grow with your business from day one.',
    icon: '◇',
  },
  {
    title: 'Future-Ready AI',
    desc: 'AI-first approach ensuring your products stay ahead of the curve.',
    icon: '▲',
  },
  {
    title: 'Human-Centered Design',
    desc: 'Every pixel serves a purpose. Every interaction feels natural.',
    icon: '○',
  },
];

export default function WhyChooseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 70% 50%, hsl(220 100% 60% / 0.04), transparent 60%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          The Difference
        </p>
        <h2 className="mb-20 text-center font-display text-5xl font-bold text-foreground md:text-7xl">
          Why <span className="text-gradient">Choose Us</span>
        </h2>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(260_100%_65%/0.15)]"
          >
            <span className="mb-4 block text-3xl text-gradient">{f.icon}</span>
            <h3 className="mb-3 font-display text-2xl font-bold text-foreground">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
