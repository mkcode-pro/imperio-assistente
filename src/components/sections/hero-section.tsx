
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { MessageCircle, Sparkles, Shield, Clock } from "lucide-react";

export function HeroSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <section className="relative py-8 sm:py-12 lg:py-16 px-4 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Conteúdo Principal */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-pharma-navy leading-tight">
                  Assistente Especializado em 
                  <span className="block text-pharma-blue">Suplementação</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Descubra os melhores suplementos para seus objetivos com orientação personalizada e profissional
                </p>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => setAssistantOpen(true)}
                  className="bg-pharma-navy hover:bg-pharma-navy/90 text-white h-12 px-6 sm:px-8 text-base font-medium min-h-[44px]"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Conversar Agora
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-pharma-navy text-pharma-navy hover:bg-pharma-navy hover:text-white h-12 px-6 sm:px-8 text-base font-medium min-h-[44px]"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Saiba Mais
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 w-10 h-10 bg-pharma-blue/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-pharma-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pharma-navy text-sm">Orientação Personalizada</h3>
                    <p className="text-xs text-muted-foreground">Sugestões baseadas no seu perfil</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 w-10 h-10 bg-pharma-blue/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-pharma-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pharma-navy text-sm">Produtos Certificados</h3>
                    <p className="text-xs text-muted-foreground">Máxima qualidade garantida</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 w-10 h-10 bg-pharma-blue/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-pharma-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pharma-navy text-sm">Disponível 24/7</h3>
                    <p className="text-xs text-muted-foreground">Assistente sempre online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagem do Robô */}
            <div className="flex-shrink-0 w-48 sm:w-56 lg:w-64 xl:w-72">
              <div className="relative">
                <div className="absolute inset-0 bg-pharma-blue/20 rounded-full blur-3xl scale-75"></div>
                <img 
                  src="/src/assets/robozinho-maromba.png" 
                  alt="Assistente Império Pharma" 
                  className="relative z-10 w-full h-auto object-contain"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AssistantModal 
        isOpen={assistantOpen} 
        onClose={() => setAssistantOpen(false)} 
      />
    </>
  );
}
