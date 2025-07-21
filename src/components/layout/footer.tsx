import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const goToStore = () => {
    window.open('https://www.loja.imperiopharma.com.py', '_blank');
  };

  return (
    <footer className="bg-pharma-navy text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre o Assistente */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-pharma-gold">Assistente Maromba IA</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Desenvolvido pela Império Pharma para oferecer protocolos ergogênicos 
              personalizados através de inteligência artificial avançada.
            </p>
            <Button 
              onClick={goToStore}
              variant="outline"
              size="sm"
              className="bg-transparent border-pharma-gold text-pharma-gold hover:bg-pharma-gold hover:text-pharma-navy"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visitar Loja Oficial
            </Button>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-pharma-gold">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4 text-pharma-gold" />
                contato@imperiopharma.com.py
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4 text-pharma-gold" />
                +595 (21) 123-4567
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4 text-pharma-gold" />
                Asunción, Paraguay
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-pharma-gold">Links Úteis</h3>
            <div className="space-y-2 text-sm">
              <button 
                onClick={goToStore}
                className="block text-white/80 hover:text-pharma-gold transition-colors"
              >
                Loja Online
              </button>
              <button 
                onClick={goToStore}
                className="block text-white/80 hover:text-pharma-gold transition-colors"
              >
                Produtos
              </button>
              <button 
                onClick={goToStore}
                className="block text-white/80 hover:text-pharma-gold transition-colors"
              >
                Suporte
              </button>
              <button 
                onClick={goToStore}
                className="block text-white/80 hover:text-pharma-gold transition-colors"
              >
                Política de Privacidade
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Império Pharma. Todos os direitos reservados. | Assistente IA - Versão Beta
          </p>
          <p className="text-white/40 text-xs mt-2">
            Este assistente é uma ferramenta educacional. Sempre consulte um profissional qualificado.
          </p>
        </div>
      </div>
    </footer>
  );
}