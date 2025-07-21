
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { MessageCircle, Sparkles, Shield, Clock } from "lucide-react";

export function HeroSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <section className="relative py-6 sm:py-8 lg:py-12 px-4 bg-gradient-to-br from-background via-background to-muted/30 min-h-[calc(100vh-3.5rem)]">
        <div className="container mx-auto max-w-4xl">
          {/* Layout Mobile-First: Robô primeiro, depois conteúdo */}
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Robô em Destaque - Topo no Mobile */}
            <div className="order-1 w-56 sm:w-64 lg:w-72 xl:w-80 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-pharma-blue/20 rounded-full blur-3xl scale-75 animate-pulse"></div>
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
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-pharma-navy leading-tight">
                  Assistente Especializado em
                  <span className="block text-pharma-blue">Suplementação Inteligente</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Descubra os melhores protocolos para seus objetivos com orientação personalizada e profissional
                </p>
              </div>

              {/* Call-to-Action Principal GIGANTE */}
              <div className="space-y-4">
                <Button 
                  size="lg"
                  onClick={() => setAssistantOpen(true)}
                  className="bg-pharma-navy hover:bg-pharma-navy/90 text-white h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl font-bold w-full sm:w-auto min-w-[280px] shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Consulta Gratuita Agora
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  ✅ Orientação personalizada • ✅ Disponível 24/7 • ✅ Totalmente gratuito
                </p>
              </div>
            </div>

            {/* Features Cards - Mais Compactas */}
            <div className="order-3 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 shadow-lg">
                  <div className="w-12 h-12 bg-pharma-blue/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy text-sm">Orientação Personalizada</h3>
                    <p className="text-xs text-muted-foreground">Protocolos baseados no seu perfil</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 shadow-lg">
                  <div className="w-12 h-12 bg-pharma-blue/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy text-sm">Produtos Certificados</h3>
                    <p className="text-xs text-muted-foreground">Máxima qualidade garantida</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 shadow-lg">
                  <div className="w-12 h-12 bg-pharma-blue/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy text-sm">Disponível 24/7</h3>
                    <p className="text-xs text-muted-foreground">Assistente sempre online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Secundário Mais Sutil */}
            <div className="order-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setAssistantOpen(true)}
                className="border-pharma-navy/30 text-pharma-navy hover:bg-pharma-navy hover:text-white h-12 px-6 text-base font-medium"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Como Funciona?
              </Button>
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
