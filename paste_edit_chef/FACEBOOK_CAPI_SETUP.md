# Configuração do Facebook CAPI

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Facebook CAPI Configuration
FB_CAPI_TOKEN=your_facebook_capi_access_token_here
FB_PIXEL_ID=your_facebook_pixel_id_here
```

## Como obter as credenciais:

### 1. FB_PIXEL_ID
- Vá para o Facebook Business Manager
- Acesse "Eventos" > "Pixels"
- Copie o ID do seu pixel

### 2. FB_CAPI_TOKEN
- No Facebook Business Manager, vá em "Eventos" > "Configurações"
- Clique em "Gerar token de acesso"
- Copie o token gerado

## Verificação dos Dados

O sistema agora está configurado para:

✅ **Hash SHA256 correto** para todos os campos necessários:
- `external_id` (ID do usuário)
- `ct` (cidade)
- `st` (estado)
- `zp` (CEP)
- `country` (país)

✅ **Captura de IP real** do usuário
✅ **Geolocalização automática** baseada no IP
✅ **Logs detalhados** para debug

## Teste

Para testar, faça uma requisição POST para `/api/quiz/event` com:

```json
{
  "event": "StartQuiz",
  "external_id": "user123",
  "fbp": "fb.1.1234567890.1234567890",
  "fbc": "fb.1.1234567890.1234567890",
  "user_agent": "Mozilla/5.0..."
}
```

## Logs esperados

```
[CAPI] Evento recebido: { event: 'StartQuiz', external_id: 'user123', ... }
[CAPI] IP capturado: 201.45.123.45
[CAPI] Localização obtida: { city: 'São Paulo', state: 'SP', ... }
[SHA256] Original: "São Paulo" -> Normalized: "são paulo" -> Hash: abc123...
[CAPI] Payload enviado para o Facebook: { ... }
[CAPI] ✅ Resposta do Facebook: { events_received: 1 }
``` 