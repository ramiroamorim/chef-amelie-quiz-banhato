# 🔍 Sistema de Tracking para Hotmart

## 📋 Visão Geral

Este sistema permite capturar dados de geolocalização e parâmetros UTM na página de checkout da Hotmart, mesmo sendo um domínio externo.

## 🚀 Como Funciona

### 1. **No seu site (antes do redirecionamento)**
- Os dados são salvos no `localStorage` do navegador
- A URL da Hotmart mantém apenas os parâmetros UTM visíveis
- URL limpa: `https://pay.hotmart.com/D98080625O?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=`

### 2. **Na página da Hotmart**
- Um script JavaScript acessa os dados do `localStorage`
- Envia os dados para o seu backend
- Limpa os dados após o uso (opcional)

## 📁 Arquivos

### `public/hotmart-tracking.js`
Script que deve ser incluído na página da Hotmart para capturar os dados.

### `server/routes/pixel.routes.ts`
Rota `/api/hotmart-tracking` que recebe os dados da Hotmart.

## 🔧 Implementação na Hotmart

### Opção 1: Incluir o script diretamente
```html
<!-- Adicione este script na página de checkout da Hotmart -->
<script src="https://seu-dominio.com/hotmart-tracking.js"></script>
```

### Opção 2: Copiar o código inline
```html
<script>
// Cole o conteúdo do arquivo hotmart-tracking.js aqui
</script>
```

### Opção 3: Usar o console do navegador
```javascript
// Execute no console da página da Hotmart
window.HotmartTracking.getData(); // Ver dados
window.HotmartTracking.sendData(data); // Enviar dados
```

## 📊 Dados Capturados

### Dados de Geolocalização (do localStorage)
- `client_ip_address`: IP do usuário
- `ct`: Hash da cidade
- `st`: Hash do estado
- `country`: Hash do país
- `zip`: Hash do CEP
- `eventID`: ID único do evento
- `userAgent`: User Agent do navegador

### Parâmetros UTM (da URL)
- `utm_source`: Origem do tráfego
- `utm_campaign`: Campanha
- `utm_medium`: Meio
- `utm_content`: Conteúdo
- `utm_term`: Termo

### Informações da Página
- `page_url`: URL da página da Hotmart
- `page_title`: Título da página
- `timestamp`: Data/hora do evento

## 🔒 Segurança

- Os dados sensíveis são hasheados (SHA-256)
- O localStorage é limpo após o uso (opcional)
- CORS configurado para permitir requisições da Hotmart

## 🐛 Debug

### Verificar se os dados estão sendo salvos
```javascript
// No console do seu site (antes do redirecionamento)
console.log(localStorage.getItem('client_ip_address'));
console.log(localStorage.getItem('eventID'));
```

### Verificar se os dados chegaram na Hotmart
```javascript
// No console da página da Hotmart
console.log(window.HotmartTracking.getData());
```

## 📝 Exemplo de Uso

1. **Usuário clica no botão de compra** no seu site
2. **Dados são salvos** no localStorage
3. **Redirecionamento** para Hotmart com URL limpa
4. **Script na Hotmart** captura os dados
5. **Dados enviados** para seu backend
6. **Dados processados** e salvos no banco

## ⚠️ Limitações

- Funciona apenas se o usuário não limpar o localStorage
- Depende do JavaScript estar habilitado
- Requer que o script seja incluído na página da Hotmart

## 🎯 Próximos Passos

1. Incluir o script na página da Hotmart
2. Configurar o CORS no backend para aceitar requisições da Hotmart
3. Implementar salvamento no banco de dados
4. Configurar alertas/monitoramento 