
# 🤖 Assistente IA para Protocolos Ergogênicos + Painel Administrativo

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC.svg)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

**Assistente IA Especializado** em protocolos ergogênicos, desenvolvido com React 18 + TypeScript. Inclui um **Painel Administrativo** completo para gerenciar o assistente IA e monitorar todas as conversas.

### ✨ Principais Características
- 🤖 **Assistente IA Especializado** - Consultas inteligentes com Google Gemini
- 📋 **Sistema de Perfil Personalizado** - Protocolos baseados em gênero, objetivo e preferências
- 🔧 **Painel Administrativo Completo** - Gerenciamento total do comportamento da IA
- 💬 **Histórico de Conversas** - Monitoramento de todas as interações
- ⚙️ **Configuração Dinâmica** - Editor de prompts e parâmetros da IA em tempo real
- 📊 **Analytics Integrados** - Estatísticas de uso e performance
- 🎯 **Design Responsivo** - Experiência otimizada para todos os dispositivos
- ⚡ **Performance Otimizada** - Build com Vite para carregamento ultrarrápido

## 🆕 Painel Administrativo

### 🔐 Acesso ao Painel
- **URL**: `http://localhost:8080/admin` (desenvolvimento) ou `https://seudominio.com/admin` (produção)
- **Senha padrão**: `admin123`

### 🛠️ Funcionalidades do Painel

#### 1. **Dashboard com Estatísticas em Tempo Real**
- Total de conversas realizadas
- Conversas do dia atual
- Tempo médio de resposta da IA
- Taxa de sucesso das consultas

#### 2. **Configurações Avançadas do Assistente IA**
- ✏️ **Editor de Prompt do Sistema** - Modifique as instruções da IA em tempo real
- 🔑 **Gerenciamento de API Key** - Configure a chave do Google Gemini
- ⚙️ **Parâmetros da IA** - Ajuste max tokens, temperature e outros parâmetros
- 💾 **Salvamento Persistente** - Configurações salvas no localStorage

#### 3. **Monitoramento de Conversas**
- 📝 **Histórico Completo** - Todas as interações usuário-assistente
- 👤 **Perfis dos Usuários** - Dados de gênero, objetivo e preferências específicas
- 📅 **Timestamps Detalhados** - Data e hora precisa de cada conversa
- 📤 **Exportação de Dados** - Backup completo das conversas em JSON
- 🗑️ **Gerenciamento de Dados** - Limpeza segura do histórico

#### 4. **Analytics e Métricas**
- 📊 Estatísticas de uso por perfil
- 📈 Métricas de performance da IA
- 🎯 Relatórios de consultas mais comuns

## 🚀 Instalação e Configuração

### Pré-requisitos
- **Node.js** 18+ (recomendado: 20+)
- **npm**, **yarn**, **pnpm** ou **bun**
- **Chave do Google Gemini AI** (obrigatória)

### 🔧 Instalação Local (Desenvolvimento)

```bash
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd assistente-ergogenicos

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com sua chave do Google Gemini

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

#### 2. **Deploy em VPS com Auto-detecção de Porta**
```bash
# 1. Fazer upload do projeto para VPS
scp -r . usuario@sua-vps:/var/www/assistente-ergogenicos/

# 2. Instalar dependências
cd /var/www/assistente-ergogenicos
npm ci --only=production

# 3. Build de produção
npm run build

# 4. Deploy com detecção automática de porta
chmod +x scripts/smart-deploy.sh
./scripts/smart-deploy.sh
```

**Script de Deploy Inteligente:**
```bash
#!/bin/bash
# Encontra porta livre automaticamente (range 3000-9000)
find_free_port() {
    for port in $(seq 3000 9000); do
        if ! ss -tuln | grep -q ":$port "; then
            echo $port
            return
        fi
    done
}

PORT=$(find_free_port)
echo "🚀 Deploy na porta $PORT"
PORT=$PORT npm run preview
```

#### 3. **Configuração Nginx**
```nginx
server {
    listen 80;
    server_name seu-assistente-ia.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        proxy_pass http://localhost:8080;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (`.env.local`)
```bash
# API do Google Gemini (OBRIGATÓRIO)
VITE_GEMINI_API_KEY=sua_chave_real_aqui

# Configuração do Servidor
NODE_ENV=development

# Painel Admin
VITE_ADMIN_PASSWORD=admin123

# Configurações Opcionais
VITE_APP_TITLE=Assistente Ergogênicos IA
```

## 🔐 Segurança do Painel Administrativo

### 🛡️ Configurações de Segurança

#### 1. **Alterar Senha Padrão**
No arquivo `src/pages/AdminPanel.tsx`, linha 45:
```typescript
// Altere a senha padrão para produção
if (password === "SUA_SENHA_FORTE_AQUI") {
```

#### 2. **Proteger Rota Admin com Nginx (Produção)**
```nginx
location /admin {
    # Restringir por IP (opcional)
    allow 192.168.1.0/24;  # Sua rede local
    allow SEU.IP.PUBLICO.AQUI;
    deny all;
    
    proxy_pass http://localhost:8080;
}
```

## 🤖 Sistema do Assistente IA

### 📋 **Fluxo de Funcionamento**
1. **Formulário de Perfil** - Usuário informa gênero, objetivo e preferências
2. **Termos de Uso** - Aceite obrigatório dos termos educacionais
3. **Chat Inteligente** - Conversa personalizada com base no perfil
4. **Resposta Especializada** - IA retorna protocolos específicos
5. **Histórico Salvo** - Todas as conversas são registradas para o admin

### ⚙️ **Configurações da IA**
- **Prompt do Sistema**: Instruções especializadas em protocolos ergogênicos
- **Max Tokens**: Controle do tamanho das respostas (padrão: 500)
- **Temperature**: Controle da criatividade (padrão: 0.7)
- **API Key**: Integração com Google Gemini AI

### 📊 **Dados Coletados**
- Perfil do usuário (gênero, objetivo, preferência)
- Histórico completo de perguntas e respostas
- Timestamps de todas as interações
- Configurações utilizadas em cada consulta

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes React organizados
│   ├── assistant/          # Sistema de IA (4 componentes)
│   │   ├── assistant-modal.tsx
│   │   ├── chat-step.tsx
│   │   ├── profile-form-step.tsx
│   │   └── terms-step.tsx
│   ├── layout/             # Header, Footer, Navigation
│   └── ui/                 # 40+ componentes base (Radix UI)
├── pages/                  # Páginas principais
│   ├── Index.tsx          # Página inicial do assistente
│   ├── AdminPanel.tsx     # 🆕 Painel administrativo completo
│   └── NotFound.tsx       # Página 404
├── lib/                    # Bibliotecas e configurações
│   └── gemini.ts          # Integração Google Gemini AI
└── hooks/                  # Custom hooks
```

## 🎯 Funcionalidades Implementadas

### ✅ **Sistema do Assistente IA**
- [x] Chat inteligente com Google Gemini
- [x] Formulário de perfil personalizado
- [x] Sistema de termos e condições
- [x] Protocolos especializados por perfil de usuário
- [x] Interface responsiva e intuitiva

### ✅ **Painel Administrativo Completo**
- [x] 🆕 **Dashboard com estatísticas em tempo real**
- [x] 🆕 **Editor de prompt do sistema da IA**
- [x] 🆕 **Gerenciamento de configurações avançadas**
- [x] 🆕 **Visualização completa do histórico de conversas**
- [x] 🆕 **Sistema de autenticação por senha**
- [x] 🆕 **Exportação completa de dados**
- [x] 🆕 **Métricas de performance da IA**

## 🚀 Próximos Passos

### 🔄 **Melhorias Planejadas**
- [ ] **Backend com Database** - PostgreSQL ou MongoDB
- [ ] **Analytics Avançados** - Gráficos detalhados e insights
- [ ] **Sistema Multi-Admin** - Diferentes níveis de acesso
- [ ] **API REST** - Endpoints para integração externa
- [ ] **Notificações** - Alertas em tempo real
- [ ] **Backup Automático** - Sincronização com cloud

### 📊 **Analytics em Desenvolvimento**
- [ ] Análise de protocolos mais consultados
- [ ] Métricas por perfil de usuário
- [ ] Gráficos de uso por período
- [ ] Relatórios de performance da IA

## 🤝 Contribuição

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para guias detalhados de desenvolvimento e customização do assistente IA.

## 📞 Suporte

### **Acesso ao Painel**
- URL: `/admin`
- Senha padrão: `admin123`

### **Problemas Comuns**
1. **Chave da IA inválida**: Verifique `VITE_GEMINI_API_KEY` no `.env.local`
2. **Painel não carrega**: Verifique se a rota `/admin` está acessível
3. **Histórico vazio**: Realize algumas conversas com o assistente primeiro

### **Logs e Debug**
```javascript
// Habilitar logs detalhados no console
localStorage.setItem('DEBUG_ASSISTANT', 'true');
```

---

**🤖 Assistente IA Especializado em Protocolos Ergogênicos com Painel Administrativo Completo!**

*Para dúvidas técnicas sobre o assistente ou painel administrativo, consulte a documentação ou abra uma issue.*
