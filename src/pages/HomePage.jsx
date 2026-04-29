import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import NeuroWearable from "../components/three/NeuroWearable";
import Features from "../components/sections/Features";
import Demo from "../components/sections/Demo";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "../components/sections/Pricing";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "../utils/cn";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  const headlineLines = [
    { text: "WE PROVIDE", highlight: false },
    { text: "ALL SOFTWARE.", highlight: true },
    { text: "FULLY", highlight: false },
    { text: "CUSTOMIZABLE.", highlight: true },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="noise-overlay" />
          <div className="absolute top-0 left-0 w-full h-full gradient-mesh opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] opacity-20" />
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col gap-10">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="label text-[10px] tracking-[0.2em] text-white/60">AI-Powered Software Systems</span>
            </motion.div>

            <div className="flex flex-col">
              {headlineLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1 variants={itemVariants} className={cn("hero-text tracking-tighter", line.highlight ? "text-duotone text-glow" : "text-white")}>{line.text}</motion.h1>
                </div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="body-text max-w-xl">
              AI Systems Ltd delivers bespoke, scalable software architectures tailored to your unique business needs. Every line of code is optimized for performance and flexibility.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
              <Link to="/contact" className="group relative px-10 py-5 rounded-full bg-primary text-black font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 glow-primary">
                <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight size={20} /></span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link to="/services" className="group px-10 py-5 rounded-full border border-white/10 bg-white/5 text-white font-bold backdrop-blur-md hover:bg-white/10 transition-all flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Play size={14} fill="white" /></div>
                Our Services
              </Link>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 relative h-[600px] lg:h-[800px] w-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
              <ambientLight intensity={0.2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#7fff00" />
              <Environment preset="night" />
              <Suspense fallback={null}><NeuroWearable /></Suspense>
            </Canvas>
          </div>
        </div>

        <div className="container relative z-10 mt-auto pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
            {[
              { label: "Projects Delivered", val: "200+", icon: "🚀" },
              { label: "Client Satisfaction", val: "99%", icon: "⭐" },
              { label: "Technologies", val: "50+", icon: "⚡" },
              { label: "Support Availability", val: "24/7", icon: "🛡️" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 border-l border-white/10 pl-6 first:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{stat.icon}</span>
                  <h4 className="text-2xl font-bold text-white">{stat.val}</h4>
                </div>
                <p className="label text-[10px] leading-tight text-white/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Teaser */}
      <section className="py-24 relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="label text-primary mb-2 block">Proven Results</span>
            <h2 className="text-3xl font-bold text-white uppercase italic tracking-tighter">
              Delivering <span className="text-duotone">Global Scale</span> Impact.
            </h2>
          </div>
          <Link to="/case-studies" className="group flex items-center gap-3 text-white font-bold hover:text-primary transition-colors">
            Explore All Case Studies <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Remaining sections */}
      <div className="relative bg-black">
        <Features />
        <Demo />
        <Testimonials />
        <Pricing />
      </div>
    </>
  );
};

export default HomePage;
