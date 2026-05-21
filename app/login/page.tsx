"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function getDeviceId() {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Prevent multiple clicks
    if (loading) return;

    setLoading(true);

    try {
      const deviceId = getDeviceId();

      const res = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          deviceId,
        }),
      });

      // ✅ Handle failed response
      const data = await res.json();

      if (res.ok && data.success) {
        alert("Login successful 🚀");

        // ✅ Store logged-in user
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Store session token
        if (data.sessionToken) {
          localStorage.setItem(
            "sessionToken",
            data.sessionToken
          );
        }

        localStorage.setItem("deviceId", deviceId);

        // ✅ Redirect based on role
       if (data.user.role === "admin") {
  router.push("/admin-page");
} else {
  router.push("/");
}

      } else {
        alert(data.message || "Invalid credentials ❌");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      alert("Something went wrong ❌");

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white px-4">

      {/* BACKGROUND */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl 
        bg-white/5 backdrop-blur-2xl border border-white/10"
      >

        {/* HEADING */}
        <h2 className="text-3xl font-semibold text-center mb-10">
          Welcome Back 👋
        </h2>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-blue-500"
            placeholder="Email"
          />

          {/* PASSWORD */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 pr-12 outline-none focus:border-blue-500"
              placeholder="Password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-lg"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50 hover:scale-[1.02] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* SIGNUP LINK */}
        <p className="text-sm text-center mt-6 text-gray-300">
          Don’t have an account?{" "}

          <span
            onClick={() => router.push("/signup")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>

      </motion.div>
    </section>
  );
}
