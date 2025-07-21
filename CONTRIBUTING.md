
# 🤝 GUIA DE CONTRIBUIÇÃO - IMPÉRIO PHARMA

## 📋 Índice
1. [Configuração do Ambiente](#configuração-do-ambiente)
2. [Estrutura de Desenvolvimento](#estrutura-de-desenvolvimento)
3. [Como Modificar Componentes](#como-modificar-componentes)
4. [Gerenciamento de Estado](#gerenciamento-de-estado)
5. [Sistema de Design](#sistema-de-design)
6. [Boas Práticas](#boas-práticas)
7. [Deploy e Testing](#deploy-e-testing)

## 🚀 Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ (recomendado: Node 20+)
- Editor: VS Code com extensões TypeScript e Tailwind CSS

### Setup Inicial
```bash
# Clone e configure
git clone <repo-url>
cd imperio-pharma
npm install

# Configure variáveis de desenvolvimento
cp .env.example .env.local
# Edite .env.local com suas chaves de API

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

## 🏗️ Estrutura de Desenvolvimento

### Arquitetura de Componentes
```
src/components/
├── ui/           # Componentes base (Radix UI + customizações)
├── layout/       # Header, Footer, Navigation
├── sections/     # Seções da página principal
├── cart/         # Sistema de carrinho
├── checkout/     # Fluxo de checkout
└── assistant/    # Sistema de IA
```

### Padrão de Nomenclatura
- **Componentes**: `PascalCase.tsx` (ex: `ProductCard.tsx`)
- **Hooks**: `use-kebab-case.ts` (ex: `use-cart.ts`)
- **Utilitários**: `kebab-case.ts` (ex: `shipping.ts`)
- **Tipos**: `kebab-case.ts` (ex: `admin.ts`)

## 🔧 Como Modificar Componentes

### 1. Adicionar Novos Produtos

**Localização**: `src/data/products.ts` (criar se não existir)

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'injectables' | 'orals' | 'tpc';
  brand: 'landerlan' | 'dragon-pharma' | 'balkan' | 'hilma';
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "novo-produto",
    name: "Nome do Produto",
    description: "Descrição detalhada",
    price: 199.99,
    originalPrice: 299.99,
    image: "/products/novo-produto.jpg",
    category: "injectables",
    brand: "landerlan",
    inStock: true
  }
];
```

### 2. Modificar o Assistente IA

**Localização**: `src/lib/gemini.ts`

```typescript
// Personalizar prompts do assistente
const SYSTEM_PROMPT = `
Você é um assistente especializado em suplementos...
[Adicione suas instruções personalizadas]
`;
```

**Configurar comportamento**: `src/components/assistant/chat-step.tsx`

### 3. Customizar Fluxo de Checkout

**Localização**: `src/components/checkout/checkout-steps.tsx`

```typescript
// Adicionar nova etapa ao checkout
const steps = [
  { title: "Dados do Cliente", component: CustomerDataStep },
  { title: "Endereço", component: AddressStep },
  { title: "Nova Etapa", component: NovaEtapaStep }, // Nova etapa
  { title: "Resumo", component: SummaryStep },
  { title: "Confirmação", component: ConfirmationStep }
];
```

### 4. Adicionar Nova Página

```typescript
// 1. Criar página: src/pages/NovaPagina.tsx
import React from 'react';

const NovaPagina = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Nova Página</h1>
    </div>
  );
};

export default NovaPagina;

// 2. Adicionar rota no App.tsx (se necessário)
```

## 🗂️ Gerenciamento de Estado

### Cart Context (Estado Global)
**Localização**: `src/contexts/cart-context.tsx`

```typescript
// Acessar estado do carrinho em qualquer componente
import { useCart } from '@/hooks/use-cart';

const MeuComponente = () => {
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity,
    clearCart,
    total 
  } = useCart();
  
  // Usar métodos do carrinho
};
```

### Adicionar Novo Context
```typescript
// 1. Criar: src/contexts/novo-context.tsx
import React, { createContext, useContext } from 'react';

const NovoContext = createContext<NovoContextValue | undefined>(undefined);

export const NovoProvider = ({ children }: { children: React.ReactNode }) => {
  // Lógica do estado
  return (
    <NovoContext.Provider value={value}>
      {children}
    </NovoContext.Provider>
  );
};

// 2. Criar hook: src/hooks/use-novo.ts
export const useNovo = () => {
  const context = useContext(NovoContext);
  if (!context) {
    throw new Error('useNovo must be used within NovoProvider');
  }
  return context;
};
```

## 🎨 Sistema de Design

### Cores e Tokens
**Configuração**: `src/index.css` e `tailwind.config.ts`

```css
/* Usar sempre variáveis CSS, nunca cores hardcoded */
.exemplo {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### Componentes Base
Sempre use componentes do `src/components/ui/` como base:

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// ✅ Correto
<Button variant="default" size="lg">
  Botão Padrão
</Button>

// ❌ Evitar criar botões do zero
<button className="bg-blue-500 text-white px-4 py-2">
  Botão Custom
</button>
```

### Responsividade
Sempre seguir padrão mobile-first:

```typescript
// ✅ Correto - Mobile first
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

// ❌ Evitar - Desktop first  
<div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
```

## ✅ Boas Práticas

### 1. TypeScript
```typescript
// ✅ Sempre tipear props
interface ComponentProps {
  title: string;
  optional?: boolean;
}

const Component = ({ title, optional = false }: ComponentProps) => {
  // ...
};

// ✅ Usar interfaces para objetos complexos
interface Product {
  id: string;
  name: string;
  // ...
}
```

### 2. Performance
```typescript
// ✅ Usar useMemo para cálculos pesados
const expensiveCalculation = useMemo(() => {
  return items.reduce((total, item) => total + item.price, 0);
}, [items]);

// ✅ Usar useCallback para funções em deps
const handleClick = useCallback((id: string) => {
  // lógica
}, [dependency]);
```

### 3. Acessibilidade
```typescript
// ✅ Sempre incluir atributos de acessibilidade
<button
  aria-label="Adicionar ao carrinho"
  aria-describedby="product-description"
  onClick={handleAddToCart}
>
  <Plus className="w-4 h-4" />
</button>
```

### 4. Tratamento de Erros
```typescript
// ✅ Usar try-catch apenas quando necessário
const fetchData = async () => {
  try {
    const response = await api.getData();
    return response;
  } catch (error) {
    console.error('Erro específico:', error);
    throw error; // Re-throw para bubble up
  }
};
```

## 🔄 Fluxo de Desenvolvimento

### 1. Criar Feature Branch
```bash
git checkout -b feature/nova-funcionalidade
```

### 2. Desenvolvimento
- Faça commits pequenos e descritivos
- Teste cada alteração no browser
- Mantenha código limpo e documentado

### 3. Testing Local
```bash
# Build de produção
npm run build

# Preview do build
npm run preview

# Verificar tipos
npm run type-check
```

### 4. Commit Guidelines
```bash
# Formato: tipo(escopo): descrição

git commit -m "feat(cart): adicionar cálculo de desconto"
git commit -m "fix(checkout): corrigir validação de CEP" 
git commit -m "docs(readme): atualizar instruções de instalação"
```

## 🚀 Deploy e Testing

### Build Local
```bash
# Build completo
npm run build

# Verificar build
npm run preview

# Verificar tamanho do bundle
npm run build -- --analyze
```

### Configuração de Produção
```bash
# Variáveis obrigatórias
VITE_GEMINI_API_KEY=sua_chave_real
VITE_WHATSAPP_NUMBER=5511999999999
VITE_PIX_KEY=chave@pix.com
```

### Deploy Automático
```bash
# Vercel
vercel --prod

# Netlify
npm run build && netlify deploy --prod --dir=dist
```

## 🐛 Debug e Troubleshooting

### Logs do Assistente IA
```typescript
// Habilitar logs detalhados
localStorage.setItem('DEBUG_GEMINI', 'true');
```

### Verificar Estado do Carrinho
```typescript
// No console do browser
window.__CART_DEBUG__ = true;
```

### Performance Issues
```bash
# Analisar bundle
npm run build -- --analyze

# Profile de React
React DevTools Profiler
```

## 📞 Suporte

### Problemas Comuns
1. **Porta em uso**: O projeto detecta automaticamente porta livre
2. **API Key inválida**: Verificar `.env.local`
3. **Build falha**: Verificar tipos TypeScript

### Recursos
- **Documentação Radix UI**: [radix-ui.com](https://radix-ui.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **React Query**: [tanstack.com/query](https://tanstack.com/query)

---

**🚀 Pronto para contribuir! Siga este guia e mantenha a qualidade do código.**

*Para dúvidas específicas, abra uma issue ou consulte a documentação das tecnologias utilizadas.*
