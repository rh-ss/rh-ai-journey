import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/components/PortfolioSection';

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="flex h-[60vh] items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4 font-display text-4xl font-bold text-foreground">Project Not Found</h1>
              <Link to="/" className="btn-outline-glow inline-block">Back to Home</Link>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero image */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-20">
            <div className="mx-auto max-w-5xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
              >
                {project.category} · {project.year}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-display text-5xl font-bold text-foreground md:text-7xl"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-2 text-lg text-muted-foreground"
              >
                Client: {project.client}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="section-padding mx-auto max-w-5xl">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-gradient">Overview</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.description}</p>
          </motion.div>

          {/* Challenge & Solution */}
          <div className="mb-20 grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card p-8"
            >
              <h3 className="mb-4 font-display text-2xl font-bold text-foreground">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card glow-border p-8"
            >
              <h3 className="mb-4 font-display text-2xl font-bold text-foreground">Our Solution</h3>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="mb-10 font-display text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-gradient">Results</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.results.map((result, i) => (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(260_100%_65%/0.15)]"
                >
                  <p className="font-display text-lg font-bold text-foreground">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="mb-10 font-display text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-gradient">Tech Stack</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border/50 bg-muted/30 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(260_100%_65%/0.2)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="mb-6 text-lg text-muted-foreground">Want similar results for your business?</p>
            <Link to="/contact" className="btn-glow inline-block text-primary-foreground">
              Start Your Project
            </Link>
          </motion.div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
