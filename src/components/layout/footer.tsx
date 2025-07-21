
import { Button } from "@/components/ui/button";
import { Store, MessageCircle, CheckCircle, Shield, Clock, Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-br from-background via-background to-pharma-light/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pharma-navy to-pharma-blue bg-clip-text text-transparent mb-3">
                Império Pharma • Assistente IA
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Plataforma de IA especializada em protocolos de suplementação, 
                oferecendo orientações personalizadas baseadas em análise do seu perfil e objetivos.
              </p>
            </div>
            
            <Button
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              size="lg"
              className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white px-8 py-4 text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Store className="h-5 w-5 mr-3" />
              Explorar Loja Completa
            </Button>
          </div>
          
          {/* Features */}
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
                <h4 className="font-semibold text-pharma-navy text-sm">Acesso Beta</h4>
                <p className="text-xs text-muted-foreground">Consultas gratuitas disponíveis</p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-pharma-blue/10 to-pharma-navy/10 border border-pharma-blue/20 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-pharma-navy font-bold text-lg mb-2">
                  Pronto para começar?
                </div>
                <p className="text-sm text-muted-foreground">
                  Experimente nossa IA especializada gratuitamente durante o período beta
                </p>
              </div>
              
              <Button
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Suporte
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
                  className="text-sm text-pharma-blue hover:text-pharma-navy font-semibold underline transition-colors"
                >
                  Loja Principal
                </button>
                <button
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                  className="text-sm text-pharma-blue hover:text-pharma-navy font-semibold underline transition-colors"
                >
                  WhatsApp Oficial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
