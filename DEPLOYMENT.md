
# GUIA DE DEPLOY - IMPÉRIO PHARMA

## 📋 CHECKLIST PRÉ-DEPLOY

### ✅ Verificações Obrigatórias
- [ ] Todos os dados de exemplo foram substituídos por dados reais
- [ ] Número do WhatsApp configurado corretamente
- [ ] Chave PIX real configurada
- [ ] Imagens dos produtos carregadas
- [ ] Informações da empresa atualizadas
- [ ] Teste completo do fluxo de compra realizado

### ⚙️ Configurações Técnicas
- [ ] Build de produção testado (`npm run build`)
- [ ] Todas as dependências atualizadas
- [ ] Não há console.logs desnecessários
- [ ] Variáveis de ambiente configuradas (se aplicável)

## 🚀 OPÇÕES DE DEPLOY

### 1. Lovable (Recomendado - Mais Simples)
```bash
# No painel da Lovable:
# 1. Clique em "Share" → "Publish"
# 2. Configure domínio customizado se necessário
# 3. Site estará disponível instantaneamente
```

### 2. Vercel (Recomendado - Gratuito)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Para domínio customizado:
# 1. Acesse vercel.com/dashboard
# 2. Configure DNS do domínio
# 3. Adicione domínio no projeto
```

### 3. Netlify (Alternativa Gratuita)
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Build e deploy
npm run build
netlify deploy --prod --dir=dist
```

## 🔧 CONFIGURAÇÕES PÓS-DEPLOY

### Domínio Personalizado
1. Comprar domínio (sugestões):
   - `imperiopharma.com.br`
   - `imperio-pharma.com.br`
   - `imperiopharma.shop`

2. Configurar DNS:
   ```
   Tipo: CNAME
   Nome: www
   Valor: [url-do-deploy]
   
   Tipo: A
   Nome: @
   Valor: [IP-do-servidor]
   ```

### SSL/HTTPS
- ✅ Automático na Lovable, Vercel e Netlify
- Certificado Let's Encrypt gratuito

### Analytics (Opcional)
```html
<!-- Google Analytics - Adicionar no index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📱 TESTES PÓS-DEPLOY

### Testes Obrigatórios
- [ ] Site carrega corretamente em desktop
- [ ] Site carrega corretamente em mobile
- [ ] Todas as imagens aparecem
- [ ] Carrinho funciona (adicionar/remover produtos)
- [ ] Cálculo de frete funciona
- [ ] Checkout completa até WhatsApp
- [ ] WhatsApp abre com mensagem correta
- [ ] Upload de comprovante funciona

### Testes de Performance
- [ ] Tempo de carregamento < 3 segundos
- [ ] Todas as imagens carregam
- [ ] Não há erros no console do browser
- [ ] Site funciona em diferentes navegadores

## 🔄 ATUALIZAÇÕES FUTURAS

### Fluxo de Atualização
1. Fazer alterações no código
2. Testar localmente (`npm run dev`)
3. Fazer commit das alterações
4. Push para repositório
5. Deploy automático (Lovable/Vercel/Netlify)

### Backup de Segurança
- Repositório Git já serve como backup do código
- Para dados: implementar backup quando conectar Supabase
- Backup de imagens: manter cópias locais

## 📞 SUPORTE PÓS-DEPLOY

### Monitoramento
- [ ] Configurar alertas de uptime (UptimeRobot - gratuito)
- [ ] Monitorar Google Search Console
- [ ] Acompanhar métricas de conversão

### Manutenção Regular
- [ ] Atualizar produtos e preços mensalmente
- [ ] Verificar funcionamento do site semanalmente
- [ ] Backup de dados regularmente (quando tiver backend)
- [ ] Atualizações de segurança

---

**📧 Em caso de problemas:**
- Verificar logs do serviço de deploy
- Testar localmente primeiro
- Consultar documentação da plataforma escolhida
