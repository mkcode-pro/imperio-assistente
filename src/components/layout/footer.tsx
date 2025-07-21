
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const goToStore = () => {
    window.open('https://www.loja.imperiopharma.com.py', '_blank');
  };

  return (
    <footer className="bg-pharma-navy text-white py-8 sm:py-12">
      <div className="mobile-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Sobre o Assistente */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-pharma-blue">Assistente Maromba IA</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Desenvolvido pela Império Pharma para oferecer protocolos ergogênicos 
              personalizados através de inteligência artificial avançada.
            </p>
            <Button 
              onClick={goToStore}
              variant="outline"
              size="sm"
              className="bg-transparent border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white touch-target"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Visitar Loja Oficial
            </Button>
          </div>

          {/* Contato */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-pharma-blue">Contato</h3>
            <div className="space-y-2 sm:space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-pharma-blue flex-shrink-0" />
                <span className="break-all">contato@imperiopharma.com.py</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-pharma-blue flex-shrink-0" />
                +595 (21) 123-4567
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-pharma-blue flex-shrink-0" />
                Asunción, Paraguay
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold text-pharma-blue">Links Úteis</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-sm">
              <button 
                onClick={goToStore}
                className="text-left text-white/80 hover:text-pharma-blue transition-colors touch-target"
              >
                Loja Online
              </button>
              <button 
                onClick={goToStore}
                className="text-left text-white/80 hover:text-pharma-blue transition-colors touch-target"
              >
                Produtos
              </button>
              <button 
                onClick={goToStore}
                className="text-left text-white/80 hover:text-pharma-blue transition-colors touch-target"
              >
                Suporte
              </button>
              <button 
                onClick={goToStore}
                className="text-left text-white/80 hover:text-pharma-blue transition-colors touch-target"
              >
                Política de Privacidade
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center space-y-2">
          <p className="text-white/60 text-xs sm:text-sm">
            © 2024 Império Pharma. Todos os direitos reservados. | Assistente IA - Versão Beta
          </p>
          <p className="text-white/40 text-xs">
            Este assistente é uma ferramenta educacional. Sempre consulte um profissional qualificado.
          </p>
        </div>
      </div>
    </footer>
  );
}
