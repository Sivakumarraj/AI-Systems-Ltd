import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const plans = [
  { name: "Startup", price: "$2,999", features: ["Core AI Engine", "10 Custom API Endpoints", "Standard Authentication", "Community Support"] },
  { name: "Professional", price: "$9,499", features: ["Advanced AI Workflows", "Unlimited API Calls", "Custom Dashboard", "Real-time Analytics", "Priority Support"], popular: true },
  { name: "Enterprise", price: "Custom", features: ["Dedicated Infrastructure", "White-labeled Solutions", "Quantum-resistant Security", "On-site Deployment", "24/7 SLA"] },
];

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const planName = searchParams.get("plan") || "Professional";
  const selectedPlan = plans.find(p => p.name === planName) || plans[1];
  const [form, setForm] = useState({ company_name: "", requirements: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in first"); navigate("/login"); return; }
    setLoading(true);
    try {
      await api.placeOrder({ plan: selectedPlan.name, price: selectedPlan.price, ...form });
      setSuccess(true);
      toast.success("Order placed!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 rounded-premium bg-white/[0.02] border border-white/10 backdrop-blur-3xl glow-primary/10 max-w-md">
          <ShieldCheck size={80} className="text-primary mx-auto mb-6" />
          <h2 className="section-title text-white mb-4 italic tracking-tighter">Inquiry Received.</h2>
          <p className="body-text mb-8 uppercase tracking-widest text-sm">Your <span className="text-primary font-bold">{selectedPlan.name}</span> project is being reviewed by our strategic team.</p>
          <button onClick={() => navigate("/dashboard")} className="px-10 py-4 rounded-full bg-primary text-black font-bold hover:scale-105 transition-all glow-primary">View Dashboard</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="label text-primary mb-4 block uppercase tracking-[0.3em]">Project Initiation</span>
          <h1 className="section-title text-white mb-12 italic tracking-tighter">{selectedPlan.name} Tier — <span className="text-primary">{selectedPlan.price}</span></h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Plan Summary */}
            <div className="lg:col-span-5 p-10 rounded-premium border border-white/10 bg-white/[0.02] backdrop-blur-3xl h-fit">
              <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-tighter">Infrastructure Profile</h3>
              <div className="space-y-6">
                {selectedPlan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                       <Check size={14} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 p-10 rounded-premium border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-8 glow-primary/5">
              <div>
                <label className="label text-[9px] mb-2 block uppercase tracking-widest text-white/40">Registered Company</label>
                <input type="text" required value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all" placeholder="Legal entity name" />
              </div>
              <div>
                <label className="label text-[9px] mb-2 block uppercase tracking-widest text-white/40">Technical Requirements</label>
                <textarea rows={6} required value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all resize-none" placeholder="Detail your specific software needs and logic requirements..." />
              </div>
              <button type="submit" disabled={loading} className="w-full py-6 rounded-2xl bg-primary text-black font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 glow-primary">
                {loading ? "Processing..." : <><ArrowRight size={20} /> Initialize Project</>}
              </button>
              {!user && (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                  <p className="text-xs text-yellow-500 font-bold uppercase tracking-widest">Authentication required to proceed</p>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPage;
