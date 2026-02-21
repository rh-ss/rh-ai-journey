import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingOrbsProps {
  variant?: 'purple' | 'blue' | 'cyan' | 'mixed';
  intensity?: number;
}

const orbConfigs = {
  purple: [
    { size: 300, x: '10%', y: '20%', color: 'hsl(260 100% 65%)', delay: 0 },
    { size: 200, x: '70%', y: '60%', color: 'hsl(260 80% 50%)', delay: 3 },
  ],
  blue: [
    { size: 250, x: '80%', y: '15%', color: 'hsl(220 100% 60%)', delay: 1 },
    { size: 180, x: '20%', y: '70%', color: 'hsl(220 80% 45%)', delay: 4 },
  ],
  cyan: [
    { size: 220, x: '60%', y: '30%', color: 'hsl(175 100% 50%)', delay: 2 },
    { size: 160, x: '30%', y: '80%', color: 'hsl(175 80% 40%)', delay: 5 },
  ],
  mixed: [
    { size: 320, x: '5%', y: '15%', color: 'hsl(260 100% 65%)', delay: 0 },
    { size: 240, x: '75%', y: '25%', color: 'hsl(220 100% 60%)', delay: 2 },
    { size: 200, x: '50%', y: '75%', color: 'hsl(175 100% 50%)', delay: 4 },
  ],
};

export default function FloatingOrbs({ variant = 'mixed', intensity = 1 }: FloatingOrbsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * intensity, -100 * intensity]);

  const orbs = orbConfigs[variant];

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="floating-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            animationDelay: `${orb.delay}s`,
            opacity: 0.08 * intensity,
          }}
        />
      ))}
    </motion.div>
  );
}
