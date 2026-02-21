import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative overflow-hidden px-6 py-32">
      {/* Glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 80%, hsl(260 100% 65% / 0.06), transparent 60%)',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h2 className="font-display text-7xl font-bold uppercase tracking-tight text-foreground md:text-[10rem] lg:text-[14rem]">
          RH
        </h2>
        <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-foreground/20 md:text-7xl lg:text-9xl">
          SOFTWARE
        </h2>
      </motion.div>

      <div className="relative z-10 mx-auto mt-16 flex max-w-4xl flex-col items-center justify-between gap-6 border-t border-border/30 pt-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2025 RH Software. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <a key={link} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
