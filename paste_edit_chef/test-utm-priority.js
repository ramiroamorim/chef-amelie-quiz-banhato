// Script para testar a captura de parâmetros UTM com PRIORIDADE MÁXIMA
const puppeteer = require('puppeteer');

async function testUtmPriority() {
  console.log('🚨 [PRIORIDADE MÁXIMA] Iniciando teste de captura UTM com prioridade máxima');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Interceptar logs do console
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[PRIORIDADE MÁXIMA]') || text.includes('UTM')) {
        console.log(`[BROWSER] ${text}`);
      }
    });
    
    // Acessar a página com parâmetros UTM
    const testUrl = 'http://localhost:3000?utm_source=facebook&utm_campaign=teste_prioridade&utm_medium=cpc&utm_content=teste_conteudo&utm_term=teste_termo';
    console.log('🚨 [PRIORIDADE MÁXIMA] Acessando:', testUrl);
    
    await page.goto(testUrl, { waitUntil: 'networkidle0' });
    
    // Aguardar carregamento dos scripts
    await page.waitForTimeout(3000);
    
    // Verificar se os parâmetros UTM foram capturados
    const utmParams = await page.evaluate(() => {
      return {
        window_utm_params: window.utm_params,
        _UTM_PARAMS_PRIORITY: window._UTM_PARAMS_PRIORITY,
        sessionStorage_priority: sessionStorage.getItem('utm_params_priority'),
        localStorage_priority: localStorage.getItem('utm_params_priority'),
        sessionStorage: sessionStorage.getItem('utm_params'),
        localStorage: localStorage.getItem('utm_params')
      };
    });
    
    console.log('🚨 [PRIORIDADE MÁXIMA] Parâmetros UTM capturados:', JSON.stringify(utmParams, null, 2));
    
    // Verificar se os parâmetros são válidos
    const isValid = utmParams.window_utm_params && 
                   utmParams.window_utm_params.utm_source && 
                   utmParams.window_utm_params.utm_source !== 'organic';
    
    if (isValid) {
      console.log('✅ [PRIORIDADE MÁXIMA] Parâmetros UTM capturados com sucesso!');
    } else {
      console.error('❌ [PRIORIDADE MÁXIMA] Falha na captura dos parâmetros UTM!');
    }
    
    // Testar clique no botão de compra
    console.log('🚨 [PRIORIDADE MÁXIMA] Testando clique no botão de compra...');
    
    // Aguardar um pouco mais para garantir que tudo carregou
    await page.waitForTimeout(2000);
    
    // Tentar encontrar e clicar no botão de compra
    try {
      const button = await page.$('button:contains("Comprar"), button:contains("Buy"), button:contains("Acheter")');
      if (button) {
        await button.click();
        console.log('✅ [PRIORIDADE MÁXIMA] Botão de compra clicado');
        
        // Aguardar redirecionamento
        await page.waitForTimeout(5000);
        
        // Verificar se foi redirecionado para Hotmart
        const currentUrl = page.url();
        console.log('🚨 [PRIORIDADE MÁXIMA] URL atual após clique:', currentUrl);
        
        if (currentUrl.includes('hotmart.com')) {
          console.log('✅ [PRIORIDADE MÁXIMA] Redirecionamento para Hotmart realizado');
          
          // Verificar se os parâmetros UTM estão na URL
          const urlParams = new URL(currentUrl);
          const utmSource = urlParams.searchParams.get('utm_source');
          const utmCampaign = urlParams.searchParams.get('utm_campaign');
          const utmMedium = urlParams.searchParams.get('utm_medium');
          
          console.log('🚨 [PRIORIDADE MÁXIMA] Parâmetros UTM na URL do Hotmart:', {
            utm_source: utmSource,
            utm_campaign: utmCampaign,
            utm_medium: utmMedium
          });
          
          if (utmSource === 'facebook' && utmCampaign === 'teste_prioridade') {
            console.log('✅ [PRIORIDADE MÁXIMA] Parâmetros UTM confirmados na URL do Hotmart!');
          } else {
            console.error('❌ [PRIORIDADE MÁXIMA] Parâmetros UTM não estão na URL do Hotmart!');
          }
        } else {
          console.log('⚠️ [PRIORIDADE MÁXIMA] Não foi redirecionado para Hotmart');
        }
      } else {
        console.log('⚠️ [PRIORIDADE MÁXIMA] Botão de compra não encontrado');
      }
    } catch (error) {
      console.error('❌ [PRIORIDADE MÁXIMA] Erro ao clicar no botão:', error.message);
    }
    
  } catch (error) {
    console.error('❌ [PRIORIDADE MÁXIMA] Erro no teste:', error);
  } finally {
    await browser.close();
  }
}

// Executar o teste
testUtmPriority().catch(console.error); 