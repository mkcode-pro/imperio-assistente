import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { Footer } from "@/components/layout/footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="w-full">
        <HeroSection />
      </main>
      
      <Footer />
      
      {/* Faixa inferior com gradiente do Paraguai */}
      <div className="h-2 bg-paraguay-bottom fixed bottom-0 left-0 right-0 z-40"></div>
    </div>
  );
}
