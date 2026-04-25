"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Camera, Save, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johntrades",
    email: "john@example.com",
    password: "",
    confirmPassword: "",
  });

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Logic to call update-user server action
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl bg-zinc-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar / User Header */}
          <div className="md:w-1/3 bg-zinc-900/60 p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800 text-center md:text-left">
            <div className="relative inline-block group mx-auto md:mx-0">
              <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-emerald-500 to-purple-600 p-1 shadow-xl shadow-emerald-500/20">
                <div className="h-full w-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <User className="h-16 w-16 text-zinc-500" />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-emerald-500 text-white rounded-full hover:scale-110 transition-all shadow-lg shadow-emerald-500/40">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6">
              <h1 className="text-2xl font-black text-white tracking-tight">{form.firstName} {form.lastName}</h1>
              <p className="text-emerald-500 font-bold text-sm mb-6">@{form.username}</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-zinc-400 text-sm p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50">
                  <Mail className="h-4 w-4" /> {form.email}
                </div>
                <div className="flex items-center gap-3 text-zinc-400 text-sm p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified Member
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
              Account Settings <div className="h-1 w-12 bg-emerald-500 rounded-full" />
            </h2>

            <form onSubmit={handleUpdate} className="space-y-10">
              {/* Personal Info */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-400 ml-1">First Name</label>
                    <input 
                      type="text" value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white outline-none focus:border-emerald-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-400 ml-1">Last Name</label>
                    <input 
                      type="text" value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white outline-none focus:border-emerald-500 transition-all" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-zinc-400 ml-1">Username</label>
                    <input 
                      type="text" value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white outline-none focus:border-emerald-500 transition-all" 
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Security & Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-400 ml-1">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <input 
                        type="password" placeholder="••••••••"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white outline-none focus:border-emerald-500 transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-400 ml-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <input 
                        type="password" placeholder="••••••••"
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white outline-none focus:border-emerald-500 transition-all" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Saving..." : <><Save className="h-5 w-5" /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
