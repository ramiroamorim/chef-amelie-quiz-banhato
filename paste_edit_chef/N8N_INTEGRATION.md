# Integração com n8n - Evento de Compra

## Endpoint para Captura de Dados Completos

### URL: `POST /api/quiz/user-data/:sessionId`

Este endpoint captura todos os dados necessários para o evento de compra no Facebook CAPI.

## Dados de Entrada (Body)

```json
{
  "email": "usuario@email.com",
  "name": "João Silva",
  "phone": "+5511999999999",
  "event": "Purchase",
  "fbp": "fb.1.1234567890.1234567890",
  "fbc": "fb.1.1234567890.1234567890"
}
```

## Dados Capturados Automaticamente

✅ **IP do usuário** (capturado automaticamente)
✅ **Geolocalização** (cidade, estado, CEP, país)
✅ **User Agent** (navegador/dispositivo)
✅ **Timestamp** (data/hora exata)

## Dados Enviados para o Facebook CAPI

### user_data (com hash SHA256):
- `external_id`: Hash do email
- `em`: Hash do email
- `ph`: Hash do telefone
- `fn`: Hash do primeiro nome
- `ln`: Hash do sobrenome
- `ct`: Hash da cidade
- `st`: Hash do estado
- `zp`: Hash do CEP
- `country`: Hash do país
- `client_ip_address`: IP real
- `client_user_agent`: Navegador
- `fbp`: Facebook Browser ID
- `fbc`: Facebook Click ID

### custom_data:
- `content_name`: "Quiz Chef Amelie"
- `content_category`: "Culinária"
- `value`: 17.00
- `currency`: "EUR"

## Resposta do Endpoint

```json
{
  "success": true,
  "sessionId": "uuid-da-sessao",
  "userData": {
    "email": "usuario@email.com",
    "name": "João Silva",
    "phone": "+5511999999999",
    "ip": "201.45.123.45",
    "location": {
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01234-567",
      "country": "BR"
    },
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "facebookEvent": {
    "event_name": "Purchase",
    "user_data": { /* dados com hash */ },
    "custom_data": { /* dados do produto */ },
    "response": {
      "events_received": 1,
      "messages": [],
      "fbtrace_id": "AsFdbd8SmFvicQin3glN0Bl"
    }
  }
}
```

## Configuração no n8n

### 1. HTTP Request Node
- **Method**: POST
- **URL**: `https://seu-dominio.com/api/quiz/user-data/{sessionId}`
- **Headers**: `Content-Type: application/json`
- **Body**: Dados do usuário (email, nome, telefone)

### 2. Dados Disponíveis para n8n
- ✅ Email do usuário
- ✅ Nome completo
- ✅ Telefone
- ✅ IP real
- ✅ Localização completa
- ✅ Confirmação do Facebook CAPI
- ✅ Timestamp da transação

### 3. Fluxo Recomendado
1. **Captura dados** do formulário de pagamento
2. **Envia para API** (`/api/quiz/user-data/:sessionId`)
3. **Recebe confirmação** do Facebook CAPI
4. **Processa pagamento** (Hotmart, etc.)
5. **Envia email** de confirmação

## Teste do Endpoint

```bash
curl -X POST http://localhost:3000/api/quiz/user-data/test-session-123 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "name": "João Silva",
    "phone": "+5511999999999",
    "event": "Purchase"
  }'
```

## Logs Esperados

```
[User Data] Dados recebidos: { sessionId: 'test-session-123', email: 'teste@email.com', ... }
[User Data] IP capturado: 201.45.123.45
[User Data] Localização obtida: { city: 'São Paulo', state: 'SP', ... }
[SHA256] Original: "teste@email.com" -> Normalized: "teste@email.com" -> Hash: abc123...
[User Data] ✅ Evento de compra enviado para o Facebook: { events_received: 1 }
```

## Status: ✅ PRONTO PARA PRODUÇÃO 