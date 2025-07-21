
# 🚀 GUIA DE DEPLOY - IMPÉRIO PHARMA

## 📋 Visão Geral

Este guia cobre todos os cenários de deploy do Império Pharma, com foco especial em **VPS**, **múltiplos sites** e **detecção dinâmica de portas**.

## 🔧 Pré-requisitos para Deploy

### Variáveis de Ambiente Obrigatórias
```bash
# .env.production
VITE_GEMINI_API_KEY=sua_chave_real_aqui
VITE_WHATSAPP_NUMBER=5511999999999
VITE_PIX_KEY=chave@pix.real.com

# Opcionais para VPS
PORT=3000                    # Porta específica (auto-detect se omitido)
PREVIEW_PORT=4173           # Porta para preview
NODE_ENV=production
```

### Checklist Pré-Deploy
- [ ] Build local funciona (`npm run build`)
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Imagens de produtos adicionadas
- [ ] Dados reais dos produtos
- [ ] Testes em dispositivos móveis

## 🌐 Deploy em VPS (Configuração Avançada)

### 1. Preparação do Servidor

#### Verificar Portas Disponíveis
```bash
# Listar portas em uso
sudo netstat -tulpn | grep LISTEN
# ou
sudo ss -tulpn | grep LISTEN

# Verificar porta específica
sudo lsof -i :3000

# Verificar range de portas
sudo nmap -p 3000-3010 localhost
```

#### Instalar Dependências do Sistema
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm nginx pm2 certbot

# CentOS/RHEL
sudo yum install -y nodejs npm nginx
sudo npm install -g pm2
```

### 2. Deploy com PM2 (Recomendado para VPS)

#### Setup Inicial
```bash
# 1. Clone o projeto
git clone <seu-repositorio>
cd imperio-pharma

# 2. Instalar dependências
npm ci --only=production

# 3. Configurar variáveis de ambiente
nano .env.production
# Adicione suas variáveis aqui

# 4. Build de produção
npm run build
```

#### Configuração PM2
```bash
# Criar ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'imperio-pharma',
    script: 'npx',
    args: 'serve -s dist -l 3000',
    cwd: '/caminho/para/imperio-pharma',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
EOF

# Iniciar aplicação
pm2 start ecosystem.config.js --env production

# Configurar auto-start
pm2 startup
pm2 save
```

#### PM2 com Múltiplos Sites
```bash
# Para múltiplos projetos na mesma VPS
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'imperio-pharma',
      script: 'npx',
      args: 'serve -s dist -l 3000',
      cwd: '/var/www/imperio-pharma'
    },
    {
      name: 'outro-site',
      script: 'npx', 
      args: 'serve -s dist -l 3001',
      cwd: '/var/www/outro-site'
    }
  ]
};
EOF
```

### 3. Configuração Nginx (Reverse Proxy)

#### Configuração Básica
```nginx
# /etc/nginx/sites-available/imperio-pharma
server {
    listen 80;
    server_name imperio-pharma.com.br www.imperio-pharma.com.br;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Múltiplos Sites na Mesma VPS
```nginx
# Site 1: imperio-pharma.com.br
server {
    listen 80;
    server_name imperio-pharma.com.br;
    location / {
        proxy_pass http://localhost:3000;
        # ... outras configurações
    }
}

# Site 2: outro-site.com.br  
server {
    listen 80;
    server_name outro-site.com.br;
    location / {
        proxy_pass http://localhost:3001;
        # ... outras configurações  
    }
}
```

#### Ativar Configuração
```bash
# Criar symlink
sudo ln -s /etc/nginx/sites-available/imperio-pharma /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Recarregar nginx
sudo systemctl reload nginx
```

### 4. SSL/HTTPS com Let's Encrypt

```bash
# Instalar certbot (se não instalado)
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d imperio-pharma.com.br -d www.imperio-pharma.com.br

# Renovação automática
sudo crontab -e
# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔄 Deploy com Auto-detecção de Portas

### Script de Deploy Inteligente
```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Iniciando deploy do Império Pharma..."

# Função para encontrar porta livre
find_free_port() {
    local port=3000
    while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; do
        echo "⚠️  Porta $port em uso, tentando próxima..."
        port=$((port + 1))
    done
    echo $port
}

# Detectar porta livre
FREE_PORT=$(find_free_port)
echo "✅ Porta livre encontrada: $FREE_PORT"

# Configurar variável de ambiente
export PORT=$FREE_PORT

# Build
echo "📦 Gerando build de produção..."
npm run build

# Parar PM2 se existir
pm2 delete imperio-pharma 2>/dev/null || true

# Iniciar com nova porta
echo "🌟 Iniciando aplicação na porta $FREE_PORT..."
pm2 start "npx serve -s dist -l $FREE_PORT" --name imperio-pharma

# Atualizar nginx se necessário
if [ -f "/etc/nginx/sites-available/imperio-pharma" ]; then
    echo "🔧 Atualizando configuração do Nginx..."
    sudo sed -i "s/localhost:[0-9]*/localhost:$FREE_PORT/g" /etc/nginx/sites-available/imperio-pharma
    sudo nginx -t && sudo systemctl reload nginx
fi

echo "✅ Deploy concluído! Aplicação rodando na porta $FREE_PORT"
```

### Uso do Script
```bash
# Tornar executável
chmod +x deploy.sh

# Executar deploy
./deploy.sh
```

## 🐳 Deploy com Docker

### Dockerfile Multi-stage
```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose para VPS
```yaml
# docker-compose.yml
version: '3.8'

services:
  imperio-pharma:
    build: .
    ports:
      - "${PORT:-3000}:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  nginx-proxy:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - imperio-pharma
    restart: unless-stopped
```

### Comandos Docker
```bash
# Build e deploy
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Atualizar
docker-compose pull && docker-compose up -d
```

## ☁️ Deploy em Plataformas Cloud

### 1. Vercel (Mais Simples)
```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel --prod

# Configurar domínio customizado
vercel domains add imperio-pharma.com.br
```

### 2. Netlify
```bash
# Build e deploy manual
npm run build
netlify deploy --prod --dir=dist

# Deploy contínuo via Git
# Configurar no painel: https://app.netlify.com
```

### 3. AWS S3 + CloudFront
```bash
# Instalar AWS CLI
aws configure

# Build e sync
npm run build
aws s3 sync dist/ s3://imperio-pharma-bucket --delete

# Invalidar cache do CloudFront
aws cloudfront create-invalidation --distribution-id EDFDVBD6EXAMPLE --paths "/*"
```

## 🔧 Monitoramento e Manutenção

### Scripts de Monitoramento
```bash
#!/bin/bash
# monitor.sh

# Verificar se aplicação está respondendo
check_health() {
    local port=$1
    if curl -f http://localhost:$port >/dev/null 2>&1; then
        echo "✅ Aplicação na porta $port está saudável"
        return 0
    else
        echo "❌ Aplicação na porta $port não responde"
        return 1
    fi
}

# Verificar PM2
if ! pm2 list | grep -q "imperio-pharma"; then
    echo "⚠️  PM2 não encontrado, reiniciando..."
    pm2 start ecosystem.config.js
fi

# Health check
if ! check_health 3000; then
    echo "🔄 Reiniciando aplicação..."
    pm2 restart imperio-pharma
fi
```

### Cron Jobs para Manutenção
```bash
# Adicionar ao crontab
crontab -e

# Verificar aplicação a cada 5 minutos
*/5 * * * * /home/user/scripts/monitor.sh

# Backup de logs diário
0 2 * * * pm2 flush && tar -czf /backup/logs-$(date +\%Y\%m\%d).tar.gz /home/user/.pm2/logs/

# Renovar SSL (Let's Encrypt)
0 3 * * * certbot renew --quiet && systemctl reload nginx
```

### Logs e Debug
```bash
# Logs PM2
pm2 logs imperio-pharma

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Monitoramento em tempo real
pm2 monit
```

## 🔒 Segurança

### Configurações de Segurança
```nginx
# Adicionar ao nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'";
```

### Firewall (UFW)
```bash
# Configurar firewall básico
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000  # Apenas se necessário acesso direto
```

## 📊 Performance e Otimização

### Configurações Nginx para Performance
```nginx
# Cache de arquivos estáticos
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary Accept-Encoding;
}

# Compressão Gzip
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
```

---

## 📞 Troubleshooting

### Problemas Comuns

**Porta em uso**:
```bash
# Matar processo na porta
sudo fuser -k 3000/tcp
# ou
sudo kill $(sudo lsof -t -i:3000)
```

**PM2 não inicia**:
```bash
# Resetar PM2
pm2 kill
pm2 startup
```

**SSL não funciona**:
```bash
# Verificar certificado
sudo certbot certificates
# Renovar forçado
sudo certbot renew --force-renewal
```

---

**🚀 Com este guia, você pode fazer deploy em qualquer ambiente, desde VPS simples até infraestrutura cloud complexa!**

*Para problemas específicos, consulte os logs e documentação das ferramentas utilizadas.*
