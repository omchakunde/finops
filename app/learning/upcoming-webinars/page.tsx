"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function UpcomingWebinarsPage() {
  const webinars = [
    {
      title: "Azure Cloud Deep Dive",
      date: "2026-05-10T18:00:00",
      speaker: "Rahul Sharma",
      category: "Cloud",
    },
    {
      title: "AI for Beginners",
      date: "2026-05-12T20:00:00",
      speaker: "Ankit Verma",
      category: "AI",
    },
    {
      title: "Cyber Security Essentials",
      date: "2026-05-15T19:00:00",
      speaker: "Priya Mehta",
      category: "Security",
    },
  ];

 const [timeLeft, setTimeLeft] = useState<Record<number, string>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const updated: any = {};

      webinars.forEach((webinar, i) => {
        const diff =
          new Date(webinar.date).getTime() - new Date().getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        updated[i] = `${days}d ${hours}h ${minutes}m`;
      });

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-b from-black via-[#020617] to-black text-white min-h-screen py-24 px-6">

      <div className="max-w-7xl mx-auto space-y-28">

        {/* 🔥 HERO */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Upcoming Webinars
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join live expert-led sessions and stay ahead with the latest technologies.
          </p>
        </div>

        {/* 🔍 FILTER */}
        <div className="flex justify-center gap-4 flex-wrap">
          {["All", "Cloud", "AI", "Security"].map((cat, i) => (
            <button
              key={i}
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-blue-500/20 transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🎥 WEBINAR CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {webinars.map((w, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.04 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition"
            >
              <div className="text-sm text-blue-400 mb-2">{w.category}</div>

              <h3 className="text-xl font-semibold mb-3">{w.title}</h3>

              <p className="text-gray-400 text-sm">
                Speaker: {w.speaker}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {new Date(w.date).toLocaleString()}
              </p>

              {/* ⏳ COUNTDOWN */}
              <div className="mt-4 text-yellow-400 font-medium">
                ⏳ Starts in: {timeLeft[i]}
              </div>

              {/* CTA */}
              <button className="mt-6 w-full py-3 bg-blue-500 rounded-xl hover:scale-105 transition">
                Register Now
              </button>
            </motion.div>
          ))}

        </div>

        {/* 📅 CALENDAR VIEW */}
        <div className="text-center">
          <h2 className="text-3xl mb-6">View All Dates</h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400">
              Calendar integration coming soon...
            </p>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Webinars Hosted", value: "10K+" },
            { label: "Avg Attendance", value: "85%" },
            { label: "Experts", value: "500+" },
            { label: "Countries", value: "40+" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-blue-400">{item.value}</h3>
              <p className="text-gray-400">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* 🔥 CTA */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Never Miss a Webinar
          </h2>

          <p className="text-gray-400 mb-6">
            Subscribe and get notified about upcoming sessions.
          </p>

          <div className="flex justify-center gap-4">
            <input
              placeholder="Enter your email"
              className="p-3 bg-black border border-white/10 rounded-lg"
            />
            <button className="px-6 py-3 bg-purple-500 rounded-lg hover:scale-105 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}