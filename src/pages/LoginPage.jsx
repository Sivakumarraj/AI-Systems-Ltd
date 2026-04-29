import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2 uppercase italic tracking-tighter">Welcome Back</h1>
          <p className="body-text text-sm uppercase tracking-widest text-white/40">Sign in to AI Systems</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 rounded-premium border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6 glow-primary/10 shadow-2xl">
          <div>
            <label className="label text-[9px] mb-2 block text-white/40 uppercase tracking-widest">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all" placeholder="you@company.com" />
          </div>
          <div>
            <label className="label text-[9px] mb-2 block text-white/40 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all pr-12" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-5 rounded-2xl bg-primary text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 glow-primary">
            {loading ? "Signing in..." : <><LogIn size={18} /> Sign In</>}
          </button>
          <p className="text-center text-sm text-white/40 uppercase tracking-widest text-[10px]">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Create one</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
