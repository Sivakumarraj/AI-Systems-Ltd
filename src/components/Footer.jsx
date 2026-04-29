import { motion } from 'framer-motion'

const footerLinks = ['Twitter', 'LinkedIn', 'Dribbble', 'GitHub']

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      {/* Top bar */}
      <div className="container flex items-center justify-between py-6">
        <a href="#" className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-display text-lg font-semibold">Axiom Studio</span>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-primary transition-all duration-300"
        >
          Start a project
        </a>
      </div>

      {/* Divider + large text */}
      <div className="container flex flex-1 flex-col justify-center gap-6 border-t border-border py-32">
        <motion.h2
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-display text-6xl md:text-[180px] font-semibold tracking-tight leading-none"
          style={{ letterSpacing: '-0.04em', lineHeight: 0.85 }}
        >
          AXIOM
        </motion.h2>
      </div>

      {/* Bottom bar */}
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between border-t border-border">
        <span className="label">© 2025 Axiom Studio · All rights reserved</span>
        <div className="flex items-center gap-6 label">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <span className="label">Made with obsession in NYC · SG</span>
      </div>
    </footer>
  )
}
