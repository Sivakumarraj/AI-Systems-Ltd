import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.sendContact(form);
      toast.success("Message sent successfully!");
      setSent(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 rounded-premium bg-white/[0.02] border border-white/10 backdrop-blur-3xl glow-primary/10">
          <CheckCircle size={80} className="text-primary mx-auto mb-6" />
          <h2 className="section-title text-white mb-4 italic">Message Sent!</h2>
          <p className="body-text mb-8 uppercase tracking-widest text-sm">Our consultants will reach out within 24 hours.</p>
          <button onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", subject: "", message: "" }); }} className="px-10 py-4 rounded-full bg-primary text-black font-bold hover:scale-105 transition-all glow-primary">Send Another</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="label text-primary mb-4 block uppercase tracking-[0.3em]">Consulting</span>
            <h1 className="section-title text-white mb-6 italic tracking-tighter">Strategic <span className="text-duotone">Partnership.</span></h1>
            <p className="body-text mb-12 text-lg">Inquire about our bespoke software architectures and AI integration strategies. Let's engineer the future together.</p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Global Inquiries", value: "partners@aisystems.com" },
                { icon: Phone, label: "Priority Hotline", value: "+1 (888) AI-SYSTEMS" },
                { icon: MapPin, label: "HQ Operations", value: "San Francisco, CA · Zurich, CH" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group hover:border-primary/50 transition-colors">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="label text-[9px] mb-1 uppercase tracking-widest text-white/40">{item.label}</p>
                    <p className="text-white font-bold tracking-tight text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="p-12 rounded-premium border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-8 glow-primary/5 shadow-3xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="label text-[9px] mb-2 block uppercase tracking-widest text-white/40">Full Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="label text-[9px] mb-2 block uppercase tracking-widest text-white/40">Corporate Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all" placeholder="john@company.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="label text-[9px] mb-2 block uppercase tracking-widest text-white/40">Company</label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="label text-[9px] mb-2 block uppercase tracking-widest text-white/40">Topic</label>
                <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all" placeholder="System Architecture" />
              </div>
            </div>
            <div>
              <label className="label text-[9px] mb-2 block uppercase tracking-widest text-white/40">Project Vision</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all resize-none" placeholder="Describe your technical requirements..." />
            </div>
            <button type="submit" disabled={sending} className="w-full py-6 rounded-2xl bg-primary text-black font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 glow-primary shadow-lg">
              {sending ? "Initiating..." : <><Send size={20} /> Submit Inquiry</>}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
