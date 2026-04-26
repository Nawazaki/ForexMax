"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/app/actions/auth";
import { Mail, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null, message: string }>({ type: null, message: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const result = await requestPasswordReset(formData);

    if (result.error) {
      setStatus({ type: "error", message: result.error });
      setLoading(false);
    } else {
      setStatus({ type: "success", message: "Reset link sent! Please check your email." });
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden relative z-10 p-8 md:p-12 text-center">
        <div className="inline-flex p-3 bg-zinc-800/50 rounded-2xl mb-6 border border-zinc-700">
          <Mail className="h-10 w-10 text-emerald-500" />
        </div>

        <h1 className="text-3xl font-black text-white mb-4">Reset Password</h1>
        <p className="text-zinc-400 font-medium mb-8">Enter your email and we'll send you a secure link to reset your password.</p>

        {status.type && (
          <div className={`flex items-center gap-3 p-4 rounded-2xl text-sm mb-6 font-semibold animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {status.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input 
                type="email" name="email" required 
                className="w-full pl-12 pr-4 py-3.5 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-md outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-600 font-medium" 
                placeholder="name@example.com"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading} 
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-500 disabled:opacity-30 transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 group"
          >
            {loading ? "Sending..." : "Send Reset Link"} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <Link href="/login" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
