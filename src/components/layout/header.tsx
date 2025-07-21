
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Store, ArrowLeft } from "lucide-react";
import { AssistantModal } from "@/components/assistant/assistant-modal";

export function Header() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
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
            
            {/* Breadcrumb simples */}
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Loja Principal</span>
              <span className="text-border">›</span>
              <span className="text-pharma-blue font-medium">Assistente IA</span>
              <div className="ml-2 bg-pharma-blue/10 border border-pharma-blue/20 px-2 py-0.5 rounded-full text-xs font-medium text-pharma-blue">
                BETA
              </div>
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

            {/* Botão Loja - ÍCONE CORRIGIDO */}
            <Button 
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              size="sm"
              className="bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Store className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Explorar Loja</span>
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
