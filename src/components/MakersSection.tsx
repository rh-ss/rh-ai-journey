import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const audiences = [
  { title: 'Founders', desc: 'Turn your vision into a scalable product.' },
  { title: 'Developers', desc: 'Augment your team with deep expertise.' },
  { title: 'Designers', desc: 'Bring pixel-perfect designs to life.' },
];

export default function MakersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, hsl(260 100% 65% / 0.04), transparent 70%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <h2 className="mb-6 font-display text-6xl font-bold uppercase tracking-tight text-foreground md:text-8xl lg:text-9xl">
          Built for{' '}
          <span className="text-gradient">Makers</span>
        </h2>
        <p className="mx-auto mb-20 max-w-2xl text-lg text-muted-foreground">
          Whether you're building the next unicorn or refining a digital product, we're your engineering partner.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group"
            >
              <h3 className="mb-3 font-display text-4xl font-bold text-foreground transition-colors group-hover:text-gradient md:text-5xl">
                {a.title}
              </h3>
              <p className="text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
