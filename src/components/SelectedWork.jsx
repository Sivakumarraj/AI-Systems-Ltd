import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    name: 'Nexa AI',
    category: 'AI · Analytics',
    img: '/assets/work-nexa-CCey_8Eb.jpg',
    description: 'AI-powered analytics dashboard for enterprises — surfacing insights from billions of events in real time.',
    tags: ['GPT-4', 'React', 'Python', 'AWS'],
  },
  {
    name: 'Flow Commerce',
    category: 'E-commerce · Web',
    img: '/assets/work-flow-CR_FrjPK.jpg',
    description: 'Headless e-commerce platform that delivered a 3.2× conversion uplift for a luxury fashion house.',
    tags: ['Next.js', 'Shopify', 'Figma', 'Vercel'],
  },
  {
    name: 'MediConnect',
    category: 'Healthcare · SaaS',
    img: '/assets/work-medi-CzIf6bW6.jpg',
    description: 'Healthcare appointment SaaS now serving 50,000+ patients across three regions, HIPAA-compliant by design.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'GCP'],
  },
  {
    name: 'BuildPro',
    category: 'Construction · Mobile',
    img: '/assets/work-build-PWy6ZI9Y.jpg',
    description: 'Construction management mobile app trusted by 200+ field crews to manage live projects on-site.',
    tags: ['React Native', 'Firebase', 'Mapbox'],
  },
]

export default function SelectedWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" ref={ref} className="relative border-t border-border py-32 md:py-48">
      <div className="container">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <span className="label">03 — Selected Work</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-8 md:col-start-5"
          >
            <h2 className="display-text font-display font-medium text-balance">
              Projects we're{' '}
              <em className="font-serif-i font-normal text-duotone" style={{ fontStyle: 'italic' }}>
                proud of
              </em>
            </h2>
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15 * i, ease: [0.76, 0, 0.24, 1] }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[16/11] overflow-hidden rounded-lg bg-card">
                <img
                  src={project.img}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="label">{project.category}</span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-balance">
                  {project.name}
                </h3>
                <p className="mt-5 text-muted-foreground text-pretty max-w-md">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-mono border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
