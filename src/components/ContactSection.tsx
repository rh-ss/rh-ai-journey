import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl"
      >
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Get In Touch
        </p>
        <h2 className="mb-12 text-center font-display text-5xl font-bold text-foreground md:text-7xl">
          Let's <span className="text-gradient">Talk</span>
        </h2>

        <div className="glass-card glow-border p-8 md:p-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                className="input-glow w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input-glow w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="input-glow w-full"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="input-glow w-full resize-none"
            />
            <button type="submit" className="btn-glow w-full text-primary-foreground">
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
