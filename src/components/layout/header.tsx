import { Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const goToStore = () => {
    window.open('https://www.loja.imperiopharma.com.py', '_blank');
  };

  return (
    <>
      {/* Faixa superior com gradiente do Paraguai */}
      <div className="h-2 bg-paraguay-top"></div>
      
      <header className="sticky top-2 left-0 right-0 z-50 bg-pharma-navy shadow-header">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Zap className="h-8 w-8 text-pharma-gold fill-pharma-gold" />
            </div>
            <h1 className="text-xl font-bold text-white">
              IMPÉRIO PHARMA
            </h1>
            <span className="text-pharma-gold text-sm font-medium ml-2">
              | ASSISTENTE IA
            </span>
          </div>

          {/* Botão Voltar à Loja */}
          <Button 
            onClick={goToStore}
            variant="outline"
            size="sm"
            className="bg-transparent border-pharma-gold text-pharma-gold hover:bg-pharma-gold hover:text-pharma-navy transition-all"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Voltar à Loja
          </Button>
        </div>
      </header>
    </>
  );
}