
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { MessageCircle, Shield, Clock, CheckCircle, Star, Zap } from "lucide-react";

export function HeroSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <section className="relative py-6 sm:py-8 lg:py-12 px-4 bg-gradient-to-br from-background via-background to-muted/30 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto max-w-4xl">
          {/* Layout Mobile-First: Robô primeiro, depois conteúdo */}
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Banner de Novidade Superior */}
            <div className="order-0 w-full max-w-2xl">
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-2 text-amber-700 font-bold text-sm sm:text-base">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span>NOVIDADE EXCLUSIVA - ACESSO ANTECIPADO GRATUITO</span>
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
                <p className="text-xs sm:text-sm text-amber-600 mt-2">
                  Disponível apenas para clientes VIP por tempo limitado
                </p>
              </div>
            </div>

            {/* Robô em Destaque - Topo no Mobile */}
            <div className="order-1 w-56 sm:w-64 lg:w-72 xl:w-80 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pharma-blue/20 to-amber-500/20 rounded-full blur-3xl scale-75 animate-pulse"></div>
                <img 
                  src="/src/assets/robozinho-maromba.png" 
                  alt="Assistente Especializado em Suplementação" 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="order-2 space-y-6 max-w-3xl">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-pharma-blue font-semibold text-sm sm:text-base">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>ASSISTENTE IA EXCLUSIVO</span>
                  <Zap className="h-5 w-5 text-amber-500" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-pharma-navy leading-tight">
                  Orientação Personalizada
                  <span className="block text-pharma-blue">Inteligência Artificial Avançada</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Descubra os melhores protocolos para seus objetivos com nossa IA especializada em suplementação
                </p>
              </div>

              {/* Call-to-Action Principal GIGANTE */}
              <div className="space-y-4">
                <Button 
                  size="lg"
                  onClick={() => setAssistantOpen(true)}
                  className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl font-bold w-full sm:w-auto min-w-[320px] shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Consulta Gratuita Agora
                </Button>
                
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Personalizado</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 Online</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>100% Gratuito</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Cards - Mais Compactas com Ícones SVG */}
            <div className="order-3 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-pharma-blue/20 to-pharma-blue/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy text-sm">Orientação Personalizada</h3>
                    <p className="text-xs text-muted-foreground">Protocolos baseados no seu perfil</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy text-sm">Produtos Certificados</h3>
                    <p className="text-xs text-muted-foreground">Máxima qualidade garantida</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy text-sm">Disponível 24/7</h3>
                    <p className="text-xs text-muted-foreground">Assistente sempre online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer de Urgência */}
            <div className="order-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 max-w-md">
              <div className="text-center">
                <p className="text-sm font-bold text-red-600 mb-2">⏰ OFERTA POR TEMPO LIMITADO</p>
                <p className="text-xs text-muted-foreground">
                  Aproveite o acesso gratuito ao assistente IA mais avançado do mercado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AssistantModal 
        open={assistantOpen} 
        onOpenChange={setAssistantOpen} 
      />
    </>
  );
}
