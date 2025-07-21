
# ESTRUTURA DO PROJETO - IMPÉRIO PHARMA

## 📁 Visão Geral da Estrutura

```
imperio-pharma/
├── 📄 README.md                    # Documentação básica do projeto
├── 📄 DOCUMENTACAO_PROJETO.md      # Documentação completa (este arquivo)
├── 📄 TODO.md                      # Lista de tarefas pendentes
├── 📄 DEPLOYMENT.md               # Guia de deploy
├── 📄 ESTRUTURA_PROJETO.md        # Este arquivo - explicação da estrutura
├── 📦 package.json                # Dependências e scripts
├── ⚙️ vite.config.ts              # Configuração do Vite
├── ⚙️ tailwind.config.ts          # Configuração do Tailwind
├── ⚙️ tsconfig.json               # Configuração do TypeScript
├── 📁 public/                     # Assets estáticos
│   ├── 🖼️ favicon.ico
│   ├── 🖼️ placeholder.svg
│   └── 🤖 robots.txt
└── 📁 src/                        # Código fonte principal
    ├── 📄 main.tsx                # Entry point da aplicação
    ├── 📄 App.tsx                 # Componente raiz
    ├── 🎨 index.css               # Estilos globais e variáveis CSS
    ├── 📁 components/             # Todos os componentes React
    ├── 📁 contexts/               # Context providers (estado global)
    ├── 📁 data/                   # Dados mockados
    ├── 📁 hooks/                  # Custom hooks
    ├── 📁 lib/                    # Bibliotecas e utilitários
    ├── 📁 pages/                  # Páginas da aplicação
    ├── 📁 types/                  # Definições de tipos TypeScript
    └── 📁 utils/                  # Funções utilitárias
```

## 🧩 Detalhamento dos Componentes

### 📁 `/src/components/`

#### `admin/` - Painel Administrativo
```
admin/
├── 🔐 ProtectedRoute.tsx          # Proteção de rotas admin
└── [Outros componentes admin protegidos]
```

#### `assistant/` - Sistema de IA
```
assistant/
├── 🤖 assistant-modal.tsx         # Modal principal do assistente
├── 💬 chat-step.tsx              # Interface de chat
├── 📋 profile-form-step.tsx      # Formulário de perfil
└── 📜 terms-step.tsx             # Termos de uso
```

#### `cart/` - Sistema de Carrinho
```
cart/
├── 🛒 cart-drawer.tsx            # Drawer lateral do carrinho
└── 📦 shipping-calculator.tsx    # Calculadora de frete
```

#### `checkout/` - Sistema de Checkout
```
checkout/
└── ✅ checkout-steps.tsx         # Fluxo completo de checkout (4 etapas)
```

#### `layout/` - Componentes de Layout
```
layout/
├── 📱 header.tsx                 # Cabeçalho principal
├── 🦶 footer.tsx                 # Rodapé
└── 📲 mobile-bottom-nav.tsx      # Navegação móvel inferior
```

#### `modals/` - Modais e Dialogs
```
modals/
└── ✨ product-added-modal.tsx    # Confirmação de produto adicionado
```

#### `sections/` - Seções da Página Principal
```
sections/
├── 🦸 hero-section.tsx           # Seção inicial com call-to-action
├── 🏢 brands-section.tsx         # Seleção de marcas/laboratórios
├── 📦 products-section.tsx       # Listagem de produtos por categoria
└── ✅ checkout-section.tsx       # Wrapper da seção de checkout
```

#### `ui/` - Componentes Base (shadcn/ui)
```
ui/
├── 🃏 brand-card.tsx             # Card individual de marca
├── 📱 product-card.tsx           # Card individual de produto
├── 🔘 button.tsx                 # Botão base
├── 🃏 card.tsx                   # Card base
├── 📝 input.tsx                  # Input base
├── 🏷️ badge.tsx                  # Badge/tag
├── 📋 accordion.tsx              # Componente acordeão
└── [outros componentes base...]
```

### 📁 `/src/contexts/`
```
contexts/
└── 🛒 cart-context.tsx           # Estado global do carrinho
```

### 📁 `/src/data/`
```
data/
└── 📊 products.ts                # Dados mockados (produtos, marcas, categorias)
```

### 📁 `/src/hooks/`
```
hooks/
├── 🛒 use-cart.ts                # Lógica do carrinho de compras
├── 🔐 use-admin-auth.ts          # Autenticação admin
├── 📱 use-mobile.tsx             # Detecção de dispositivo móvel
├── 📦 use-orders.ts              # Gerenciamento de pedidos
└── 🔔 use-toast.ts               # Sistema de notificações
```

### 📁 `/src/lib/`
```
lib/
├── 🧠 gemini.ts                  # Integração com Google Gemini AI
└── 🛠️ utils.ts                   # Utilitários gerais (classNames, etc)
```

### 📁 `/src/pages/`
```
pages/
├── 🏠 Index.tsx                  # Página principal (landing page)
├── ❌ NotFound.tsx               # Página 404
└── 📁 admin/                     # Páginas administrativas
    ├── 🔐 AdminLogin.tsx         # Login do admin
    ├── 📊 AdminDashboard.tsx     # Dashboard principal
    ├── 📋 OrdersList.tsx         # Lista de pedidos
    └── 📄 OrderDetails.tsx       # Detalhes do pedido
```

### 📁 `/src/types/`
```
types/
└── 👨‍💼 admin.ts                  # Tipos relacionados ao admin
```

### 📁 `/src/utils/`
```
utils/
├── 📦 shipping.ts                # Cálculos de frete
├── 💾 admin-storage.ts           # Armazenamento local admin
└── 🔍 dataConsistencyCheck.ts   # Verificação de consistência
```

## 🔧 Arquivos de Configuração

### `package.json` - Dependências e Scripts
```json
{
  "scripts": {
    "dev": "vite",           // Servidor de desenvolvimento
    "build": "vite build",   // Build de produção
    "preview": "vite preview" // Preview do build
  }
}
```

### `vite.config.ts` - Configuração do Build
- Aliases de importação (`@/` = `src/`)
- Configurações de build otimizado
- Plugin do React

### `tailwind.config.ts` - Sistema de Design
- Cores customizadas (primary, pharma-gold, pharma-dark-blue)
- Breakpoints responsivos
- Animações customizadas

### `tsconfig.json` - TypeScript
- Configurações strict
- Path mapping para imports limpos
- Target ES2020

## 📱 Fluxo de Funcionamento

### 1. **Página Principal** (`/`)
```
Index.tsx → CartProvider → [
  Header,
  HeroSection,
  BrandsSection,
  ProductsSection,
  CheckoutSection (condicional),
  Footer,
  MobileBottomNav,
  CartDrawer (modal)
]
```

### 2. **Fluxo de Compra**
```
Seleção de Marca → 
Visualização de Produtos (por categoria) → 
Adicionar ao Carrinho → 
Cálculo de Frete → 
Checkout (4 etapas) → 
WhatsApp
```

### 3. **Sistema de Estado**
```
CartContext (global) ↔ useCart (hook) ↔ Components
```

## 🎯 Pontos de Entrada para Modificações

### Para adicionar novos produtos:
- 📄 `src/data/products.ts`

### Para modificar o design:
- 🎨 `src/index.css` (variáveis globais)
- 📁 `src/components/ui/` (componentes específicos)

### Para alterar o fluxo de checkout:
- 📄 `src/components/checkout/checkout-steps.tsx`

### Para modificar cálculos de frete:
- 📄 `src/utils/shipping.ts`

### Para integrar com backend:
- 📁 `src/contexts/` (modificar providers)
- 📁 `src/hooks/` (adicionar hooks de API)

---

Este arquivo serve como **mapa de navegação** para desenvolvedores que precisam entender ou modificar o projeto.
