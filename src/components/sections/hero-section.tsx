
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
    <section className="bg-hero-gradient text-white min-h-screen pt-8 pb-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          {/* Badge de IA */}
          <div className="inline-flex items-center gap-2 bg-pharma-gold/20 text-pharma-gold px-6 py-3 rounded-full text-sm font-medium border border-pharma-gold/30">
            <Brain className="h-5 w-5" />
            INTELIGÊNCIA ARTIFICIAL AVANÇADA
            <Sparkles className="h-4 w-4" />
          </div>
          
          {/* Título Principal */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-white">ASSISTENTE</span><br />
              <span className="text-pharma-gold">MAROMBA IA</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Protocolos Ergogênicos Personalizados por Inteligência Artificial
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Nossa IA analisa seu perfil e objetivos para criar protocolos únicos e eficazes, 
              baseados em ciência e experiência profissional.
            </p>
          </div>

          {/* Imagem do Robô */}
          <div className="my-12">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-pharma-gold/20 rounded-full animate-pulse"></div>
              <img 
                src="/src/assets/robozinho-maromba.png" 
                alt="Assistente Maromba IA" 
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-pharma-gold/50"
              />
            </div>
          </div>

          {/* CTAs Principais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              onClick={handleChatClick} 
              size="lg" 
              className="bg-pharma-gold text-pharma-navy hover:bg-pharma-gold/90 shadow-lg text-lg px-8 py-4 h-auto w-full sm:w-auto font-bold transform hover:scale-105 transition-all"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              INICIAR CONSULTA GRATUITA
            </Button>
            
            <Button 
              onClick={goToStore}
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-pharma-navy text-lg px-8 py-4 h-auto w-full sm:w-auto font-semibold transition-all"
            >
              <ExternalLink className="mr-3 h-5 w-5" />
              Comprar na Loja Oficial
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-pharma-gold/20 rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-6 w-6 text-pharma-gold" />
              </div>
              <h3 className="text-lg font-semibold text-pharma-gold">IA Especializada</h3>
              <p className="text-white/80 text-sm">Treinada com dados de profissionais experientes</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-pharma-gold/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-pharma-gold" />
              </div>
              <h3 className="text-lg font-semibold text-pharma-gold">Resultados Rápidos</h3>
              <p className="text-white/80 text-sm">Protocolo personalizado em poucos minutos</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-pharma-gold/20 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6 text-pharma-gold" />
              </div>
              <h3 className="text-lg font-semibold text-pharma-gold">100% Personalizado</h3>
              <p className="text-white/80 text-sm">Baseado no seu perfil e objetivos únicos</p>
            </div>
          </div>
        </div>
      </div>
      
      <AssistantModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
