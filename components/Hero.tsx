"use client";

import { motion } from "framer-motion";
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Users,
  GraduationCap,
  Briefcase,
  LayoutGrid,
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PremiumHero() {

  const router = useRouter();

  const [showVideo, setShowVideo] = useState(false);

  // ✅ USER STATE
  const [user, setUser] = useState<any>(null);

  // ✅ GET LOGGED IN USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center bg-[#050212] pt-32 pb-20 px-6 overflow-hidden">
        
        {/* Background Decor */}
        <div className="mesh-glow opacity-50" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.2em] text-purple-400 mb-8 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              The Future of Finance Education
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight text-white">
              Learn. Optimize.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                Lead the Future.
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              Master FinOps, Cloud Financial Management, and drive real business impact with future-ready skills.
            </p>

            <div className="flex flex-wrap gap-5 mb-16">

              {/* ✅ EXPLORE COURSES BUTTON */}
              <button
                onClick={() => router.push("/courses")}
                className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
              >
                Explore Courses <ArrowRight size={20} />
              </button>

              {/* ✅ WATCH DEMO BUTTON */}
              <button
                onClick={() => setShowVideo(true)}
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-bold flex items-center gap-3 hover:bg-white/10 transition-all text-white backdrop-blur-md"
              >
                Watch Demo <Play size={18} className="fill-current" />
              </button>

            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 border-t border-white/10 pt-10 w-full">
              {[
                { icon: <ShieldCheck className="text-purple-400" size={20} />, text: "Industry Recognized Certification" },
                { icon: <Users className="text-purple-400" size={20} />, text: "Expert Led Training" },
                { icon: <GraduationCap className="text-purple-400" size={20} />, text: "Practical Learning" },
                { icon: <Briefcase className="text-purple-400" size={20} />, text: "Career Advancement" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-400 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                      {feature.icon}
                  </div>
                  {feature.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-purple-600/20 blur-[100px] rounded-full -z-10 animate-pulse" />

            <div className="relative rounded-[32px] overflow-hidden flex min-h-[520px] bg-[#0A0A1A]/80 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
              
              <div className="w-20 border-r border-white/5 bg-black/40 flex flex-col items-center py-10 gap-10">
                <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/40 transform hover:rotate-12 transition-transform">
                  <LayoutGrid size={22} color="white" />
                </div>

                <div className="flex flex-col gap-10 text-gray-600">
                  <Home size={22} className="text-purple-400" />
                  <GraduationCap size={22} className="hover:text-white transition-colors cursor-pointer" />
                  <Users size={22} className="hover:text-white transition-colors cursor-pointer" />
                  <Settings size={22} className="hover:text-white transition-colors cursor-pointer" />
                </div>

                <div className="mt-auto text-gray-700 hover:text-red-400 cursor-pointer transition-colors pb-6">
                  <LogOut size={22} />
                </div>
              </div>

              <div className="flex-1 p-10">

                {/* ✅ DYNAMIC USER */}
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Welcome back, {user?.name || user?.email || "Guest"} 👋
                    </h3>

                    <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">
                      FinOps Mastery Journey
                    </p>
                  </div>

                  {/* ✅ DYNAMIC AVATAR */}
                  <img 
                    src={`https://i.pravatar.cc/150?u=${user?.email || "guest"}`}
                    className="w-12 h-12 rounded-2xl border-2 border-purple-500/30 p-1 bg-black/50"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6 mb-12">
                  <StatCard title="Savings" value="$128K" trend="+12%" color="text-green-400" />
                  <StatCard title="Progress" value="24" progress={80} color="text-purple-400" />
                  <StatCard title="Hours" value="48.5" trend="+8h" color="text-blue-400" />
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ✅ VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[80%] max-w-3xl">
            
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✖
            </button>

            <video controls autoPlay className="w-full rounded-xl">
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}

function StatCard({ title, value, trend, color, progress }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 relative z-10">
        {title}
      </p>
      
      <div className="flex items-end justify-between relative z-10">
        <h4 className="text-xl font-black text-white">{value}</h4>

        {trend && (
          <span className={`text-[10px] font-black ${color} bg-black/40 px-2 py-0.5 rounded-md`}>
            {trend}
          </span>
        )}
      </div>

      <div className="mt-4 h-6 flex items-end gap-1 relative z-10">
        {[40, 70, 45, 90, 65].map((h, i) => (
          <div
            key={i}
            className={`flex-1 ${i === 3 ? "bg-purple-500" : "bg-white/10"} rounded-t-[2px]`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}