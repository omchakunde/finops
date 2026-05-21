"use client";

import { motion } from "framer-motion";
import { Laptop, Users, Building2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const options = [
  {
    title: "Live Online Training",
    desc: "Interactive live sessions with industry experts and real-time Q&A.",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=800",
    icon: <Laptop className="w-5 h-5 text-purple-400" />,
    link: "/learning/live-online-training"
  },
  {
    title: "1-on-1 Training",
    desc: "Personalized mentorship and tailored curriculum for accelerated growth.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    icon: <Users className="w-5 h-5 text-blue-400" />,
    link: "/learning/one-on-one-training"
  },
  {
    title: "Classroom Training",
    desc: "Immersive in-person learning experience at our world-class facilities.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    icon: <Building2 className="w-5 h-5 text-pink-400" />,
    link: "/learning/classroom-training"
  },
];

export default function LearningOptions() {

  const router = useRouter();

  return (
    <section className="relative py-20 bg-[#050212] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Learning Options
            </h2>
            <p className="text-gray-500 text-sm">
              We provide flexible learning modes to suit your professional needs and schedule.
            </p>
          </div>

          {/* Optional: You can connect this later */}
          <button className="text-purple-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
            View All Options <ArrowRight size={14} />
          </button>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {options.map((item, i) => (
           <motion.div
  key={i}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -5 }}
  onClick={() => router.push(item.link)}
  className="group relative h-[320px] rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
>
              {/* Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/20 group-hover:border-purple-500/50 transition-all duration-500">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-all">
                  Explore Mode
                  <div className="w-0 h-px bg-white group-hover:w-8 transition-all duration-500" />
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/30 rounded-3xl transition-all pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}