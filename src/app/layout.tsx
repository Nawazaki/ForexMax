import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Navbar } from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ForexMax | Premium SMC & Forex Trading Community",
    template: "%s | ForexMax",
  },
  description: "Join the elite circle of SMC traders. Access high-end trading strategies, trusted prop firm broker reviews, and an exclusive community dedicated to mastering the Forex markets.",
  keywords: ["Forex trading", "SMC Trading", "Smart Money Concepts", "Prop Firms", "Best Forex Brokers", "Trading Strategies", "Forex Community", "Technical Analysis"],
  authors: [{ name: "ForexMax Team" }],
  openGraph: {
    title: "ForexMax | Master the Markets",
    description: "The ultimate high-end community for serious forex traders and SMC specialists.",
    url: "https://forexmax.com",
    siteName: "ForexMax",
    images: [
      {
        url: "https://forexmax.com/og-image.jpg", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "ForexMax Trading Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ForexMax | Premium SMC Trading",
    description: "Join the elite circle of SMC traders.",
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
          {/* Footer would go here */}
        </Providers>
      </body>
    </html>
  );
}
