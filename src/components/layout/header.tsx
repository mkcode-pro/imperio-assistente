
import { Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const goToStore = () => {
    window.open('https://www.loja.imperiopharma.com.py', '_blank');
  };

  return (
    <>
      {/* Faixa superior com gradiente do Paraguai */}
      <div className="h-1.5 sm:h-2 bg-paraguay-top"></div>
      
      <header className="sticky top-1.5 sm:top-2 left-0 right-0 z-50 bg-pharma-navy shadow-header">
        <div className="mobile-container py-2 sm:py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="relative">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-pharma-blue fill-pharma-blue" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <h1 className="text-sm sm:text-xl font-bold text-white leading-tight">
                IMPÉRIO PHARMA
              </h1>
              <span className="text-pharma-blue text-xs sm:text-sm font-medium">
                ASSISTENTE IA
              </span>
            </div>
          </div>

          {/* Botão Voltar à Loja */}
          <Button 
            onClick={goToStore}
            variant="outline"
            size="sm"
            className="bg-transparent border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white transition-all text-xs sm:text-sm touch-target"
          >
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Voltar à Loja</span>
            <span className="sm:hidden">Loja</span>
          </Button>
        </div>
      </header>
    </>
  );
}
