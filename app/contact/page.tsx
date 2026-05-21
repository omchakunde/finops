"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Message failed");
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setStatus("Message sent successfully. Our team will reply soon.");
    } catch (error: any) {
      setStatus(error.message || "Message failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-28 overflow-hidden">

      {/* SAME BACKGROUND SYSTEM */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050212] via-[#0B0F1A] to-black" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HERO CONTACT SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-block px-4 py-1 mb-6 rounded-full 
            bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
              Contact Us
            </div>

            <h1 className="text-5xl font-bold text-white leading-tight">
              Let’s Talk About{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Your Growth
              </span>
            </h1>

            <p className="mt-6 text-gray-400 max-w-lg">
              Whether you want to enroll, partner, or scale your team —
              we’re here to help you succeed.
            </p>

            {/* CONTACT OPTIONS */}
            <div className="mt-10 space-y-5">

              {[
                { icon: Mail, title: "Customer Support", value: "info@finops.com" },
                { icon: Phone, title: "Ask HR", value: "hr@finops.com" },
                { icon: MapPin, title: "After Course Support", value: "support@finops.com" },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl 
                    bg-white/5 border border-white/10 
                    hover:bg-white/10 transition"
                  >
                    <Icon className="text-purple-400 w-5 h-5" />

                    <div>
                      <p className="text-white text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </motion.div>

          {/* RIGHT FORM (LIKE HERO CARD) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/10 
            bg-white/5 backdrop-blur-xl p-8 
            shadow-[0_0_60px_rgba(124,58,237,0.2)]"
          >

            <h2 className="text-white font-semibold mb-6">
              Send a Message
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
                className="w-full px-5 py-3 rounded-lg 
                bg-white/5 border border-white/10 text-white 
                focus:border-purple-500/40 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
                className="w-full px-5 py-3 rounded-lg 
                bg-white/5 border border-white/10 text-white 
                focus:border-cyan-400/40 outline-none"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                required
                className="w-full px-5 py-3 rounded-lg 
                bg-white/5 border border-white/10 text-white 
                focus:border-purple-500/40 outline-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg text-white 
                bg-gradient-to-r from-purple-500 to-cyan-400 
                hover:opacity-90 transition disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className="text-sm text-cyan-200">
                  {status}
                </p>
              )}

            </form>
          </motion.div>

        </div>

        {/* LOCATION FILTER */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            {["India", "Europe", "Asia", "USA"].map((tab, i) => (
              <button
                key={i}
                className={`px-4 py-1 rounded-full text-sm ${
                  i === 0
                    ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* OFFICE CARDS */}
        <div className="grid md:grid-cols-4 gap-6">

          {["Gurugram", "New Delhi", "Bangalore", "Chennai"].map((city, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 border border-white/10 
              hover:border-purple-500/40 hover:bg-white/10 transition"
            >
              <h3 className="text-white font-semibold mb-2">{city}</h3>

              <p className="text-gray-400 text-sm mb-4">
                Office details and contact info here
              </p>

              <button className="text-sm text-white border-b border-white/20 hover:border-white">
                View Direction
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
