"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FiArrowRight, FiCheckCircle, FiCode, FiBarChart, FiPenTool, FiZap, FiUsers, FiAward, FiBriefcase 
} from "react-icons/fi";

export default function InternshipPage() {
  const categories = ["All Programs", "Development", "Data Science", "Design", "Marketing", "Business"];
  
  const internships = [
    { title: "Full Stack Development", icon: <FiCode />, color: "from-purple-500 to-indigo-600", tag: "Popular", duration: "3 Months", stipend: "₹10,000/mo" },
    { title: "Data Science & ML", icon: <FiBarChart />, color: "from-emerald-400 to-cyan-500", tag: "Trending", duration: "3 Months", stipend: "₹12,000/mo" },
    { title: "UI/UX Design", icon: <FiPenTool />, color: "from-orange-400 to-rose-500", tag: "New", duration: "2 Months", stipend: "₹8,000/mo" },
    { title: "Digital Marketing", icon: <FiZap />, color: "from-blue-400 to-indigo-500", tag: "New", duration: "2 Months", stipend: "₹7,000/mo" },
  ];

  return (
    <div className="bg-[#0b0f1a] text-white overflow-hidden font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative px-6 md:px-20 py-24 flex flex-col md:flex-row items-center gap-12 overflow-visible">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />

        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 z-10"
        >
          <span className="text-blue-400 font-semibold tracking-widest text-xs uppercase mb-4 block">
            Internship Programs
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Kickstart Your Career With <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Real-World Experience
            </span>
          </h1>
          <p className="text-gray-400 mt-6 text-lg max-w-lg leading-relaxed">
            Industry-oriented internships that help you learn, build and grow with expert mentors and real projects.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 transition-all rounded-full font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Explore Internships <FiArrowRight />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all backdrop-blur-sm">
              How It Works
            </button>
          </div>

          <div className="flex flex-wrap gap-6 mt-12">
            {[ 
              { icon: <FiCheckCircle />, text: "Real Projects" },
              { icon: <FiUsers />, text: "Expert Mentors" },
              { icon: <FiAward />, text: "Certificate" }
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-blue-400">{feat.icon}</span> {feat.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex-1 z-10"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/hero.jpg" alt="Students" width={600} height={500} className="object-cover" />
          </div>
          
          {/* Floating Glass Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl hidden md:block"
          >
            <p className="text-xs text-gray-400">Students Trained</p>
            <p className="text-xl font-bold">5000+</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl hidden md:block"
          >
            <p className="text-xs text-gray-400">Satisfaction Rate</p>
            <p className="text-xl font-bold">96% ⭐</p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- PROGRAMS SECTION --- */}
      <section className="bg-white text-[#0b0f1a] py-24 px-6 md:px-20 rounded-t-[60px] -mt-10 relative z-20">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">Our Internships</p>
          <h2 className="text-4xl font-extrabold">Explore Top Internship Programs</h2>
          <p className="text-gray-500 mt-2">Choose from a wide range of internships across in-demand technologies.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat, i) => (
            <button key={i} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {internships.map((job, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl shadow-gray-100 hover:shadow-2xl transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${job.color} text-white text-2xl shadow-lg`}>
                  {job.icon}
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full tracking-tighter">
                  {job.tag}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-4">{job.title} Internship</h3>
              
              <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-500 border-t border-gray-50 pt-4 mb-6">
                <div className="flex flex-col"><span className="text-[10px] uppercase font-semibold text-gray-400">Duration</span> 3 Months</div>
                <div className="flex flex-col"><span className="text-[10px] uppercase font-semibold text-gray-400">Mode</span> Remote</div>
                <div className="flex flex-col"><span className="text-[10px] uppercase font-semibold text-gray-400">Stipend</span> {job.stipend}</div>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Apply Now <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 py-12 border-t border-gray-100">
          {[
            { label: "Students", val: "5000+", icon: <FiUsers className="text-blue-500" /> },
            { label: "Expert Mentors", val: "200+", icon: <FiAward className="text-emerald-500" /> },
            { label: "Hiring Partners", val: "1000+", icon: <FiBriefcase className="text-orange-500" /> },
            { label: "Placement Rate", val: "96%", icon: <FiZap className="text-purple-500" /> },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="text-3xl mb-1">{stat.icon}</div>
              <h4 className="text-3xl font-black">{stat.val}</h4>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- READY TO LAUNCH CTA --- */}
      <section className="px-6 md:px-20 py-20 bg-white">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Rocket Decoration */}
          <div className="absolute top-0 right-0 p-12 opacity-20 transform translate-x-1/4 -translate-y-1/4">
             <FiZap size={200} />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ready to Launch Your Career?</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">Join thousands of learners who are building their future with our industry-led internships.</p>
          
          <button className="bg-white text-blue-600 px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto">
            Apply Now <FiArrowRight />
          </button>
        </motion.div>
      </section>
      
    </div>
  );
}