
import { HeroSection } from "@/components/sections/hero-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
