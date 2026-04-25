import { Footer } from "../../components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
} 