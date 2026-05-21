"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  Star,
  Clock,
  Users,
  ChevronRight,
  Zap,
  LayoutGrid,
  Shield,
  Cpu,
  Cloud,
  Globe,
} from "lucide-react";

/* ===== TECHNOLOGIES ===== */

const technologies = [
  {
    title: "Microsoft 365",
    slug: "microsoft-365",
    icon: <Cloud size={18} />,
  },

  {
    title: "Security",
    slug: "security",
    icon: <Shield size={18} />,
  },

  {
    title: "AI & Data",
    slug: "artificial-intelligence",
    icon: <Cpu size={18} />,
  },

  {
    title: "Azure Cloud",
    slug: "azure",
    icon: <Globe size={18} />,
  },

  {
    title: "Business Skills",
    slug: "business-skills",
    icon: <Zap size={18} />,
  },
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState("Top Courses");

  // DYNAMIC COURSES
  const [courses, setCourses] = useState<any[]>([]);

  // FETCH COURSES
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");

      const data = await res.json();

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative py-24 bg-[#050212] overflow-hidden min-h-screen">

      <div className="mesh-glow opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">

                <Zap size={18} className="text-white fill-white" />

              </div>

              <h2 className="text-3xl font-bold text-white tracking-tight">
                Top Courses
              </h2>

            </div>

            <p className="text-gray-500 text-sm max-w-md">
              Explore our most in-demand and high-impact specialized courses.
            </p>

          </div>

          <Link href="/courses">

            <button className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">

              View All Courses

              <ChevronRight size={14} />

            </button>

          </Link>

        </div>

        {/* TAB SWITCHER */}
        <div className="flex gap-2 mb-10 p-1 bg-white/5 w-fit rounded-2xl border border-white/5">

          {["Top Courses", "Top Technologies", "New & Trending"].map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {tab}
            </button>

          ))}

        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* COURSE LIST */}
          <div className="flex-1 grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {courses.map((course, i) => (

              <Link key={i} href={`/courses/${course.slug}`}>

                <motion.div
                  whileHover={{ y: -8 }}
                  className="course-card p-6 flex flex-col h-full cursor-pointer group"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start mb-8">

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">

                      <LayoutGrid
                        size={20}
                        className="text-white/90"
                      />

                    </div>

                    <span className="premium-badge">
                      {course.badge}
                    </span>

                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-purple-400 transition-colors text-white">

                    {course.title}

                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-gray-500 text-[11px] mb-8 flex-grow">

                    {course.description}

                  </p>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">

                    <div className="flex items-center gap-3 text-[10px] font-medium text-gray-500">

                      <div className="flex items-center gap-1">

                        <Clock size={12} />

                        {course.duration}

                      </div>

                      <div className="flex items-center gap-1">

                        <Users size={12} />

                        {course.enrolled}

                      </div>

                    </div>

                    <div className="flex items-center gap-1 text-yellow-500 text-[11px] font-bold">

                      <Star size={12} fill="currentColor" />

                      4.9

                    </div>

                  </div>

                </motion.div>

              </Link>

            ))}

          </div>

          {/* SIDEBAR */}
          <aside className="lg:w-[320px] course-card p-6 bg-white/[0.02] flex flex-col h-auto">

            <div className="mb-8">

              <div className="flex items-center gap-2 mb-2">

                <div className="w-5 h-5 bg-purple-600 rounded-md flex items-center justify-center text-[10px] font-black italic text-white">
                  f
                </div>

                <h3 className="font-bold text-white text-sm">
                  Top Technologies
                </h3>

              </div>

              <p className="text-[10px] text-gray-500">
                Master the tools of the trade.
              </p>

            </div>

            <div className="flex-1 flex flex-col gap-4">

              {technologies.map((tech, i) => (

                <Link
                  key={i}
                  href={`/technologies/${tech.slug}`}
                  className="block"
                >

                  <motion.div
                    whileHover={{
                      x: 5,
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                    }}
                    className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer border border-white/5 group transition-all"
                  >

                    <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center text-purple-400 border border-white/5 group-hover:border-purple-500/50 transition-all">

                      {tech.icon}

                    </div>

                    <div className="flex flex-col">

                      <span className="text-[11px] font-bold text-white uppercase tracking-wider">

                        {tech.title}

                      </span>

                      <span className="text-[9px] text-gray-500 font-medium">
                        Explore Certifications
                      </span>

                    </div>

                    <ChevronRight
                      size={14}
                      className="ml-auto text-gray-700 group-hover:text-purple-400"
                    />

                  </motion.div>

                </Link>

              ))}

            </div>

            <div className="mt-8">

              <Link href="/technologies">

                <button className="w-full py-4 rounded-xl bg-purple-600/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-2">

                  View All Technologies

                  <ChevronRight size={12} />

                </button>

              </Link>

            </div>

          </aside>

        </div>

      </div>

    </section>
  );
}