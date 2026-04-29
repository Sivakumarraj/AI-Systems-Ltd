import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { api } from "../api";
import { Users, Package, MessageSquare, Shield, Activity, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("users");
  const [data, setData] = useState({ users: [], orders: [], contacts: [] });
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [u, o, c] = await Promise.all([
          api.getAdminUsers(),
          api.getOrders(), // Backend returns all orders for admins
          api.getAdminContacts()
        ]);
        setData({ users: u.users, orders: o.orders, contacts: c.contacts });
      } catch (err) {
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleLogout = () => { logout(); navigate("/"); toast.success("Securely logged out"); };

  const tabs = [
    { id: "users", label: "Registered Users", icon: Users, count: data.users.length },
    { id: "orders", label: "Infrastructure Contracts", icon: Package, count: data.orders.length },
    { id: "contacts", label: "Strategic Inquiries", icon: MessageSquare, count: data.contacts.length },
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-10">
      <div className="container">
        {/* Admin Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 p-10 rounded-premium border border-white/5 bg-white/[0.02] backdrop-blur-3xl glow-primary/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
               <Shield className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Executive Terminal</h1>
              <p className="body-text text-sm uppercase tracking-[0.2em] text-white/40">AI Systems Ltd · Root Access</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Activity size={12} /> Live Metrics
             </div>
             <button onClick={handleLogout} className="p-3 rounded-xl border border-white/10 bg-white/5 text-white/40 hover:text-red-500 hover:border-red-500/50 transition-all">
               <LogOut size={20} />
             </button>
          </div>
        </motion.div>

        {loading ? (
           <div className="text-center py-20"><Activity className="animate-spin text-primary mx-auto" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-3 space-y-3">
               <p className="label text-[9px] uppercase tracking-[0.3em] text-white/20 px-4 mb-4">Database Tables</p>
               {tabs.map(t => (
                 <button 
                  key={t.id} 
                  onClick={() => setTab(t.id)} 
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all ${tab === t.id ? "bg-white text-black" : "bg-white/[0.03] text-white/40 hover:bg-white/10 hover:text-white"}`}
                 >
                   <div className="flex items-center gap-4"><t.icon size={18} /> {t.label}</div>
                   <span className="text-[10px] bg-black/20 px-2 py-1 rounded-full">{t.count}</span>
                 </button>
               ))}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  
                  {/* Users Tab */}
                  {tab === "users" && data.users.map(u => (
                    <div key={u.id} className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">{u.name} <span className="text-xs font-normal text-white/40 ml-2">ID: {u.id}</span></h3>
                        <p className="text-xs text-white/60">{u.email} · {u.company || "No Company"}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/50'}`}>{u.role}</span>
                    </div>
                  ))}

                  {/* Orders Tab */}
                  {tab === "orders" && data.orders.map(o => (
                    <div key={o.id} className="p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                           <h3 className="text-lg font-bold text-white">{o.plan} Tier</h3>
                           <p className="text-xs text-white/60">Ordered by {o.user_name} ({o.user_email})</p>
                        </div>
                        <span className="text-primary font-bold">{o.price}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                        <p className="text-xs text-white/40 mb-1">Company: {o.company_name}</p>
                        <p className="text-sm text-white/80">{o.requirements}</p>
                      </div>
                    </div>
                  ))}

                  {/* Contacts Tab */}
                  {tab === "contacts" && data.contacts.map(c => (
                    <div key={c.id} className="p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                           <h3 className="text-lg font-bold text-white">{c.subject || "General Inquiry"}</h3>
                           <p className="text-xs text-white/60">From {c.name} ({c.email}) · {c.company}</p>
                        </div>
                        <span className="text-xs text-white/30">{new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                        <p className="text-sm text-white/80">{c.message}</p>
                      </div>
                    </div>
                  ))}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
