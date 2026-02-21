import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const posts = [
  { title: 'The Future of AI in Business Automation', category: 'AI', date: 'Feb 15, 2025', image: portfolio1, excerpt: 'How machine learning is reshaping enterprise workflows and decision-making processes.' },
  { title: 'Building Scalable Apps with Modern Architecture', category: 'Engineering', date: 'Feb 10, 2025', image: portfolio2, excerpt: 'Best practices for designing systems that grow with your user base.' },
  { title: 'UI/UX Trends Dominating 2025', category: 'Design', date: 'Feb 5, 2025', image: portfolio3, excerpt: 'The design patterns and aesthetics shaping the next generation of digital products.' },
  { title: 'Why Every Startup Needs an AI Strategy', category: 'Strategy', date: 'Jan 28, 2025', image: portfolio4, excerpt: 'A practical guide to integrating AI into your business roadmap from day one.' },
  { title: 'Cross-Platform Development: React Native vs Flutter', category: 'Mobile', date: 'Jan 20, 2025', image: portfolio5, excerpt: 'An in-depth comparison of the two leading cross-platform frameworks.' },
  { title: 'Cybersecurity Best Practices for SaaS Products', category: 'Security', date: 'Jan 12, 2025', image: portfolio6, excerpt: 'Essential security measures every SaaS product should implement.' },
];

export default function BlogPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <section ref={ref} className="section-padding relative overflow-hidden pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Insights & Ideas
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-7xl">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="mx-auto mb-20 max-w-2xl text-lg text-muted-foreground">
              Thoughts on AI, software engineering, design, and the future of technology.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass-card group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_hsl(260_100%_65%/0.2)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                  <span className="absolute left-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs text-muted-foreground">{post.date}</p>
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
}
