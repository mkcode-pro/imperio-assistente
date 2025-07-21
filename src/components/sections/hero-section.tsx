
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { MessageCircle, Shield, Clock, CheckCircle, Zap, ArrowRight } from "lucide-react";

export function HeroSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <section className="relative py-4 lg:py-8 px-4 bg-gradient-to-br from-background via-background to-pharma-light/20 overflow-x-hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center space-y-4">
            
            {/* Badges Profissionais Centralizados */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Badge className="bg-pharma-blue/10 border-pharma-blue/30 text-pharma-blue px-3 py-1 text-xs font-semibold">
                🚀 BETA EXCLUSIVO
              </Badge>
              <Badge className="bg-pharma-navy/10 border-pharma-navy/30 text-pharma-navy px-3 py-1 text-xs font-semibold">
                ⚡ ACESSO ANTECIPADO
              </Badge>
            </div>

            {/* Robô IA com Tamanho Otimizado */}
            <div className="w-40 sm:w-48 lg:w-56 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pharma-blue/30 to-pharma-navy/20 rounded-full blur-2xl scale-110 animate-pulse"></div>
                <img 
                  src="/src/assets/robozinho-maromba.png" 
                  alt="Assistente IA Especializado - Império Pharma" 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
                <div className="absolute top-2 right-2 z-20">
                  <Badge className="bg-pharma-navy text-white font-bold text-xs">
                    BETA
                  </Badge>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal Otimizado */}
            <div className="space-y-4 w-full max-w-3xl">
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-pharma-blue font-bold text-sm">
                  <Zap className="h-4 w-4 text-pharma-blue" />
                  <span className="text-center">IA ESPECIALIZADA • ACESSO EXCLUSIVO</span>
                  <Zap className="h-4 w-4 text-pharma-blue" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pharma-navy to-pharma-blue bg-clip-text text-transparent">
                    Protocolos Personalizados
                  </span>
                  <span className="block text-pharma-navy mt-2">
                    Por Inteligência Artificial
                  </span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Seja um dos primeiros a testar nossa 
                  <span className="text-pharma-blue font-semibold"> IA especializada em suplementação</span>
                </p>
              </div>

              {/* CTA Principal DESTACADO */}
              <div className="space-y-3 py-4">
                <Button 
                  size="lg"
                  onClick={() => setAssistantOpen(true)}
                  className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white h-16 sm:h-18 px-8 sm:px-16 text-lg sm:text-xl font-bold w-full max-w-lg mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full animate-[slide_3s_ease-in-out_infinite]"></div>
                  <MessageCircle className="mr-3 h-6 w-6" />
                  <span className="hidden sm:inline">GARANTIR ACESSO BETA GRATUITO</span>
                  <span className="sm:hidden">ACESSO BETA GRATUITO</span>
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  🎯 <strong>Sem compromisso</strong> • Teste completo da IA • Protocolos personalizados instantâneos
                </p>
              </div>

              {/* Features Rápidas */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span>100% Personalizado</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span>Disponível 24/7</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span>Acesso Beta Gratuito</span>
                </div>
              </div>

              {/* Social Proof Compacto */}
              <div className="bg-gradient-to-r from-pharma-light/50 to-background border border-pharma-blue/20 rounded-xl p-3 sm:p-4 shadow-lg overflow-hidden">
                <div className="flex items-center justify-between text-xs sm:text-sm max-w-full">
                  <div className="text-center flex-1 min-w-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-pharma-navy truncate">IA</div>
                    <div className="text-muted-foreground text-xs sm:text-sm truncate">Especializada</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-border mx-2 sm:mx-3"></div>
                  <div className="text-center flex-1 min-w-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-pharma-navy truncate">24/7</div>
                    <div className="text-muted-foreground text-xs sm:text-sm truncate">Disponível</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-border mx-2 sm:mx-3"></div>
                  <div className="text-center flex-1 min-w-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-pharma-navy truncate">BETA</div>
                    <div className="text-muted-foreground text-xs sm:text-sm truncate">Exclusivo</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Principais Compactas */}
            <div className="w-full max-w-4xl pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-pharma-blue/20 to-pharma-blue/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-5 w-5 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-1 text-sm">IA Especializada</h3>
                    <p className="text-xs text-muted-foreground">Protocolos baseados no seu perfil único</p>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-1 text-sm">Produtos Certificados</h3>
                    <p className="text-xs text-muted-foreground">Suplementos de máxima qualidade</p>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-1 text-sm">Acesso Limitado</h3>
                    <p className="text-xs text-muted-foreground">Vagas exclusivas para teste beta</p>
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
