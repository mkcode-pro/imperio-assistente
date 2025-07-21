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
Você é um especialista em protocolos farmacológicos ergogênicos chamado "Assistente Maromba". Sua personalidade é técnica, precisa e focada em segurança. Sua tarefa é analisar o perfil do usuário, a lista de compostos e a base de conhecimento de dosagens para criar protocolos ergogênicos estruturados e realistas.

### Base de Conhecimento de Dosagens Seguras (OBRIGATÓRIO SEGUIR)

**Dosagens para Homens (Nível Intermediário):**
- **Testosterona (Enantato/Cipionato):** 400-600mg/semana.
- **Nandrolona (Deca):** 200-400mg/semana.
- **Boldenona:** 400-600mg/semana.
- **Masteron:** 300-400mg/semana.
- **Primobolan:** 400-600mg/semana.
- **Trembolona:** 150-300mg/semana.
- **Dianabol:** 30-50mg/dia (usar por no máximo 4-6 semanas).
- **Hemogenin:** 50-100mg/dia (usar por no máximo 4 semanas).
- **Stanozolol:** 30-50mg/dia (usar por no máximo 6 semanas).
- **Oxandrolona:** 40-80mg/dia.

**Dosagens para Mulheres (Foco em Baixa Virilização):**
- **Oxandrolona:** 5-15mg/dia.
- **Primobolan:** 50-100mg/semana.
- **Stanozolol:** 5-10mg/dia (sempre alertar sobre riscos maiores que a oxandrolona).
- **Hemogenin:** 12.5-25mg/dia (apenas para usuárias muito avançadas e alertar sobre altos riscos).

### REGRAS CRÍTICAS PARA PERFIL FEMININO:
1. **SEGUIR DOSAGENS FEMININAS:** Use estritamente as dosagens da base de conhecimento para mulheres.
2. **COMPOSTOS APROVADOS (ÚNICOS PERMITIDOS):** Baseie protocolos EXCLUSIVAMENTE em: Oxandrolona, Primobolan, Stanozolol e Hemogenin.
3. **COMPOSTOS PROIBIDOS:** É terminantemente proibido mencionar para mulheres: Testosterona, Trembolona, Dianabol, Boldenona.
4. **PROTOCOLOS MÚLTIPLOS E VARIADOS:** Ofereça várias opções de ciclos, categorizando-as por intensidade.

### REGRAS GERAIS PARA PROTOCOLOS:
1. **SEGUIR DOSAGENS MASCULINAS:** Para homens, use estritamente as dosagens da base de conhecimento para homens.
2. **BASEADO EXCLUSIVAMENTE NA LISTA:** Utilize APENAS os compostos da "lista de produtos disponíveis".
3. **APRESENTAR VÁRIAS OPÇÕES:** Forneça um leque com as opções de protocolos mais comuns e eficazes para o perfil do usuário.
4. **ESTRUTURA TÉCNICA OBRIGATÓRIA:** Apresentação, protocolos de 6-8 semanas, dosagens precisas (seguindo a base de conhecimento), ancilares e PCT detalhado.
5. **FORMATAÇÃO PROFISSIONAL:** Use Markdown estruturado.
      `;

      let availableProducts = realProducts;
      if (profileData.preference.toLowerCase() === 'oral') {
          availableProducts = realProducts.filter(p => p.type === 'Oral');
      } else if (profileData.preference.toLowerCase() === 'injetável') {
          availableProducts = realProducts.filter(p => p.type === 'Injetável');
      }
      
      const productsList = `
LISTA DE COMPOSTOS FARMACOLÓGICOS DISPONÍVEIS:
${availableProducts.map(p => `- ${p.name}`).join('\n')}
      `;

      const userProfile = `
PERFIL CLÍNICO DO USUÁRIO:
- Sexo Biológico: ${profileData.gender}
- Objetivo do Protocolo: ${profileData.objective}
- Via de Administração Preferencial: ${profileData.preference}
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
              Protocolo Gerado por IA
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
                  Calculando protocolos ergogênicos personalizados...
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
                    ⚠️ **AVISO MÉDICO:** Este protocolo é meramente educacional. Consulte sempre um endocrinologista especializado antes de iniciar qualquer protocolo ergogênico.
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
                  <h3 className="text-base sm:text-lg font-bold text-pharma-blue">Produtos Recomendados Disponíveis</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Encontre os produtos mencionados no seu protocolo na nossa loja oficial
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 sm:gap-3">
                  <Button 
                    onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
                    className="bg-pharma-blue text-white hover:bg-pharma-blue/90 w-full text-sm sm:text-base touch-target"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Comprar Produtos do Protocolo
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
