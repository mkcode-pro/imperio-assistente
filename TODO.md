
# 📋 TODO - IMPÉRIO PHARMA E-COMMERCE

*Última atualização: Janeiro 2025*

## 🔴 CRÍTICO (Necessário para Produção)

### APIs e Integrações
- [ ] **Configurar chave real do Google Gemini AI**
  - Atual: Usando chave de desenvolvimento
  - Necessário: Chave de produção com billing configurado
  - Arquivo: `.env.local` → `VITE_GEMINI_API_KEY`

- [ ] **Atualizar número do WhatsApp da empresa**
  - Atual: `+5511999999999` (exemplo)
  - Necessário: Número real da empresa
  - Arquivo: `.env.local` → `VITE_WHATSAPP_NUMBER`

- [ ] **Configurar chave PIX real**
  - Atual: `exemplo@email.com`
  - Necessário: Chave PIX real para recebimentos
  - Arquivo: `.env.local` → `VITE_PIX_KEY`

### Conteúdo e Assets
- [ ] **Criar arquivo de dados reais dos produtos**
  - Atual: Dados mockados no código
  - Necessário: Arquivo `src/data/products.ts` com produtos reais
  - Incluir: preços, descrições, imagens, estoque

- [ ] **Adicionar imagens reais dos produtos**
  - Atual: Usando `placeholder.svg`
  - Necessário: Fotos profissionais dos produtos
  - Local: `public/products/` ou CDN

- [ ] **Atualizar informações da empresa**
  - Nome oficial, CNPJ, endereço
  - Políticas de privacidade e termos de uso
  - Arquivos: `src/components/layout/footer.tsx`

## 🟡 IMPORTANTE (Melhorias Significativas)

### Backend e Persistência
- [ ] **Integrar Supabase para persistência**
  - Sistema de produtos em banco de dados
  - Gestão de pedidos persistente
  - Backup automático de dados
  - Tabelas: `products`, `orders`, `customers`

- [ ] **Implementar autenticação admin real**
  - Sistema de login seguro
  - Proteção de rotas administrativas
  - Gerenciamento de sessões
  - Arquivo: `src/hooks/use-admin-auth.ts`

- [ ] **Sistema de pedidos avançado**
  - Status de pedidos (pendente, processando, enviado)
  - Histórico de compras do cliente
  - Notificações automáticas
  - Relatórios de vendas

### Funcionalidades do E-commerce
- [ ] **Sistema de estoque em tempo real**
  - Controle de quantidade disponível
  - Alertas de baixo estoque
  - Reserva temporária no carrinho

- [ ] **Calculadora de frete avançada**
  - Integração com Correios API
  - Múltiplas transportadoras
  - Frete grátis por valor mínimo

- [ ] **Sistema de cupons de desconto**
  - Códigos promocionais
  - Desconto por percentual ou valor fixo
  - Validade e uso único

### Painel Administrativo
- [ ] **Dashboard de vendas funcional**
  - Gráficos de vendas por período
  - Top produtos mais vendidos
  - Métricas de conversão

- [ ] **Gestão de produtos pelo admin**
  - CRUD completo de produtos
  - Upload de imagens
  - Categorias e marcas

- [ ] **Gestão de pedidos**
  - Lista de pedidos em tempo real
  - Alteração de status
  - Envio de notificações ao cliente

## 🟢 MELHORIAS (Quando Houver Tempo)

### Performance e SEO
- [ ] **Otimizar imagens**
  - Conversão para WebP
  - Lazy loading
  - Responsive images

- [ ] **Implementar PWA completo**
  - Service Worker
  - Cache offline
  - Instalação no device

- [ ] **Melhorar SEO**
  - Meta tags dinâmicas
  - Sitemap XML
  - Schema.org markup
  - Open Graph tags

- [ ] **Analytics e métricas**
  - Google Analytics 4
  - Facebook Pixel
  - Hotjar ou similar
  - Métricas de conversão

### UX/UI Melhorias
- [ ] **Sistema de avaliações**
  - Avaliações por estrelas
  - Comentários de clientes
  - Fotos dos clientes

- [ ] **Wishlist/Favoritos**
  - Lista de desejos
  - Comparação de produtos
  - Notificação quando em promoção

- [ ] **Chat ao vivo**
  - Suporte em tempo real
  - Integração com WhatsApp Business
  - Bot para perguntas frequentes

- [ ] **Busca avançada**
  - Busca por texto
  - Filtros por preço, marca, categoria
  - Sugestões automáticas

### Integrações Avançadas
- [ ] **Gateway de pagamento**
  - PIX automático
  - Cartão de crédito
  - Boleto bancário
  - Mercado Pago ou PagSeguro

- [ ] **Email marketing**
  - Carrinho abandonado
  - Newsletter
  - Ofertas personalizadas

- [ ] **Redes sociais**
  - Compartilhamento de produtos
  - Login social
  - Instagram Shopping

## ✅ CONCLUÍDO

### Core Features
- [x] **Sistema completo de carrinho**
  - Adicionar/remover produtos
  - Alterar quantidades
  - Cálculo de totais

- [x] **Checkout em 4 etapas**
  - Dados do cliente
  - Endereço de entrega
  - Resumo do pedido
  - Confirmação e WhatsApp

- [x] **Design responsivo mobile-first**
  - Header adaptativo
  - Navegação móvel inferior
  - Grid responsivo de produtos

- [x] **Assistente IA com Google Gemini**
  - Chat inteligente
  - Formulário de perfil
  - Termos de uso

- [x] **Integração ViaCEP**
  - Busca automática de endereço
  - Validação de CEP
  - Preenchimento automático

- [x] **Sistema de categorias e marcas**
  - Acordeão de categorias
  - Filtro por marca
  - Navegação intuitiva

- [x] **Modais e feedbacks**
  - Modal de produto adicionado
  - Confirmações de ações
  - Estados de loading

### Arquitetura e Configuração
- [x] **Configuração dinâmica de portas**
  - Auto-detecção de portas livres
  - Suporte a variáveis de ambiente
  - Compatibilidade com VPS

- [x] **Sistema de design consistente**
  - Variáveis CSS customizadas
  - Componentes Radix UI
  - Tailwind CSS configurado

- [x] **TypeScript completo**
  - Tipagem em todos os componentes
  - Interfaces bem definidas
  - Validação de tipos

---

## 🎯 PRIORIZAÇÃO SUGERIDA

### **Semana 1**: Configuração Crítica
1. Configurar APIs reais (Gemini, WhatsApp, PIX)
2. Criar arquivo de produtos reais
3. Adicionar imagens dos produtos

### **Semana 2**: Backend Básico
1. Integrar Supabase
2. Implementar sistema de pedidos
3. Autenticação admin

### **Semana 3**: Melhorias de UX
1. Sistema de estoque
2. Frete avançado
3. Dashboard funcional

### **Semana 4**: Otimização
1. Performance e SEO
2. Analytics
3. Testes finais

---

**📧 Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.**

*Mantenha este TODO atualizado conforme o progresso do desenvolvimento.*
