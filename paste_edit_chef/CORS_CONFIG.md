# 🔧 Configuração CORS para Hotmart

## 📋 Configuração Atual

O CORS já está configurado no `server/index.ts` para permitir requisições da Hotmart:

```javascript
const allowedOrigins = [
  'https://pay.hotmart.com',
  'https://www.hotmart.com', 
  'https://hotmart.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];
```

## 🌐 URLs da Hotmart Permitidas

- ✅ `https://pay.hotmart.com` - Página de checkout
- ✅ `https://www.hotmart.com` - Site principal
- ✅ `https://hotmart.com` - Site principal (sem www)

## 🔧 Configuração via Variáveis de Ambiente

Se você quiser configurar via `.env`, crie um arquivo `.env` na raiz do projeto:

```bash
# .env
CORS_ORIGIN=https://tracking-api.hotmart.com/rest/track?hotid=eyJjaWQiOiIxNzQ3MTcyODI3OTY0NDA1ODA4MjEyODk5ODE1MzAiLCJiaWQiOiIxNzQ3MT
cyODI3OTY0NDA1ODA4MjEyODk5ODE1MzAiLCJzaWQiOiI3YmFiY2UxNDkzNDE0MTljOGZhMjBmMTY5NTk4OTRhYSIsInBhZ2V2aWV3X2lkIjoiUFZqcmdoOGRpbG16YW1jMzMyYnZ5IiwidHJhY2VfaWQiOiJMVDkwaGJlYWFjdGI4bWMzMzJjbm8ifQ==&previous=http%3A%2F%2Flocalhost%3A3000%2F&cid=174717282796440580821289981530&bid=174717282796440580821289981530&sid=7babce149341419c8fa20f16959894aa&locationHref=https%3A%2F%2Fpay.hotmart.com%2FD98080625O%3Futm_source%3Dorganic%26utm_campaign%3D%26utm_medium%3D%26utm_content%3D%26utm_term%3D%26bid%3D1750319543781
```

## 🧪 Testando o CORS

### 1. Verificar se está funcionando:
```bash
# No console do navegador na página da Hotmart
fetch('https://seu-dominio.com/api/hotmart-tracking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({test: 'data'})
}).then(r => r.json()).then(console.log);
```

### 2. Verificar headers de resposta:
```bash
curl -H "Origin: https://pay.hotmart.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://seu-dominio.com/api/hotmart-tracking
```

## ⚠️ Problemas Comuns

### Erro: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"

**Solução:** Verifique se a URL da Hotmart está na lista `allowedOrigins`

### Erro: "No 'Access-Control-Allow-Origin' header is present"

**Solução:** Verifique se o servidor está rodando e se o CORS está configurado

## 🔒 Segurança

- ✅ Apenas origens específicas são permitidas
- ✅ Credenciais são permitidas (`Access-Control-Allow-Credentials: true`)
- ✅ Métodos HTTP seguros configurados
- ✅ Headers necessários permitidos

## 📝 Logs

O servidor vai logar todas as requisições CORS. Procure por:
```
OPTIONS /api/hotmart-tracking 200 in Xms
POST /api/hotmart-tracking 200 in Xms
```

## 🎯 Próximos Passos

1. ✅ CORS configurado para Hotmart
2. 🔄 Testar requisições da Hotmart
3. 🔄 Implementar salvamento no banco
4. 🔄 Configurar monitoramento 