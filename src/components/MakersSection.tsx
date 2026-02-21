import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import MiniScene3D from './MiniScene3D';
import FloatingOrbs from './FloatingOrbs';

const audiences = [
  { title: 'Founders', desc: 'Turn your vision into a scalable product.' },
  { title: 'Developers', desc: 'Augment your team with deep expertise.' },
  { title: 'Designers', desc: 'Bring pixel-perfect designs to life.' },
];

export default function MakersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <FloatingOrbs variant="mixed" intensity={1.5} />
      {/* Parallax glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [200, -200]),
          background: 'radial-gradient(ellipse at 50% 50%, hsl(260 100% 65% / 0.07), transparent 70%), radial-gradient(ellipse at 20% 30%, hsl(175 100% 50% / 0.05), transparent 50%)',
        }}
      />

      {/* 3D Background Element */}
      <div className="absolute inset-0 opacity-30">
        <MiniScene3D variant="grid" className="h-full w-full" />
      </div>

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
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card group p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(260_100%_65%/0.15)]"
            >
              <h3 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
                <span className="text-gradient">{a.title}</span>
              </h3>
              <p className="text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
