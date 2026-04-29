import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Code, Layers, Globe } from "lucide-react";

const cases = [
  {
    title: "Global Fintech Transformation",
    client: "Nexus Capital",
    category: "Financial Systems",
    desc: "Built a custom high-frequency trading core and microservices architecture that reduced latency by 45%.",
    image: "https://images.unsplash.com/photo-1611974717482-4800bd67d452?q=80&w=2070&auto=format&fit=crop",
    tags: ["Node.js", "Redis", "Custom AI"],
  },
  {
    title: "AI-Powered Health Analytics",
    client: "BioLogix Group",
    category: "HealthTech",
    desc: "Developed a secure, HIPAA-compliant patient data analysis engine using advanced NLP for medical record processing.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    tags: ["Python", "AWS", "NLP"],
  },
  {
    title: "Supply Chain Decentralization",
    client: "Global Logistics Ltd",
    category: "Logistics",
    desc: "Implemented a custom blockchain-based tracking system for real-time global supply chain visibility.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Solidity", "Go", "Cloud Native"],
  },
];

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <span className="label text-primary mb-4 block">Our Impact</span>
          <h1 className="section-title text-white mb-6">Case Studies: <span className="text-duotone">Real World Solutions.</span></h1>
          <p className="body-text">We've partnered with industry leaders to solve complex technical challenges. Here's a look at some of our most impactful work.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-premium overflow-hidden border border-white/10 bg-white/5 hover:border-primary/50 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] text-primary uppercase font-bold tracking-widest">{c.category}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="label text-[9px] mb-2">{c.client}</p>
                <h3 className="card-title text-white mb-4">{c.title}</h3>
                <p className="body-text text-sm mb-8 line-clamp-3">{c.desc}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex gap-2">
                    {c.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                  <button className="text-primary hover:text-white transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
