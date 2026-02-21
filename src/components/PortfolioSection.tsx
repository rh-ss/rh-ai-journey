import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const projects = [
  { title: 'AI Analytics Platform', category: 'Artificial Intelligence', image: portfolio1 },
  { title: 'E-Commerce Redesign', category: 'Web Development', image: portfolio2 },
  { title: 'Mobile Banking App', category: 'App Development', image: portfolio3 },
  { title: 'SaaS Dashboard', category: 'Software Engineering', image: portfolio4 },
  { title: 'Healthcare AI System', category: 'AI & Healthcare', image: portfolio5 },
  { title: 'Fintech Platform', category: 'Full Stack', image: portfolio6 },
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
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [150, -150]),
          background: 'radial-gradient(ellipse at 30% 60%, hsl(220 100% 60% / 0.05), transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(175 100% 50% / 0.04), transparent 50%)',
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
          <motion.div
            key={project.title}
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
