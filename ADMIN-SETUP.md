# 🔧 GUIA DE CONFIGURAÇÃO DO PAINEL ADMINISTRATIVO

## 🚀 Acesso Rápido

### 📍 **URL do Painel**
- **Desenvolvimento**: `http://localhost:5173/admin`
- **Produção**: `https://seudominio.com/admin`

### 🔐 **Credenciais Padrão**
- **Senha**: `admin123`

## ⚡ Configuração Inicial (5 minutos)

### 1. **Primeiro Acesso**
1. Acesse `/admin` no seu navegador
2. Digite a senha: `admin123`
3. Clique em "Entrar no Painel"

### 2. **Configurar o Assistente IA**
1. Vá para a aba "Configurações"
2. **Prompt do Sistema**: Edite as instruções da IA conforme necessário
3. **Chave da API**: Insira sua chave real do Google Gemini
4. **Parâmetros**: Ajuste max tokens (500) e temperature (0.7)
5. Clique em "Salvar Configurações"

### 3. **Testar o Sistema**
1. Volte para a página principal (`/`)
2. Abra o assistente IA
3. Faça uma consulta de teste
4. Retorne ao painel (`/admin`)
5. Verifique o histórico na aba "Histórico"

## 🔒 Segurança OBRIGATÓRIA para Produção

### ⚠️ **ALTERAR SENHA PADRÃO**

**Arquivo**: `src/pages/AdminPanel.tsx` (linha ~45)

```typescript
// ANTES (INSEGURO)
if (password === "admin123") {

// DEPOIS (SEGURO)
if (password === "SUA_SENHA_FORTE_AQUI") {
```

### 🛡️ **Proteger com Nginx (VPS)**

Adicione ao seu arquivo de configuração do Nginx:

```nginx
# /etc/nginx/sites-available/imperio-pharma
server {
    # ... outras configurações

    # Proteger rota /admin
    location /admin {
        # Restringir por IP (recomendado)
        allow SEU.IP.PUBLICO.AQUI;
        allow 192.168.1.0/24;  # Sua rede local
        deny all;
        
        try_files $uri $uri/ /index.html;
    }
}
```

## 📊 Funcionalidades do Painel

### 🎛️ **Dashboard**
- **Total de Conversas**: Contador geral
- **Conversas Hoje**: Atividade diária
- **Tempo Médio**: Performance da IA
- **Taxa de Sucesso**: Qualidade das respostas

### ⚙️ **Configurações**
- **Prompt do Sistema**: Instruções completas para a IA
- **API Key**: Chave do Google Gemini
- **Max Tokens**: Limite de resposta (padrão: 500)
- **Temperature**: Criatividade da IA (0.0-2.0, padrão: 0.7)

### 📝 **Histórico**
- **Visualização**: Todas as conversas usuário-assistente
- **Perfis**: Dados de gênero, objetivo, preferências
- **Timestamps**: Data/hora de cada interação
- **Exportação**: Backup completo em JSON
- **Limpeza**: Remoção segura dos dados

## 🔄 Migração de Dados

### 📤 **Exportar Dados**
1. Acesse a aba "Histórico"
2. Clique em "Exportar Dados"
3. Arquivo JSON será baixado automaticamente

### 📥 **Importar Dados** (Manual)
```javascript
// No console do navegador (F12)
const dadosImportados = {
  settings: { /* configurações */ },
  chatHistory: [ /* conversas */ ]
};

localStorage.setItem('admin_settings', JSON.stringify(dadosImportados.settings));
localStorage.setItem('chat_history', JSON.stringify(dadosImportados.chatHistory));

// Recarregar a página
location.reload();
```

## 🗄️ Estrutura de Dados

### 💾 **localStorage Keys**
- `admin_settings`: Configurações da IA
- `chat_history`: Histórico de conversas

### 📋 **Formato dos Dados**

**Configurações**:
```json
{
  "systemPrompt": "Instruções para a IA...",
  "apiKey": "AIza...",
  "maxTokens": 500,
  "temperature": 0.7
}
```

**Histórico**:
```json
[
  {
    "id": "1234567890_user",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "role": "user",
    "message": "Perfil: masculino | Objetivo: bulk...",
    "userProfile": {
      "gender": "masculino",
      "objective": "bulk extremo",
      "preference": "injetavel"
    }
  },
  {
    "id": "1234567890_assistant",
    "timestamp": "2024-01-15T10:30:05.000Z",
    "role": "assistant",
    "message": "**Ciclo Iniciante** - Testosterona..."
  }
]
```

## 🚀 Deploy em VPS

### 📦 **Build e Upload**
```bash
# 1. Gerar build de produção
npm run build

# 2. Upload para VPS
scp -r dist/ usuario@sua-vps:/var/www/imperio-pharma/

# 3. Configurar permissões
sudo chown -R www-data:www-data /var/www/imperio-pharma/
sudo chmod -R 755 /var/www/imperio-pharma/
```

### 🌐 **Configuração Nginx Completa**
```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    root /var/www/imperio-pharma;
    index index.html;

    # SPA Configuration
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Admin Protection
    location /admin {
        allow SEU.IP.AQUI;
        deny all;
        try_files $uri $uri/ /index.html;
    }

    # Static Assets Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 🔒 **SSL com Let's Encrypt**
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seudominio.com -d www.seudominio.com

# Verificar renovação automática
sudo certbot renew --dry-run
```

## 🔧 Customização Avançada

### 🎨 **Alterar Cores do Painel**
```typescript
// src/pages/AdminPanel.tsx
// Procurar por classes como:
className="bg-gradient-to-r from-pharma-navy to-pharma-blue"
className="text-pharma-navy"

// Alterar para suas cores preferidas
```

### 📊 **Adicionar Métricas Customizadas**
```typescript
// Adicionar ao estado do componente
const [customStats, setCustomStats] = useState({
  avgSessionTime: "5.2min",
  popularObjectives: ["bulk", "cutting", "strength"],
  peakHours: ["14:00", "20:00"]
});
```

### 🔔 **Implementar Notificações**
```typescript
// Exemplo de notificação para novas conversas
useEffect(() => {
  const interval = setInterval(() => {
    const currentCount = JSON.parse(localStorage.getItem('chat_history') || '[]').length;
    if (currentCount > lastCount) {
      toast.info(`Nova conversa registrada! Total: ${currentCount}`);
      setLastCount(currentCount);
    }
  }, 30000); // Verificar a cada 30 segundos

  return () => clearInterval(interval);
}, [lastCount]);
```

## 🐛 Troubleshooting

### ❌ **Problemas Comuns**

**1. Painel não carrega**
```bash
# Verificar se a rota está configurada
# Arquivo: src/App.tsx
<Route path="/admin" element={<AdminPanel />} />
```

**2. Configurações não salvam**
```javascript
// Verificar localStorage no console (F12)
console.log(localStorage.getItem('admin_settings'));

// Limpar dados corrompidos
localStorage.removeItem('admin_settings');
localStorage.removeItem('chat_history');
```

**3. Histórico vazio**
```javascript
// Verificar se há dados
console.log(JSON.parse(localStorage.getItem('chat_history') || '[]'));

// Adicionar dados de teste
const testData = [{
  id: "test_1",
  timestamp: new Date().toISOString(),
  role: "user",
  message: "Teste de conversa"
}];
localStorage.setItem('chat_history', JSON.stringify(testData));
```

**4. IA não usa configurações do painel**
```typescript
// Verificar se o chat-step.tsx foi modificado corretamente
// Deve buscar configurações do localStorage antes de usar a IA
```

### 🔍 **Debug Mode**
```javascript
// Ativar logs detalhados
localStorage.setItem('DEBUG_ADMIN', 'true');

// Ver todos os dados armazenados
Object.keys(localStorage).forEach(key => {
  console.log(key, localStorage.getItem(key));
});
```

## 📞 Suporte

### 🆘 **Precisa de Ajuda?**
1. Verifique este guia primeiro
2. Consulte o README.md principal
3. Verifique o console do navegador (F12) para erros
4. Teste em modo incógnito para descartar cache

### 📧 **Informações para Suporte**
- URL onde está hospedado
- Versão do navegador
- Mensagens de erro (se houver)
- Passos para reproduzir o problema

---

**✅ Painel configurado com sucesso! Agora você tem controle total sobre seu assistente IA.**