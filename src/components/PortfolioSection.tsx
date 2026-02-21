import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  { title: 'AI Analytics Platform', category: 'Artificial Intelligence', color: 'hsl(260 100% 65% / 0.15)' },
  { title: 'E-Commerce Redesign', category: 'Web Development', color: 'hsl(220 100% 60% / 0.15)' },
  { title: 'Mobile Banking App', category: 'App Development', color: 'hsl(175 100% 50% / 0.15)' },
  { title: 'SaaS Dashboard', category: 'Software Engineering', color: 'hsl(260 100% 65% / 0.12)' },
  { title: 'Healthcare AI System', category: 'AI & Healthcare', color: 'hsl(220 100% 60% / 0.12)' },
  { title: 'Fintech Platform', category: 'Full Stack', color: 'hsl(175 100% 50% / 0.12)' },
];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding relative">
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
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-card group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(260_100%_65%/0.2)]"
          >
            <div
              className="flex h-48 items-center justify-center transition-transform duration-700 group-hover:scale-110"
              style={{ background: project.color }}
            >
              <span className="font-display text-2xl font-bold text-foreground/30">
                {project.category}
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
        ))}
      </div>
    </section>
  );
}
