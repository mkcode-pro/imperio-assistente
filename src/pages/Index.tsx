
import { HeroSection } from "@/components/sections/hero-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingAssistantButton } from "@/components/floating-assistant-button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <HeroSection />
      </main>
      <Footer />
      
      {/* Botão flutuante sempre acessível */}
      <FloatingAssistantButton />
    </div>
  );
};

export default Index;
