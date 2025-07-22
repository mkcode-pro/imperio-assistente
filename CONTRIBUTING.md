
# 🤝 GUIA DE CONTRIBUIÇÃO - ASSISTENTE IA ERGOGÊNICOS

## 📋 Índice
1. [Configuração do Ambiente](#configuração-do-ambiente)
2. [Arquitetura do Assistente IA](#arquitetura-do-assistente-ia)
3. [Como Modificar o Assistente](#como-modificar-o-assistente)
4. [Painel Administrativo](#painel-administrativo)
5. [Sistema de Prompts](#sistema-de-prompts)
6. [Boas Práticas](#boas-práticas)
7. [Deploy e Testing](#deploy-e-testing)

## 🚀 Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ (recomendado: Node 20+)
- Editor: VS Code com extensões TypeScript e Tailwind CSS
- Chave do Google Gemini AI

### Setup Inicial
```bash
# Clone e configure
git clone <repo-url>
cd assistente-ergogenicos
npm install

# Configure variáveis obrigatórias
cp .env.example .env.local
# Edite .env.local com sua chave do Gemini

# Inicie o desenvolvimento
npm run dev
```

### Extensões VS Code Recomendadas
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag"
  ]
}
```

## 🤖 Arquitetura do Assistente IA

### Estrutura de Componentes
```
src/components/assistant/
├── assistant-modal.tsx      # Modal principal do assistente
├── profile-form-step.tsx    # Formulário de perfil do usuário
├── terms-step.tsx          # Termos de uso educacionais
└── chat-step.tsx           # Interface de chat com IA
```

### Fluxo de Funcionamento
1. **Usuário abre o assistente** → `assistant-modal.tsx`
2. **Preenche perfil** → `profile-form-step.tsx` (gênero, objetivo, preferência)
3. **Aceita termos** → `terms-step.tsx` (obrigatório)
4. **Chat com IA** → `chat-step.tsx` (conversa personalizada)
5. **Dados salvos** → localStorage para o painel admin

### Estado Global
- **Perfil do usuário**: Salvo durante a sessão
- **Configurações da IA**: Carregadas do painel admin
- **Histórico**: Persistido para análise administrativa

## 🔧 Como Modificar o Assistente

### 1. Personalizar Prompts da IA

**Localização**: `src/lib/gemini.ts` e Painel Admin

```typescript
// Prompt padrão do sistema (pode ser alterado via admin)
const SYSTEM_PROMPT = `
Você é um especialista em protocolos ergogênicos. 
Responda EXCLUSIVAMENTE com opções de ciclos práticos...

### DOSAGENS SEGURAS:
**HOMENS:**
- Testosterona: 400-600mg/sem
[... resto do prompt]
`;
```

**Via Painel Admin**: Acesse `/admin` → Configurações → Editor de Prompt

### 2. Modificar Formulário de Perfil

**Localização**: `src/components/assistant/profile-form-step.tsx`

```typescript
// Adicionar nova opção de objetivo
const objectives = [
  { value: "bulking", label: "Ganho de Massa (Bulking)" },
  { value: "cutting", label: "Definição (Cutting)" },
  { value: "strength", label: "Força e Performance" },
  { value: "novo-objetivo", label: "Novo Objetivo" } // Nova opção
];
```

### 3. Customizar Respostas da IA

**Localização**: `src/components/assistant/chat-step.tsx`

```typescript
// Personalizar parâmetros da IA
const response = await generateResponse(userMessage, {
  systemPrompt: adminSettings?.systemPrompt || DEFAULT_PROMPT,
  maxTokens: adminSettings?.maxTokens || 500,
  temperature: adminSettings?.temperature || 0.7,
  // Novos parâmetros personalizados
});
```

### 4. Adicionar Validações de Perfil

```typescript
// Validar idade mínima (exemplo)
const validateProfile = (profile: UserProfile) => {
  if (profile.age && profile.age < 18) {
    throw new Error("Assistente disponível apenas para maiores de 18 anos");
  }
  
  // Outras validações personalizadas
};
```

## 🔧 Painel Administrativo

### Estrutura do AdminPanel
**Localização**: `src/pages/AdminPanel.tsx`

```typescript
// Principais seções do painel
const sections = {
  dashboard: "Estatísticas em tempo real",
  settings: "Configurações da IA", 
  history: "Histórico de conversas",
  analytics: "Métricas e relatórios"
};
```

### Adicionar Nova Métrica ao Dashboard

```typescript
// Calcular nova métrica
const calculateCustomMetric = (history: ChatMessage[]) => {
  const protocolsRequested = history.filter(msg => 
    msg.role === 'user' && msg.message.includes('protocolo')
  ).length;
  
  return protocolsRequested;
};

// Adicionar ao estado de stats
setStats(prev => ({
  ...prev,
  protocolsRequested: calculateCustomMetric(chatHistory)
}));
```

### Personalizar Configurações da IA

```typescript
// Adicionar novo parâmetro configurável
interface SystemSettings {
  systemPrompt: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
  // Novos parâmetros
  responseStyle: 'concise' | 'detailed' | 'scientific';
  includeWarnings: boolean;
}
```

## 🎯 Sistema de Prompts

### Prompt Engineering para Ergogênicos

**Estrutura Atual**:
```typescript
const PROMPT_STRUCTURE = {
  role: "Especialista em protocolos ergogênicos",
  constraints: [
    "Responder APENAS com opções práticas",
    "Usar SOMENTE compostos da lista",
    "Máximo 150 palavras",
    "Sem avisos longos"
  ],
  dosages: {
    men: "Dosagens específicas para homens",
    women: "Dosagens específicas para mulheres"
  },
  format: "**Nome do Ciclo** - Composto + dosagem + duração"
};
```

### Criar Prompts Especializados

```typescript
// Prompt por objetivo
const getPromptByObjective = (objective: string) => {
  const prompts = {
    bulking: `Foque em protocolos para ganho de massa...`,
    cutting: `Priorize protocolos para definição...`,
    strength: `Enfatize protocolos para força...`
  };
  
  return prompts[objective] || DEFAULT_PROMPT;
};
```

### Templates de Resposta

```typescript
// Criar templates reutilizáveis
const RESPONSE_TEMPLATES = {
  beginner: "Protocolo para iniciantes...",
  intermediate: "Protocolo para intermediários...",
  advanced: "Protocolo para avançados..."
};
```

## ✅ Boas Práticas

### 1. TypeScript Rigoroso
```typescript
// ✅ Sempre tipear dados do assistente
interface UserProfile {
  gender: 'male' | 'female';
  objective: 'bulking' | 'cutting' | 'strength';
  preference: 'oral' | 'injectable' | 'both';
}

interface ChatMessage {
  id: string;
  timestamp: string;
  role: 'user' | 'assistant';
  message: string;
  userProfile?: UserProfile;
}
```

### 2. Tratamento de Erros da IA
```typescript
// ✅ Tratar erros específicos do Gemini
const handleGeminiError = (error: any) => {
  if (error.message?.includes('API_KEY')) {
    return "Erro de configuração da IA. Contate o administrador.";
  }
  
  if (error.message?.includes('QUOTA_EXCEEDED')) {
    return "Limite de consultas excedido. Tente novamente mais tarde.";
  }
  
  return "Erro inesperado. Tente novamente.";
};
```

### 3. Performance da IA
```typescript
// ✅ Implementar timeout para consultas
const consultWithTimeout = async (message: string, timeout = 30000) => {
  const controller = new AbortController();
  
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await gemini.generateContent(message, {
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};
```

### 4. Segurança e Validação
```typescript
// ✅ Validar entrada do usuário
const sanitizeUserInput = (input: string) => {
  // Remover caracteres perigosos
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags básicos
    .slice(0, 500); // Limitar tamanho
};
```

## 🔄 Fluxo de Desenvolvimento

### 1. Testar Alterações na IA
```bash
# 1. Modificar prompt ou configuração
# 2. Reiniciar aplicação
npm run dev

# 3. Acessar painel admin
open http://localhost:8080/admin

# 4. Testar conversa
open http://localhost:8080

# 5. Verificar logs no console
```

### 2. Debug do Assistente
```typescript
// Habilitar logs detalhados
localStorage.setItem('DEBUG_ASSISTANT', 'true');
localStorage.setItem('DEBUG_GEMINI', 'true');

// Verificar dados salvos
console.log('Admin Settings:', localStorage.getItem('admin_settings'));
console.log('Chat History:', localStorage.getItem('chat_history'));
```

### 3. Commit Guidelines
```bash
# Formato específico para o assistente
git commit -m "feat(assistant): adicionar novo objetivo de protocolo"
git commit -m "fix(admin): corrigir exportação de dados"
git commit -m "chore(prompts): atualizar dosagens recomendadas"
```

## 🚀 Deploy e Testing

### Build Local com IA
```bash
# Verificar se a chave da IA está configurada
echo $VITE_GEMINI_API_KEY

# Build de produção
npm run build

# Testar build com IA
npm run preview
```

### Configuração para VPS
```bash
# Variáveis obrigatórias para produção
export VITE_GEMINI_API_KEY=sua_chave_real
export VITE_ADMIN_PASSWORD=senha_forte_aqui
export NODE_ENV=production

# Deploy automático
./scripts/smart-deploy.sh
```

### Monitoramento da IA em Produção
```bash
# Verificar logs da aplicação
pm2 logs assistente-ia

# Monitorar performance
pm2 monit

# Verificar uso da API Gemini
curl -H "Authorization: Bearer $VITE_GEMINI_API_KEY" \
  https://generativelanguage.googleapis.com/v1/models
```

## 🐛 Debug e Troubleshooting

### Problemas Comuns do Assistente

1. **IA não responde**
   - Verificar chave do Gemini no `.env.local`
   - Confirmar quota da API no Google Cloud
   - Verificar se o prompt não está muito longo

2. **Painel admin não salva configurações**
   - Verificar permissões do localStorage
   - Confirmar se não há erro de JSON parsing
   - Verificar console do navegador

3. **Histórico de conversas vazio**
   - Realizar algumas conversas primeiro
   - Verificar se localStorage não foi limpo
   - Confirmar formato dos dados salvos

### Logs Específicos
```javascript
// Debug específico do assistente
window.__ASSISTANT_DEBUG__ = {
  settings: JSON.parse(localStorage.getItem('admin_settings') || '{}'),
  history: JSON.parse(localStorage.getItem('chat_history') || '[]'),
  currentProfile: /* perfil atual */
};
```

---

**🤖 Pronto para desenvolver o melhor assistente IA para protocolos ergogênicos!**

*Para dúvidas específicas sobre a IA ou integração com Gemini, consulte a documentação oficial do Google AI.*
