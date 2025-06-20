import express from 'express';
import { createUserSession } from '../models/user-session.model';
import { GeolocationService, getGeolocation, UserLocation } from '../services/geolocation.service';
import axios from 'axios';
import crypto from 'crypto';

const router = express.Router();

// Middleware para capturar IP do usuário
const getClientIP = (req: express.Request): string => {
  console.log('[IP Debug] Headers:', {
    'x-forwarded-for': req.headers['x-forwarded-for'],
    'x-real-ip': req.headers['x-real-ip'],
    'x-client-ip': req.headers['x-client-ip'],
    'cf-connecting-ip': req.headers['cf-connecting-ip'],
    'true-client-ip': req.headers['true-client-ip']
  });
  
  console.log('[IP Debug] Express IP:', req.ip);
  console.log('[IP Debug] Socket remoteAddress:', req.socket.remoteAddress);
  console.log('[IP Debug] Connection remoteAddress:', req.connection?.remoteAddress);
  
  // Priorizar headers de proxy/CDN
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string') {
    // Pegar o primeiro IP da lista (cliente original)
    const ip = forwardedFor.split(',')[0].trim();
    if (ip && ip !== 'unknown') {
      console.log('[IP Debug] Using x-forwarded-for:', ip);
      return ip;
    }
  }
  
  // Cloudflare
  if (req.headers['cf-connecting-ip']) {
    const ip = req.headers['cf-connecting-ip'] as string;
    if (ip && ip !== 'unknown') {
      console.log('[IP Debug] Using cf-connecting-ip:', ip);
      return ip;
    }
  }
  
  // Outros headers comuns
  const otherHeaders = ['x-real-ip', 'x-client-ip', 'true-client-ip'];
  for (const header of otherHeaders) {
    const value = req.headers[header];
    if (value && typeof value === 'string' && value !== 'unknown') {
      console.log(`[IP Debug] Using ${header}:`, value);
      return value;
    }
  }
  
  // Express IP
  if (req.ip && req.ip !== 'unknown') {
    console.log('[IP Debug] Using req.ip:', req.ip);
    return req.ip;
  }
  
  // Socket remote address
  if (req.socket.remoteAddress && req.socket.remoteAddress !== 'unknown') {
    console.log('[IP Debug] Using socket.remoteAddress:', req.socket.remoteAddress);
    return req.socket.remoteAddress;
  }
  
  // Connection remote address
  if (req.connection?.remoteAddress && req.connection.remoteAddress !== 'unknown') {
    console.log('[IP Debug] Using connection.remoteAddress:', req.connection.remoteAddress);
    return req.connection.remoteAddress;
  }
  
  console.log('[IP Debug] Using fallback: 127.0.0.1');
  return '127.0.0.1';
};

// Middleware de logging
const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`[Quiz] ${req.method} ${req.originalUrl}`);
  next();
};

router.use(logRequest);

/**
 * Normaliza um valor de acordo com as regras do Facebook antes do hashing.
 * @param value O valor a ser normalizado.
 * @param type O tipo de dado (ex: 'ct', 'st', 'em').
 * @returns O valor normalizado.
 */
function normalize(value: string | undefined, type: string): string {
  if (typeof value !== 'string' || !value) {
    return '';
  }

  // Passo 1: Normalização base (minúsculas, sem acentos e espaços extras)
  const baseNormalized = value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  switch (type) {
    case 'em':
      return baseNormalized;
    
    case 'ph':
      return baseNormalized.replace(/[^0-9]/g, '');
    
    case 'ct': // Cidade (remove tudo que não for letra)
      return baseNormalized.replace(/[^a-z]/g, '');
    
    case 'st': // Estado (mapeia para sigla de 2 letras)
      const stateMapping: { [key: string]: string } = {
        // Estados brasileiros completos
        'acre': 'ac', 'alagoas': 'al', 'amapa': 'ap', 'amazonas': 'am',
        'bahia': 'ba', 'ceara': 'ce', 'distrito federal': 'df', 'espirito santo': 'es',
        'goias': 'go', 'maranhao': 'ma', 'mato grosso': 'mt', 'mato grosso do sul': 'ms',
        'minas gerais': 'mg', 'para': 'pa', 'paraiba': 'pb', 'parana': 'pr',
        'pernambuco': 'pe', 'piaui': 'pi', 'rio de janeiro': 'rj', 'rio grande do norte': 'rn',
        'rio grande do sul': 'rs', 'rondonia': 'ro', 'roraima': 'rr', 'santa catarina': 'sc',
        'sao paulo': 'sp', 'sergipe': 'se', 'tocantins': 'to',
        // Siglas já existentes
        'ac': 'ac', 'al': 'al', 'ap': 'ap', 'am': 'am', 'ba': 'ba', 'ce': 'ce', 'df': 'df',
        'es': 'es', 'go': 'go', 'ma': 'ma', 'mt': 'mt', 'ms': 'ms', 'mg': 'mg', 'pa': 'pa',
        'pb': 'pb', 'pr': 'pr', 'pe': 'pe', 'pi': 'pi', 'rj': 'rj', 'rn': 'rn', 'rs': 'rs',
        'ro': 'ro', 'rr': 'rr', 'sc': 'sc', 'sp': 'sp', 'se': 'se', 'to': 'to'
      };
      return stateMapping[baseNormalized] || ''; // Retorna '' se não encontrar
    
    case 'zp': // CEP (pega apenas os 5 primeiros dígitos)
      return baseNormalized.replace(/[^0-9]/g, '').slice(0, 5);
    
    case 'country': // País (mapeia para código de 2 letras)
      const countryMapping: { [key: string]: string } = {
        'brasil': 'br',
        'brazil': 'br',
        'br': 'br'
      };
      return countryMapping[baseNormalized] || ''; // Retorna '' se não encontrar

    // Para external_id e outros, apenas a normalização base é suficiente
    default:
      return baseNormalized;
  }
}

/**
 * Processa dados de geolocalização da API e aplica normalização específica do Facebook
 * @param locationData Dados brutos da API de geolocalização
 * @returns Objeto com dados normalizados prontos para hash
 */
function processGeolocationData(locationData: any): {
  city: string;
  state: string;
  country: string;
  zipCode: string;
} {
  console.log('🌍 [GEO PROCESSING] Dados brutos da API:', locationData);
  
  // Mapear campos da API para nossos campos
  const rawCity = locationData.city || '';
  const rawState = locationData.region || locationData.state || '';
  const rawCountry = locationData.country || '';
  const rawZipCode = locationData.postal || locationData.zipCode || '';
  
  // Aplicar normalização específica do Facebook
  const normalizedCity = normalize(rawCity, 'ct');
  const normalizedState = normalize(rawState, 'st');
  const normalizedCountry = normalize(rawCountry, 'country');
  const normalizedZipCode = normalize(rawZipCode, 'zp');
  
  console.log('🌍 [GEO PROCESSING] Normalização aplicada:');
  console.log(`  Cidade: "${rawCity}" -> "${normalizedCity}"`);
  console.log(`  Estado: "${rawState}" -> "${normalizedState}"`);
  console.log(`  País: "${rawCountry}" -> "${normalizedCountry}"`);
  console.log(`  CEP: "${rawZipCode}" -> "${normalizedZipCode}"`);
  
  return {
    city: normalizedCity,
    state: normalizedState,
    country: normalizedCountry,
    zipCode: normalizedZipCode
  };
}


/**
 * Gera um hash SHA256 para um valor, aplicando a normalização específica do Facebook.
 * @param value O valor a ser hasheado.
 * @param type O tipo de dado, para aplicar a normalização correta.
 */
function sha256(value: string | undefined, type: string): string | undefined {
  if (!value) return undefined;

  // 1. Normalização baseada no tipo de dado, feita pela função normalize
  const normalizedValue = normalize(value, type);
  
  if (normalizedValue === '') return undefined;

  // 2. Geração do Hash
  try {
    const hash = crypto.createHash('sha256').update(normalizedValue).digest('hex');
    console.log(`[SHA256-${type.toUpperCase()}] Original: "${value}" -> Normalized: "${normalizedValue}" -> Hash: ${hash}`);
    return hash;
  } catch (error) {
    console.error(`[SHA256-ERROR] Falha ao gerar hash para o valor "${value}" (normalizado: "${normalizedValue}")`, error);
    return undefined;
  }
}


// Iniciar quiz - captura IP e gera UUID
router.post('/start', async (req, res) => {
  try {
    console.log('[Quiz] Iniciando nova sessão...');
    const ip = getClientIP(req);
    console.log('[Quiz] IP do cliente:', ip);

    const session = createUserSession(ip);
    console.log('[Quiz] Sessão criada com UUID:', session.id);
    
    // Obter localização do IP
    const location = await getGeolocation(ip);
    
    if (location) {
      session.location = location;
      console.log('[Quiz] Localização obtida:', location);
    } else {
      console.warn('[Quiz] Não foi possível obter localização para o IP:', ip);
    }

    // Aqui você pode salvar a sessão em um banco de dados
    // Por enquanto, vamos apenas retornar os dados
    res.json({
      success: true,
      sessionId: session.id,
      location: session.location || null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Quiz] Erro ao iniciar quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao iniciar quiz',
      timestamp: new Date().toISOString()
    });
  }
});

// Atualizar progresso do quiz
router.post('/progress/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { step, answer } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: 'ID da sessão não fornecido'
    });
  }

  if (typeof step !== 'number' || step < 0) {
    return res.status(400).json({
      success: false,
      error: 'Step inválido'
    });
  }

  // Aqui você atualizaria o progresso no banco de dados
  res.json({
    success: true,
    message: 'Progresso atualizado',
    sessionId,
    step,
    timestamp: new Date().toISOString()
  });
});

// Finalizar quiz
router.post('/complete/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: 'ID da sessão não fornecido'
    });
  }

  // Aqui você marcaria o quiz como completo no banco de dados
  res.json({
    success: true,
    message: 'Quiz completado',
    sessionId,
    timestamp: new Date().toISOString()
  });
});

// Rota para receber eventos de pixel do frontend (ex: início do quiz)
router.post('/event', async (req, res) => {
  try {
    const {
      event, // Nome do evento (ex: StartQuiz)
      external_id,
      fbp,
      fbc,
      user_agent,
      geolocation, // Objeto com dados de geolocalização vindos do corpo da requisição
      test_event_code // Adicionado para testes
    } = req.body;

    console.log('[CAPI Event] 📥 Payload recebido:', JSON.stringify(req.body, null, 2));

    // Define a localização a ser usada: prioriza o que vem do corpo da requisição,
    // caso contrário, tenta obter pelo IP como um fallback.
    const ip = getClientIP(req);
    const locationData = geolocation || await getGeolocation(ip);

    // LOGS DETALHADOS PARA MONITORAMENTO DO EXTERNAL ID
    console.log('🔍 [EXTERNAL ID DEBUG] ==========================================');
    console.log('🔍 [EXTERNAL ID DEBUG] Headers da requisição:', req.headers);
    console.log('🔍 [EXTERNAL ID DEBUG] Body completo da requisição:', req.body);
    console.log('🔍 [EXTERNAL ID DEBUG] External ID recebido (raw):', external_id);
    console.log('🔍 [EXTERNAL ID DEBUG] Tipo do external_id:', typeof external_id);
    console.log('🔍 [EXTERNAL ID DEBUG] External ID é string?', typeof external_id === 'string');
    console.log('🔍 [EXTERNAL ID DEBUG] External ID tem valor?', !!external_id);
    console.log('🔍 [EXTERNAL ID DEBUG] External ID length:', external_id ? external_id.length : 'N/A');
    console.log('🔍 [EXTERNAL ID DEBUG] ==========================================');

    console.log('[CAPI] Evento recebido:', { event, external_id, fbp, fbc, user_agent });

    // Pega IP do usuário usando a função melhorada
    console.log('[CAPI] IP capturado:', ip);

    // Obter localização real do IP
    const location = await getGeolocation(ip);
    console.log('[CAPI] Localização obtida:', location);

    // Processar dados de geolocalização com normalização do Facebook
    const processedLocation = processGeolocationData(locationData);

    // LOG DO PROCESSAMENTO DO EXTERNAL ID
    const externalIdHash = external_id ? sha256(external_id, 'external_id') : undefined;
    console.log('🔍 [EXTERNAL ID DEBUG] External ID após hash SHA256:', externalIdHash);
    console.log('🔍 [EXTERNAL ID DEBUG] Hash length:', externalIdHash ? externalIdHash.length : 'N/A');

    // Monta o payload para o Facebook CAPI
    const payload = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: req.headers.origin, // Adiciona a URL de origem
      user_data: {
        client_ip_address: ip,
        client_user_agent: user_agent,
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        external_id: externalIdHash,
        
        // Dados de geolocalização normalizados e hasheados, conforme a documentação da CAPI.
        ct: sha256(processedLocation.city, 'ct'),
        st: sha256(processedLocation.state, 'st'),
        zp: sha256(processedLocation.zipCode, 'zp'),
        country: sha256(processedLocation.country, 'country'),
      },
      custom_data: {
        source: 'server',
      }
    };

    // Exibir o payload no console
    console.log('[CAPI] Payload enviado para o Facebook:', JSON.stringify(payload, null, 2));

    // Verificar se as variáveis de ambiente estão configuradas
    const accessToken = process.env.FB_CAPI_TOKEN;
    const pixelId = process.env.FB_PIXEL_ID;
    
    if (!accessToken || !pixelId) {
      console.error('[CAPI] Variáveis de ambiente não configuradas:', {
        hasAccessToken: !!accessToken,
        hasPixelId: !!pixelId
      });
      return res.status(500).json({ 
        success: false, 
        error: 'Configuração do Facebook CAPI incompleta' 
      });
    }

    const fbUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
    console.log('[CAPI] URL do Facebook:', fbUrl);

    try {
      const fbResponse = await axios.post(fbUrl, {
        data: [payload],
        test_event_code: test_event_code || undefined // Envia o código de teste
      });
      console.log('[CAPI] ✅ Resposta do Facebook:', fbResponse.data);
      
      // LOG FINAL DO EXTERNAL ID
      console.log('🔍 [EXTERNAL ID DEBUG] ==========================================');
      console.log('🔍 [EXTERNAL ID DEBUG] ✅ Evento enviado com sucesso para o Facebook');
      console.log('🔍 [EXTERNAL ID DEBUG] External ID original:', external_id);
      console.log('🔍 [EXTERNAL ID DEBUG] External ID hash enviado:', externalIdHash);
      console.log('🔍 [EXTERNAL ID DEBUG] ==========================================');
      
      res.json({ success: true, payload, fbResponse: fbResponse.data });
    } catch (fbError: any) {
      console.error('[CAPI] ❌ Erro ao enviar para o Facebook:', fbError.response?.data || fbError.message);
      res.status(500).json({ 
        success: false, 
        error: 'Erro ao enviar evento para o Facebook CAPI', 
        details: fbError.response?.data || fbError.message 
      });
    }
  } catch (error) {
    console.error('[CAPI] ❌ Erro ao preparar evento:', error);
    res.status(500).json({ success: false, error: 'Erro ao preparar evento para o Facebook CAPI' });
  }
});

// Endpoint para capturar dados completos do usuário (para n8n - evento de compra)
router.post('/user-data/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { 
      email, 
      name, 
      phone, 
      event = 'Purchase',
      test_event_code // Adicionado para testes
    } = req.body;

    // LOGS DETALHADOS PARA MONITORAMENTO DO EXTERNAL ID (EMAIL)
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] ==========================================');
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Session ID:', sessionId);
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Email recebido (raw):', email);
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Tipo do email:', typeof email);
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Email é string?', typeof email === 'string');
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Email tem valor?', !!email);
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Email length:', email ? email.length : 'N/A');
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] ==========================================');

    console.log('[User Data] Dados recebidos:', { sessionId, email, name, phone, event });

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'ID da sessão não fornecido'
      });
    }

    // Pega IP do usuário
    const ip = getClientIP(req);
    console.log('[User Data] IP capturado:', ip);

    // Obter localização real do IP
    const location = await getGeolocation(ip);
    console.log('[User Data] Localização obtida:', location);

    // Processar dados de geolocalização com normalização do Facebook
    const processedLocation = processGeolocationData(location);

    // LOG DO PROCESSAMENTO DO EXTERNAL ID (EMAIL)
    const emailHash = email ? sha256(email, 'email') : undefined;
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Email após hash SHA256:', emailHash);
    console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Hash length:', emailHash ? emailHash.length : 'N/A');

    // PREPARAÇÃO DO PAYLOAD PARA O FACEBOOK
    const payload = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: req.headers.origin, // Adiciona a URL de origem
      user_data: {
        client_ip_address: ip,
        client_user_agent: req.headers['user-agent'],
        external_id: sha256(sessionId, 'external_id'), // Usa o sessionId como external_id
        em: sha256(email, 'em'),
        ph: sha256(phone, 'ph'),
        // Dados de geolocalização normalizados
        ct: sha256(processedLocation.city, 'ct'),
        st: sha256(processedLocation.state, 'st'),
        zp: sha256(processedLocation.zipCode, 'zp'),
        country: sha256(processedLocation.country, 'country'),
        // fn: sha256(name, 'fn'), // Hashing de nome não é comum, mas possível
      },
      custom_data: {
        value: 19.90, // Exemplo de valor da compra
        currency: 'BRL',
        source: 'server-user-data',
      }
    };

    console.log('[User Data] 📊 Payload para o Facebook:', JSON.stringify(payload, null, 2));

    // Verificar se as variáveis de ambiente estão configuradas
    const accessToken = process.env.FB_CAPI_TOKEN;
    const pixelId = process.env.FB_PIXEL_ID;
    
    if (!accessToken || !pixelId) {
      console.error('[User Data] Variáveis de ambiente não configuradas');
      return res.status(500).json({ 
        success: false, 
        error: 'Configuração do Facebook CAPI incompleta' 
      });
    }

    const fbUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

    try {
      const fbResponse = await axios.post(fbUrl, {
        data: [payload],
        test_event_code: test_event_code || undefined // Envia o código de teste
      });
      console.log('[User Data] ✅ Evento de compra enviado para o Facebook:', fbResponse.data);
      
      // LOG FINAL DO EXTERNAL ID (EMAIL)
      console.log('🔍 [USER DATA EXTERNAL ID DEBUG] ==========================================');
      console.log('🔍 [USER DATA EXTERNAL ID DEBUG] ✅ Evento de compra enviado com sucesso para o Facebook');
      console.log('🔍 [USER DATA EXTERNAL ID DEBUG] Email original:', email);
      console.log('🔍 [USER DATA EXTERNAL ID DEBUG] External ID hash enviado:', emailHash);
      console.log('🔍 [USER DATA EXTERNAL ID DEBUG] ==========================================');
      
      // Retorna dados completos para o n8n
      res.json({ 
        success: true, 
        sessionId,
        userData: {
          email,
          name,
          phone,
          ip,
          location,
          timestamp: new Date().toISOString()
        },
        facebookEvent: {
          event_name: event,
          user_data: payload.user_data,
          custom_data: payload.custom_data,
          response: fbResponse.data
        }
      });
    } catch (fbError: any) {
      console.error('[User Data] ❌ Erro ao enviar evento de compra:', fbError.response?.data || fbError.message);
      res.status(500).json({ 
        success: false, 
        error: 'Erro ao enviar evento de compra para o Facebook CAPI', 
        details: fbError.response?.data || fbError.message 
      });
    }
  } catch (error) {
    console.error('[User Data] ❌ Erro ao processar dados do usuário:', error);
    res.status(500).json({ success: false, error: 'Erro ao processar dados do usuário' });
  }
});

// Endpoint de teste para geolocalização
router.get('/test-geolocation', async (req, res) => {
  try {
    const ip = getClientIP(req);
    console.log('[Test] Testando geolocalização para IP:', ip);
    
    const location = await getGeolocation(ip);
    
    // Processar dados de geolocalização com normalização do Facebook
    const processedLocation = processGeolocationData(location);
    
    res.json({
      success: true,
      ip,
      location: {
        raw: location,
        processed: processedLocation
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Test] Erro ao testar geolocalização:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao testar geolocalização',
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint de teste para verificar processamento do external ID
router.post('/test-external-id', async (req, res) => {
  try {
    const { external_id, email } = req.body;
    
    console.log('🧪 [TEST EXTERNAL ID] ==========================================');
    console.log('🧪 [TEST EXTERNAL ID] Testando processamento do external ID');
    console.log('🧪 [TEST EXTERNAL ID] External ID recebido:', external_id);
    console.log('🧪 [TEST EXTERNAL ID] Email recebido:', email);
    console.log('🧪 [TEST EXTERNAL ID] Tipo external_id:', typeof external_id);
    console.log('🧪 [TEST EXTERNAL ID] Tipo email:', typeof email);
    
    // Testar hash do external_id
    const externalIdHash = external_id ? sha256(external_id, 'uuid') : undefined;
    console.log('🧪 [TEST EXTERNAL ID] External ID hash:', externalIdHash);
    
    // Testar hash do email
    const emailHash = email ? sha256(email, 'email') : undefined;
    console.log('🧪 [TEST EXTERNAL ID] Email hash:', emailHash);
    
    // Simular payload do Facebook CAPI
    const testPayload = {
      event_name: 'TestEvent',
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        external_id: externalIdHash,
        em: emailHash,
        client_ip_address: getClientIP(req),
        client_user_agent: req.headers['user-agent'] || ''
      }
    };
    
    console.log('🧪 [TEST EXTERNAL ID] Payload de teste:', JSON.stringify(testPayload, null, 2));
    console.log('🧪 [TEST EXTERNAL ID] ==========================================');
    
    res.json({
      success: true,
      original: {
        external_id,
        email
      },
      hashed: {
        external_id: externalIdHash,
        email: emailHash
      },
      payload: testPayload,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Test] Erro ao testar external ID:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao testar external ID',
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint de teste para demonstrar normalização de geolocalização
router.post('/test-geolocation-normalization', async (req, res) => {
  try {
    const { 
      city = 'Poá', 
      state = 'São Paulo', 
      country = 'BR', 
      zipCode = '08550-000' 
    } = req.body;
    
    console.log('🧪 [TEST GEO NORMALIZATION] ==========================================');
    console.log('🧪 [TEST GEO NORMALIZATION] Testando normalização de geolocalização');
    console.log('🧪 [TEST GEO NORMALIZATION] Dados de entrada:', { city, state, country, zipCode });
    
    // Simular dados da API
    const mockApiData = {
      city,
      region: state,
      country,
      postal: zipCode
    };
    
    // Processar com normalização
    const processed = processGeolocationData(mockApiData);
    
    // Gerar hashes
    const hashes = {
      ct: sha256(processed.city, 'ct'),
      st: sha256(processed.state, 'st'),
      zp: sha256(processed.zipCode, 'zp'),
      country: sha256(processed.country, 'country')
    };
    
    console.log('🧪 [TEST GEO NORMALIZATION] Resultados:');
    console.log('🧪 [TEST GEO NORMALIZATION] Dados processados:', processed);
    console.log('🧪 [TEST GEO NORMALIZATION] Hashes gerados:', hashes);
    console.log('🧪 [TEST GEO NORMALIZATION] ==========================================');
    
    res.json({
      success: true,
      input: {
        city,
        state,
        country,
        zipCode
      },
      processed: processed,
      hashes: hashes,
      facebook_ready: {
        ct: hashes.ct,
        st: hashes.st,
        zp: hashes.zp,
        country: hashes.country
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Test] Erro ao testar normalização de geolocalização:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao testar normalização de geolocalização',
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint específico para testar com Meta Pixel Helper
router.post('/meta-pixel-test', async (req, res) => {
  try {
    const {
      event = 'TestEvent',
      external_id,
      fbp,
      fbc,
      user_agent,
      test_event_code
    } = req.body;

    console.log('🔍 [META PIXEL TEST] ==========================================');
    console.log('🔍 [META PIXEL TEST] Testando com Meta Pixel Helper');
    console.log('🔍 [META PIXEL TEST] Dados recebidos:', req.body);

    // Pega IP do usuário
    const ip = getClientIP(req);
    console.log('🔍 [META PIXEL TEST] IP capturado:', ip);

    // Obter localização real do IP
    const location = await getGeolocation(ip);
    console.log('🔍 [META PIXEL TEST] Localização bruta da API:', location);

    // Processar dados de geolocalização com normalização do Facebook
    const processedLocation = processGeolocationData(location);
    console.log('🔍 [META PIXEL TEST] Localização processada:', processedLocation);

    // Gerar hashes
    const externalIdHash = external_id ? sha256(external_id, 'external_id') : undefined;
    const cityHash = sha256(processedLocation.city, 'ct');
    const stateHash = sha256(processedLocation.state, 'st');
    const zipHash = sha256(processedLocation.zipCode, 'zp');
    const countryHash = sha256(processedLocation.country, 'country');

    // Monta o payload para o Facebook CAPI
    const payload = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: req.headers.origin || 'https://example.com',
      user_data: {
        client_ip_address: ip,
        client_user_agent: user_agent || req.headers['user-agent'],
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        external_id: externalIdHash,
        
        // Dados de geolocalização normalizados e hasheados
        ct: cityHash,
        st: stateHash,
        zp: zipHash,
        country: countryHash,
      },
      custom_data: {
        source: 'meta-pixel-test',
        test_mode: true,
      }
    };

    console.log('🔍 [META PIXEL TEST] Payload completo:', JSON.stringify(payload, null, 2));
    console.log('🔍 [META PIXEL TEST] ==========================================');

    // Verificar se as variáveis de ambiente estão configuradas
    const accessToken = process.env.FB_CAPI_TOKEN;
    const pixelId = process.env.FB_PIXEL_ID;
    
    if (!accessToken || !pixelId) {
      console.error('[META PIXEL TEST] Variáveis de ambiente não configuradas');
      return res.status(500).json({ 
        success: false, 
        error: 'Configuração do Facebook CAPI incompleta',
        message: 'Configure FB_CAPI_TOKEN e FB_PIXEL_ID no .env'
      });
    }

    const fbUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

    try {
      const fbResponse = await axios.post(fbUrl, {
        data: [payload],
        test_event_code: test_event_code || undefined
      });
      
      console.log('🔍 [META PIXEL TEST] ✅ Resposta do Facebook:', fbResponse.data);
      
      // Retorna dados detalhados para análise no Meta Pixel Helper
      res.json({ 
        success: true, 
        message: 'Evento enviado com sucesso para o Facebook CAPI',
        meta_pixel_helper_info: {
          event_name: event,
          pixel_id: pixelId,
          test_mode: !!test_event_code,
          user_data_breakdown: {
            external_id: {
              original: external_id,
              normalized: external_id ? normalize(external_id, 'external_id') : 'N/A',
              hash: externalIdHash
            },
            geolocation: {
              city: {
                original: location.city,
                normalized: processedLocation.city,
                hash: cityHash
              },
              state: {
                original: (location as any).region || location.state,
                normalized: processedLocation.state,
                hash: stateHash
              },
              zip: {
                original: (location as any).postal || location.zipCode,
                normalized: processedLocation.zipCode,
                hash: zipHash
              },
              country: {
                original: location.country,
                normalized: processedLocation.country,
                hash: countryHash
              }
            },
            ip_address: ip,
            user_agent: user_agent || req.headers['user-agent']
          },
          facebook_response: fbResponse.data,
          payload_sent: payload
        }
      });
    } catch (fbError: any) {
      console.error('[META PIXEL TEST] ❌ Erro ao enviar para o Facebook:', fbError.response?.data || fbError.message);
      res.status(500).json({ 
        success: false, 
        error: 'Erro ao enviar evento para o Facebook CAPI', 
        details: fbError.response?.data || fbError.message,
        payload_attempted: payload
      });
    }
  } catch (error) {
    console.error('[META PIXEL TEST] ❌ Erro geral:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Endpoint para simular dados específicos do Brasil para teste
router.post('/test-brazil-geolocation', async (req, res) => {
  try {
    const { 
      city = 'Poá', 
      state = 'São Paulo', 
      country = 'BR', 
      zipCode = '08550-000',
      event = 'TestBrazilEvent'
    } = req.body;

    console.log('🇧🇷 [TEST BRAZIL] ==========================================');
    console.log('🇧🇷 [TEST BRAZIL] Testando dados brasileiros específicos');
    console.log('🇧🇷 [TEST BRAZIL] Dados de entrada:', { city, state, country, zipCode });

    // Simular dados da API
    const mockApiData = {
      city,
      region: state,
      country,
      postal: zipCode
    };

    // Processar com normalização
    const processed = processGeolocationData(mockApiData);

    // Gerar hashes
    const hashes = {
      ct: sha256(processed.city, 'ct'),
      st: sha256(processed.state, 'st'),
      zp: sha256(processed.zipCode, 'zp'),
      country: sha256(processed.country, 'country')
    };

    // Simular payload do Facebook
    const payload = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: 'https://example.com',
      user_data: {
        client_ip_address: '2804:7f0:91c1:b231:a1a0:f1e4:cd14:e1dd',
        client_user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        external_id: sha256('test-external-id', 'external_id'),
        ct: hashes.ct,
        st: hashes.st,
        zp: hashes.zp,
        country: hashes.country
      },
      custom_data: {
        source: 'brazil-test',
        value: 19.90,
        currency: 'BRL'
      }
    };

    console.log('🇧🇷 [TEST BRAZIL] Payload para Meta Pixel Helper:');
    console.log(JSON.stringify(payload, null, 2));
    console.log('🇧🇷 [TEST BRAZIL] ==========================================');

    res.json({
      success: true,
      message: 'Dados brasileiros processados para Meta Pixel Helper',
      input: { city, state, country, zipCode },
      processed: processed,
      hashes: hashes,
      meta_pixel_payload: payload,
      facebook_ready: {
        ct: hashes.ct,
        st: hashes.st,
        zp: hashes.zp,
        country: hashes.country
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[TEST BRAZIL] Erro:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao testar dados brasileiros',
      timestamp: new Date().toISOString()
    });
  }
});

export default router; 