
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, ExternalLink, Brain, Sparkles } from "lucide-react";
import { AssistantModal } from "@/components/assistant/assistant-modal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatClick = () => {
    setIsModalOpen(true);
  };

  const goToStore = () => {
    window.open('https://www.loja.imperiopharma.com.py', '_blank');
  };

  return (
    <section className="bg-hero-gradient text-white min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] pt-4 sm:pt-8 pb-8 sm:pb-16 overflow-hidden">
      <div className="mobile-container">
        <div className="text-center space-y-4 sm:space-y-8">
          {/* Badge de IA */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-pharma-blue/20 text-pharma-blue px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium border border-pharma-blue/30">
            <Brain className="h-3 w-3 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">INTELIGÊNCIA ARTIFICIAL AVANÇADA</span>
            <span className="sm:hidden">IA AVANÇADA</span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          
          {/* Título Principal */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">ASSISTENTE</span><br />
              <span className="text-pharma-blue">MAROMBA IA</span>
            </h1>
            
            <p className="text-sm sm:text-xl md:text-2xl text-white/90 leading-relaxed px-2">
              Protocolos Ergogênicos Personalizados por Inteligência Artificial
            </p>
            
            <p className="text-xs sm:text-lg text-white/80 px-2 sm:px-4 max-w-2xl mx-auto">
              Nossa IA analisa seu perfil e objetivos para criar protocolos únicos e eficazes, 
              baseados em ciência e experiência profissional.
            </p>
          </div>

          {/* Imagem do Robô - Mobile Optimized */}
          <div className="my-6 sm:my-12">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto">
              <div className="absolute inset-0 bg-pharma-blue/20 rounded-full animate-pulse"></div>
              <img 
                src="/src/assets/robozinho-maromba.png" 
                alt="Assistente Maromba IA" 
                className="relative z-10 w-full h-full object-cover rounded-full border-2 sm:border-4 border-pharma-blue/50"
              />
            </div>
          </div>

          {/* CTAs Principais - Mobile Optimized */}
          <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4 px-2">
            <Button 
              onClick={handleChatClick} 
              size="lg" 
              className="bg-pharma-blue text-white hover:bg-pharma-blue/90 shadow-lg text-sm sm:text-lg px-6 py-3 sm:px-8 sm:py-4 h-auto w-full font-bold transform hover:scale-105 transition-all touch-target"
            >
              <MessageCircle className="mr-2 sm:mr-3 h-4 w-4 sm:h-6 sm:w-6" />
              INICIAR CONSULTA GRATUITA
            </Button>
            
            <Button 
              onClick={goToStore}
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-pharma-navy text-sm sm:text-lg px-6 py-3 sm:px-8 sm:py-4 h-auto w-full font-semibold transition-all touch-target"
            >
              <ExternalLink className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Comprar na Loja Oficial
            </Button>
          </div>

          {/* Features - Mobile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-16 text-center px-2">
            <div className="space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pharma-blue/20 rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-pharma-blue" />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-pharma-blue">IA Especializada</h3>
              <p className="text-white/80 text-xs sm:text-sm">Treinada com dados de profissionais experientes</p>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pharma-blue/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-pharma-blue" />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-pharma-blue">Resultados Rápidos</h3>
              <p className="text-white/80 text-xs sm:text-sm">Protocolo personalizado em poucos minutos</p>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pharma-blue/20 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-pharma-blue" />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-pharma-blue">100% Personalizado</h3>
              <p className="text-white/80 text-xs sm:text-sm">Baseado no seu perfil e objetivos únicos</p>
            </div>
          </div>
        </div>
      </div>
      
      <AssistantModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
