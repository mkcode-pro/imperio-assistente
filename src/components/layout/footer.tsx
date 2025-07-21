
import { Button } from "@/components/ui/button";
import { Store, MessageCircle, CheckCircle, Shield, Clock, Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          {/* Header com Navegação */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-pharma-navy mb-2">
                Império Pharma - Assistente IA Especializado
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Tecnologia avançada de IA especializada em protocolos de suplementação, 
                oferecendo orientações personalizadas baseadas em seu perfil e objetivos.
              </p>
            </div>
            
            <Button
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              className="bg-gradient-to-r from-pharma-navy to-pharma-blue text-white hover:from-pharma-navy/90 hover:to-pharma-blue/90 px-6 py-3"
            >
              <Store className="h-4 w-4 mr-2" />
              Explorar Loja Completa
            </Button>
          </div>
          
          {/* Features com Ícones SVG */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg border border-border/30">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium text-muted-foreground">Orientação Profissional</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg border border-border/30">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-muted-foreground">Produtos Certificados</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg border border-border/30">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="font-medium text-muted-foreground">Atendimento 24/7</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-background/50 rounded-lg border border-border/30">
              <Star className="h-5 w-5 text-pharma-blue" />
              <span className="font-medium text-muted-foreground">Consultas Gratuitas</span>
            </div>
          </div>

          {/* Banner de Novidade */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-amber-700 font-bold text-sm">
              <Star className="h-4 w-4 text-amber-500" />
              <span>LANÇAMENTO EXCLUSIVO - ASSISTENTE IA GRATUITO</span>
              <Star className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-xs text-amber-600 mt-1">
              Acesso antecipado disponível apenas para clientes VIP
            </p>
          </div>
          
          {/* Navegação Final */}
          <div className="pt-4 border-t border-border/50 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                © 2024 Império Pharma. Assistente especializado em suplementação.
              </p>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
                  className="text-xs text-pharma-blue hover:text-pharma-navy font-medium underline"
                >
                  Loja Principal
                </button>
                <button
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                  className="text-xs text-pharma-blue hover:text-pharma-navy font-medium underline"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
