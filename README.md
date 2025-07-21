# 🚀 Império Pharma - E-commerce com Assistente IA + Painel Administrativo

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC.svg)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

**Império Pharma** é uma aplicação e-commerce moderna especializada em suplementos, desenvolvida com React 18 + TypeScript. Agora inclui um **Painel Administrativo** completo para gerenciar o assistente IA e monitorar conversas.

### ✨ Principais Características
- 🎯 **Design responsivo mobile-first** - Experiência otimizada para todos os dispositivos
- 🛒 **Sistema de carrinho avançado** - Gestão completa de produtos e checkout
- 🤖 **Assistente IA integrado** - Suporte inteligente com Google Gemini
- 💳 **Checkout em 4 etapas** - Fluxo simplificado até WhatsApp
- 🔧 **Painel Administrativo** - Gerenciamento completo do assistente IA
- 📊 **Histórico de Conversas** - Monitoramento de todas as interações
- ⚡ **Performance otimizada** - Build com Vite para carregamento rápido

## 🆕 NOVO: Painel Administrativo

### 🔐 Acesso ao Painel
- **URL**: `http://localhost:5173/admin` (desenvolvimento) ou `https://seudominio.com/admin` (produção)
- **Senha padrão**: `admin123`

### 🛠️ Funcionalidades do Painel

#### 1. **Dashboard com Estatísticas**
- Total de conversas realizadas
- Conversas do dia atual
- Tempo médio de resposta
- Taxa de sucesso das consultas

#### 2. **Configurações do Assistente IA**
- ✏️ **Editor de Prompt do Sistema** - Modifique as instruções da IA em tempo real
- 🔑 **Gerenciamento de API Key** - Configure a chave do Google Gemini
- ⚙️ **Parâmetros da IA** - Ajuste max tokens e temperature
- 💾 **Salvamento Local** - Configurações persistem no localStorage

#### 3. **Histórico de Conversas**
- 📝 **Visualização Completa** - Todas as interações usuário-assistente
- 👤 **Perfis dos Usuários** - Dados de gênero, objetivo e preferências
- 📅 **Timestamps Detalhados** - Data e hora de cada conversa
- 📤 **Exportação de Dados** - Backup completo em JSON
- 🗑️ **Limpeza de Histórico** - Remoção segura dos dados

#### 4. **Analytics (Em Desenvolvimento)**
- 📊 Gráficos de uso
- 📈 Métricas de performance
- 🎯 Relatórios detalhados

## 🚀 Instalação e Configuração

### Pré-requisitos
- **Node.js** 18+ (recomendado: 20+)
- **npm**, **yarn**, **pnpm** ou **bun**

### 🔧 Instalação Local (Desenvolvimento)

```bash
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd imperio-pharma

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente (opcional)
cp .env.example .env.local
# Edite .env.local com suas configurações

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

### 🌐 Configuração para VPS/Produção

#### 1. **Build de Produção**
```bash
# Gerar build otimizado
npm run build

# Preview local do build
npm run preview
```

#### 2. **Deploy em VPS com Nginx**
```bash
# 1. Fazer upload da pasta 'dist' para sua VPS
scp -r dist/ usuario@sua-vps:/var/www/imperio-pharma/

# 2. Configurar Nginx
sudo nano /etc/nginx/sites-available/imperio-pharma
```

**Configuração do Nginx:**
```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    root /var/www/imperio-pharma;
    index index.html;

    # Configuração para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compressão Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

```bash
# 3. Ativar o site
sudo ln -s /etc/nginx/sites-available/imperio-pharma /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 3. **SSL com Let's Encrypt**
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (`.env.local`)
```bash
# Porta do servidor (opcional - auto-detect se não especificado)
PORT=3000

# API do Google Gemini (obrigatório para IA)
VITE_GEMINI_API_KEY=sua_chave_aqui

# WhatsApp da empresa (opcional)
VITE_WHATSAPP_NUMBER=5511999999999

# PIX da empresa (opcional)
VITE_PIX_KEY=exemplo@email.com
```

## 🔐 Segurança do Painel Administrativo

### 🛡️ Configurações de Segurança

#### 1. **Alterar Senha Padrão**
No arquivo `src/pages/AdminPanel.tsx`, linha 45:
```typescript
// Altere a senha padrão
if (password === "SUA_SENHA_FORTE_AQUI") {
```

#### 2. **Implementar Autenticação Avançada (Recomendado para Produção)**
```typescript
// Exemplo de autenticação com JWT ou sessão
const handleLogin = async () => {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('admin_token', token);
      setIsAuthenticated(true);
    }
  } catch (error) {
    toast.error("Erro de autenticação");
  }
};
```

#### 3. **Proteger Rota com Nginx (Produção)**
```nginx
# Adicionar ao bloco server do Nginx
location /admin {
    # Restringir por IP (opcional)
    allow 192.168.1.0/24;  # Sua rede local
    allow SEU.IP.PUBLICO.AQUI;
    deny all;
    
    try_files $uri $uri/ /index.html;
}
```

## 📊 Armazenamento de Dados

### 🗄️ Sistema Atual (localStorage)
- **Configurações**: `admin_settings` - Prompt, API key, parâmetros
- **Histórico**: `chat_history` - Todas as conversas
- **Backup**: Exportação automática em JSON

### 🔄 Migração para Banco de Dados (Futuro)

Para implementar persistência real, você pode migrar para:

#### **Opção 1: PostgreSQL + API Node.js**
```sql
-- Estrutura das tabelas
CREATE TABLE ai_settings (
    id SERIAL PRIMARY KEY,
    setting_name VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT
);

CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT NOW(),
    role VARCHAR(50) NOT NULL,
    message_content TEXT NOT NULL,
    user_profile JSONB
);
```

#### **Opção 2: SQLite (Simples)**
```bash
# Instalar dependências
npm install sqlite3 better-sqlite3

# Criar API simples com Express
npm install express cors
```

## 🛠️ Customização

### 🎨 **Modificar Aparência do Painel**
```typescript
// src/pages/AdminPanel.tsx
// Alterar cores do tema
className="bg-gradient-to-r from-pharma-navy to-pharma-blue"
```

### 📝 **Adicionar Novos Campos de Configuração**
```typescript
// Adicionar ao interface SystemSettings
interface SystemSettings {
  systemPrompt: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
  // Novos campos
  maxConversations: number;
  enableLogging: boolean;
}
```

### 📊 **Implementar Analytics Personalizados**
```typescript
// Exemplo de métricas customizadas
const calculateMetrics = (history: ChatMessage[]) => {
  const today = new Date().toDateString();
  const thisWeek = /* lógica da semana */;
  
  return {
    dailyAverage: history.filter(/* filtro */).length,
    weeklyGrowth: /* cálculo */,
    popularTopics: /* análise de conteúdo */
  };
};
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor local com hot-reload

# Build
npm run build        # Build otimizado para produção
npm run preview      # Preview do build localmente

# Utilitários
npm run type-check   # Verificação de tipos TypeScript
npm run lint         # Análise de código
```

## 📁 Estrutura do Projeto

```
src/
├── components/              # 61+ componentes React organizados
│   ├── assistant/          # Sistema de IA (4 componentes)
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Seções da página principal
│   └── ui/                 # 40+ componentes base (Radix UI)
├── pages/                  # Páginas principais
│   ├── Index.tsx          # Página inicial
│   ├── AdminPanel.tsx     # 🆕 Painel administrativo
│   └── NotFound.tsx       # Página 404
├── hooks/                  # Custom hooks
├── lib/                    # Bibliotecas e configurações
├── types/                  # Definições TypeScript
└── utils/                  # Funções utilitárias
```

## 🎯 Funcionalidades Implementadas

### ✅ **Sistema Completo de E-commerce**
- [x] Catálogo de produtos com categorias e marcas
- [x] Carrinho com cálculo de frete automático
- [x] Checkout em 4 etapas
- [x] Integração WhatsApp para finalização
- [x] Upload de comprovante PIX

### ✅ **Assistente IA Avançado**
- [x] Chat inteligente com Google Gemini
- [x] Protocolos personalizados por perfil
- [x] Sistema de termos e condições
- [x] 🆕 **Configuração dinâmica via painel admin**
- [x] 🆕 **Histórico completo de conversas**

### ✅ **Painel Administrativo**
- [x] 🆕 **Dashboard com estatísticas em tempo real**
- [x] 🆕 **Editor de prompt do sistema**
- [x] 🆕 **Gerenciamento de configurações da IA**
- [x] 🆕 **Visualização do histórico de conversas**
- [x] 🆕 **Sistema de autenticação**
- [x] 🆕 **Exportação de dados**

## 🚀 Próximos Passos

### 🔄 **Melhorias Planejadas**
- [ ] **Backend real** - API Node.js + PostgreSQL
- [ ] **Analytics avançados** - Gráficos e relatórios
- [ ] **Autenticação JWT** - Sistema de login robusto
- [ ] **Notificações push** - Alertas em tempo real
- [ ] **Multi-usuário** - Diferentes níveis de acesso
- [ ] **Backup automático** - Sincronização com cloud

### 📊 **Analytics em Desenvolvimento**
- [ ] Gráficos de uso por período
- [ ] Análise de sentimento das conversas
- [ ] Métricas de performance da IA
- [ ] Relatórios de conversão

## 🤝 Contribuição

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para guias detalhados de desenvolvimento e manutenção.

## 📞 Suporte

### **Acesso ao Painel**
- URL: `/admin`
- Senha padrão: `admin123`

### **Problemas Comuns**
1. **Painel não carrega**: Verifique se a rota `/admin` está configurada
2. **Configurações não salvam**: Verifique permissões do localStorage
3. **Histórico vazio**: Faça algumas conversas com o assistente primeiro

### **Logs e Debug**
```javascript
// Habilitar logs detalhados no console
localStorage.setItem('DEBUG_ADMIN', 'true');
```

---

**🚀 Agora com Painel Administrativo Completo! Gerencie seu assistente IA com facilidade.**

*Para dúvidas técnicas sobre o painel administrativo, consulte a documentação ou abra uma issue.*