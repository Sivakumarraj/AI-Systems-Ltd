import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowUpRight, Search } from "lucide-react";

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-Time",
  },
  {
    title: "AI Research Scientist",
    department: "AI & Innovation",
    location: "Zurich, CH",
    type: "Full-Time",
  },
  {
    title: "UX / UI Design Lead",
    department: "Product",
    location: "Remote",
    type: "Contract",
  },
  {
    title: "DevOps Architect",
    department: "Infrastructure",
    location: "Austin, TX",
    type: "Full-Time",
  },
  {
    title: "Project Manager",
    department: "Operations",
    location: "London, UK",
    type: "Full-Time",
  },
];

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="label text-primary mb-4 block">Careers</span>
          <h1 className="section-title text-white mb-6">Build the Future <span className="text-duotone">With Us.</span></h1>
          <p className="body-text">Join a team of elite engineers, designers, and thinkers who are redefining the boundaries of software and AI.</p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={20} />
          <input 
            type="text" 
            placeholder="Search for roles (e.g. Engineer, Designer...)" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all"
          />
        </div>

        {/* Job List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-premium border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs text-white/40">
                  <div className="flex items-center gap-1.5"><Briefcase size={14} /> {job.department}</div>
                  <div className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white font-bold group-hover:bg-primary group-hover:text-black transition-all">
                Apply Now <ArrowUpRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[40px] border border-primary/20 bg-primary/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-[80px] -z-10" />
          <h2 className="text-3xl font-bold text-white mb-4">Don't see a fit?</h2>
          <p className="body-text mb-8">We're always looking for exceptional talent. Send us an open application.</p>
          <button className="px-10 py-4 rounded-full bg-primary text-black font-bold hover:scale-105 transition-transform glow-primary">
            Open Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
