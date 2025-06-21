# Guia de Debug - Parâmetros UTM

## Problema
Os parâmetros UTM não estão chegando ao checkout da Hotmart e não estão sendo marcados corretamente.

## Soluções Implementadas

### 1. Melhorias na Captura de Parâmetros UTM

#### Script no HTML (`client/index.html`)
- ✅ Captura imediata dos parâmetros UTM da URL
- ✅ Persistência em `localStorage` e `sessionStorage`
- ✅ Logs detalhados para debug
- ✅ Verificação de conflitos com Utmify

#### Função `getUtmParams()` (`client/src/lib/utils.ts`)
- ✅ Logs detalhados de debug
- ✅ Fallback para captura direta da URL
- ✅ Verificação de parâmetros válidos

### 2. Melhorias na Construção da URL

#### Função `buildHotmartUrl()` (`client/src/lib/utils.ts`)
- ✅ Logs detalhados de cada parâmetro adicionado
- ✅ Verificação final se os parâmetros UTM estão na URL
- ✅ Validação de parâmetros não vazios

#### Função `redirectToHotmartCheckout()` (`client/src/components/layout/SalesPage.tsx`)
- ✅ Verificação dos parâmetros UTM antes do envio
- ✅ Logs de debug para rastrear o fluxo
- ✅ Verificação da URL gerada pelo servidor

### 3. Melhorias no Servidor

#### Rota `/api/hotmart/capture-client-data` (`server/routes/hotmart-server-integration.ts`)
- ✅ Logs detalhados dos dados recebidos
- ✅ Validação de parâmetros UTM antes de incluir na URL
- ✅ Verificação final da URL gerada

## Como Testar

### 1. Teste Básico de Captura
Acesse: `http://localhost:3000/public/test-utm-params.html?utm_source=facebook&utm_campaign=teste&utm_medium=cpc`

### 2. Teste da Integração Completa
```bash
# Instalar node-fetch se necessário
npm install node-fetch

# Executar o teste
node test-utm-integration.js
```

### 3. Teste Manual no Browser
1. Acesse a página principal com parâmetros UTM:
   ```
   http://localhost:3000?utm_source=facebook&utm_campaign=teste&utm_medium=cpc
   ```

2. Abra o Console do Browser (F12)
3. Procure pelos logs de debug:
   - `🔍 [DEBUG] UTM Script - Iniciando captura de parâmetros UTM`
   - `🔍 [DEBUG] getUtmParams - Iniciando captura de parâmetros UTM`
   - `🔍 [DEBUG] buildHotmartUrl - Iniciando construção da URL`

4. Clique no botão de compra
5. Verifique se a URL do checkout contém os parâmetros UTM

## Logs de Debug Esperados

### No Browser Console:
```
🔍 [DEBUG] UTM Script - Iniciando captura de parâmetros UTM
🔍 [DEBUG] UTM Script - Parâmetros capturados da URL: {utm_source: "facebook", utm_campaign: "teste", ...}
✅ [DEBUG] UTM Script - Parâmetros salvos em window, localStorage e sessionStorage
🔍 [DEBUG] getUtmParams - Iniciando captura de parâmetros UTM
🔍 [DEBUG] getUtmParams - Parâmetros encontrados no window.utm_params: {utm_source: "facebook", ...}
🔍 [DEBUG] buildHotmartUrl - Iniciando construção da URL
✅ [DEBUG] buildHotmartUrl - Adicionado utm_source: facebook
✅ [DEBUG] buildHotmartUrl - Adicionado utm_campaign: teste
✅ [DEBUG] buildHotmartUrl - Adicionado utm_medium: cpc
```

### No Console do Servidor:
```
🔍 [DEBUG] Servidor - Dados recebidos do cliente: {utmSource: "facebook", utmCampaign: "teste", ...}
✅ [DEBUG] Servidor - Adicionado utm_source: facebook
✅ [DEBUG] Servidor - Adicionado utm_campaign: teste
✅ [DEBUG] Servidor - Adicionado utm_medium: cpc
🔍 [DEBUG] Servidor - Verificação final UTM na URL: {utm_source: "facebook", utm_campaign: "teste", urlContainsUtm: true}
```

## Possíveis Problemas e Soluções

### 1. Parâmetros UTM não aparecem na URL
- **Causa**: Script Utmify pode estar interferindo
- **Solução**: Verificar se o atributo `data-utmify-prevent-subids` está funcionando

### 2. Parâmetros UTM são perdidos durante o redirecionamento
- **Causa**: Problema na função `buildHotmartUrl`
- **Solução**: Verificar os logs de debug para identificar onde os parâmetros são perdidos

### 3. Servidor não recebe os parâmetros UTM
- **Causa**: Problema na função `getUtmParams`
- **Solução**: Verificar se `window.utm_params` está sendo definido corretamente

## Verificação Final

Para confirmar que tudo está funcionando:

1. Acesse a página com parâmetros UTM
2. Abra o Console do Browser
3. Digite: `console.log(window.utm_params)`
4. Deve retornar os parâmetros UTM corretos
5. Clique no botão de compra
6. A URL do checkout deve conter os parâmetros UTM

## Comandos Úteis

```bash
# Reiniciar o servidor
npm run dev

# Verificar logs do servidor
tail -f server.log

# Limpar cache do browser
# Chrome: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
``` 