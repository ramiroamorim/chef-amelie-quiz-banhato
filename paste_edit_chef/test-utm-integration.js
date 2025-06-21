// Script para testar a integração completa dos parâmetros UTM
const fetch = require('node-fetch');

async function testUtmIntegration() {
  console.log('🧪 [TESTE] Iniciando teste de integração UTM');
  
  const testData = {
    clientIP: '8.8.8.8',
    userAgent: 'Mozilla/5.0 (Test Browser)',
    utmSource: 'facebook',
    utmCampaign: 'teste_campanha',
    utmMedium: 'cpc',
    utmContent: 'teste_conteudo',
    utmTerm: 'teste_termo',
    fbc: 'fb.1.123456789.987654321',
    fbp: 'fb.1.123456789.123456789'
  };
  
  console.log('📤 [TESTE] Enviando dados para o servidor:', testData);
  
  try {
    const response = await fetch('http://localhost:3000/api/hotmart/capture-client-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ [TESTE] Sucesso! URL gerada:', result.hotmartUrl);
      
      // Verificar se os parâmetros UTM estão na URL
      const url = new URL(result.hotmartUrl);
      const utmSource = url.searchParams.get('utm_source');
      const utmCampaign = url.searchParams.get('utm_campaign');
      const utmMedium = url.searchParams.get('utm_medium');
      
      console.log('🔍 [TESTE] Verificação dos parâmetros UTM na URL:');
      console.log('  - utm_source:', utmSource);
      console.log('  - utm_campaign:', utmCampaign);
      console.log('  - utm_medium:', utmMedium);
      
      if (utmSource === 'facebook' && utmCampaign === 'teste_campanha') {
        console.log('✅ [TESTE] Parâmetros UTM estão corretos na URL!');
      } else {
        console.log('❌ [TESTE] Parâmetros UTM não estão corretos na URL!');
      }
      
    } else {
      console.log('❌ [TESTE] Erro no servidor:', result.error);
    }
    
  } catch (error) {
    console.error('❌ [TESTE] Erro na requisição:', error.message);
  }
}

// Executar o teste
testUtmIntegration(); 