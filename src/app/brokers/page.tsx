import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight, Star, ShieldCheck, Filter } from "lucide-react";

export default async function BrokersPage() {
  // Fetch all brokers from the database
  const brokers = await prisma.broker.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* PREMIUM AMBIENT BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 max-w-7xl">
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6 border border-emerald-500/20 backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" /> Trusted & Regulated
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-500">Brokers</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Sourcing the world's most transparent brokers with the tightest spreads and institutional-grade regulation.
          </p>
        </div>

        {/* FILTERS SECTION (UI Only) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm font-bold cursor-pointer hover:border-emerald-500/50 transition-all">
            <Filter className="h-4 w-4" /> All Brokers
          </div>
          {["FCA Regulated", "Raw Spreads", "Low Min Deposit", "SMC Optimized", "Crypto Trading"].map((filter) => (
            <button 
              key={filter} 
              className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 text-sm font-bold hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all backdrop-blur-md"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* BROKERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brokers.map((broker) => (
            <div 
              key={broker.id} 
              className="group relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Identity Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                      {/* @ts-ignore - logoUrl is optional in schema */}
                      {broker.logoUrl ? (
                        <Image src={broker.logoUrl} alt={broker.name} fill className="object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-zinc-800">
                          <Building2 className="h-8 w-8 text-zinc-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight">{broker.name}</h3>
                      <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                        <Star className="h-4 w-4 fill-current" /> {broker.rating}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="h-3 w-3" /> {broker.regulationType}
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-1">Expected Spread</p>
                    <p className="text-white font-bold text-lg">{broker.expectedSpread}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-1">Min Deposit</p>
                    <p className="text-white font-bold text-lg">{broker.minDeposit}</p>
                  </div>
                </div>

                {/* Action Area */}
                <div className="mt-auto">
                  <Link 
                    href={broker.ibLink} 
                    target="_blank"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black rounded-2xl hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-900/20 group-hover:shadow-emerald-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Open Account <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {brokers.length === 0 && (
            <div className="col-span-full py-32 text-center bg-zinc-900/50 border border-zinc-800 rounded-[3rem] backdrop-blur-sm">
              <div className="inline-flex p-5 bg-zinc-800 rounded-3xl mb-6">
                <Building2 className="h-12 w-12 text-zinc-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Brokers Listed</h3>
              <p className="text-zinc-500 max-w-md mx-auto px-4">
                We are currently auditing the most reliable brokers in the industry. Check back shortly for our vetted list.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}