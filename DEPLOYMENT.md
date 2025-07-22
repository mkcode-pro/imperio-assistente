
# 🚀 GUIA DE DEPLOY - ASSISTENTE IA ERGOGÊNICOS

## 📋 Visão Geral

Este guia cobre todos os cenários de deploy do **Assistente IA Especializado em Protocolos Ergogênicos**, com foco em **VPS** e **configuração otimizada para IA**.

## 🔧 Pré-requisitos para Deploy

### Variáveis de Ambiente Obrigatórias
```bash
# .env.production
VITE_GEMINI_API_KEY=sua_chave_real_do_gemini_aqui
VITE_ADMIN_PASSWORD=senha_forte_para_admin
NODE_ENV=production

# Configurações Opcionais
VITE_APP_TITLE=Assistente Ergogênicos IA
```

### Checklist Pré-Deploy
- [ ] Build local funciona (`npm run build`)
- [ ] Chave do Google Gemini configurada e testada
- [ ] Senha do admin alterada (não usar `admin123`)
- [ ] Prompts da IA revisados e otimizados
- [ ] Testes realizados em diferentes perfis de usuário

## 🌐 Deploy em VPS (Especializado para IA)

### 1. Preparação do Servidor

#### Verificar Portas Disponíveis
```bash
# Encontrar porta livre no range 3000-9000
find_free_port() {
    for port in $(seq 3000 9000); do
        if ! ss -tuln | grep -q ":$port "; then
            echo $port
            return 0
        fi
    done
    echo "Nenhuma porta livre encontrada!" >&2
    return 1
}

PORT=$(find_free_port)
echo "🚀 Porta livre: $PORT"
```

#### Instalar Dependências Específicas
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm nginx pm2 certbot curl

# Verificar Node.js (mínimo 18+)
node --version

# Configurar firewall para IA
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 8080  # Porta padrão da aplicação
sudo ufw enable
```

### 2. Script de Deploy Inteligente

#### Criar Script Automático
```bash
# smart-deploy.sh
#!/bin/bash
set -e

echo "🤖 Deploy do Assistente IA Ergogênicos"

# Função para encontrar porta livre
find_free_port() {
    for port in $(seq 3000 9000); do
        if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 && \
           ! ss -tuln | grep -q ":$port " && \
           ! netstat -tuln 2>/dev/null | grep -q ":$port "; then
            echo $port
            return 0
        fi
    done
    echo "❌ Nenhuma porta livre no range 3000-9000"
    exit 1
}

# Detectar porta livre
FREE_PORT=$(find_free_port)
echo "✅ Porta livre encontrada: $FREE_PORT"

# Verificar variáveis obrigatórias
if [ -z "$VITE_GEMINI_API_KEY" ]; then
    echo "❌ VITE_GEMINI_API_KEY não configurada!"
    echo "Configure: export VITE_GEMINI_API_KEY=sua_chave_aqui"
    exit 1
fi

# Build com porta específica
echo "📦 Gerando build de produção..."
npm run build

# Parar processo anterior
pm2 delete assistente-ia 2>/dev/null || true

# Iniciar com nova porta
echo "🌟 Iniciando assistente IA na porta $FREE_PORT..."
PORT=$FREE_PORT pm2 start "npm run preview -- --port $FREE_PORT --host 0.0.0.0" \
    --name assistente-ia \
    --env production

# Configurar PM2 para reiniciar
pm2 startup
pm2 save

# Atualizar Nginx
if [ -f "/etc/nginx/sites-available/assistente-ia" ]; then
    echo "🔧 Atualizando configuração do Nginx..."
    sudo sed -i "s/localhost:[0-9]*/localhost:$FREE_PORT/g" \
        /etc/nginx/sites-available/assistente-ia
    sudo nginx -t && sudo systemctl reload nginx
    echo "✅ Nginx atualizado para porta $FREE_PORT"
fi

echo "🎉 Deploy concluído!"
echo "🌐 Aplicação: http://seu-dominio.com"
echo "⚙️  Admin: http://seu-dominio.com/admin"
echo "📊 Monitor: pm2 monit"
```

#### Uso do Script
```bash
# Tornar executável
chmod +x smart-deploy.sh

# Configurar variáveis
export VITE_GEMINI_API_KEY=sua_chave_real_aqui
export VITE_ADMIN_PASSWORD=senha_forte_aqui

# Executar deploy
./smart-deploy.sh
```

### 3. Configuração PM2 Otimizada para IA

#### Ecosystem Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'assistente-ia',
    script: 'npm',
    args: 'run preview -- --port 8080 --host 0.0.0.0',
    cwd: '/var/www/assistente-ia',
    env: {
      NODE_ENV: 'production',
      PORT: 8080,
      VITE_GEMINI_API_KEY: process.env.VITE_GEMINI_API_KEY,
      VITE_ADMIN_PASSWORD: process.env.VITE_ADMIN_PASSWORD
    },
    instances: 1, // IA funciona melhor com uma instância
    autorestart: true,
    watch: false,
    max_memory_restart: '512M', // Controle de memória para IA
    error_file: '/var/log/pm2/assistente-ia-error.log',
    out_file: '/var/log/pm2/assistente-ia-out.log',
    log_file: '/var/log/pm2/assistente-ia-combined.log',
    time: true
  }]
};
```

### 4. Configuração Nginx para Assistente IA

#### Configuração Otimizada
```nginx
# /etc/nginx/sites-available/assistente-ia
server {
    listen 80;
    server_name seu-assistente-ia.com www.seu-assistente-ia.com;
    
    # Security headers específicos para IA
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Rate limiting para proteger a IA
    limit_req_zone $binary_remote_addr zone=ai_limit:10m rate=10r/m;
    limit_req zone=ai_limit burst=5 nodelay;
    
    # Proxy para aplicação
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout otimizado para IA (respostas podem demorar)
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Proteção extra para painel admin
    location /admin {
        # Rate limiting mais restritivo para admin
        limit_req_zone $binary_remote_addr zone=admin_limit:10m rate=5r/m;
        limit_req zone=admin_limit burst=2 nodelay;
        
        # Opcional: Restringir por IP
        # allow 192.168.1.0/24;
        # allow SEU.IP.PUBLICO.AQUI;
        # deny all;
        
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://localhost:8080;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

#### Ativar Configuração
```bash
# Criar symlink
sudo ln -s /etc/nginx/sites-available/assistente-ia /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Recarregar nginx
sudo systemctl reload nginx
```

### 5. SSL/HTTPS com Let's Encrypt

```bash
# Obter certificado SSL
sudo certbot --nginx -d seu-assistente-ia.com -d www.seu-assistente-ia.com

# Verificar renovação automática
sudo certbot renew --dry-run

# Configurar renovação no cron
sudo crontab -e
# Adicionar linha:
0 3 * * * certbot renew --quiet && systemctl reload nginx
```

## 🔧 Monitoramento Específico para IA

### Script de Monitoramento
```bash
#!/bin/bash
# monitor-ai.sh

LOG_FILE="/var/log/assistente-ia-monitor.log"

# Verificar se aplicação responde
check_ai_health() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/)
    if [ "$response" = "200" ]; then
        echo "[$(date)] ✅ Assistente IA operacional"
        return 0
    else
        echo "[$(date)] ❌ Assistente IA não responde (HTTP: $response)"
        return 1
    fi
}

# Verificar API do Gemini
check_gemini_api() {
    # Simular chamada simples para verificar quota
    local test_response=$(curl -s -H "Content-Type: application/json" \
        -H "Authorization: Bearer $VITE_GEMINI_API_KEY" \
        "https://generativelanguage.googleapis.com/v1/models" | grep -c "models")
    
    if [ "$test_response" -gt 0 ]; then
        echo "[$(date)] ✅ API Gemini acessível"
        return 0
    else
        echo "[$(date)] ⚠️  API Gemini com problemas"
        return 1
    fi
}

# Verificar uso de memória (IA pode consumir mais)
check_memory() {
    local memory_usage=$(free | grep Mem | awk '{printf("%.1f", $3/$2 * 100.0)}')
    echo "[$(date)] 📊 Uso de memória: ${memory_usage}%"
    
    if (( $(echo "$memory_usage > 90" | bc -l) )); then
        echo "[$(date)] ⚠️  Uso de memória alto: ${memory_usage}%"
        # Reiniciar se necessário
        pm2 restart assistente-ia
    fi
}

# Executar verificações
{
    echo "[$(date)] 🔍 Iniciando verificação do Assistente IA"
    
    if ! check_ai_health; then
        echo "[$(date)] 🔄 Reiniciando assistente..."
        pm2 restart assistente-ia
        sleep 10
        check_ai_health
    fi
    
    check_gemini_api
    check_memory
    
    echo "[$(date)] ✅ Verificação concluída"
    echo "---"
} >> $LOG_FILE
```

### Cron Jobs
```bash
# Adicionar ao crontab
crontab -e

# Verificar aplicação a cada 5 minutos
*/5 * * * * /home/user/scripts/monitor-ai.sh

# Backup de conversas diário
0 2 * * * cd /var/www/assistente-ia && npm run backup-conversations

# Limpeza de logs semanalmente
0 1 * * 0 find /var/log/pm2/ -name "*.log" -mtime +7 -delete

# Reiniciar PM2 semanalmente (preventivo)
0 3 * * 0 pm2 restart assistente-ia
```

## 📊 Backup e Manutenção

### Script de Backup
```bash
#!/bin/bash
# backup-ai.sh

BACKUP_DIR="/backup/assistente-ia"
DATE=$(date +%Y%m%d_%H%M%S)

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup de conversas (localStorage simulation)
echo "💾 Backup das conversas..."
pm2 logs assistente-ia --lines 1000 > $BACKUP_DIR/conversations_$DATE.log

# Backup de configurações
echo "⚙️  Backup das configurações..."
cp /var/www/assistente-ia/.env* $BACKUP_DIR/ 2>/dev/null || true

# Backup do código
echo "📦 Backup do código..."
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /var/www/assistente-ia

# Limpar backups antigos (manter apenas 30 dias)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
find $BACKUP_DIR -name "*.log" -mtime +30 -delete

echo "✅ Backup concluído: $BACKUP_DIR"
```

## 🔒 Segurança Específica para IA

### Configurações de Segurança
```bash
# Firewall restritivo
sudo ufw deny 22
sudo ufw allow from SEU.IP.CASA to any port 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw limit ssh

# Fail2ban para proteção adicional
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

### Arquivo fail2ban para IA
```ini
# /etc/fail2ban/jail.local
[nginx-ai-limit]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 5
findtime = 600
bantime = 3600
action = iptables-multiport[name=ReqLimit, port="http,https", protocol=tcp]
```

---

## 📞 Troubleshooting Específico

### Problemas Comuns

**IA não responde ou responde erro**:
```bash
# Verificar chave do Gemini
curl -H "Authorization: Bearer $VITE_GEMINI_API_KEY" \
  https://generativelanguage.googleapis.com/v1/models

# Verificar logs
pm2 logs assistente-ia --lines 50
```

**Quota da API excedida**:
```bash
# Verificar uso no Google Cloud Console
# Implementar cache de respostas similares
# Aumentar limites ou aguardar reset
```

**Alta latência nas respostas**:
```bash
# Verificar conectividade
ping generativelanguage.googleapis.com

# Verificar uso de CPU/memória
htop

# Otimizar prompts (reduzir tokens)
```

---

**🤖 Deploy completo do Assistente IA para VPS com configuração otimizada!**

*Para problemas específicos da API do Gemini, consulte a documentação oficial do Google AI.*
