
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { MessageCircle, Shield, Clock, CheckCircle, Zap } from "lucide-react";

export function HeroSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <section className="relative py-12 lg:py-20 px-4 bg-gradient-to-br from-background via-background to-pharma-light/20 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-12">
            
            {/* Robô IA */}
            <div className="w-64 sm:w-72 lg:w-80 xl:w-96 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pharma-blue/20 to-pharma-blue/10 rounded-full blur-3xl scale-90"></div>
                <img 
                  src="/src/assets/robozinho-maromba.png" 
                  alt="Assistente IA Especializado - Império Pharma" 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="space-y-8 max-w-4xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 text-pharma-blue font-semibold text-sm sm:text-base">
                  <Zap className="h-5 w-5 text-pharma-blue" />
                  <span>IA ESPECIALIZADA EM PROTOCOLOS</span>
                  <Zap className="h-5 w-5 text-pharma-blue" />
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pharma-navy to-pharma-blue bg-clip-text text-transparent">
                    Orientação Personalizada
                  </span>
                  <span className="block text-pharma-navy mt-2">
                    Por Inteligência Artificial
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Descubra os melhores protocolos para seus objetivos com nossa IA 
                  <span className="text-pharma-blue font-semibold"> especializada em suplementação</span>
                </p>
              </div>

              {/* CTA Principal */}
              <div className="space-y-6">
                <Button 
                  size="lg"
                  onClick={() => setAssistantOpen(true)}
                  className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white h-16 sm:h-20 px-8 sm:px-16 text-xl sm:text-2xl font-bold w-full sm:w-auto min-w-[350px] shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="mr-3 h-7 w-7" />
                  Consulta Gratuita
                </Button>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>100% Personalizado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Disponível 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Gratuito no Beta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Principais */}
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-pharma-blue/20 to-pharma-blue/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-7 w-7 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-2">IA Especializada</h3>
                    <p className="text-sm text-muted-foreground">Protocolos baseados no seu perfil único e objetivos específicos</p>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-7 w-7 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-2">Produtos Certificados</h3>
                    <p className="text-sm text-muted-foreground">Suplementos de máxima qualidade com certificação internacional</p>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-amber-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-2">Suporte 24/7</h3>
                    <p className="text-sm text-muted-foreground">Assistente sempre disponível para suas dúvidas e orientações</p>
                  </div>
                </div>
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
