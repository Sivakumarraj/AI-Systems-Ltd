import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "CTO @ Fintech Solutions",
    content: "AI Systems Ltd provided an architecture that scaled effortlessly during our peak loads. Their custom modules are a game-changer.",
    avatar: "SC",
  },
  {
    name: "Mark Veras",
    role: "VP Engineering @ Global Logistics",
    content: "The level of customization they offer is unprecedented. It's like having an internal team of elite engineers building exactly what we need.",
    avatar: "MV",
  },
  {
    name: "Elena Rodriguez",
    role: "Director of AI @ HealthTech",
    content: "Integrating their AI-powered workflows reduced our data processing time by 80%. A truly bespoke enterprise solution.",
    avatar: "ER",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="label text-primary mb-4">Trusted by Pioneers</span>
          <h2 className="section-title text-white">The Feedback</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-12 -left-12 text-primary opacity-20">
            <Quote size={120} />
          </div>

          <div className="relative z-10 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="bg-white/5 border border-white/10 p-12 rounded-[40px] backdrop-blur-xl"
              >
                <p className="text-3xl md:text-4xl text-white font-medium leading-tight mb-12 italic">
                  "{testimonials[index].content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-background font-bold text-xl">
                    {testimonials[index].avatar}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonials[index].name}</h4>
                    <p className="label">{testimonials[index].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-background transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-background transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
