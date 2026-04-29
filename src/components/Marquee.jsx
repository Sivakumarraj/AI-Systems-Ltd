const services = [
  'AI Engineering',
  'Product Design',
  'Full-Stack Development',
  'SaaS Platforms',
  'DevOps & Cloud',
  'Technical Advisory',
]

function MarqueeRow({ reverse = false }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {[...services, ...services].map((service, i) => (
        <div key={i} className="flex items-center gap-12">
          <span className="font-display text-4xl md:text-6xl font-medium uppercase tracking-tight whitespace-nowrap">
            {service}
          </span>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: i % 2 === 0 ? 'hsl(70 100% 50%)' : 'hsl(18 100% 50%)' }} />
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="group relative w-full overflow-hidden border-y border-border py-8">
      {/* Row 1 - forward */}
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeRow />
        <MarqueeRow />
      </div>

      {/* Row 2 - reverse */}
      <div className="mt-6 flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
        <MarqueeRow reverse />
        <MarqueeRow reverse />
      </div>
    </section>
  )
}
