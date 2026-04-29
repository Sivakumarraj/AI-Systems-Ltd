import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" ref={ref} className="relative border-t border-border bg-background">
      <div className="container py-32 md:py-48 relative">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <span className="label">06 — Contact</span>
          </motion.div>
        </div>

        {/* Giant CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="mt-10 giant-text font-display font-medium text-balance group cursor-default"
        >
          Let&apos;s build something{' '}
          <em className="font-serif-i font-normal text-duotone text-glow" style={{ fontStyle: 'italic' }}>
            great
          </em>
        </motion.div>

        {/* Form + info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-12"
        >
          {/* Left info */}
          <div className="md:col-span-5 space-y-12">
            <div>
              <span className="label">Email</span>
              <a href="mailto:hello@axiomstudio.dev" className="mt-3 group flex items-center gap-3 text-left">
                <span className="font-display text-3xl md:text-5xl font-medium tracking-tight underline-grow">
                  hello@axiom
                </span>
              </a>
            </div>
            <div>
              <span className="label">Social</span>
              <div className="mt-3 flex flex-col gap-3">
                {['Twitter / X', 'LinkedIn', 'Dribbble', 'GitHub'].map((s) => (
                  <a key={s} href="#" className="group inline-flex items-center gap-2 font-display text-xl hover:text-primary transition-colors duration-300">
                    {s}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="md:col-span-7 md:col-start-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="mt-3 w-full bg-transparent border-b border-border py-3 text-base focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    required
                    className="mt-3 w-full bg-transparent border-b border-border py-3 text-base focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  placeholder="Tell us about your project"
                  rows={4}
                  required
                  className="mt-3 w-full bg-transparent border-b border-border py-3 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-primary transition-all duration-300 disabled:opacity-50"
              >
                {submitted ? 'Message sent ✓' : 'Send message'}
                {!submitted && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Spinning badge */}
        <div className="pointer-events-none absolute right-6 top-32 hidden md:block">
          <div className="relative w-32 h-32">
            <svg className="absolute inset-0 animate-spin-slow text-foreground" viewBox="0 0 200 200" width="128" height="128">
              <defs>
                <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              </defs>
              <text fontSize="12" fontFamily="JetBrains Mono, monospace" fill="currentColor" letterSpacing="6">
                <textPath href="#circlePath">
                  AVAILABLE FOR PROJECTS · 2025 · AVAILABLE FOR PROJECTS · 2025 ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
