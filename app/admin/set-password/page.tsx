"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function SetAdminPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (saving) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/admin/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Password set successfully. Please login.");
        router.push("/login");
      } else {
        alert(data.message || "Unable to set password");
      }
    } catch (error) {
      console.log(error);
      alert("Unable to set password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#05070d] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-8">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-6">
          <ShieldCheck size={28} />
        </div>

        <h1 className="text-3xl font-bold">Set Admin Password</h1>
        <p className="text-slate-300 mt-2 mb-6">
          Create your password to activate the admin account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            minLength={6}
            required
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl bg-white/10 border border-white/15 px-5 py-4 outline-none"
          />

          <input
            type="password"
            minLength={6}
            required
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-2xl bg-white/10 border border-white/15 px-5 py-4 outline-none"
          />

          <button
            type="submit"
            disabled={saving || !token}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-900 disabled:text-slate-400 transition rounded-2xl py-4 font-semibold"
          >
            {saving ? "Saving..." : "Set Password"}
          </button>
        </form>
      </div>
    </section>
  );
}