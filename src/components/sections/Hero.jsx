import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import NeuroWearable from "../three/NeuroWearable";
import { ArrowRight, Play, Brain, Zap, Target, Activity } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative h-screen flex flex-col pt-24 overflow-hidden bg-black selection:bg-primary selection:text-black">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[160px] opacity-30" />
      </div>

      <div className="container relative z-10 flex flex-col h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
          {/* Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col justify-center">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="label text-[9px] tracking-[0.1em] text-white/60 uppercase font-bold">AI-Powered Software Systems</span>
            </motion.div>

            {/* Headline */}
            <div className="flex flex-col mb-6">
              <motion.p variants={itemVariants} className="hero-sub text-white/90 mb-4 tracking-[0.2em] font-medium">
                Intelligent Software.
              </motion.p>
              <motion.h1 variants={itemVariants} className="hero-text text-white mb-2 tracking-tighter">
                Engineered
              </motion.h1>
              <motion.h1 variants={itemVariants} className="hero-text flex flex-wrap gap-x-6 tracking-tighter">
                <span className="text-outline uppercase">For</span>
                <span className="text-duotone text-glow">Impact.</span>
              </motion.h1>
            </div>

            {/* Tagline & Subtext */}
            <motion.div variants={itemVariants} className="mb-10">
              <p className="text-xl font-bold tracking-[0.35em] uppercase mb-6 flex gap-3 flex-wrap">
                <span className="text-white/60">Automate.</span>{" "}
                <span className="text-primary">Optimize.</span>{" "}
                <span className="text-white/60">Outperform.</span>
              </p>
              <p className="body-text max-w-lg text-white/40 font-medium">
                AI Systems crafts intelligent, scalable, and future-ready software solutions that empower businesses to move faster, work smarter, and lead the change.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
              <Link to="/order" className="group px-10 py-5 rounded-full bg-primary text-black font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all glow-primary uppercase tracking-widest text-xs">
                Pre-order Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="group px-10 py-5 rounded-full border border-white/10 bg-white/5 text-white font-bold backdrop-blur-md hover:bg-white/10 transition-all flex items-center gap-3 uppercase tracking-widest text-xs">
                Our Services
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={14} fill="white" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <div className="lg:col-span-5 relative h-full flex items-center justify-center">
             {/* Info Label Right */}
             <div className="absolute top-1/4 right-0 z-20 text-right hidden lg:block">
               <p className="label text-[9px] text-white/30 mb-2 uppercase tracking-[0.2em]">Intelligence In Motion</p>
               <div className="flex flex-col items-end gap-3">
                  <div className="w-16 h-[1px] bg-primary/30" />
                  <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-4 shadow-2xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                       <Activity size={20} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter">Real-time</p>
                      <p className="text-[9px] text-white/40 uppercase tracking-tighter">Adaptive Systems</p>
                    </div>
                  </div>
               </div>
             </div>

            <div className="w-full h-[600px]">
              <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]} alpha>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#84FF00" />
                <Environment preset="night" />
                <Suspense fallback={null}>
                  <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
                    <NeuroWearable />
                  </Float>
                </Suspense>
              </Canvas>
            </div>

            {/* Glowing Ring Backplate */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-[1px] border-primary/10 rounded-full blur-[2px] -z-10 opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[1px] border-primary/5 rounded-full blur-[5px] -z-10 opacity-30" />
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-6 p-10 rounded-premium border border-white/5 bg-white/[0.01] backdrop-blur-3xl"
        >
          {[
            { label: "Improvement in Focus", val: "2.4x", icon: Brain },
            { label: "Faster Cognitive Processing", val: "38%", icon: Zap },
            { label: "Better Memory Retention", val: "91%", icon: Target },
            { label: "Neural Feedback Tech", val: "Real-time", icon: Activity },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-5 border-l border-white/5 pl-8 first:border-0">
               <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                  <stat.icon className="text-primary" size={28} />
               </div>
               <div>
                  <h4 className="text-3xl font-black text-white tracking-tighter italic">{stat.val}</h4>
                  <p className="label text-[9px] text-white/30 tracking-[0.2em] font-bold uppercase">{stat.label}</p>
               </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-opacity cursor-pointer pb-2">
          <span className="label text-[8px] uppercase tracking-[0.4em] text-white font-black">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1.5">
             <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-1.5 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
