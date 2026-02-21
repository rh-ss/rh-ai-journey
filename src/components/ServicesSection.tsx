import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import serviceAi from '@/assets/service-ai.jpg';
import serviceApp from '@/assets/service-app.jpg';
import serviceSoftware from '@/assets/service-software.jpg';

const services = [
  {
    title: 'AI Development',
    description: 'We build intelligent systems powered by machine learning, natural language processing, and computer vision that automate and augment your business.',
    features: ['Machine Learning Models', 'NLP & Computer Vision', 'Predictive Analytics', 'AI Integration'],
    gradient: 'from-glow-purple to-glow-blue',
    glowColor: 'hsl(260 100% 65% / 0.3)',
    image: serviceAi,
  },
  {
    title: 'App Design',
    description: 'Beautiful, performant mobile and web applications designed with obsessive attention to user experience and modern aesthetics.',
    features: ['iOS & Android', 'Cross-Platform', 'UI/UX Design', 'Prototyping'],
    gradient: 'from-glow-blue to-glow-cyan',
    glowColor: 'hsl(220 100% 60% / 0.3)',
    image: serviceApp,
  },
  {
    title: 'Software Engineering',
    description: 'Scalable, maintainable software systems engineered for performance, security, and long-term growth.',
    features: ['Cloud Architecture', 'API Development', 'DevOps & CI/CD', 'System Design'],
    gradient: 'from-glow-cyan to-glow-purple',
    glowColor: 'hsl(175 100% 50% / 0.3)',
    image: serviceSoftware,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card glow-border group overflow-hidden transition-all duration-500 hover:-translate-y-3"
      style={{ boxShadow: `0 0 60px ${service.glowColor}` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>

      <div className="p-8 md:p-10">
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

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [200, -200]),
          background: 'radial-gradient(ellipse at 50% 40%, hsl(260 100% 65% / 0.06), transparent 70%)',
        }}
      />

      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [60, -60]) }}>
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
