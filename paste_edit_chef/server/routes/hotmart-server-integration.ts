import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import { GeolocationService, getGeolocation } from '../services/geolocation.service';

const router = express.Router();

// Simular banco de dados local (em produção, use um banco real)
const clientDataStore = new Map();
const transactionStore = new Map();

// Função para gerar hash SHA-256
function sha256(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

// Rota para capturar e armazenar dados do cliente
router.post('/capture-client-data', async (req, res) => {
  try {
    const {
      clientIP,
      userAgent,
      utmSource,
      utmCampaign,
      utmMedium,
      utmContent,
      utmTerm,
      fbc, // Facebook Click ID
      fbp  // Facebook Browser ID
    } = req.body;

    console.log('🔍 [UTMIFY ONLY] Servidor - Dados recebidos do cliente:', {
      clientIP,
      userAgent: userAgent ? 'presente' : 'ausente',
      utmSource,
      utmCampaign,
      utmMedium,
      utmContent,
      utmTerm,
      fbc: fbc ? 'presente' : 'ausente',
      fbp: fbp ? 'presente' : 'ausente'
    });

    // Verificar se os parâmetros UTM da Utmify são válidos
    if (!utmSource || utmSource === 'organic') {
      console.log('🔍 [UTMIFY ONLY] Servidor - Parâmetros UTM da Utmify são organic ou vazios:', {
        utmSource,
        utmCampaign,
        utmMedium,
        utmContent,
        utmTerm
      });
    }

    // Gerar external_id único (será usado pela Hotmart)
    const externalId = `ext_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Obter dados de geolocalização (prioridade IPv6)
    const geoData = await getGeolocation(clientIP);

    // Preparar dados do cliente
    const clientData = {
      externalId,
      timestamp: new Date().toISOString(),
      ip: clientIP,
      userAgent,
      geolocation: geoData,
      utm: {
        source: utmSource,
        campaign: utmCampaign,
        medium: utmMedium,
        content: utmContent,
        term: utmTerm
      },
      facebook: {
        fbc,
        fbp
      }
    };

    // Armazenar no banco local usando externalId como chave
    clientDataStore.set(externalId, clientData);

    // Gerar hashes dos dados de geolocalização
    const hashedData = {
      ct: sha256(geoData?.city),
      st: sha256(geoData?.state),
      zp: sha256(geoData?.zipCode),
      country: sha256(geoData?.country)
    };

    // Construir URL com TODOS os dados via query string
    const urlParams = new URLSearchParams();
    
    // Parâmetros UTM - APENAS da Utmify
    if (utmSource && utmSource !== 'organic') {
      urlParams.append('utm_source', utmSource);
      console.log('✅ [UTMIFY ONLY] Servidor - Adicionado utm_source da Utmify:', utmSource);
    } else {
      console.log('🔍 [UTMIFY ONLY] Servidor - utm_source da Utmify é organic ou vazio');
    }
    
    if (utmCampaign && utmCampaign.trim() !== '') {
      urlParams.append('utm_campaign', utmCampaign);
      console.log('✅ [UTMIFY ONLY] Servidor - Adicionado utm_campaign da Utmify:', utmCampaign);
    }
    
    if (utmMedium && utmMedium.trim() !== '') {
      urlParams.append('utm_medium', utmMedium);
      console.log('✅ [UTMIFY ONLY] Servidor - Adicionado utm_medium da Utmify:', utmMedium);
    }
    
    if (utmContent && utmContent.trim() !== '') {
      urlParams.append('utm_content', utmContent);
      console.log('✅ [UTMIFY ONLY] Servidor - Adicionado utm_content da Utmify:', utmContent);
    }
    
    if (utmTerm && utmTerm.trim() !== '') {
      urlParams.append('utm_term', utmTerm);
      console.log('✅ [UTMIFY ONLY] Servidor - Adicionado utm_term da Utmify:', utmTerm);
    }
    
    // Dados do cliente via query string
    urlParams.append('external_id', externalId);
    urlParams.append('client_ip', clientIP);
    urlParams.append('user_agent', encodeURIComponent(userAgent));
    
    // Hashes de geolocalização
    if (hashedData.ct) urlParams.append('ct', hashedData.ct);
    if (hashedData.st) urlParams.append('st', hashedData.st);
    if (hashedData.zp) urlParams.append('zp', hashedData.zp);
    if (hashedData.country) urlParams.append('country', hashedData.country);
    
    // Facebook tracking
    if (fbc) urlParams.append('fbc', fbc);
    if (fbp) urlParams.append('fbp', fbp);
    
    // Timestamp
    const timestamp = new Date().toISOString();
    urlParams.append('timestamp', timestamp);

    const hotmartUrl = `https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10&${urlParams.toString()}`;

    // Verificação final se os parâmetros UTM da Utmify estão na URL final
    const finalUrlObj = new URL(hotmartUrl);
    const finalUtmSource = finalUrlObj.searchParams.get('utm_source');
    const finalUtmCampaign = finalUrlObj.searchParams.get('utm_campaign');
    const finalUtmMedium = finalUrlObj.searchParams.get('utm_medium');
    
    console.log('🔍 [UTMIFY ONLY] Servidor - Verificação final UTM da Utmify na URL:', {
      utm_source: finalUtmSource,
      utm_campaign: finalUtmCampaign,
      utm_medium: finalUtmMedium,
      urlContainsUtm: finalUtmSource !== null || finalUtmCampaign !== null || finalUtmMedium !== null,
      queryString: urlParams.toString(),
      originalUtmParams: { utmSource, utmCampaign, utmMedium, utmContent, utmTerm }
    });

    // Log se os parâmetros UTM da Utmify não estão na URL final
    if (!finalUtmSource || finalUtmSource === 'organic') {
      console.log('🔍 [UTMIFY ONLY] Servidor - Parâmetros UTM da Utmify não estão na URL final');
      console.log('🔍 [UTMIFY ONLY] Servidor - Parâmetros originais da Utmify:', { utmSource, utmCampaign, utmMedium, utmContent, utmTerm });
      console.log('🔍 [UTMIFY ONLY] Servidor - URL final:', hotmartUrl);
    } else {
      console.log('✅ [UTMIFY ONLY] Servidor - Parâmetros UTM da Utmify confirmados na URL final!');
    }

    res.json({
      success: true,
      externalId,
      hotmartUrl,
      clientData,
      message: 'Dados do cliente capturados e URL gerada com query string'
    });
  } catch (error) {
    console.error('❌ [UTMIFY COMPATIBLE] Servidor - Erro ao capturar dados do cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para gerar URL com external_id incluído (para webhook N8N)
router.get('/generate-url-with-external-id', async (req, res) => {
  try {
    const {
      externalId,
      utm_source,
      utm_campaign,
      utm_medium,
      utm_content,
      utm_term
    } = req.query;

    if (!externalId) {
      return res.status(400).json({
        success: false,
        error: 'externalId é obrigatório'
      });
    }

    // URL base do Hotmart com a oferta específica
    const hotmartBaseUrl = process.env.HOTMART_BASE_URL || 'https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10';
    
    // Construir URL com UTM parameters + external_id
    const urlParams = new URLSearchParams();
    
    if (utm_source) urlParams.append('utm_source', utm_source as string);
    if (utm_campaign) urlParams.append('utm_campaign', utm_campaign as string);
    if (utm_medium) urlParams.append('utm_medium', utm_medium as string);
    if (utm_content) urlParams.append('utm_content', utm_content as string);
    if (utm_term) urlParams.append('utm_term', utm_term as string);
    
    // Adicionar external_id para o webhook N8N
    urlParams.append('external_id', externalId as string);
    
    // Usar & porque a URL base já tem parâmetros
    const urlWithExternalId = `${hotmartBaseUrl}&${urlParams.toString()}`;
    
    res.json({
      success: true,
      urlWithExternalId,
      externalId,
      message: 'URL gerada com external_id para webhook N8N'
    });
  } catch (error) {
    console.error('Erro ao gerar URL com external_id:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para N8N buscar dados adicionais do cliente usando external_id
router.get('/client-data/:externalId', async (req, res) => {
  try {
    const { externalId } = req.params;
    
    // Buscar dados do cliente no banco local usando external_id
    const clientData = clientDataStore.get(externalId);
    
    if (!clientData) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado'
      });
    }
    
    res.json({
      success: true,
      clientData,
      message: 'Dados do cliente encontrados'
    });
  } catch (error) {
    console.error('Erro ao buscar dados do cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para associar transação da Hotmart com external_id
router.post('/associate-transaction', async (req, res) => {
  try {
    const {
      externalId,
      hotmartTransactionId,
      transactionData
    } = req.body;

    // Buscar dados do cliente
    const clientData = clientDataStore.get(externalId);
    
    if (!clientData) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado'
      });
    }

    // Criar associação
    const association = {
      externalId,
      hotmartTransactionId,
      clientData,
      transactionData,
      associatedAt: new Date().toISOString()
    };

    // Armazenar associação
    transactionStore.set(hotmartTransactionId, association);

    res.json({
      success: true,
      message: 'Transação associada com sucesso',
      association
    });
  } catch (error) {
    console.error('Erro ao associar transação:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para consultar transação por ID da Hotmart
router.get('/transaction/:hotmartTransactionId', async (req, res) => {
  try {
    const { hotmartTransactionId } = req.params;
    
    // Buscar associação no banco local
    const association = transactionStore.get(hotmartTransactionId);
    
    if (!association) {
      return res.status(404).json({
        success: false,
        error: 'Transação não encontrada'
      });
    }
    
    res.json({
      success: true,
      association,
      message: 'Transação encontrada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao consultar transação:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para gerar URL limpa com apenas UTM parameters
router.get('/generate-clean-url', async (req, res) => {
  try {
    const {
      utm_source,
      utm_campaign,
      utm_medium,
      utm_content,
      utm_term
    } = req.query;

    // URL base do Hotmart com a oferta específica
    const hotmartBaseUrl = process.env.HOTMART_BASE_URL || 'https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10';
    
    // Construir URL com apenas UTM parameters
    const urlParams = new URLSearchParams();
    
    if (utm_source) urlParams.append('utm_source', utm_source as string);
    if (utm_campaign) urlParams.append('utm_campaign', utm_campaign as string);
    if (utm_medium) urlParams.append('utm_medium', utm_medium as string);
    if (utm_content) urlParams.append('utm_content', utm_content as string);
    if (utm_term) urlParams.append('utm_term', utm_term as string);
    
    // Usar & porque a URL base já tem parâmetros
    const cleanUrl = `${hotmartBaseUrl}&${urlParams.toString()}`;

    res.json({
      success: true,
      cleanUrl,
      message: 'URL limpa gerada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao gerar URL limpa:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar URL limpa'
    });
  }
});

// Rota para envio server-to-server (mantida para compatibilidade)
router.post('/send-to-hotmart-server', async (req, res) => {
  try {
    const {
      clientIP,
      userAgent,
      utmSource,
      utmCampaign,
      utmMedium,
      utmContent,
      utmTerm,
      eventId
    } = req.body;

    // Obter dados de geolocalização
    const geoData = await getGeolocation(clientIP);

    // Gerar hashes dos dados
    const hashedData = {
      ct: sha256(geoData?.city),
      st: sha256(geoData?.state),
      co: sha256(geoData?.country),
      zp: sha256(geoData?.zipCode)
    };

    // URL da API da Hotmart (você precisa descobrir a URL correta)
    const hotmartApiUrl = process.env.HOTMART_API_URL || 'https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10';

    // Headers para enviar para Hotmart
    const headers = {
      'X-Client-IP': clientIP,
      'X-User-Agent': userAgent,
      'X-Event-ID': eventId,
      'X-City-Hash': hashedData.ct,
      'X-State-Hash': hashedData.st,
      'X-Country-Hash': hashedData.co,
      'X-Zip-Hash': hashedData.zp,
      'X-External-ID': eventId,
      'X-UTM-Source': utmSource,
      'X-UTM-Campaign': utmCampaign,
      'X-UTM-Medium': utmMedium,
      'X-UTM-Content': utmContent,
      'X-UTM-Term': utmTerm,
      'X-Timestamp': new Date().toISOString(),
      'X-Product-ID': 'D98080625O'
    };

    // Enviar dados para Hotmart
    const response = await axios.get(hotmartApiUrl, { headers });

    res.json({
      success: true,
      message: 'Dados enviados para Hotmart via headers HTTP',
      sentHeaders: headers,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao enviar dados para Hotmart:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar dados para Hotmart'
    });
  }
});

// Rota de teste
router.get('/test-integration', (req, res) => {
  res.json({
    success: true,
    message: 'Integração Hotmart funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota de teste para simular webhook da Hotmart
router.post('/test-webhook-simulation', async (req, res) => {
  try {
    const {
      name,
      email,
      external_id,
      transaction_id,
      amount,
      status = 'completed'
    } = req.body;

    // Validar campos obrigatórios
    if (!external_id) {
      return res.status(400).json({
        success: false,
        error: 'external_id é obrigatório'
      });
    }

    // Buscar dados adicionais do cliente
    const clientData = clientDataStore.get(external_id);
    
    if (!clientData) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
        external_id
      });
    }

    // Simular payload que o N8N receberia
    const hotmartPayload = {
      name,
      email,
      external_id,
      transaction_id,
      amount,
      status,
      timestamp: new Date().toISOString()
    };

    // Payload completo que o N8N processaria
    const completePayload = {
      hotmartData: hotmartPayload,
      additionalData: clientData,
      correlation: {
        external_id,
        matched: true,
        timestamp: new Date().toISOString()
      }
    };

    // Log detalhado para validação
    console.log('=== WEBHOOK SIMULATION LOG ===');
    console.log('External ID:', external_id);
    console.log('Hotmart Payload:', JSON.stringify(hotmartPayload, null, 2));
    console.log('Client Data Found:', !!clientData);
    console.log('Complete Payload:', JSON.stringify(completePayload, null, 2));
    console.log('================================');

    res.json({
      success: true,
      message: 'Webhook simulado com sucesso',
      validation: {
        external_id_exists: !!clientData,
        payload_structure: 'valid',
        correlation_successful: true
      },
      completePayload,
      webhookUrl: 'POST https://seu-n8n.com/webhook/hotmart',
      sampleRequest: {
        method: 'POST',
        url: 'https://seu-n8n.com/webhook/hotmart',
        headers: {
          'Content-Type': 'application/json'
        },
        body: completePayload
      }
    });
  } catch (error) {
    console.error('Erro na simulação do webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para validar estrutura do payload
router.post('/validate-payload', async (req, res) => {
  try {
    const payload = req.body;
    
    // Validar estrutura do payload
    const requiredFields = ['name', 'email', 'external_id', 'transaction_id', 'amount'];
    const missingFields = requiredFields.filter(field => !payload[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios ausentes',
        missingFields,
        receivedPayload: payload
      });
    }

    // Validar tipos de dados
    const validations = {
      name: typeof payload.name === 'string' && payload.name.length > 0,
      email: typeof payload.email === 'string' && payload.email.includes('@'),
      external_id: typeof payload.external_id === 'string' && payload.external_id.startsWith('ext_'),
      transaction_id: typeof payload.transaction_id === 'string',
      amount: typeof payload.amount === 'number' && payload.amount > 0
    };

    const invalidFields = Object.entries(validations)
      .filter(([field, valid]) => !valid)
      .map(([field]) => field);

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Campos com formato inválido',
        invalidFields,
        validations,
        receivedPayload: payload
      });
    }

    // Verificar se o external_id existe no banco
    const clientData = clientDataStore.get(payload.external_id);
    
    res.json({
      success: true,
      message: 'Payload válido',
      validation: {
        structure: 'valid',
        dataTypes: 'valid',
        external_id_exists: !!clientData,
        correlation_possible: !!clientData
      },
      payload: {
        hotmartData: payload,
        additionalData: clientData || null
      }
    });
  } catch (error) {
    console.error('Erro na validação do payload:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para gerar evento Facebook CAPI
router.post('/generate-facebook-capi-event', async (req, res) => {
  try {
    const {
      external_id,
      event_name = 'Purchase', // ou 'Lead', 'AddToCart', etc.
      event_source_url,
      fbc, // Facebook Click ID
      fbp, // Facebook Browser ID
      custom_data = {}
    } = req.body;

    if (!external_id) {
      return res.status(400).json({
        success: false,
        error: 'external_id é obrigatório'
      });
    }

    // Buscar dados do cliente
    const clientData = clientDataStore.get(external_id);
    
    if (!clientData) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
        external_id
      });
    }

    // Gerar hashes dos dados de geolocalização
    const hashedData = {
      ct: sha256(clientData.geolocation?.city),
      st: sha256(clientData.geolocation?.state),
      zp: sha256(clientData.geolocation?.zipCode),
      country: sha256(clientData.geolocation?.country)
    };

    // Gerar evento Facebook CAPI
    const facebookEvent = {
      data: [
        {
          event_name: event_name,
          event_time: Math.floor(Date.now() / 1000), // Unix timestamp
          event_id: crypto.randomUUID(),
          event_source_url: event_source_url || 'https://ramiroglobal.com.br/',
          action_source: 'website',
          user_data: {
            // Dados do cliente (hasheados)
            em: clientData.email ? [sha256(clientData.email)] : undefined,
            fn: clientData.name ? [sha256(clientData.name)] : undefined,
            ph: clientData.phone ? [sha256(clientData.phone)] : undefined,
            ct: hashedData.ct ? [hashedData.ct] : undefined,
            st: hashedData.st ? [hashedData.st] : undefined,
            zp: hashedData.zp ? [hashedData.zp] : undefined,
            country: hashedData.country ? [hashedData.country] : undefined,
            client_ip_address: clientData.ip,
            client_user_agent: clientData.userAgent,
            fbc: fbc,
            fbp: fbp,
            external_id: external_id
          },
          custom_data: {
            content_name: clientData.utm?.content,
            content_category: clientData.utm?.medium,
            content_type: 'product',
            value: custom_data.value || 22.00,
            currency: custom_data.currency || 'USD',
            utm_source: clientData.utm?.source,
            utm_campaign: clientData.utm?.campaign,
            utm_medium: clientData.utm?.medium,
            utm_content: clientData.utm?.content,
            utm_term: clientData.utm?.term,
            ...custom_data
          }
        }
      ]
    };

    // Remover campos undefined
    const cleanEvent = JSON.parse(JSON.stringify(facebookEvent, (key, value) => 
      value === undefined ? undefined : value
    ));

    // Log do evento gerado
    console.log('=== FACEBOOK CAPI EVENT ===');
    console.log('External ID:', external_id);
    console.log('Event Name:', event_name);
    console.log('Event Data:', JSON.stringify(cleanEvent, null, 2));
    console.log('==========================');

    res.json({
      success: true,
      message: 'Evento Facebook CAPI gerado com sucesso',
      facebookEvent: cleanEvent,
      validation: {
        external_id_exists: true,
        event_structure: 'valid',
        hashes_generated: true
      },
      sampleRequest: {
        method: 'POST',
        url: 'https://graph.facebook.com/v18.0/YOUR_PIXEL_ID/events',
        headers: {
          'Content-Type': 'application/json'
        },
        body: cleanEvent
      }
    });
  } catch (error) {
    console.error('Erro ao gerar evento Facebook CAPI:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para enviar evento diretamente para Facebook CAPI
router.post('/send-facebook-capi-event', async (req, res) => {
  try {
    const {
      external_id,
      event_name = 'Purchase',
      event_source_url,
      fbc,
      fbp,
      custom_data = {},
      pixel_id,
      access_token
    } = req.body;

    if (!external_id || !pixel_id || !access_token) {
      return res.status(400).json({
        success: false,
        error: 'external_id, pixel_id e access_token são obrigatórios'
      });
    }

    // Primeiro gerar o evento
    const eventResponse = await fetch('http://localhost:3000/api/hotmart/generate-facebook-capi-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        external_id,
        event_name,
        event_source_url,
        fbc,
        fbp,
        custom_data
      })
    });

    const eventData = await eventResponse.json();
    
    if (!eventData.success) {
      return res.status(400).json(eventData);
    }

    // Enviar para Facebook CAPI
    const facebookResponse = await fetch(`https://graph.facebook.com/v18.0/${pixel_id}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...eventData.facebookEvent,
        access_token: access_token
      })
    });

    const facebookResult = await facebookResponse.json();

    res.json({
      success: true,
      message: 'Evento enviado para Facebook CAPI',
      facebookResponse: facebookResult,
      eventSent: eventData.facebookEvent
    });
  } catch (error) {
    console.error('Erro ao enviar evento para Facebook CAPI:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router; 