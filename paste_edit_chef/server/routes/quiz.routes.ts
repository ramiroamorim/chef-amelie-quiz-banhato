import express from 'express';
import { createUserSession } from '../models/user-session.model';
import { GeolocationService } from '../services/geolocation.service';
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

// Iniciar quiz - captura IP e gera UUID
router.post('/start', async (req, res) => {
  try {
    console.log('[Quiz] Iniciando nova sessão...');
    const ip = getClientIP(req);
    console.log('[Quiz] IP do cliente:', ip);

    const session = createUserSession(ip);
    console.log('[Quiz] Sessão criada com UUID:', session.id);
    
    // Obter localização do IP
    const geolocationService = GeolocationService.getInstance();
    const location = await geolocationService.getLocationFromIP(ip);
    
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

function sha256(value: string | undefined): string | undefined {
  if (!value) return undefined;
  // Normalizar: trim, lowercase e remover espaços extras
  const normalized = value.trim().toLowerCase().replace(/\s+/g, ' ');
  if (normalized === '') return undefined;
  
  const hash = crypto.createHash('sha256').update(normalized).digest('hex');
  console.log(`[SHA256] Original: "${value}" -> Normalized: "${normalized}" -> Hash: ${hash}`);
  return hash;
}

// Receber evento do frontend para enviar ao Facebook CAPI
router.post('/event', async (req, res) => {
  try {
    const {
      event, // Nome do evento (ex: StartQuiz)
      external_id,
      fbp,
      fbc,
      user_agent
    } = req.body;

    console.log('[CAPI] Evento recebido:', { event, external_id, fbp, fbc, user_agent });

    // Pega IP do usuário usando a função melhorada
    const ip = getClientIP(req);
    console.log('[CAPI] IP capturado:', ip);

    // Obter localização real do IP
    const geolocationService = GeolocationService.getInstance();
    const location = await geolocationService.getLocationFromIP(ip);
    console.log('[CAPI] Localização obtida:', location);

    // Monta o payload para o Facebook CAPI
    const payload = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        client_ip_address: ip,
        client_user_agent: user_agent,
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        external_id: external_id ? sha256(external_id) : undefined,
        ct: sha256(location.city),
        st: sha256(location.state),
        zp: sha256(location.zipCode), // Corrigido: zipCode em vez de zip
        country: sha256(location.country)
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
        data: [payload]
      });
      console.log('[CAPI] ✅ Resposta do Facebook:', fbResponse.data);
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
      event = 'Purchase' 
    } = req.body;

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
    const geolocationService = GeolocationService.getInstance();
    const location = await geolocationService.getLocationFromIP(ip);
    console.log('[User Data] Localização obtida:', location);

    // Monta o payload completo para o Facebook CAPI (evento de compra)
    const payload = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        client_ip_address: ip,
        client_user_agent: req.headers['user-agent'] || '',
        fbp: req.body.fbp || undefined,
        fbc: req.body.fbc || undefined,
        external_id: email ? sha256(email) : undefined,
        em: email ? sha256(email) : undefined, // Email hash
        ph: phone ? sha256(phone) : undefined, // Phone hash
        fn: name ? sha256(name.split(' ')[0]) : undefined, // First name hash
        ln: name ? sha256(name.split(' ').slice(1).join(' ')) : undefined, // Last name hash
        ct: sha256(location.city),
        st: sha256(location.state),
        zp: sha256(location.zipCode),
        country: sha256(location.country)
      },
      custom_data: {
        content_name: 'Quiz Chef Amelie',
        content_category: 'Culinária',
        value: 17.00, // Valor do produto em euros
        currency: 'EUR'
      }
    };

    console.log('[User Data] Payload completo para Facebook CAPI:', JSON.stringify(payload, null, 2));

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
        data: [payload]
      });
      console.log('[User Data] ✅ Evento de compra enviado para o Facebook:', fbResponse.data);
      
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
    
    const geolocationService = GeolocationService.getInstance();
    const location = await geolocationService.getLocationFromIP(ip);
    
    res.json({
      success: true,
      ip,
      location,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Test] Erro no teste de geolocalização:', error);
    res.status(500).json({
      success: false,
      error: 'Erro no teste de geolocalização',
      timestamp: new Date().toISOString()
    });
  }
});

export default router; 