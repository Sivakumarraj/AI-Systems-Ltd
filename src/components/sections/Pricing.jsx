import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const plans = [
  {
    name: "Startup",
    price: "$2,999",
    description: "Perfect for fast-moving startups looking for foundational custom AI integrations.",
    features: ["Core AI Engine", "10 Custom API Endpoints", "Standard Authentication", "Community Support"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$9,499",
    description: "Engineered for growing businesses requiring scalable software architectures.",
    features: ["Advanced AI Workflows", "Unlimited API Calls", "Custom Dashboard", "Real-time Analytics", "Priority Support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke solutions for large organizations with complex logic and security needs.",
    features: ["Dedicated Infrastructure", "White-labeled Solutions", "Quantum-resistant Security", "On-site Deployment", "24/7 SLA"],
    popular: false,
  },
];

const PricingCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative p-10 rounded-premium border border-white/10 flex flex-col transition-all duration-500",
        plan.popular ? "bg-white/10 scale-105 z-10 glow-primary border-primary/20" : "bg-white/5"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-background text-xs font-bold rounded-full uppercase tracking-widest">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="card-title text-white mb-2">{plan.name}</h3>
        <p className="body-text text-sm">{plan.description}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
        {plan.price !== "Custom" && <span className="text-white/40 text-sm">/project</span>}
      </div>

      <div className="flex flex-col gap-4 mb-12 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-sm text-white/80">
            <Check size={16} className="text-primary" />
            {feature}
          </div>
        ))}
      </div>

      <Link
        to={`/order?plan=${plan.name}`}
        className={cn(
          "w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group text-center",
          plan.popular ? "bg-primary text-background" : "bg-white/10 text-white hover:bg-white/20"
        )}
      >
        Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="label text-primary mb-4">Investment in Infrastructure</span>
          <h2 className="section-title text-white mb-6">Choose Your Level</h2>
          <p className="body-text max-w-2xl mx-auto">
            Invest in scalable, fully customizable software architectures. Transparent pricing with lifetime updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
