"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/app/actions/auth"; // تأكد من صحة مسار الاستدعاء لديك
import { Lock, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    
    // التقاط التوكن من الرابط وإضافته للبيانات (هذا هو السطر السري الذي نسيه Ollama!)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    formData.append("token", token || "");

    const result = await resetPassword(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden relative z-10 p-8 md:p-12 text-center">
        <div className="inline-flex p-3 bg-zinc-800/50 rounded-2xl mb-6 border border-zinc-700">
          <Lock className="h-10 w-10 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-black text-white mb-4">Set New Password</h1>
        <p className="text-zinc-400 font-medium mb-8">Please choose a strong password to secure your account.</p>
        
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 text-red-400 p-4 rounded-2xl text-sm mb-6 border border-red-500/20 font-semibold animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
          </div>
        )}
        
        {success ? (
          <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
            <div className="p-4 bg-emerald-500/20 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">Password Updated!</h2>
            <p className="text-zinc-400">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"} name="password" required
                    className="w-full pl-12 pr-12 py-3.5 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-600 font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-left">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"} name="confirmPassword" required
                    className="w-full pl-12 pr-12 py-3.5 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-600 font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-500 disabled:opacity-30 transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 group"
            >
              {loading ? "Updating..." : "Update Password"} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}