
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { MessageCircle, Shield, Clock, CheckCircle, Star, Zap, Timer, Award, Users } from "lucide-react";

export function HeroSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <section className="relative py-8 sm:py-12 lg:py-16 px-4 bg-gradient-to-br from-background via-background to-pharma-light/30 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8 lg:space-y-12">
            
            {/* Timer de Urgência Premium */}
            <div className="order-0 w-full max-w-3xl">
              <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 border border-red-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl">
                <div className="flex items-center justify-center space-x-3 text-red-600 font-bold text-sm sm:text-base mb-2">
                  <Timer className="h-5 w-5 text-red-500 animate-pulse" />
                  <span>OFERTA EXCLUSIVA - ACESSO ANTECIPADO</span>
                  <Timer className="h-5 w-5 text-red-500 animate-pulse" />
                </div>
                <p className="text-xs sm:text-sm text-red-600/80">
                  Disponível apenas para primeiros 1000 clientes VIP • Período gratuito limitado
                </p>
                <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-red-500 font-mono">
                  <span className="bg-red-500/20 px-2 py-1 rounded">23:45:12</span>
                  <span>restantes para garantir acesso</span>
                </div>
              </div>
            </div>

            {/* Robô IA Premium */}
            <div className="order-1 w-64 sm:w-72 lg:w-80 xl:w-96 mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pharma-blue/30 to-amber-500/30 rounded-full blur-3xl scale-90 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pharma-navy/20 to-pharma-blue/20 rounded-full blur-2xl scale-75 animate-pulse delay-700"></div>
                <img 
                  src="/src/assets/robozinho-maromba.png" 
                  alt="Assistente IA Especializado - Império Pharma" 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
            </div>

            {/* Conteúdo Estratégico */}
            <div className="order-2 space-y-6 lg:space-y-8 max-w-4xl">
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center justify-center space-x-2 text-pharma-blue font-bold text-sm sm:text-base">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>PRIMEIRA IA ESPECIALIZADA EM PROTOCOLOS</span>
                  <Zap className="h-5 w-5 text-amber-500" />
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

              {/* CTA Principal Gigante */}
              <div className="space-y-4 lg:space-y-6">
                <Button 
                  size="lg"
                  onClick={() => setAssistantOpen(true)}
                  className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white h-16 sm:h-20 px-8 sm:px-16 text-xl sm:text-2xl font-bold w-full sm:w-auto min-w-[350px] shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-pharma-blue/20"
                >
                  <MessageCircle className="mr-3 h-7 w-7" />
                  Consulta Gratuita Agora
                </Button>
                
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
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
                    <span>Totalmente Gratuito</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Resultados Instantâneos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Premium com Stats */}
            <div className="order-3 w-full max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/50 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-pharma-blue/20 to-pharma-blue/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-7 w-7 text-pharma-blue" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-1">IA Especializada</h3>
                    <p className="text-sm text-muted-foreground">Protocolos baseados no seu perfil único</p>
                    <div className="mt-2 text-xs text-pharma-blue font-bold">+50.000 consultas realizadas</div>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/50 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-7 w-7 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-1">Produtos Certificados</h3>
                    <p className="text-sm text-muted-foreground">Máxima qualidade garantida</p>
                    <div className="mt-2 text-xs text-green-600 font-bold">Certificação internacional</div>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/50 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-amber-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-1">Suporte 24/7</h3>
                    <p className="text-sm text-muted-foreground">Assistente sempre disponível</p>
                    <div className="mt-2 text-xs text-amber-600 font-bold">Resposta em segundos</div>
                  </div>
                </div>

                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background to-pharma-light/50 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-7 w-7 text-purple-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-pharma-navy mb-1">Acesso VIP</h3>
                    <p className="text-sm text-muted-foreground">Exclusivo para clientes especiais</p>
                    <div className="mt-2 text-xs text-purple-600 font-bold">Período limitado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof + Urgência */}
            <div className="order-4 w-full max-w-4xl space-y-4">
              <div className="bg-gradient-to-r from-pharma-navy/5 to-pharma-blue/5 border border-pharma-blue/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-pharma-blue" />
                    <span className="text-sm text-pharma-navy font-semibold">+15.000 clientes ativos</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border"></div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <span className="text-sm text-pharma-navy font-semibold">4.9/5 avaliação média</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border"></div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-pharma-navy font-semibold">97% satisfação garantida</span>
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
