import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const capabilities = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'AWS',
  'GPT-4', 'LangChain', 'Figma', 'Framer', 'Vercel', 'Supabase',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative border-t border-border py-32 md:py-48">
      <div className="container">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="md:col-span-3"
          >
            <span className="label">01 — About</span>
          </motion.div>

          {/* Content */}
          <div className="md:col-span-8 md:col-start-5">
            <div className="display-text font-display font-medium text-balance">
              {"We are a small team with a".split(" ").map((word, i) => (
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
                  className="font-serif-i font-normal text-primary inline-block not-italic"
                  style={{ fontStyle: 'italic' }}
                >
                  big passion
                </motion.em>
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="mt-10 grid gap-8 md:grid-cols-2 max-w-3xl"
            >
              <p className="text-muted-foreground text-pretty">
                From early-stage prototypes to enterprise-scale platforms, we ship products that feel inevitable. No bloated decks, no offshore handoffs — just senior engineers and designers, end-to-end.
              </p>
              <p className="text-muted-foreground text-pretty">
                We obsess over craft, speed, and outcomes. Every project gets our full attention — because building something great demands nothing less.
              </p>
            </motion.div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="mt-12 flex flex-wrap gap-3"
            >
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-mono border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                >
                  {cap}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
