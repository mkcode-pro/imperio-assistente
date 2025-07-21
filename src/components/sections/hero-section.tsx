
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { MessageCircle, Shield, Clock, CheckCircle, Zap, ArrowRight } from "lucide-react";

export function HeroSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <section className="relative py-6 lg:py-12 px-4 bg-gradient-to-br from-background via-background to-pharma-light/20 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Badges Profissionais */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Badge className="bg-pharma-blue/10 border-pharma-blue/30 text-pharma-blue px-4 py-2 text-sm font-semibold">
                🚀 BETA EXCLUSIVO
              </Badge>
              <Badge className="bg-pharma-navy/10 border-pharma-navy/30 text-pharma-navy px-4 py-2 text-sm font-semibold">
                ⚡ ACESSO ANTECIPADO
              </Badge>
            </div>

            {/* Robô IA com Caminho Corrigido */}
            <div className="w-48 sm:w-56 lg:w-64 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pharma-blue/30 to-pharma-navy/20 rounded-full blur-3xl scale-110 animate-pulse"></div>
                <img 
                  src="/assets/robozinho-maromba.png" 
                  alt="Assistente IA Especializado - Império Pharma" 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
                <div className="absolute top-3 right-3 z-20">
                  <Badge className="bg-pharma-navy text-white font-bold text-xs px-2 py-1">
                    BETA
                  </Badge>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal Otimizado */}
            <div className="space-y-6 w-full max-w-4xl">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 text-pharma-blue font-bold text-sm sm:text-base">
                  <Zap className="h-5 w-5 text-pharma-blue" />
                  <span className="text-center">IA ESPECIALIZADA • ACESSO EXCLUSIVO</span>
                  <Zap className="h-5 w-5 text-pharma-blue" />
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pharma-navy to-pharma-blue bg-clip-text text-transparent">
                    Protocolos Personalizados
                  </span>
                  <span className="block text-pharma-navy mt-2">
                    Por Inteligência Artificial
                  </span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Seja um dos primeiros a testar nossa 
                  <span className="text-pharma-blue font-semibold"> IA especializada em suplementação</span>
                </p>
              </div>

              {/* CTA Principal com Height Corrigido */}
              <div className="space-y-4 py-6">
                <Button 
                  size="lg"
                  onClick={() => setAssistantOpen(true)}
                  className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white h-14 sm:h-16 px-8 sm:px-16 text-lg sm:text-xl font-bold w-full max-w-lg mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden min-h-[56px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full animate-[slide_3s_ease-in-out_infinite]"></div>
                  <MessageCircle className="mr-3 h-6 w-6" />
                  <span className="hidden sm:inline">GARANTIR ACESSO BETA GRATUITO</span>
                  <span className="sm:hidden">ACESSO BETA GRATUITO</span>
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                  🎯 <strong>Sem compromisso</strong> • Teste completo da IA • Protocolos personalizados instantâneos
                </p>
              </div>

              {/* Features Rápidas com Melhor Contraste */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-foreground/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="font-medium">100% Personalizado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="font-medium">Disponível 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="font-medium">Acesso Beta Gratuito</span>
                </div>
              </div>

              {/* Social Proof Redesenhado */}
              <div className="bg-gradient-to-r from-pharma-light/50 to-background border border-pharma-blue/20 rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-pharma-navy">IA</div>
                    <div className="text-muted-foreground text-sm">Especializada</div>
                  </div>
                  <div className="space-y-1 border-x border-border/50">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-pharma-navy">24/7</div>
                    <div className="text-muted-foreground text-sm">Disponível</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-pharma-navy">BETA</div>
                    <div className="text-muted-foreground text-sm">Exclusivo</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Principais Melhoradas */}
            <div className="w-full max-w-5xl pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 min-h-[140px]">
                  <div className="w-12 h-12 bg-gradient-to-br from-pharma-blue/20 to-pharma-blue/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-6 w-6 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-2 text-base">IA Especializada</h3>
                    <p className="text-sm text-muted-foreground">Protocolos baseados no seu perfil único</p>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 min-h-[140px]">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-2 text-base">Produtos Certificados</h3>
                    <p className="text-sm text-muted-foreground">Suplementos de máxima qualidade</p>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/30 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 min-h-[140px]">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-2 text-base">Acesso Limitado</h3>
                    <p className="text-sm text-muted-foreground">Vagas exclusivas para teste beta</p>
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
