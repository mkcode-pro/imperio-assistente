
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Check } from "lucide-react";

interface TermsStepProps {
  onAccept: () => void;
}

export function TermsStep({ onAccept }: TermsStepProps) {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
    
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const maxScroll = scrollHeight - clientHeight;
      
      if (maxScroll <= 0) {
        // Conteúdo não é scrollável, habilitar botão imediatamente
        setHasScrolledToEnd(true);
        setScrollProgress(100);
        return;
      }
      
      const progress = Math.min((scrollTop / maxScroll) * 100, 100);
      setScrollProgress(progress);
      
      // Considerar "fim" quando chegou a 95% ou mais
      const isAtEnd = progress >= 95;
      
      if (isAtEnd && !hasScrolledToEnd) {
        setHasScrolledToEnd(true);
      }
    };

    // Verificar imediatamente se o conteúdo é scrollável
    handleScroll();
    
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolledToEnd]);

  const termsText = `
TERMO DE RESPONSABILIDADE - ASSISTENTE MAROMBA

🎯 ASSISTENTE EDUCACIONAL SOBRE SUPLEMENTAÇÃO

1. NATUREZA DO SERVIÇO
Este assistente fornece informações educacionais sobre protocolos de suplementação. NÃO substitui consulta médica especializada.

2. CONSULTA MÉDICA OBRIGATÓRIA
• Consulte um endocrinologista antes de qualquer protocolo
• Apenas médicos podem prescrever e monitorar tratamentos
• Realize exames médicos antes e durante o uso

3. PRINCIPAIS RISCOS
• Supressão hormonal natural
• Efeitos colaterais cardiovasculares e hepáticos
• Alterações comportamentais
• Possíveis efeitos permanentes

4. SUA RESPONSABILIDADE
• Você é totalmente responsável por suas decisões
• O Império Pharma não se responsabiliza pelo uso das informações
• Assume todos os riscos do uso de substâncias

5. REQUISITOS
• Ser maior de 21 anos
• Ter capacidade civil plena
• Conhecer a legislação local

⚠️ IMPORTANTE: Este assistente é apenas educacional. Sempre procure orientação médica especializada para qualquer protocolo de suplementação.
  `;

  return (
    <div className="flex flex-col h-screen p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Termo de Responsabilidade
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Leia atentamente todo o conteúdo abaixo
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Progresso da leitura</span>
          <span>{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 mb-4 sm:mb-6 min-h-0">
        <ScrollArea ref={scrollAreaRef} className="h-full border rounded-lg bg-background">
          <div 
            ref={contentRef}
            className="p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line"
          >
            {termsText}
          </div>
        </ScrollArea>
      </div>

      {/* Scroll Indicator */}
      {!hasScrolledToEnd && (
        <div className="flex items-center justify-center mb-2 text-muted-foreground animate-bounce">
          <ChevronDown className="h-4 w-4 mr-2" />
          <span className="text-sm">Role para baixo para continuar</span>
        </div>
      )}

      <Button
        onClick={onAccept}
        disabled={!hasScrolledToEnd}
        className="w-full"
        size="lg"
      >
        {hasScrolledToEnd ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Li e Aceito
          </>
        ) : (
          "Role até o final para continuar"
        )}
      </Button>
    </div>
  );
}
