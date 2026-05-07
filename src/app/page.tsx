import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
      
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Zap className="h-3 w-3 fill-current" /> Next-Gen Trading Hub
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
          Forex<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Max</span>
        </h1>
        
        <p className="max-w-2xl text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
          Master the markets with institutional-grade SMC strategies, verified prop firm evaluations, and elite broker reviews. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/prop-firms" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-900/20"
          >
            Explore Prop Firms <ArrowRight className="h-5 w-5" />
          </Link>
          <Link 
            href="/brokers" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-md"
          >
            Compare Brokers
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full text-left">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
            <TrendingUp className="h-8 w-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">SMC Strategies</h3>
            <p className="text-zinc-500 text-sm">Advanced Smart Money Concepts to track institutional order flow.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
            <Shield className="h-8 w-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Vetted Reviews</h3>
            <p className="text-zinc-500 text-sm">Only the most reliable brokers and firms make it to our list.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
            <Zap className="h-8 w-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Capital</h3>
            <p className="text-zinc-500 text-sm">Direct paths to securing high-capital funding challenges.</p>
          </div>
        </div>
      </main>
    </div>
  );
}