import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Navbar } from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ForexMax | Premium SMC Trading Community & Broker Reviews",
    template: "%s | ForexMax",
  },
  description: "Elevate your trading with ForexMax. The premier hub for Smart Money Concepts (SMC), professional prop firm evaluations, and unbiased broker reviews. Master institutional order flow and scale your capital with the elite.",
  keywords: [
    "Forex trading", 
    "SMC Trading", 
    "Smart Money Concepts", 
    "Prop Firms", 
    "Best Forex Brokers", 
    "Prop Firm Reviews", 
    "Trading Strategies", 
    "Institutional Trading", 
    "Order Flow", 
    "Liquidity"
  ],
  authors: [{ name: "ForexMax Team" }],
  openGraph: {
    title: "ForexMax | Premium SMC Trading Community & Broker Reviews",
    description: "Master the markets with institutional-grade SMC strategies and vetted prop firm reviews.",
    url: "https://forexmax.com",
    siteName: "ForexMax",
    images: [
      {
        url: "https://forexmax.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ForexMax Premium Trading Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ForexMax | Premium SMC Trading",
    description: "Join the elite circle of SMC traders and find the best prop firms.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased`}>
        <Providers>
          <header>
            <Navbar />
          </header>
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
