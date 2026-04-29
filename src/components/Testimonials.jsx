import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    quote: "Axiom didn't just ship our AI platform — they reframed our whole product strategy. Six months in, we're closing enterprise deals we wouldn't have qualified for last year.",
    name: 'Sarah Chen',
    role: 'CEO, Nexa Analytics',
  },
  {
    quote: "The level of design polish is genuinely Apple-tier. Our conversion tripled within two months of relaunch and bounce dropped by 40%.",
    name: 'Marcus Webb',
    role: 'Founder, Flow Commerce',
  },
  {
    quote: "Working with Axiom feels like an extension of our team — senior, fast, opinionated in the right ways. We've now shipped three products together.",
    name: 'Dr. Priya Patel',
    role: 'CTO, MediConnect',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative border-t border-border py-32 md:py-48 overflow-hidden">
      <div className="container">
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <span className="label">05 — Testimonials</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-8 md:col-start-5"
          >
            <h2 className="display-text font-display font-medium text-balance">
              What our <em className="font-serif-i font-normal text-duotone" style={{ fontStyle: 'italic' }}>clients</em> say
            </h2>
          </motion.div>
        </div>

        <div className="space-y-32">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 * i, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex gap-6 px-6 md:px-10">
                <span className="font-serif-i text-7xl leading-none text-primary -mb-4 hidden md:block" style={{ fontStyle: 'italic' }}>&ldquo;</span>
                <div className="flex-1">
                  <p className="mt-6 text-lg md:text-xl leading-snug text-pretty">{t.quote}</p>
                  <div className="mt-10 flex items-end justify-between border-t border-border pt-6">
                    <div>
                      <div className="font-display text-base">{t.name}</div>
                      <div className="mt-1 label">{t.role}</div>
                    </div>
                    <span className="font-display text-base text-primary">
                      {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
