# Monitoramento do External ID

Este guia explica como monitorar e verificar como o external ID do cliente está sendo recebido e processado no sistema.

## 🔍 Como o External ID Funciona

### 1. **Geração do External ID**
- O external ID é gerado como um **UUID v4** quando o usuário inicia o quiz
- É armazenado na variável `currentSessionId` no frontend
- É usado em todos os eventos do Facebook Pixel

### 2. **Fluxo do External ID**

```
Frontend (Quiz) → Backend (API) → Facebook CAPI
     ↓                ↓              ↓
  UUID v4        Hash SHA256     Hash SHA256
```

### 3. **Pontos de Monitoramento**

#### **Frontend (Client)**
- **Arquivo**: `client/src/lib/fbPixel.ts`
- **Variável**: `currentSessionId`
- **Função**: `FacebookPixel.initWithUserId(userId)`

#### **Backend (Server)**
- **Arquivo**: `server/routes/quiz.routes.ts`
- **Endpoints**: 
  - `/api/quiz/event` - Eventos gerais
  - `/api/quiz/user-data/:sessionId` - Dados de compra

## 🧪 Como Testar

### 1. **Script de Teste Automatizado**

Execute o script de teste:

```bash
node test-external-id.js
```

Este script testa:
- ✅ Processamento de external ID normal
- ✅ Processamento de email como external ID
- ✅ Valores vazios e undefined
- ✅ Eventos reais do Facebook CAPI
- ✅ Dados de usuário para compra

### 2. **Teste Manual via cURL**

#### Teste do External ID:
```bash
curl -X POST http://localhost:3000/api/quiz/test-external-id \
  -H "Content-Type: application/json" \
  -d '{
    "external_id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "usuario@exemplo.com"
  }'
```

#### Teste de Evento Real:
```bash
curl -X POST http://localhost:3000/api/quiz/event \
  -H "Content-Type: application/json" \
  -d '{
    "event": "StartQuiz",
    "external_id": "550e8400-e29b-41d4-a716-446655440000",
    "fbp": "fb.1.1234567890.1234567890",
    "fbc": "fb.1.1234567890.1234567890",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  }'
```

#### Teste de Dados de Usuário:
```bash
curl -X POST http://localhost:3000/api/quiz/user-data/test-session-123 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "comprador@exemplo.com",
    "name": "João Silva",
    "phone": "+5511999999999",
    "event": "Purchase"
  }'
```

## 📊 Logs de Monitoramento

### 1. **Logs Detalhados Adicionados**

Os seguintes logs foram adicionados para monitoramento:

#### **Endpoint `/api/quiz/event`:**
```
🔍 [EXTERNAL ID DEBUG] ==========================================
🔍 [EXTERNAL ID DEBUG] Headers da requisição: {...}
🔍 [EXTERNAL ID DEBUG] Body completo da requisição: {...}
🔍 [EXTERNAL ID DEBUG] External ID recebido (raw): 550e8400-e29b-41d4-a716-446655440000
🔍 [EXTERNAL ID DEBUG] Tipo do external_id: string
🔍 [EXTERNAL ID DEBUG] External ID é string?: true
🔍 [EXTERNAL ID DEBUG] External ID tem valor?: true
🔍 [EXTERNAL ID DEBUG] External ID length: 36
🔍 [EXTERNAL ID DEBUG] ==========================================
```

#### **Endpoint `/api/quiz/user-data/:sessionId`:**
```
🔍 [USER DATA EXTERNAL ID DEBUG] ==========================================
🔍 [USER DATA EXTERNAL ID DEBUG] Session ID: test-session-123
🔍 [USER DATA EXTERNAL ID DEBUG] Email recebido (raw): usuario@exemplo.com
🔍 [USER DATA EXTERNAL ID DEBUG] Tipo do email: string
🔍 [USER DATA EXTERNAL ID DEBUG] Email é string?: true
🔍 [USER DATA EXTERNAL ID DEBUG] Email tem valor?: true
🔍 [USER DATA EXTERNAL ID DEBUG] Email length: 20
🔍 [USER DATA EXTERNAL ID DEBUG] ==========================================
```

### 2. **Como Verificar os Logs**

#### **No Terminal (Desenvolvimento):**
```bash
# Inicie o servidor
npm run dev

# Os logs aparecerão no terminal
```

#### **No Console do Navegador:**
```javascript
// Verificar se o external ID está sendo definido
console.log('Current Session ID:', window.currentSessionId);

// Verificar eventos do Facebook Pixel
window.fbq('track', 'PageView', {
  external_id: 'test-id'
});
```

## 🔧 Configuração do Ambiente

### 1. **Variáveis de Ambiente Necessárias**

```env
# Facebook CAPI
FB_CAPI_TOKEN=seu_token_aqui
FB_PIXEL_ID=644431871463181

# IPInfo (para geolocalização)
IPINFO_TOKEN=1ad4cf7c8cc087
```

### 2. **Dependências**

```bash
npm install axios crypto
```

## 📋 Checklist de Verificação

### ✅ **Frontend**
- [ ] UUID está sendo gerado corretamente
- [ ] `currentSessionId` está sendo definido
- [ ] `FacebookPixel.initWithUserId()` está sendo chamado
- [ ] External ID está sendo enviado em todos os eventos

### ✅ **Backend**
- [ ] External ID está sendo recebido corretamente
- [ ] Hash SHA256 está sendo aplicado
- [ ] Payload está sendo enviado para o Facebook CAPI
- [ ] Logs estão sendo exibidos

### ✅ **Facebook CAPI**
- [ ] Eventos estão sendo recebidos
- [ ] External ID hash está correto
- [ ] Resposta do Facebook está OK

## 🚨 Problemas Comuns

### 1. **External ID não está sendo enviado**
- Verificar se `FacebookPixel.initWithUserId()` foi chamado
- Verificar se `currentSessionId` está definido

### 2. **External ID está vazio**
- Verificar se o UUID está sendo gerado corretamente
- Verificar se a sessão está sendo criada

### 3. **Hash SHA256 não está sendo aplicado**
- Verificar se a função `sha256()` está funcionando
- Verificar se o valor não é undefined/null

### 4. **Facebook CAPI rejeitando**
- Verificar se o token está correto
- Verificar se o pixel ID está correto
- Verificar se o formato do payload está correto

## 📞 Suporte

Se encontrar problemas:

1. Execute o script de teste: `node test-external-id.js`
2. Verifique os logs detalhados no terminal
3. Teste manualmente com cURL
4. Verifique as variáveis de ambiente

---

**Última atualização**: Janeiro 2024 