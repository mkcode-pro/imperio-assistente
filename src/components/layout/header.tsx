
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Store, X, Zap } from "lucide-react";
import { AssistantModal } from "@/components/assistant/assistant-modal";

export function Header() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const bannerClosed = localStorage.getItem('urgency-banner-closed');
    const closeTime = bannerClosed ? parseInt(bannerClosed) : 0;
    const now = Date.now();
    
    // Mostrar banner se nunca foi fechado ou se passaram mais de 24h
    if (!bannerClosed || (now - closeTime) > 24 * 60 * 60 * 1000) {
      setBannerVisible(true);
    } else {
      setBannerVisible(false);
    }
  }, []);

  const closeBanner = () => {
    setBannerVisible(false);
    localStorage.setItem('urgency-banner-closed', Date.now().toString());
  };

  return (
    <>
      {/* Faixa de Urgência */}
      {bannerVisible && (
        <div className="bg-gradient-to-r from-pharma-navy via-pharma-blue to-pharma-navy text-white px-4 py-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="container mx-auto flex items-center justify-center relative z-10">
            <div className="flex items-center space-x-4 text-center">
              <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
              <span className="font-bold text-sm sm:text-base">
                🚀 ACESSO BETA EXCLUSIVO • TEMPO LIMITADO • CONSULTAS GRATUITAS
              </span>
              <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
            </div>
            <button 
              onClick={closeBanner}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          {/* Logo e Navegação */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200"
            >
              <div className="text-lg font-bold bg-gradient-to-r from-pharma-navy to-pharma-blue bg-clip-text text-transparent">
                Império Pharma
              </div>
            </button>
            
            {/* Breadcrumb com Badge */}
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Loja Principal</span>
              <span className="text-border">›</span>
              <span className="text-pharma-blue font-medium">Assistente IA</span>
              <Badge className="ml-2 bg-pharma-blue/20 border-pharma-blue/30 text-pharma-blue hover:bg-pharma-blue/30 animate-pulse">
                BETA EXCLUSIVO
              </Badge>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-3">
            {/* Botão Assistente */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setAssistantOpen(true)}
              className="text-pharma-navy hover:text-pharma-blue hover:bg-pharma-blue/10 transition-all duration-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Consulta Gratuita</span>
            </Button>

            {/* Botão Loja */}
            <Button 
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              size="sm"
              className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
            >
              <Store className="h-4 w-4 flex-shrink-0" />
              <span className="ml-2">LOJA</span>
            </Button>
          </div>
        </div>
      </header>

      <AssistantModal 
        open={assistantOpen} 
        onOpenChange={setAssistantOpen} 
      />
    </>
  );
}
