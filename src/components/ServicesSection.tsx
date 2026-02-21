import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const services = [
  {
    title: 'AI Development',
    description: 'We build intelligent systems powered by machine learning, natural language processing, and computer vision that automate and augment your business.',
    features: ['Machine Learning Models', 'NLP & Computer Vision', 'Predictive Analytics', 'AI Integration'],
    gradient: 'from-glow-purple to-glow-blue',
    glowColor: 'hsl(260 100% 65% / 0.3)',
  },
  {
    title: 'App Design',
    description: 'Beautiful, performant mobile and web applications designed with obsessive attention to user experience and modern aesthetics.',
    features: ['iOS & Android', 'Cross-Platform', 'UI/UX Design', 'Prototyping'],
    gradient: 'from-glow-blue to-glow-cyan',
    glowColor: 'hsl(220 100% 60% / 0.3)',
  },
  {
    title: 'Software Engineering',
    description: 'Scalable, maintainable software systems engineered for performance, security, and long-term growth.',
    features: ['Cloud Architecture', 'API Development', 'DevOps & CI/CD', 'System Design'],
    gradient: 'from-glow-cyan to-glow-purple',
    glowColor: 'hsl(175 100% 50% / 0.3)',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="glass-card glow-border group p-8 md:p-10 transition-all duration-500 hover:-translate-y-2"
      style={{
        boxShadow: `0 0 40px ${service.glowColor}`,
      }}
    >
      <div className={`mb-6 h-1 w-16 rounded-full bg-gradient-to-r ${service.gradient}`} />
      <h3 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
        {service.title}
      </h3>
      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
            {feature}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="section-padding relative">
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
        >
          What We Build
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center font-display text-5xl font-bold text-foreground md:text-7xl"
        >
          Our <span className="text-gradient">Services</span>
        </motion.h2>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
