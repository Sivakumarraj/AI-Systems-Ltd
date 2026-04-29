import React from "react";
import { motion } from "framer-motion";
import { Code, Settings, Cloud, Lock, Layout, Zap } from "lucide-react";
import { cn } from "../../utils/cn";

const features = [
  {
    title: "Bespoke Architectures",
    description: "We don't believe in one-size-fits-all. Every software system we build is custom-tailored to your logic.",
    icon: Layout,
    color: "from-primary/20 to-primary/0",
  },
  {
    title: "Modular Customization",
    description: "Easily adapt and extend your software with our modular-first engineering approach.",
    icon: Settings,
    color: "from-blue-500/20 to-blue-500/0",
  },
  {
    title: "AI Integration",
    description: "Built-in artificial intelligence that learns from your data to automate complex workflows.",
    icon: Code,
    color: "from-purple-500/20 to-purple-500/0",
  },
  {
    title: "Quantum Security",
    description: "Protect your proprietary software with state-of-the-art encryption and security protocols.",
    icon: Lock,
    color: "from-neon/20 to-neon/0",
  },
  {
    title: "Cloud Native",
    description: "Scalable cloud-ready systems designed for 99.9% uptime and global reach.",
    icon: Cloud,
    color: "from-green-500/20 to-green-500/0",
  },
  {
    title: "Blazing Speed",
    description: "Optimized low-level code ensures your software runs faster than anything on the market.",
    icon: Zap,
    color: "from-yellow-500/20 to-yellow-500/0",
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-10 rounded-premium border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
      onClick={() => window.location.href = '/services'}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", feature.color)} />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
          <feature.icon className="text-primary" size={24} />
        </div>
        <h3 className="card-title text-white mb-3">{feature.title}</h3>
        <p className="body-text text-sm">
          {feature.description}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container relative z-10">
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="label text-primary mb-4 block">Core Solutions</span>
            <h2 className="section-title text-white mb-6">
              Software That <span className="text-duotone">Adapts</span> To You.
            </h2>
            <p className="body-text">
              At AI Systems Ltd, we don't just write code. We engineer intelligent systems that evolve alongside your business.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
