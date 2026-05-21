"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Award, Star, ArrowUpRight } from "lucide-react";

const awards = [
  {
    title: "EC-Council ATC of the Year",
    year: "2024",
    category: "Featured",
    image: "/EC-Council ATC of the Year.jpeg",
    color: "from-purple-600/20 to-blue-500/20"
  },
  {
    title: "PECB Titanium Partner Award",
    year: "2024",
    category: "Titanium",
    image: "/PECB Titanium Partner Award.jpg",
    color: "from-blue-600/20 to-cyan-500/20"
  },
  {
    title: "Great Place to Work Certified",
    year: "2026",
    category: "Global",
    image: "/Great Place to Work.jpg",
    color: "from-purple-600/20 to-indigo-500/20"
  },
  {
    title: "Excellence in Training",
    year: "2025",
    category: "Excellence",
    image: "/Training Excellence.jpg",
    color: "from-fuchsia-600/20 to-pink-500/20"
  },
];

export default function Awards() {
  return (
    <section className="relative py-24 bg-[#050212] overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION - Matching Dashboard Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                <Trophy size={20} className="text-purple-400 fill-purple-400/20" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Awards & Accolades</h2>
            </div>
            <p className="text-gray-500 text-sm ml-1">
              Recognitions for driving innovation and excellence in professional education.
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400 hover:text-white transition-all group">
            View All Recognitions <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* PREMIUM GRID */}
        <div className="grid md:grid-cols-4 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-2xl transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Card Spotlight Background Glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${award.color} blur-3xl -z-10`} />

              {/* TOP TAG & ICON */}
              <div className="flex justify-between items-center mb-10">
                 <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-purple-500/50 transition-colors">
                    <Award className="w-5 h-5 text-purple-400" />
                 </div>
                 <span className="premium-badge">{award.category}</span>
              </div>

              {/* IMAGE AREA - Grayscale to Color */}
              <div className="relative w-full h-32 mb-8 flex items-center justify-center">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="space-y-4">
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-purple-300 transition-colors">
                  {award.title}
                </h3>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-yellow-500 text-[10px] font-black uppercase tracking-widest">
                    <Star size={12} fill="currentColor" /> Premier Partner
                  </div>
                  <span className="text-gray-500 text-xs font-medium">{award.year}</span>
                </div>
              </div>

              {/* Decorative Corner Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight size={14} className="text-purple-400" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}