
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RotateCcw, ExternalLink, ShoppingCart } from "lucide-react";
import { marked } from "marked";
import type { ProfileData } from "./profile-form-step";

interface ChatStepProps {
  profileData: ProfileData;
  onNewConsultation: () => void;
}

// Lista de produtos reais da loja, com a terminologia correta
const realProducts = [
    { name: 'Boldenona', type: 'Injetável' },
    { name: 'Cipionato de Testosterona', type: 'Injetável' },
    { name: 'Decanoato de Nandrolona (Deca)', type: 'Injetável' },
    { name: 'Metandrostenolona (Dianabol)', type: 'Oral' },
    { name: 'Estanozolol (Stanozolol)', type: 'Oral' },
    { name: 'Acetato de Trembolona', type: 'Injetável' },
    { name: 'Drostanolona (Masteron)', type: 'Injetável' },
    { name: 'Oxandrolona (Anavar)', type: 'Oral' },
    { name: 'Metenolona (Primobolan)', type: 'Injetável' },
    { name: 'Enantato de Testosterona', type: 'Injetável' },
    { name: 'Oximetolona (Hemogenin)', type: 'Oral' }
];

export function ChatStep({ profileData, onNewConsultation }: ChatStepProps) {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    generateSuggestion();
  }, [profileData]);

  const generateSuggestion = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const systemInstructions = `
Você é um especialista em protocolos ergogênicos. Responda EXCLUSIVAMENTE com opções de ciclos práticos, sem textos longos ou avisos.

### DOSAGENS SEGURAS:

**HOMENS:**
- Testosterona: 400-600mg/sem
- Nandrolona: 200-400mg/sem  
- Boldenona: 400-600mg/sem
- Masteron: 300-400mg/sem
- Primobolan: 400-600mg/sem
- Trembolona: 150-300mg/sem
- Dianabol: 30-50mg/dia (4-6 sem)
- Hemogenin: 50-100mg/dia (4 sem)
- Stanozolol: 30-50mg/dia (6 sem)
- Oxandrolona: 40-80mg/dia

**MULHERES:**
- Oxandrolona: 5-15mg/dia
- Primobolan: 50-100mg/sem
- Stanozolol: 5-10mg/dia
- Hemogenin: 12.5-25mg/dia (avançadas)

### REGRAS:
1. Use APENAS os compostos da lista disponível
2. Para mulheres: APENAS Oxandrolona, Primobolan, Stanozolol, Hemogenin
3. Apresente 3-4 opções categorizadas (Iniciante/Intermediário/Avançado)
4. Máximo 150 palavras total
5. Formato: **Nome do Ciclo** - Composto + dosagem + duração
6. Sem PCT detalhado, sem avisos longos
      `;

      let availableProducts = realProducts;
      if (profileData.preference.toLowerCase() === 'oral') {
          availableProducts = realProducts.filter(p => p.type === 'Oral');
      } else if (profileData.preference.toLowerCase() === 'injetável') {
          availableProducts = realProducts.filter(p => p.type === 'Injetável');
      }
      
      const productsList = `
COMPOSTOS DISPONÍVEIS:
${availableProducts.map(p => `- ${p.name}`).join('\n')}
      `;

      const userProfile = `
PERFIL:
- Sexo: ${profileData.gender}
- Objetivo: ${profileData.objective}
- Preferência: ${profileData.preference}
      `;

      const fullPrompt = `${systemInstructions}\n\n${userProfile}\n\n${productsList}`;

      const apiKey = "AIzaSyBAAMbYYD5UbnXbO2wwJs88S2FY0-HmxlY";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: fullPrompt }] }] })
      });

      if (!apiResponse.ok) {
        const errorBody = await apiResponse.json();
        console.error("API Error:", errorBody);
        throw new Error("Falha na comunicação com a IA. Verifique a chave da API ou tente novamente.");
      }

      const result = await apiResponse.json();
      
      if (!result.candidates || result.candidates.length === 0) {
        throw new Error("A IA não retornou uma resposta válida.");
      }

      const aiText = result.candidates[0].content.parts[0].text;
      
      const htmlResponse = await marked(aiText);
      setResponse(htmlResponse);

    } catch (err: any) {
      setError(err.message || "Erro ao gerar sugestão. Tente novamente.");
      console.error("Error generating suggestion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Fixo - Mobile Optimized */}
      <div className="flex-shrink-0 border-b p-3 sm:p-4 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              Assistente Maromba
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Opções de Ciclos
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onNewConsultation}
            className="gap-1 sm:gap-2 text-xs sm:text-sm touch-target"
          >
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Nova Consulta</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>

      {/* Área de Chat com Rolagem - Mobile Optimized */}
      <ScrollArea className="flex-grow p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-6 sm:py-8">
              <div className="text-center space-y-2 sm:space-y-3">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground text-xs sm:text-sm px-4">
                  Gerando opções de ciclos personalizados...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 sm:p-4">
              <p className="text-destructive text-center font-medium text-xs sm:text-sm">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={generateSuggestion}
                className="mx-auto mt-2 sm:mt-3 flex gap-1 sm:gap-2 text-xs touch-target"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                Tentar Novamente
              </Button>
            </div>
           ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-amber-800 font-medium">
                    ⚠️ Consulte um médico especializado antes de iniciar qualquer protocolo.
                  </p>
                </div>
                <div 
                  className="prose prose-xs sm:prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: response }}
                />
              </div>

              {/* CTAs para Compra - Mobile Optimized */}
              <div className="bg-pharma-navy/10 border border-pharma-blue/20 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="text-center space-y-1 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-pharma-blue">Produtos Disponíveis</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Encontre os produtos dos ciclos na nossa loja oficial
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 sm:gap-3">
                  <Button 
                    onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
                    className="bg-pharma-blue text-white hover:bg-pharma-blue/90 w-full text-sm sm:text-base touch-target"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Comprar Produtos
                  </Button>
                  
                  <Button 
                    onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
                    variant="outline"
                    className="border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white w-full text-sm sm:text-base touch-target"
                    size="lg"
                  >
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Ver Loja Completa
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    ✅ Produtos originais • ✅ Entrega discreta • ✅ Qualidade garantida
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer Fixo - Mobile Optimized */}
      <div className="flex-shrink-0 border-t p-3 sm:p-4 bg-background space-y-2 sm:space-y-3 safe-bottom">
        <div className="flex flex-col gap-2">
          <Button
            onClick={onNewConsultation}
            variant="outline"
            className="w-full text-sm sm:text-base touch-target"
            size="lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Novo Protocolo
          </Button>
          
          <Button
            onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
            className="bg-pharma-blue text-white hover:bg-pharma-blue/90 w-full text-sm sm:text-base touch-target"
            size="lg"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Comprar Agora
          </Button>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          Dúvidas? Entre em contato pelo WhatsApp da loja oficial
        </p>
      </div>
    </div>
  );
}
