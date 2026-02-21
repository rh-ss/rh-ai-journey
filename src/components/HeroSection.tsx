import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Scene3D from './Scene3D';

const marqueeWords = [
  "YOUR IDEAS. OUR TECHNOLOGY.",
  "AI. APPS. SOFTWARE.",
  "BUILT FOR THE FUTURE.",
  "YOUR IDEAS. OUR TECHNOLOGY.",
  "AI. APPS. SOFTWARE.",
  "BUILT FOR THE FUTURE.",
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={ref} className="relative min-h-[200vh]">
      {/* Sticky hero content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <Scene3D />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 z-[1]" style={{
          background: 'radial-gradient(ellipse at 30% 50%, hsl(260 100% 65% / 0.08), transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(220 100% 60% / 0.06), transparent 50%)',
        }} />

        {/* Main Content */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            Next-Generation Technology
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-5xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl"
          >
            Engineering the Future with{' '}
            <span className="text-gradient">AI & Digital Innovation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            RH Software builds intelligent solutions that transform businesses through AI, web, mobile, and software technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <Link to="/contact" className="btn-glow text-primary-foreground">
              Start Your Project
            </Link>
            <Link to="/services" className="btn-outline-glow">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Marquee */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-16 left-0 z-10 w-full overflow-hidden"
        >
          <motion.div className="marquee-track" style={{ x: marqueeX }}>
            {marqueeWords.map((word, i) => (
              <span
                key={i}
                className="mx-8 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-widest text-foreground/10 md:text-4xl"
              >
                {word}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
