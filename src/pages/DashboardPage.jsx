import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { Send, Package, MessageSquare, LogOut, Bot, User, Loader2, Sparkles, LayoutDashboard } from "lucide-react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("chat");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    api.getOrders().then(d => setOrders(d.orders)).catch(() => {});
    api.getChatHistory().then(d => setMessages(d.messages)).catch(() => {});
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setChatLoading(true);
    try {
      const data = await api.sendChat(msg);
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate("/"); toast.success("Securely logged out"); };

  const tabs = [
    { id: "chat", label: "Strategic AI", icon: MessageSquare },
    { id: "orders", label: "Infrastructure", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-10">
      <div className="container">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 p-10 rounded-premium border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
               <User className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">{user?.name}</h1>
              <p className="body-text text-sm uppercase tracking-[0.2em] text-white/40">{user?.company || "Strategic Partner"} · {user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Sparkles size={12} /> Active Session
             </div>
             <button onClick={handleLogout} className="p-3 rounded-xl border border-white/10 bg-white/5 text-white/40 hover:text-red-500 hover:border-red-500/50 transition-all">
               <LogOut size={20} />
             </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-3">
             <p className="label text-[9px] uppercase tracking-[0.3em] text-white/20 px-4 mb-4">Operations</p>
             {tabs.map(t => (
               <button 
                key={t.id} 
                onClick={() => setTab(t.id)} 
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${tab === t.id ? "bg-primary text-black glow-primary" : "bg-white/[0.03] text-white/40 hover:bg-white/10 hover:text-white"}`}
               >
                 <t.icon size={18} /> {t.label}
               </button>
             ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {tab === "chat" ? (
                <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-premium border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col h-[700px] shadow-2xl">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                    {messages.length === 0 && (
                      <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                          <Bot size={40} className="text-primary" />
                        </div>
                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">AI Strategic Consultant</h3>
                        <p className="body-text text-sm uppercase tracking-widest text-white/40 max-w-sm mx-auto">Inquire about system architecture, scalability, or project feasibility.</p>
                      </div>
                    )}
                    {messages.map((m, i) => (
                      <div key={i} className={`flex gap-6 ${m.role === "user" ? "justify-end" : ""}`}>
                        {m.role === "assistant" && (
                          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 border border-primary/20">
                            <Bot size={20} className="text-primary" />
                          </div>
                        )}
                        <div className={`max-w-[80%] p-6 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-black font-medium rounded-br-none" : "bg-white/[0.05] text-white/90 border border-white/5 rounded-bl-none"}`}>
                          {m.content}
                        </div>
                        {m.role === "user" && (
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-1 border border-white/10">
                            <User size={20} className="text-white/60" />
                          </div>
                        )}
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/20">
                          <Bot size={20} className="text-primary" />
                        </div>
                        <div className="bg-white/[0.05] p-6 rounded-2xl rounded-bl-none flex items-center gap-3 text-white/40 border border-white/5">
                          <Loader2 size={16} className="animate-spin text-primary" /> 
                          <span className="text-xs uppercase tracking-widest font-bold">Processing Stream...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={sendMessage} className="p-6 bg-white/[0.02] border-t border-white/10">
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={chatInput} 
                        onChange={(e) => setChatInput(e.target.value)} 
                        placeholder="Consult with AI Strategy..." 
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all"
                      />
                      <button type="submit" disabled={chatLoading} className="px-8 rounded-2xl bg-primary text-black font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 glow-primary">
                        <Send size={24} />
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-24 rounded-premium border border-white/10 bg-white/[0.02]">
                      <Package size={56} className="text-white/10 mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">No Active Infrastructure</h3>
                      <p className="body-text text-sm uppercase tracking-widest text-white/40 mb-10">Initialize a project to see its status here.</p>
                      <button onClick={() => navigate("/#pricing")} className="px-10 py-4 rounded-full bg-primary text-black font-bold hover:scale-105 transition-all glow-primary">View Tiers</button>
                    </div>
                  ) : (
                    orders.map((order, i) => (
                      <div key={i} className="p-8 rounded-premium border border-white/10 bg-white/[0.02] flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Package className="text-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{order.plan} Infrastructure</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">{order.company_name} · Initialized {new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                             <p className="text-xl font-bold text-white">{order.price}</p>
                             <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Contract Value</p>
                          </div>
                          <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === "pending" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" : "bg-green-500/10 text-green-500 border border-green-500/20"}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
