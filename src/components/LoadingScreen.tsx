import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'fill' | 'exit'>('logo');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase('fill'), 200);
      setTimeout(() => setPhase('exit'), 800);
      setTimeout(onComplete, 1400);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={phase === 'exit' ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        style={{ pointerEvents: phase === 'exit' ? 'none' : 'auto' }}
      >
        {/* Glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, hsl(260 100% 65% / 0.08), transparent 70%)',
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center"
        >
          <motion.h1
            className="font-display text-6xl font-bold tracking-tight text-foreground md:text-8xl"
            animate={phase === 'fill' ? { scale: 1.05 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="text-gradient">RH</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 font-display text-lg font-medium uppercase tracking-[0.4em] text-muted-foreground md:text-xl"
          >
            Software
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '12rem' }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative z-10 mt-12 h-[2px] overflow-hidden rounded-full bg-border/30"
          style={{ width: '12rem' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(260 100% 65%), hsl(220 100% 60%), hsl(175 100% 50%))',
              boxShadow: '0 0 20px hsl(260 100% 65% / 0.5)',
            }}
          />
        </motion.div>

        {/* Percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 mt-4 font-mono text-xs text-muted-foreground"
        >
          {progress}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
