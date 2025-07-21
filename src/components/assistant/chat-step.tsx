
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RotateCcw, ShoppingCart, Download, ArrowLeft, CheckCircle, Shield, Clock } from "lucide-react";
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
      // Buscar configurações do localStorage (futuramente da API)
      const savedSettings = localStorage.getItem('admin_settings');
      let systemInstructions = `
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
7. Sem seções de "Produtos Disponíveis" ou CTAs de compra
8. Foque apenas nas opções de ciclos
      `;
      
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        systemInstructions = settings.systemPrompt || systemInstructions;
      }


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

      // Buscar API key das configurações
      let apiKey = "AIzaSyBAAMbYYD5UbnXbO2wwJs88S2FY0-HmxlY";
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        apiKey = settings.apiKey || apiKey;
      }
      
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
      
      // Salvar no histórico
      const chatHistory = JSON.parse(localStorage.getItem('chat_history') || '[]');
      
      // Salvar mensagem do usuário
      chatHistory.push({
        id: Date.now().toString() + '_user',
        timestamp: new Date().toISOString(),
        role: 'user',
        message: `Perfil: ${profileData.gender} | Objetivo: ${profileData.objective} | Preferência: ${profileData.preference}`,
        userProfile: profileData
      });
      
      // Salvar resposta do assistente
      chatHistory.push({
        id: Date.now().toString() + '_assistant',
        timestamp: new Date().toISOString(),
        role: 'assistant',
        message: aiText
      });
      
      localStorage.setItem('chat_history', JSON.stringify(chatHistory));

    } catch (err: any) {
      setError(err.message || "Erro ao gerar sugestão. Tente novamente.");
      console.error("Error generating suggestion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadConsultation = (format: 'html' | 'txt') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `consulta-${profileData.gender}-${profileData.objective.replace(/\s+/g, '-')}-${timestamp}`;
    
    let content = '';
    let mimeType = '';
    let extension = '';

    if (format === 'html') {
      content = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Personalizada - Império Pharma</title>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .profile { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .content { background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 8px; }
        .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 Assistente Maromba - Império Pharma</h1>
        <p>Consulta Personalizada Gerada em ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>
    
    <div class="profile">
        <h2>📋 Perfil do Cliente</h2>
        <p><strong>Sexo:</strong> ${profileData.gender}</p>
        <p><strong>Objetivo:</strong> ${profileData.objective}</p>
        <p><strong>Preferência:</strong> ${profileData.preference}</p>
    </div>
    
    <div class="warning">
        <p><strong>⚠️ IMPORTANTE:</strong> Consulte sempre um médico especializado antes de iniciar qualquer protocolo. Esta é apenas uma orientação educacional.</p>
    </div>
    
    <div class="content">
        <h2>💊 Recomendações Personalizadas</h2>
        ${response}
    </div>
    
    <div class="footer">
        <p><strong>Império Pharma</strong> - Produtos de qualidade e orientação especializada</p>
        <p>🌐 www.loja.imperiopharma.com.py | 📱 WhatsApp: Entre em contato</p>
        <p style="font-size: 12px; color: #64748b;">Documento gerado pelo Assistente IA - Império Pharma © 2024</p>
    </div>
</body>
</html>
      `;
      mimeType = 'text/html';
      extension = 'html';
    } else {
      content = `
CONSULTA PERSONALIZADA - IMPÉRIO PHARMA
=======================================

Data: ${new Date().toLocaleDateString('pt-BR')}
Gerado por: Assistente Maromba (IA)

PERFIL DO CLIENTE
-----------------
Sexo: ${profileData.gender}
Objetivo: ${profileData.objective}
Preferência: ${profileData.preference}

IMPORTANTE
----------
⚠️ Consulte sempre um médico especializado antes de iniciar qualquer protocolo.
Esta é apenas uma orientação educacional.

RECOMENDAÇÕES PERSONALIZADAS
----------------------------
${response.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}

---
Império Pharma - Produtos de qualidade e orientação especializada
www.loja.imperiopharma.com.py
Documento gerado pelo Assistente IA - Império Pharma © 2024
      `;
      mimeType = 'text/plain';
      extension = 'txt';
    }

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Melhorado com Navegação */}
      <div className="flex-shrink-0 border-b bg-gradient-to-r from-pharma-navy/5 to-pharma-blue/5 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              className="text-muted-foreground hover:text-pharma-blue"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Loja</span>
            </Button>
            <div className="text-center">
              <h2 className="text-base sm:text-lg font-semibold text-foreground">
                Assistente Maromba
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Protocolo Personalizado Gerado
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-green-500/10 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle className="h-3 w-3 inline mr-1" />
              Gratuito
            </div>
          </div>
        </div>
      </div>

      {/* Área de Chat com Rolagem - Foco Apenas nos Ciclos */}
      <ScrollArea className="flex-grow p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-pharma-blue mx-auto" />
                <p className="text-muted-foreground text-sm sm:text-base px-4">
                  Gerando opções de ciclos personalizados...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 sm:p-6">
              <p className="text-destructive text-center font-medium text-sm sm:text-base mb-3">{error}</p>
              <Button
                variant="outline"
                onClick={generateSuggestion}
                className="mx-auto flex gap-2 touch-target"
              >
                <RotateCcw className="h-4 w-4" />
                Tentar Novamente
              </Button>
            </div>
           ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Aviso Médico */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-amber-800 font-medium text-center">
                  ⚠️ Consulte um médico especializado antes de iniciar qualquer protocolo.
                </p>
              </div>
              
              {/* Resposta dos Ciclos - Sem CTAs */}
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <div 
                  className="prose prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-pharma-blue prose-ul:text-muted-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: response }}
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Barra Inferior Fixa Profissional - Design E-commerce */}
      <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur-sm safe-bottom">
        {/* Informações Premium Compactas */}
        <div className="bg-gradient-to-r from-pharma-navy/5 to-pharma-blue/5 border-b border-border/50 px-4 py-2">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Produtos Originais</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-blue-500" />
              <span>Entrega Discreta</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 text-amber-500" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>

        {/* Botões de Ação - Padrão E-commerce */}
        <div className="p-3">
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            <Button
              onClick={() => downloadConsultation('html')}
              variant="outline"
              size="sm"
              className="text-xs border-pharma-blue/30 text-pharma-blue hover:bg-pharma-blue/10"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
            
            <Button
              onClick={onNewConsultation}
              variant="outline"
              size="sm"
              className="text-xs border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Novo
            </Button>
            
            <Button
              onClick={() => window.open('https://www.loja.imperiopharma.com.py', '_blank')}
              size="sm"
              className="text-xs bg-gradient-to-r from-pharma-navy to-pharma-blue text-white hover:from-pharma-navy/90 hover:to-pharma-blue/90"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Comprar
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground/70 mt-2">
            Dúvidas? Fale conosco no WhatsApp oficial
          </p>
        </div>
      </div>
    </div>
  );
}
