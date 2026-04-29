import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const services = [
  {
    id: '01',
    title: 'AI Engineering',
    summary: 'Custom LLM apps, agents, RAG pipelines.',
    description: 'We design and ship production-grade AI systems — from intelligent agents and copilots to RAG pipelines, fine-tuned models, and real-time inference infrastructure.',
  },
  {
    id: '02',
    title: 'Product Development',
    summary: 'Cross-platform products people love.',
    description: 'Beautiful, performant web and mobile applications built with modern stacks — designed for speed, scale, and the kind of delight that makes users come back.',
  },
  {
    id: '03',
    title: 'SaaS Platforms',
    summary: 'Multi-tenant platforms, billing, scale.',
    description: "End-to-end SaaS development — from architecture and auth to billing, analytics, and global infrastructure. We've shipped platforms serving millions of requests.",
  },
  {
    id: '04',
    title: 'Product Design',
    summary: 'Award-quality interfaces, design systems.',
    description: 'Strategy-driven product design — research, IA, interaction, motion, and design systems that scale. Our work has shipped on Awwwards, Mobbin, and Product Hunt.',
  },
  {
    id: '05',
    title: 'DevOps & Cloud',
    summary: 'Infra, CI/CD, observability, security.',
    description: "Production-grade infrastructure on AWS, GCP, or your cloud of choice. CI/CD, observability, IaC, and zero-downtime deploys built right into your team's workflow.",
  },
  {
    id: '06',
    title: 'Technical Advisory',
    summary: 'Architecture audits, fractional CTO work.',
    description: 'Strategic technology guidance for founders and product leaders. Architecture reviews, hiring support, fractional CTO engagements, and roadmap planning.',
  },
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="relative border-t border-border py-32 md:py-48">
      <div className="container">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <span className="label">02 — Services</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-8 md:col-start-5"
          >
            <h2 className="display-text font-display font-medium text-balance">
              Everything you need to{' '}
              <em className="font-serif-i font-normal text-duotone" style={{ fontStyle: 'italic' }}>
                ship
              </em>
            </h2>
          </motion.div>
        </div>

        {/* Accordion */}
        <div className="border-t border-border">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              className="group border-b border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center gap-6 py-8 md:py-10 text-left"
              >
                <span className="font-mono text-sm text-muted-foreground w-12 shrink-0">{service.id}</span>
                <span className="flex-1 font-display text-3xl md:text-6xl font-medium tracking-tight transition-colors duration-500 ease-premium group-hover:text-primary">
                  {service.title}
                </span>
                <span className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
                  {service.summary}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 45 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:gap-10">
                      <p className="md:col-span-7 md:col-start-3 text-base md:text-lg text-muted-foreground text-pretty max-w-2xl">
                        {service.description}
                      </p>
                      <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end h-fit">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border border-border hover:border-primary hover:text-primary transition-colors duration-300"
                        >
                          Discuss project →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
