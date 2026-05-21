"use client";

import { motion } from "framer-motion";
import { 
  Check, ArrowRight, User, Calendar, Target, 
  TrendingUp, Rocket, Award, Star, ShieldCheck, 
  Briefcase, Cloud, Cpu, Terminal, Users
} from "lucide-react";

export default function OneOnOneTrainingPage() {
  return (
    <section className="bg-[#020617] text-white min-h-screen pb-20 selection:bg-blue-500/30 font-sans">
      
      {/* 🚀 HERO SECTION */}
      <div className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-block px-3 py-1 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Personalized Learning
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              1-on-1 <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Training
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Personalized mentoring with dedicated experts. Learn at your pace, focus on your goals, and achieve real-world expertise.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2">
                Book a Free Session <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-bold hover:bg-white/10 transition">
                Talk to Advisor
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-6 border-t border-white/5">
              {[
                { icon: <User className="w-4 h-4 text-orange-400" />, text: "100% Personalized" },
                { icon: <Calendar className="w-4 h-4 text-green-400" />, text: "Flexible Schedule" },
                { icon: <Briefcase className="w-4 h-4 text-blue-400" />, text: "Expert Mentors" },
                { icon: <TrendingUp className="w-4 h-4 text-pink-400" />, text: "Result Driven" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80" 
                className="w-full aspect-[4/3] object-cover" 
                alt="Mentorship" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-[#1e293b]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg"><Users className="w-5 h-5 text-purple-400" /></div>
                <div>
                  <p className="text-xs font-bold">1:1 Attention</p>
                  <p className="text-[10px] text-gray-400">Focused learning just for you</p>
                </div>
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-gray-700" />)}
                    </div>
                    <p className="text-xs font-bold text-white">5000+ <span className="text-gray-400 font-normal">Learners</span></p>
                 </div>
                 <div className="flex items-center gap-1 text-xs font-bold">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" /> 4.9/5
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🧩 WHY CHOOSE SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why Choose <span className="text-purple-400">1-on-1 Training?</span>
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { title: "Personalized Learning", desc: "Customized curriculum based on your goals.", icon: <User />, color: "text-blue-400", bg: "bg-blue-400/10" },
            { title: "Flexible Schedule", desc: "Learn at your convenience with flexible timings.", icon: <Calendar />, color: "text-green-400", bg: "bg-green-400/10" },
            { title: "Focused Attention", desc: "Get undivided attention from industry experts.", icon: <Target />, color: "text-purple-400", bg: "bg-purple-400/10" },
            { title: "Faster Progress", desc: "Work on weak areas and accelerate learning.", icon: <Rocket />, color: "text-orange-400", bg: "bg-orange-400/10" },
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-white/10 transition-all group">
              <div className={`w-12 h-12 rounded-xl ${f.bg} ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛤️ HOW IT WORKS (With Dotted Line) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-20">How It Works</h2>
        <div className="relative grid md:grid-cols-4 gap-8">
          {/* Horizontal line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] border-t-2 border-dashed border-white/10 -z-0" />
          
          {[
            { step: "Step 1", title: "Book a Free Session", desc: "Share your goals and choose a mentor.", color: "bg-blue-500" },
            { step: "Step 2", title: "Get Matched", desc: "We match you with the best expert for you.", color: "bg-purple-500" },
            { step: "Step 3", title: "Start Learning", desc: "Attend 1-on-1 sessions at your own pace.", color: "bg-pink-500" },
            { step: "Step 4", title: "Achieve Your Goals", desc: "Complete training and get certified.", color: "bg-green-500" },
          ].map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 text-white font-bold`}>
                {i + 1}
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${s.color.replace('bg-', 'text-')}`}>{s.step}</p>
              <h4 className="text-lg font-bold mb-3">{s.title}</h4>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💳 PRICING SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-16">1-on-1 Training Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Starter", price: "₹20,000", hours: "10 Hours of 1-on-1 Sessions", features: ["Personalized Curriculum", "Flexible Schedule", "Doubt Support"] },
            { title: "Professional", price: "₹50,000", hours: "25 Hours of 1-on-1 Sessions", features: ["All Starter Features", "Real-world Projects", "Priority Support", "Session Recordings"], highlight: true },
            { title: "Elite", price: "₹90,000", hours: "50 Hours of 1-on-1 Sessions", features: ["All Pro Features", "Resume Review", "Mock Interviews", "Placement Guidance"] },
          ].map((plan, i) => (
            <div key={i} className={`relative p-8 rounded-[2rem] border transition-all ${plan.highlight ? 'bg-[#0f172a] border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.15)] scale-105 z-10' : 'bg-white/5 border-white/10'}`}>
              {plan.highlight && (
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase">Most Popular</div>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
              <p className="text-3xl font-black mb-1">{plan.price}</p>
              <p className="text-xs text-gray-500 mb-8">{plan.hours}</p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-blue-500" /> {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white/5 text-blue-400 border border-blue-400/30 hover:bg-blue-400/10'}`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🏁 CAREER OUTCOMES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-16">Career Outcomes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { role: "Cloud Engineer", salary: "₹12L - ₹25L PA", icon: <Cloud /> },
            { role: "AI Engineer", salary: "₹15L - ₹30L PA", icon: <Cpu /> },
            { role: "DevOps Engineer", salary: "₹12L - ₹24L PA", icon: <Terminal /> },
          ].map((job, i) => (
            <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
               <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                  {job.icon}
               </div>
               <div>
                  <h4 className="font-bold">{job.role}</h4>
                  <p className="text-xs text-gray-400">{job.salary}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎯 FINAL CTA */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-purple-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to accelerate your career?</h2>
              <p className="text-blue-100/80 max-w-xl">Book a free 30-minute session with our training advisor and start your personalized learning journey today.</p>
           </div>
           <div className="relative z-10 flex flex-col items-center gap-4">
              <button className="px-10 py-4 bg-white text-blue-900 rounded-xl font-bold hover:shadow-2xl transition-all flex items-center gap-2 whitespace-nowrap">
                 Book a Free Session <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-blue-200">Trusted by 5000+ learners</p>
           </div>
           {/* Abstract Circles for CTA background */}
           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>

    </section>
  );
}