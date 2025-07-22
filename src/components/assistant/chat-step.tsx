
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
  { name: 'Oximetolona (Hemogenin)', type: 'Oral' },
  { name: 'Propionato de Testosterona', type: 'Injetável' },
  { name: 'Durateston', type: 'Injetável' },
  { name: 'Fenilpropionato de Nandrolona (NPP)', type: 'Injetável' },
  { name: 'Fluoximesterona (Halotestin)', type: 'Oral' },
  { name: 'Turinabol (Tbol)', type: 'Oral' },
  { name: 'Clembuterol', type: 'Oral' },
  { name: 'Mesterolona (Proviron)', type: 'Oral' },
  { name: 'Sibutramina', type: 'Oral' },
  { name: 'Semaglutida (Ozempic)', type: 'Injetável' },
  { name: 'Tirzepatida (Mounjaro)', type: 'Injetável' },
  { name: 'Gonadotrofina Coriônica (hCG)', type: 'Injetável' },
  { name: 'Tamoxifeno (Nolvadex)', type: 'Oral' },
  { name: 'Clomifeno (Clomid)', type: 'Oral' },
  { name: 'Anastrozol (Arimidex)', type: 'Oral' }
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
GANHO DE MASSA BRUTA (BULKING/VOLUME)

Iniciantes – Bulking
Ciclo: Testosterona (monociclo básico)
- Semanas 1–8: Testosterona (Enantato ou Cipionato), 300–600 mg/semana
- Opcional: adicionar Stanozolol, Dianabol ou Oxandrolona, 30 mg/dia nas semanas finais

Ciclo: Testosterona + Dianabol
- Semanas 1–8: Testosterona (Enantato/Cipionato), 400–600 mg/semana
- Semanas 5–8: Dianabol, 40–60 mg/dia

Ciclo: Testosterona + Nandrolona Fenilpropionato (NPP) + Turinabol
- Semanas 1–8: Testosterona Propionato, 100 mg dia sim/dia não
- Semanas 1–8: NPP, 100 mg dia sim/dia não
- Semanas 1–6: Turinabol, 40–60 mg/dia

Intermediários – Bulking
Ciclo: Testosterona + Deca-Durabolin
- Semanas 1–8: Testosterona (Enantato/Cipionato), 400–600 mg/semana
- Semanas 1–8: Deca-Durabolin, 200–400 mg/semana

Ciclo: Testosterona + Deca + Dianabol
- Semanas 1–10: Testosterona, 400–600 mg/semana
- Semanas 1–10: Deca-Durabolin, 200–400 mg/semana
- Semanas 6–10: Dianabol, 40–60 mg/dia

Ciclo: Durateston + Deca + Hemogenin
- Semanas 1–8: Durateston, 500 mg/semana
- Semanas 1–8: Deca-Durabolin, 400 mg/semana
- Semanas 1–4: Oximetolona (Hemogenin), 50–100 mg/dia

Ciclo: Testosterona + Boldenona + Turinabol
- Semanas 1–10: Testosterona Enantato, 500 mg/semana
- Semanas 1–10: Boldenona, 500 mg/semana
- Semanas 1–6: Turinabol, 50 mg/dia

Ciclo: Testosterona + Trembolona + Dianabol
- Semanas 1–8: Testosterona Enantato, 500–600 mg/semana
- Semanas 1–8: Trembolona Acetato, 300–400 mg/semana
- Semanas 1–4: Dianabol, 40 mg/dia

Avançados – Bulking
Ciclo: Testo + Deca + Boldenona + Dianabol (Mega Bulk)
- Semanas 1–10: Testosterona Enantato, 500–800 mg/semana
- Semanas 1–10: Boldenona Undecilenato, 400–600 mg/semana
- Semanas 1–10: Deca-Durabolin, 400–600 mg/semana
- Semanas 5–10: Dianabol, 50–60 mg/dia

Ciclo: Testosterona + Oximetolona (Hemogenin)
- Semanas 1–6: Testosterona (Enantato/Cipionato), 500 mg/semana
- Semanas 1–4: Oximetolona, 50 mg/dia

Ciclo: Testosterona + NPP + Trembolona + Dianabol
- Semanas 1–10: Testosterona Enantato, 600 mg/semana
- Semanas 1–10: NPP, 200 mg/semana
- Semanas 1–10: Trembolona Acetato, 400 mg/semana
- Semanas 1–4: Dianabol, 40 mg/dia

---

GANHOS DE MASSA MAGRA (SEMI DEFINIDOS / VOLUME LIMPO)

Iniciantes – Ganho Magro
Ciclo: Testosterona + Oxandrolona
- Semanas 1–8: Testosterona (Enantato/Cipionato), 400–600 mg/semana
- Semanas 3–8: Oxandrolona, 40–60 mg/dia

Ciclo: Testosterona + Stanozolol
- Semanas 1–8: Testosterona, 400–600 mg/semana
- Semanas 3–8: Stanozolol, 40–60 mg/dia

Intermediários – Ganho Magro
Ciclo: Testosterona + Boldenona
- Semanas 1–10: Testosterona, 400–600 mg/semana
- Semanas 1–10: Boldenona, 400–600 mg/semana

Ciclo: Testosterona + Primobolan
- Semanas 1–10: Testosterona, 400–600 mg/semana
- Semanas 1–10: Primobolan, 400–600 mg/semana

Ciclo: Testosterona + Deca + Stanozolol
- Semanas 1–8: Testosterona, 400–600 mg/semana
- Semanas 1–8: Deca-Durabolin, 200–300 mg/semana
- Semanas 5–8: Stanozolol, 50 mg/dia

Ciclo: Testosterona + Primobolan + Masteron
- Semanas 1–8: Propionato de Testosterona, 100 mg dia sim/dia não
- Semanas 1–8: Primobolan, 400 mg/semana
- Semanas 1–8: Masteron, 400 mg/semana

Ciclo: Testosterona + Drostanolona (Masteron) + Oxandrolona
- Semanas 1–8: Testosterona Propionato, 400 mg/semana
- Semanas 1–8: Masteron Propionato, 400 mg/semana
- Semanas 1–8: Oxandrolona, 60 mg/dia

Avançados – Ganho Magro
Ciclo: Testosterona + Boldenona + Oxandrolona
- Semanas 1–10: Testosterona, 500 mg/semana
- Semanas 1–10: Boldenona, 600–800 mg/semana
- Semanas 7–12: Oxandrolona, 50 mg/dia

Ciclo: Testosterona + Trembolona + Boldenona
- Semanas 1–8: Propionato de Testosterona, 400 mg/semana
- Semanas 1–8: Trembolona Acetato, 400 mg/semana
- Semanas 1–8: Boldenona, 800 mg/semana

---

DEFINIÇÃO / CUTTING (GANHOS SECOS E QUEIMA DE GORDURA)

Iniciantes – Definição
Ciclo: Testosterona (baixa dose) + Oxandrolona
- Semanas 1–8: Testosterona, 200–300 mg/semana
- Semanas 1–6: Oxandrolona, 30–50 mg/dia

Ciclo: Stanozolol + Oxandrolona (oral)
- Semanas 1–6: Oxandrolona, 20 mg/dia
- Semanas 1–6: Stanozolol, 10–20 mg/dia
- Clembuterol nas semanas 1–6 (80–120 mcg/dia) e Proviron 25–50 mg/dia (opcional)

Ciclo: Testosterona + Primobolan + Winstrol
- Semanas 1–8: Testosterona Propionato, 300 mg/semana
- Semanas 1–8: Primobolan, 400 mg/semana
- Semanas 5–8: Stanozolol, 50 mg/dia

Intermediários – Definição
Ciclo: Testosterona + Boldenona + Stanozolol
- Semanas 1–12: Testosterona, 200–500 mg/semana
- Semanas 1–12: Boldenona, 400–600 mg/semana
- Semanas 6–12: Stanozolol, 40–60 mg/dia

Ciclo: Testosterona + Trembolona
- Semanas 1–8: Testosterona (Propionato/Enantato), 300–500 mg/semana
- Semanas 1–8: Trembolona Acetato, 300 mg/semana

Ciclo: Testosterona + Masteron
- Semanas 1–10: Testosterona (Propionato), 300 mg/semana
- Semanas 1–10: Masteron (Propionato), 400 mg/semana
- Opção: adicionar Winstrol nas últimas 6 semanas (25–50 mg/dia)

Ciclo: Testosterona + Stanozolol + Clembuterol + Anastrozol
- Semanas 1–8: Testosterona Enantato, 300 mg/semana
- Semanas 1–8: Stanozolol, 50 mg/dia
- Clembuterol 80–120 mcg/dia, ciclos 2on/2off
- Anastrozol 0,5 mg dia sim/dia não

Avançados – Definição
Ciclo: Testosterona + Trembolona + Masteron (Pré-Contest)
- Semanas 1–12: Testosterona, 200–500 mg/semana
- Semanas 1–4: Oxandrolona, 40–60 mg/dia
- Semanas 5–12: Trembolona, 175–350 mg/semana
- Semanas 5–12: Masteron, 175–350 mg/semana

Ciclo: Testosterona + Trembolona + Winstrol
- Semanas 1–8: Testosterona Propionato, 300 mg/semana
- Semanas 3–8: Trembolona Acetato, 400 mg/semana
- Semanas 5–8: Stanozolol, 50 mg/dia
- Clembuterol 2on/2off (~100 mcg/dia)

Ciclo: Testosterona + Halotestin + Trembolona
- Semanas 1–8: Testosterona Propionato, 100 mg dia sim/dia não
- Semanas 1–8: Trembolona Acetato, 300–400 mg/semana
- Semanas 5–8: Halotestin, 20–30 mg/dia (apenas na fase final)

**MULHERES:**
Iniciantes – Feminino
Ciclo: Oxandrolona (monociclo)
- Semanas 1–6: Oxandrolona, 15 mg/dia
- Semana 7: Oxandrolona, 10 mg/dia
- Semana 8: Oxandrolona, 5 mg/dia

Intermediários – Feminino
Ciclo: Primobolan (injeção)
- Semanas 1–8: Primobolan, 200 mg/semana

Ciclo: Stanozolol
- Semanas 1–7: Stanozolol, 20 mg/dia (oral) OU 50 mg dia sim/dia não (injeção)

Ciclo: Boldenona (EQ)
- Semanas 1–8: Boldenona Undecilenato, 150–250 mg/semana

Ciclo: Primobolan + Turinabol
- Semanas 1–8: Primobolan, 100–150 mg/semana
- Semanas 1–6: Turinabol, 10–20 mg/dia

Ciclo: Stanozolol + Clembuterol + Oxandrolona
- Semanas 1–6: Stanozolol, 10 mg/dia
- Semanas 1–6: Oxandrolona, 10 mg/dia
- Semanas 1–6: Clembuterol, 60–80 mcg/dia

Ciclo: Testosterona base (microdose) + Primobolan
- Semanas 1–8: Testosterona Propionato, 12,5–25 mg/semana
- Semanas 1–8: Primobolan, 50–100 mg/semana

Avançados – Feminino
Ciclo: Deca-Durabolin (Nandrolona)
- Semanas 1–8: Deca-Durabolin, 50–200 mg/semana

Ciclo: Boldenona ou Primobolan + Oxandrolona ou Stanozolol
- Semanas 1–10: Boldenona OU Primobolan, 100–200 mg/semana
- Semanas 7–10: Oxandrolona OU Stanozolol, 10–20 mg/dia

Ciclo: Trembolona + Stanozolol + Oxandrolona (avançado)
- Semanas 1–8: Trembolona, 50–100 mg/semana
- Semanas 1–8: Stanozolol, 25–50 mg/semana
- Semanas 1–8: Oxandrolona, 15–20 mg/dia

---

ASSOCIAÇÃO COM SIBUTRAMINA, OZEMPIC, MOUNJARO (ADJUVANTES DE PERDA DE PESO)

Ciclo: Testosterona + Oxandrolona + Semaglutida (Ozempic)
- Semanas 1–8: Testosterona Enantato, 300 mg/semana
- Semanas 1–8: Oxandrolona, 40 mg/dia
- Semanas 1–8: Semaglutida, 1 mg/semana

Ciclo: Oxandrolona + Sibutramina
- Semanas 1–8: Oxandrolona, 20 mg/dia
- Semanas 1–8: Sibutramina, 10–15 mg/dia

Ciclo: Qualquer ciclo + Tirzepatida (Mounjaro)
- Adicionar Tirzepatida, começando com 5 mg/semana e aumentando até 10–15 mg/semana conforme tolerância

---

TPC (TERAPIA PÓS-CICLO) PADRÃO

- Tamoxifeno 20 mg/dia por 4–6 semanas (masculino)
- Clomifeno 50 mg/dia por 4 semanas (opcional, masculino)
- HCG 500–1000 UI por semana por 4 semanas (pode ser usado intra e pós-ciclo)
- Anastrozol 0,5 mg/dia durante e após ciclo, se necessário (controle de aromatização)
- Para mulheres: Tamoxifeno 20–30 mg/dia por 4–6 semanas após ciclo

### REGRAS:
1. Use APENAS os compostos da lista disponível
2. Para mulheres: APENAS substancias com menos risco de virilização 
3. Apresente 3-4 opções categorizadas (Iniciante/Intermediário/Avançado)
4. Formato: **Nome do Ciclo** - Composto + dosagem + duração
5. Sem PCT detalhado, sem avisos longos
6. Sem seções de "Produtos Disponíveis" ou CTAs de compra
7. Foque apenas nas opções de ciclos
    
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
