
# 🚀 Império Pharma - E-commerce de Suplementos

[![Status](https://img.shields.io/badge/Status-Pronto%20para%20Deploy-brightgreen)](https://github.com)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

**Império Pharma** é uma landing page de e-commerce especializada em suplementos anabolizantes e produtos farmacêuticos. O projeto foi desenvolvido com foco em **alta conversão** e **experiência mobile-first**.

### ✨ Características Principais
- 🎯 **Design focado em conversão** - Fluxo otimizado para vendas
- 📱 **Mobile-first** - Experiência prioritária em dispositivos móveis  
- 🚀 **Performance otimizada** - Carregamento rápido e navegação fluida
- 🛒 **Carrinho inteligente** - Sistema completo com cálculo de frete
- 💳 **Checkout simplificado** - 4 etapas até finalização no WhatsApp
- 🤖 **Assistente IA** - Suporte inteligente para protocolos

## 🛠️ Stack Tecnológica

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **State**: React Context + Custom Hooks
- **Icons**: Lucide React
- **Deploy**: Lovable/Vercel/Netlify

## 🚀 Começar Rapidamente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Entre no diretório
cd imperio-pharma

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção  
npm run preview  # Preview do build
```

## 📱 Funcionalidades Implementadas

### ✅ Core Features
- [x] **Catálogo de produtos** - Organizado por marcas e categorias
- [x] **Sistema de carrinho** - Adicionar, remover, alterar quantidades
- [x] **Cálculo de frete** - Integração ViaCEP com 3 opções de entrega
- [x] **Checkout completo** - 4 etapas: dados, endereço, resumo, confirmação
- [x] **Integração WhatsApp** - Finalização automática via mensagem
- [x] **Upload de comprovante** - Campo para anexar comprovante PIX
- [x] **Design responsivo** - Otimizado para todos os dispositivos

### 🎨 Interface
- [x] **Header responsivo** - Logo, navegação, contador carrinho
- [x] **Hero section** - Call-to-action principal com assistente IA
- [x] **Seleção de marcas** - Grid de laboratórios/marcas
- [x] **Grid de produtos** - 2 colunas mobile, 4 desktop
- [x] **Navegação mobile** - Barra fixa inferior
- [x] **Modals inteligentes** - Confirmações e feedbacks

### 📊 Dados
- [x] **Produtos mockados** - 12 produtos de exemplo
- [x] **4 marcas principais** - Landerlan, Dragon Pharma, Balkan, Hilma
- [x] **Categorias** - Injetáveis, Orais, TPC
- [x] **Frete por estado** - Cálculo dinâmico PAC/SEDEX/Express

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React organizados por funcionalidade
│   ├── cart/           # Sistema de carrinho
│   ├── checkout/       # Fluxo de checkout
│   ├── layout/         # Header, Footer, Navigation  
│   ├── sections/       # Seções da página principal
│   └── ui/             # Componentes base (shadcn/ui)
├── contexts/           # Providers de estado global
├── data/              # Dados mockados
├── hooks/             # Custom hooks
└── utils/             # Funções utilitárias
```

## 🔧 Configuração para Produção

### ⚠️ Antes do Deploy - Checklist Obrigatório

1. **Dados da Empresa**
   - [ ] Atualizar número WhatsApp (atual: +5511999999999)
   - [ ] Configurar chave PIX real (atual: exemplo@email.com)  
   - [ ] Adicionar informações reais da empresa

2. **Assets**
   - [ ] Substituir imagens placeholder por fotos reais
   - [ ] Corrigir path da imagem do robô
   - [ ] Atualizar catálogo com preços reais

3. **Testes**
   - [ ] Testar fluxo completo de compra
   - [ ] Verificar responsividade em diferentes dispositivos
   - [ ] Validar integração WhatsApp

### 📱 Deploy Recomendado

**Opção 1: Lovable (Mais Simples)**
1. Clique em "Share" → "Publish" no painel
2. Configure domínio customizado se necessário

**Opção 2: Vercel (Gratuito)**
```bash
npm i -g vercel
vercel
```

## 📚 Documentação Adicional

- 📖 **[DOCUMENTACAO_PROJETO.md](./DOCUMENTACAO_PROJETO.md)** - Documentação técnica completa
- ✅ **[TODO.md](./TODO.md)** - Lista de tarefas e melhorias
- 🚀 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guia detalhado de deploy
- 📁 **[ESTRUTURA_PROJETO.md](./ESTRUTURA_PROJETO.md)** - Mapa da arquitetura

## 🎯 Status do Projeto

| Funcionalidade | Status | Descrição |
|---|---|---|
| Frontend | ✅ Completo | Interface totalmente implementada |
| Carrinho | ✅ Completo | Sistema funcional com frete |
| Checkout | ✅ Completo | 4 etapas + WhatsApp |
| Responsivo | ✅ Completo | Mobile-first implementado |
| Dados Reais | ⚠️ Pendente | Substituir dados mockados |
| Backend | 🔄 Opcional | Requer integração Supabase |

## 💡 Próximos Passos

### 🔴 Crítico (Deploy)
1. Configurar dados reais da empresa
2. Testar fluxo completo
3. Deploy em produção

### 🟡 Melhorias
1. Integração Supabase (persistência)
2. Painel admin funcional  
3. Analytics e métricas

### 🟢 Extras
1. Sistema de pagamento online
2. PWA (Progressive Web App)
3. Chat ao vivo

## 📞 Suporte

Para dúvidas técnicas:
1. Consulte a documentação completa
2. Verifique os logs do console
3. Teste em ambiente local primeiro

---

**🚀 Projeto pronto para produção com dados mockados!**  
**📝 Substitua os dados de exemplo e faça o deploy.**

*Desenvolvido com foco em conversão e experiência do usuário.*
