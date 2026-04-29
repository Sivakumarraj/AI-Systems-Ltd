import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Settings, Cloud, Lock, Layout, Zap, Database, Globe, Cpu, Palette, ArrowRight } from "lucide-react";

const services = [
  { title: "Custom Web Applications", desc: "Full-stack React, Next.js, and Node.js applications with premium UI/UX.", icon: Layout, color: "from-primary/20" },
  { title: "Mobile App Development", desc: "Cross-platform React Native and Flutter apps for iOS and Android.", icon: Palette, color: "from-blue-500/20" },
  { title: "AI & Machine Learning", desc: "Custom AI models, NLP engines, computer vision, and predictive analytics.", icon: Cpu, color: "from-purple-500/20" },
  { title: "Cloud Infrastructure", desc: "AWS, Azure, GCP deployment with auto-scaling, CI/CD, and monitoring.", icon: Cloud, color: "from-cyan-500/20" },
  { title: "API Development", desc: "RESTful and GraphQL APIs with authentication, rate limiting, and docs.", icon: Code, color: "from-green-500/20" },
  { title: "Database Architecture", desc: "PostgreSQL, MongoDB, Redis — optimized schemas and migration strategies.", icon: Database, color: "from-orange-500/20" },
  { title: "Cybersecurity", desc: "Penetration testing, security audits, encryption, and compliance.", icon: Lock, color: "from-red-500/20" },
  { title: "DevOps & Automation", desc: "Docker, Kubernetes, Terraform — automate your entire infrastructure.", icon: Settings, color: "from-yellow-500/20" },
  { title: "Enterprise Integration", desc: "Connect legacy systems with modern APIs, ERP, CRM, and SaaS tools.", icon: Globe, color: "from-neon/20" },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-20">
          <span className="label text-primary mb-4 block">What We Build</span>
          <h1 className="section-title text-white mb-6">Every Software. <span className="text-duotone">Fully Customizable.</span></h1>
          <p className="body-text">From concept to deployment, we engineer intelligent software systems that adapt to your business. No templates — every line is written for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="card-title text-white mb-3">{s.title}</h3>
                <p className="body-text text-sm">{s.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-20 text-center">
          <p className="body-text mb-8">Ready to build something extraordinary?</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-black font-bold hover:scale-105 transition-transform glow-primary">
            Start Your Project <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
