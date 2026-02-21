import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Send, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [aiInsight, setAiInsight] = useState<{ category: string; priority: string; summary: string; suggested_response: string } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const analyzeMessage = async () => {
    if (form.message.length < 20) return;
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          mode: 'categorize',
          messages: [{ role: 'user', content: `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\nMessage: ${form.message}` }],
        },
      });
      if (!error && data?.reply) {
        const parsed = JSON.parse(data.reply);
        setAiInsight(parsed);
      }
    } catch {
      // silently fail
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const categoryLabels: Record<string, string> = {
    'web-development': '🌐 Web Development',
    'mobile-app': '📱 Mobile App',
    'ai-solution': '🤖 AI Solution',
    'custom-software': '⚙️ Custom Software',
    'general-inquiry': '💬 General Inquiry',
    'support': '🛟 Support',
  };

  const priorityColors: Record<string, string> = {
    high: 'text-red-400 bg-red-500/10',
    medium: 'text-yellow-400 bg-yellow-500/10',
    low: 'text-green-400 bg-green-500/10',
  };

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          background: 'radial-gradient(ellipse at 50% 50%, hsl(260 100% 65% / 0.04), transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Get In Touch
        </p>
        <h2 className="mb-4 text-center font-display text-5xl font-bold text-foreground md:text-7xl">
          Let's <span className="text-gradient">Talk</span>
        </h2>
        <p className="mb-12 text-center text-muted-foreground flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-primary" />
          AI-powered smart form — we'll understand your needs instantly
        </p>

        <div className="glass-card glow-border p-8 md:p-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <CheckCircle size={48} className="text-green-400" />
              <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
              <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              {aiInsight && (
                <div className="mt-4 w-full rounded-xl bg-muted/50 p-4 text-left text-sm">
                  <p className="mb-2 font-medium text-foreground">AI Summary:</p>
                  <p className="text-muted-foreground">{aiInsight.summary}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-glow w-full"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-glow w-full"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="input-glow w-full"
                required
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onBlur={analyzeMessage}
                className="input-glow w-full resize-none"
                required
              />

              {/* AI Insight Card */}
              {analyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-muted-foreground"
                >
                  <Loader2 size={16} className="animate-spin text-primary" />
                  AI is analyzing your inquiry...
                </motion.div>
              )}

              {aiInsight && !analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-primary/5 border border-primary/20 p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-xs font-medium text-primary">AI Insight</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {categoryLabels[aiInsight.category] || aiInsight.category}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColors[aiInsight.priority] || ''}`}>
                      {aiInsight.priority} priority
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{aiInsight.summary}</p>
                </motion.div>
              )}

              <button type="submit" className="btn-glow flex w-full items-center justify-center gap-2 text-primary-foreground">
                <Send size={18} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
