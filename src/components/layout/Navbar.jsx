import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Box, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.9)"]);
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"]);
  
  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Pricing", href: "/#pricing" },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(href.substring(2));
          el?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(href.substring(2));
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500"
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Box size={20} className="text-black" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
            AI<span className="text-primary">Systems</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            link.href.startsWith("/#") ? (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="label text-[10px] text-white/50 hover:text-white transition-all uppercase tracking-[0.2em]"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`label text-[10px] transition-all uppercase tracking-[0.2em] ${location.pathname === link.href ? "text-white" : "text-white/50 hover:text-white"}`}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
           {user?.role === 'admin' && (
             <Link to="/admin" className="text-primary hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors">Admin Panel</Link>
           )}
           {user ? (
             <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[10px] hover:bg-white/10 transition-all uppercase tracking-widest">
               <User size={14} className="text-primary" /> Dashboard
             </Link>
           ) : (
             <>
               <Link to="/login" className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors">Sign In</Link>
               <Link 
                to="/register" 
                className="px-8 py-3.5 rounded-full bg-primary text-black font-bold text-xs hover:scale-105 transition-all uppercase tracking-[0.1em] glow-primary"
              >
                Early Access
              </Link>
             </>
           )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 top-[72px] bg-black z-40 overflow-hidden"
          >
            <div className="container py-20 flex flex-col gap-10 text-center">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.href.startsWith("/#")) handleNavClick(link.href);
                    else { navigate(link.href); setIsOpen(false); }
                  }}
                  className="text-3xl font-bold text-white uppercase tracking-tighter"
                >
                  {link.name}
                </button>
              ))}
              {user ? (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full py-5 rounded-2xl bg-primary text-black font-bold text-xl uppercase">Dashboard</Link>
              ) : (
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full py-5 rounded-2xl bg-primary text-black font-bold text-xl uppercase">Early Access</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
