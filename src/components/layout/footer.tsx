
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, MessageCircle, CheckCircle, Shield, Clock, Star, Zap, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-br from-background via-background to-pharma-light/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          {/* Header Otimizado */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pharma-navy to-pharma-blue bg-clip-text text-transparent">
                  Império Pharma • Assistente IA
                </h3>
                <Badge className="bg-gradient-to-r from-pharma-blue/20 to-pharma-navy/20 border-pharma-blue/30 text-pharma-blue">
                  BETA
                </Badge>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Plataforma de IA especializada em protocolos de suplementação, 
                oferecendo orientações personalizadas com base em análise científica do seu perfil.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-green-500" />
                  <span>500+ protocolos criados</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Acesso beta limitado</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              size="lg"
              className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white px-8 py-4 text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full animate-[slide_3s_ease-in-out_infinite]"></div>
              <Store className="h-5 w-5 mr-3" />
              Explorar Loja Completa
            </Button>
          </div>
          
          {/* Features Otimizadas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-background/80 to-pharma-light/20 rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-200">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div className="text-center">
                <h4 className="font-semibold text-pharma-navy text-sm">Orientação Profissional</h4>
                <p className="text-xs text-muted-foreground">IA treinada por especialistas</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-background/80 to-pharma-light/20 rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-200">
              <Shield className="h-6 w-6 text-blue-500" />
              <div className="text-center">
                <h4 className="font-semibold text-pharma-navy text-sm">Produtos Certificados</h4>
                <p className="text-xs text-muted-foreground">Máxima qualidade garantida</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-background/80 to-pharma-light/20 rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-200">
              <Clock className="h-6 w-6 text-amber-500" />
              <div className="text-center">
                <h4 className="font-semibold text-pharma-navy text-sm">Suporte Completo</h4>
                <p className="text-xs text-muted-foreground">Assistência especializada 24/7</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-background/80 to-pharma-light/20 rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-200">
              <Star className="h-6 w-6 text-pharma-blue" />
              <div className="text-center">
                <h4 className="font-semibold text-pharma-navy text-sm">Acesso Exclusivo</h4>
                <p className="text-xs text-muted-foreground">Beta gratuito por tempo limitado</p>
              </div>
            </div>
          </div>

          {/* CTA Final Otimizado */}
          <div className="bg-gradient-to-r from-pharma-blue/10 to-pharma-navy/10 border border-pharma-blue/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pharma-blue/5 to-transparent animate-pulse"></div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                  <div className="text-pharma-navy font-bold text-lg">
                    Últimas Vagas Disponíveis!
                  </div>
                  <Badge className="bg-red-500/20 border-red-500/30 text-red-700 font-bold animate-pulse">
                    LIMITADO
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Experimente nossa IA especializada gratuitamente • Acesso beta exclusivo
                </p>
              </div>
              
              <Button
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 font-bold shadow-lg transform hover:scale-105 transition-all duration-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full animate-[slide_2s_ease-in-out_infinite]"></div>
                <MessageCircle className="h-4 w-4 mr-2" />
                Garantir Vaga Agora
              </Button>
            </div>
          </div>
          
          {/* Footer Final */}
          <div className="pt-6 border-t border-border/50 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 Império Pharma • Assistente IA especializado em protocolos de suplementação
              </p>
              
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
                  className="text-sm text-pharma-blue hover:text-pharma-navy font-semibold underline transition-colors flex items-center space-x-1"
                >
                  <Store className="h-4 w-4" />
                  <span>Loja Principal</span>
                </button>
                <button
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                  className="text-sm text-green-600 hover:text-green-700 font-semibold underline transition-colors flex items-center space-x-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Oficial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
