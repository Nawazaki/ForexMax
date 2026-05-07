import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Star, Filter, ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";

export default async function PropFirmsPage() {
  // Fetch all prop firms from the database
  const propFirms = await prisma.propFirm.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* PREMIUM AMBIENT BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 max-w-7xl">
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6 border border-emerald-500/20 backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified Capital Providers
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Prop <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-500">Firms</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Compare the world's most reliable proprietary trading firms. Secure high-capital funding and scale your trading career.
          </p>
        </div>

        {/* FILTERS SECTION (UI Only) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm font-bold cursor-pointer hover:border-emerald-500/50 transition-all">
            <Filter className="h-4 w-4" /> All Firms
          </div>
          {["1-Step", "2-Step", "Instant Funding", "Low Spread", "SMC Friendly"].map((filter) => (
            <button 
              key={filter} 
              className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 text-sm font-bold hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all backdrop-blur-md"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* COMPARISON GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {propFirms.map((firm) => (
            <div 
              key={firm.id} 
              className="group relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Firm Identity */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                      {firm.logoUrl ? (
                        <Image src={firm.logoUrl} alt={firm.name} fill className="object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-zinc-800">
                          <Award className="h-8 w-8 text-zinc-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight">{firm.name}</h3>
                      <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                        <Star className="h-4 w-4 fill-current" /> {firm.rating}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-1">Max Leverage</p>
                    <p className="text-white font-bold text-lg">{firm.maxLeverage}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black mb-1">Types</p>
                    <p className="text-white font-bold text-sm leading-tight">{firm.challengeTypes}</p>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-auto space-y-4">
                  <Link 
                    href={firm.affiliateLink} 
                    target="_blank"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black rounded-2xl hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-900/20 group-hover:shadow-emerald-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Funded <Zap className="h-4 w-4 fill-current" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> 
                    Verified Payouts & Regulation
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {propFirms.length === 0 && (
            <div className="col-span-full py-32 text-center bg-zinc-900/50 border border-zinc-800 rounded-[3rem] backdrop-blur-sm">
              <div className="inline-flex p-5 bg-zinc-800 rounded-3xl mb-6">
                <Award className="h-12 w-12 text-zinc-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Firms Listed</h3>
              <p className="text-zinc-500 max-w-md mx-auto px-4">
                We are currently vetting the best prop firms in the market. Check back soon for the elite list.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
