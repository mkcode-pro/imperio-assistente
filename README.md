
# 🚀 Império Pharma - E-commerce Moderno de Suplementos

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC.svg)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

**Império Pharma** é uma aplicação e-commerce moderna especializada em suplementos, desenvolvida com React 18 + TypeScript e focada em alta performance e experiência do usuário otimizada.

### ✨ Principais Características
- 🎯 **Design responsivo mobile-first** - Experiência otimizada para todos os dispositivos
- 🛒 **Sistema de carrinho avançado** - Gestão completa de produtos e checkout
- 🤖 **Assistente IA integrado** - Suporte inteligente com Google Gemini
- 💳 **Checkout em 4 etapas** - Fluxo simplificado até WhatsApp
- 📱 **PWA Ready** - Progressive Web App capabilities
- ⚡ **Performance otimizada** - Build com Vite para carregamento rápido

## 🛠️ Stack Tecnológica

### Core
- **React 18.3.1** - Library para interface de usuário
- **TypeScript 5.5.3** - Tipagem estática
- **Vite 5.4.1** - Build tool e servidor de desenvolvimento

### Styling & UI
- **Tailwind CSS 3.4.11** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis (40+ componentes)
- **Lucide React** - Ícones modernos
- **CSS Variables** - Sistema de design consistente

### State & Data
- **React Context** - Gerenciamento de estado global
- **React Query (TanStack)** - Cache e sincronização de dados
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de esquemas

### Integrações
- **Google Gemini AI** - Assistente inteligente
- **WhatsApp API** - Integração para checkout
- **ViaCEP** - Busca automática de endereços

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
# ou
yarn install
# ou
pnpm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

**⚠️ IMPORTANTE - Portas Dinâmicas:**
O projeto está configurado para **auto-detectar portas disponíveis**. Se a porta padrão estiver ocupada, o Vite automaticamente encontrará uma porta livre.

Para **forçar uma porta específica** (útil em VPS com múltiplos projetos):
```bash
# Usando variável de ambiente
PORT=3000 npm run dev

# Ou defina no .env.local
echo "PORT=3000" > .env.local
```

### 🌐 Configuração para VPS/Produção

#### 1. **Verificação de Portas Ocupadas**
```bash
# Verificar portas em uso
netstat -tulpn | grep LISTEN
# ou
ss -tulpn | grep LISTEN

# Verificar porta específica
lsof -i :3000
```

#### 2. **Setup com PM2 (Recomendado)**
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Build de produção
npm run build

# Servir com PM2
pm2 serve dist 3000 --name "imperio-pharma" --spa

# Configurar auto-start
pm2 startup
pm2 save
```

#### 3. **Setup com Docker**
```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 4. **Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name imperio-pharma.com.br;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
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
├── components/              # 61 componentes React organizados
│   ├── assistant/          # Sistema de IA (4 componentes)
│   │   ├── assistant-modal.tsx
│   │   ├── chat-step.tsx
│   │   ├── profile-form-step.tsx
│   │   └── terms-step.tsx
│   ├── cart/              # Sistema de carrinho (2 componentes)
│   │   ├── cart-drawer.tsx
│   │   └── shipping-calculator.tsx
│   ├── checkout/          # Fluxo de checkout (1 componente)
│   │   └── checkout-steps.tsx
│   ├── layout/            # Layout principal (3 componentes)
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-bottom-nav.tsx
│   ├── sections/          # Seções da página (4 componentes)
│   │   ├── hero-section.tsx
│   │   ├── brands-section.tsx
│   │   ├── products-section.tsx
│   │   └── checkout-section.tsx
│   └── ui/               # 40+ componentes base (Radix UI)
├── contexts/              # State management
│   └── cart-context.tsx
├── hooks/                 # Custom hooks (5 hooks)
├── lib/                   # Bibliotecas e configurações
│   ├── utils.ts
│   └── gemini.ts
├── pages/                 # Páginas principais
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/                 # Definições TypeScript
└── utils/                 # Funções utilitárias
    └── shipping.ts
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

### ⚠️ **Variáveis Obrigatórias para Produção:**
1. **VITE_GEMINI_API_KEY** - Chave da API do Google Gemini
2. **VITE_WHATSAPP_NUMBER** - Número real da empresa
3. **VITE_PIX_KEY** - Chave PIX real para pagamentos

## 🎯 Funcionalidades Implementadas

### ✅ **Sistema Completo de E-commerce**
- [x] Catálogo de produtos com categorias e marcas
- [x] Carrinho com cálculo de frete automático
- [x] Checkout em 4 etapas (dados, endereço, resumo, confirmação)
- [x] Integração WhatsApp para finalização
- [x] Upload de comprovante PIX

### ✅ **Interface e UX**
- [x] Design responsivo mobile-first
- [x] Navegação inferior móvel
- [x] Modais de confirmação
- [x] Assistente IA integrado
- [x] Sistema de acordeão para categorias

### ✅ **Integrações Externas**
- [x] Google Gemini AI (assistente)
- [x] ViaCEP (busca de endereços)
- [x] WhatsApp (checkout)

## 🔧 Customização e Manutenção

### **Modificar Produtos e Categorias**
Os produtos são definidos em arrays TypeScript para facilitar manutenção:
```typescript
// Localização: src/data/products.ts (arquivo será criado se necessário)
export const products = [
  {
    id: "1",
    name: "Produto Exemplo",
    category: "injectables",
    brand: "landerlan",
    price: 199.99,
    // ... outros campos
  }
];
```

### **Customizar Assistente IA**
```typescript
// Localização: src/lib/gemini.ts
// Configurações do comportamento da IA
```

### **Modificar Fluxo de Checkout**
```typescript
// Localização: src/components/checkout/checkout-steps.tsx
// Etapas: CustomerData → Address → Summary → Confirmation
```

## 🚀 Deploy e Produção

### **Opções de Deploy Recomendadas:**

1. **Vercel** (Mais simples)
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Netlify**
   ```bash
   npm run build
   # Upload da pasta dist/
   ```

3. **VPS Própria**
   - Seguir instruções de "Configuração para VPS" acima
   - Configurar SSL com Let's Encrypt
   - Monitoramento com PM2

### **Checklist Pré-Deploy:**
- [ ] Configurar variáveis de ambiente de produção
- [ ] Testar build local (`npm run build`)
- [ ] Verificar todas as integrações (IA, WhatsApp, ViaCEP)
- [ ] Configurar domínio e SSL
- [ ] Testar responsividade em dispositivos reais

## 🤝 Contribuição

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para guias detalhados de desenvolvimento e manutenção.

## 📞 Suporte e Monitoramento

### **Logs e Debug**
```bash
# Logs do PM2
pm2 logs imperio-pharma

# Monitoramento
pm2 monit
```

### **Health Check**
```bash
# Verificar se a aplicação está rodando
curl http://localhost:3000
```

---

**Desenvolvido com foco em performance, acessibilidade e experiência do usuário.**

*Para dúvidas técnicas, consulte a documentação completa ou abra uma issue.*
