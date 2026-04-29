import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '50+', label: 'Projects shipped' },
  { value: '12', label: 'Team members' },
  { value: '4.9', label: 'Avg. client rating' },
  { value: '3x', label: 'Avg. ROI uplift' },
]

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden gradient-mesh grain pt-32 md:pt-40">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-60" />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 will-change-transform">
        <div
          className="absolute w-[65vw] h-[65vw] rounded-full blur-3xl opacity-40 animate-float-blob"
          style={{
            background: 'radial-gradient(circle at 35% 40%, hsl(70 100% 50% / 0.30), transparent 55%), radial-gradient(circle at 70% 65%, hsl(18 100% 50% / 0.25), transparent 60%)',
            top: '-20%',
            left: '-10%',
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-10 flex items-center justify-between"
        >
          <span className="label inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Available for projects · 2025
          </span>
          <span className="label hidden md:block">Independent studio</span>
        </motion.div>

        {/* Hero headline */}
        <div className="hero-text font-display font-medium text-balance">
          {"We build digital products that".split(" ").map((word, i) => (
            <span key={i} className="reveal-container mr-[0.2em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.05,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="reveal-text"
              >
                {word}
              </motion.span>
            </span>
          ))}
          <span className="reveal-container">
            <motion.em
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="font-serif-i font-normal text-duotone text-glow not-italic inline-block"
              style={{ fontStyle: 'italic' }}
            >
              matter
            </motion.em>
          </span>
        </div>

        {/* Sub-content row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end"
        >
          <p className="md:col-span-5 max-w-md text-base md:text-lg text-muted-foreground text-pretty">
            AI-powered software development studio — turning complex problems into elegant, scalable solutions for ambitious teams.
          </p>

          <div className="md:col-span-7 flex flex-wrap items-center gap-4 md:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-primary transition-all duration-300"
            >
              Start a project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-foreground/25 text-foreground hover:bg-secondary transition-all duration-300"
            >
              See our work
            </a>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mt-24 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-6 md:p-8">
              <div className="font-display text-4xl md:text-6xl font-medium tracking-tight">{stat.value}</div>
              <div className="mt-3 label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex items-center justify-center pb-10"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="label">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
