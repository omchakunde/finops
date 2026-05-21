"use client";

import { motion } from "framer-motion";
import { 
  MapPin, Users, Star, Award, Zap, BookOpen, 
  ArrowRight, CheckCircle, GraduationCap, Clock 
} from "lucide-react";

export default function ClassroomTrainingPage() {
  return (
    <section className="bg-[#020617] text-white min-h-screen pb-20 selection:bg-blue-500/30">
      
      {/* 🚀 HERO SECTION */}
      <div className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1 rounded-md bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
              Classroom Training
            </div>
            <h1 className="text-6xl font-extrabold leading-tight">
              Classroom <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Training
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Learn from industry experts in a collaborative environment with hands-on training and real classroom experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2">
                Find a Location <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-bold hover:bg-white/10 transition">
                View All Courses
              </button>
            </div>

            {/* Sub-features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Users className="w-4 h-4 text-blue-400" /> Expert Instructors
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Zap className="w-4 h-4 text-purple-400" /> Hands-on Learning
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Star className="w-4 h-4 text-yellow-400" /> Interactive Sessions
              </div>
            </div>
          </motion.div>

          {/* Hero Video/Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" 
              className="w-full aspect-video object-cover" 
              alt="Classroom" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-600" />)}
                </div>
                <div className="text-xs">
                   <p className="font-bold">25,000+</p>
                   <p className="text-gray-400">Learners Trained</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-xs">
                   <p className="font-bold">4.9/5</p>
                   <p className="text-gray-400">Rated by Learners</p>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 📊 STATS BAR */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          {[
            { label: "Years of Excellence", val: "15+", icon: "🏆" },
            { label: "Classroom Locations", val: "100+", icon: "📍" },
            { label: "Expert Trainers", val: "500+", icon: "👨‍🏫" },
            { label: "Professionals Trained", val: "50,000+", icon: "👥" },
            { label: "Learner Satisfaction", val: "98%", icon: "✅" },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <p className="text-2xl font-bold text-white">{stat.val}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🧩 FEATURES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why Choose <span className="text-blue-400">Classroom Training?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Face-to-Face Learning", desc: "Learn directly from experts and get your queries resolved instantly.", color: "bg-blue-500" },
            { title: "Hands-on Practice", desc: "Work on real-time projects with industry-grade tools.", color: "bg-purple-500" },
            { title: "Collaborative Environment", desc: "Engage with peers, share ideas and grow together.", color: "bg-green-500" },
            { title: "Immediate Feedback", desc: "Get real-time feedback to improve and master concepts.", color: "bg-yellow-500" },
            { title: "Structured Curriculum", desc: "Well-designed training path aligned with industry needs.", color: "bg-pink-500" },
            { title: "Certification", desc: "Earn globally recognized certification to boost your career.", color: "bg-orange-500" },
          ].map((f, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-blue-500/30 transition-all">
              <div className={`w-10 h-10 ${f.color} rounded-lg mb-6 flex items-center justify-center opacity-80 shadow-lg shadow-black/50`}>
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📚 POPULAR COURSES */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold">Popular Classroom Courses</h2>
            <button className="text-blue-400 flex items-center gap-2 text-sm hover:underline">View All Courses <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: "AWS Solutions Architect", price: "₹ 32,999", brand: "aws" },
              { name: "Microsoft Azure Admin", price: "₹ 28,999", brand: "azure" },
              { name: "Cisco CCNA Networking", price: "₹ 24,999", brand: "cisco" },
              { name: "CompTIA Security+", price: "₹ 22,999", brand: "comptia" },
              { name: "Red Hat System Admin", price: "₹ 27,999", brand: "redhat" },
            ].map((course, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center space-y-4">
                <div className="h-12 flex items-center justify-center grayscale brightness-200 opacity-50">
                   <BookOpen className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm h-10 flex items-center justify-center">{course.name}</h4>
                <div className="text-[10px] text-gray-500 flex items-center justify-center gap-2">
                   <Clock className="w-3 h-3" /> 5 Days
                </div>
                <p className="text-lg font-bold text-blue-400">{course.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📍 LOCATIONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold">Our Classroom Locations</h2>
          <button className="text-blue-400 flex items-center gap-2 text-sm hover:underline">View All Locations <ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { city: "Mumbai", courses: "12+ Courses", img: "https://images.unsplash.com/photo-1570160897040-30430ade2218?q=80&w=400" },
            { city: "Delhi", courses: "10+ Courses", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=400" },
            { city: "Bangalore", courses: "15+ Courses", img: "https://images.unsplash.com/photo-1596761303500-8942e355b19d?q=80&w=400" },
            { city: "Hyderabad", courses: "8+ Courses", img: "https://images.unsplash.com/photo-1605149059405-dc1f0163bb4a?q=80&w=400" },
            { city: "Pune", courses: "10+ Courses", img: "https://images.unsplash.com/photo-1582533089852-0243ed2adbb4?q=80&w=400" },
          ].map((loc, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-white/10">
               <img src={loc.img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={loc.city} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 p-4 flex flex-col justify-end">
                  <p className="text-sm font-bold flex items-center gap-1"><MapPin className="w-3 h-3 text-red-500" /> {loc.city}</p>
                  <p className="text-[10px] text-gray-400">{loc.courses}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏁 FINAL CTA */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 relative overflow-hidden flex flex-col items-center text-center">
           <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
           <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-8 flex items-center justify-center shadow-2xl">
              <GraduationCap className="w-8 h-8 text-white" />
           </div>
           <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to start your learning journey?</h2>
           <p className="text-gray-400 max-w-2xl mb-10">Join our classroom training and accelerate your career with expert guidance and industry-standard hands-on labs.</p>
           <button className="px-10 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl flex items-center gap-2">
              Find a Location Near You <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </section>

    </section>
  );
}