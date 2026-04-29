import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    id: '01',
    title: 'Discovery',
    description: 'We dig into your business, users, and goals — then map the shortest path to value.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="40" cy="40" r="28" />
        <circle cx="40" cy="40" r="8" />
        <line x1="40" y1="12" x2="40" y2="20" />
        <line x1="40" y1="60" x2="40" y2="68" />
        <line x1="12" y1="40" x2="20" y2="40" />
        <line x1="60" y1="40" x2="68" y2="40" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Prototype',
    description: 'Two weeks to a clickable, tested prototype — rapid loops between strategy, design, and feedback.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="16" y="16" width="48" height="48" rx="4" />
        <path d="M12 28 H68 M28 12 V68" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Build & Ship',
    description: 'Senior engineers ship in weekly increments. You see progress live — no black-box agencies here.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12,60 40,12 68,60" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Grow & Iterate',
    description: 'We stay on as a long-term partner — performance, observability, hiring, and roadmap.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="40" cy="40" r="28" />
        <path d="M40 4 V14 M40 66 V76 M4 40 H14 M66 40 H76" />
      </svg>
    ),
  },
]

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" ref={ref} className="relative border-t border-border py-32 md:py-48 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="mb-12 md:mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <span className="label">04 — Process</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-8 md:col-start-5"
          >
            <h2 className="display-text font-display font-medium text-balance">
              From idea to{' '}
              <em className="font-serif-i font-normal text-primary" style={{ fontStyle: 'italic' }}>
                launch
              </em>
            </h2>
          </motion.div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 overflow-hidden border border-border">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="bg-background p-8 md:p-12 h-full group"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-muted-foreground">{step.id}</span>
                <div className="text-foreground/60 transition-colors duration-500 ease-premium group-hover:text-primary">
                  {step.icon}
                </div>
              </div>
              <h3 className="mt-12 font-display text-3xl md:text-5xl font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-4 text-muted-foreground max-w-md text-pretty">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
