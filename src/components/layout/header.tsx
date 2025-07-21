
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft, Store, Sparkles } from "lucide-react";
import { AssistantModal } from "@/components/assistant/assistant-modal";

export function Header() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          {/* Logo e Navegação */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="text-lg font-bold text-pharma-navy">
                Império Pharma
              </div>
            </button>
            
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Loja Principal</span>
              <span>›</span>
              <span className="text-pharma-blue font-medium">Assistente IA</span>
            </div>
          </div>

          {/* Badge Novidade + Botões */}
          <div className="flex items-center space-x-3">
            {/* Badge NOVO */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              <Sparkles className="h-3 w-3" />
              <span>BETA GRATUITO</span>
            </div>
            
            {/* Botão Assistente */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setAssistantOpen(true)}
              className="text-pharma-navy hover:text-pharma-blue hover:bg-pharma-blue/10"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Assistente</span>
            </Button>

            {/* Botão Voltar à Loja */}
            <Button 
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              variant="outline"
              size="sm"
              className="border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white"
            >
              <Store className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Loja</span>
            </Button>
          </div>
        </div>

        {/* Banner de Novidade - Mobile */}
        <div className="sm:hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-xs font-bold">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-3 w-3" />
            <span>LANÇAMENTO EXCLUSIVO - PERÍODO GRATUITO</span>
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
