import express from 'express';
import { createUserSession } from '../models/user-session.model';
import { GeolocationService } from '../services/geolocation.service';
import axios from 'axios';
import crypto from 'crypto';

const router = express.Router();

// Middleware para capturar IP do usuário
const getClientIP = (req: express.Request): string => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0];
  }
  return req.ip || req.socket.remoteAddress || '0.0.0.0';
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
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
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

    // Pega IP do usuário
    const ip = req.ip || req.socket.remoteAddress || req.connection?.remoteAddress;

    // Exemplo: buscar localização (cidade, estado, cep, país)
    const location = {
      city: req.body.city || '',
      state: req.body.state || '',
      zip: req.body.zip || '',
      country: req.body.country || ''
    };

    // Monta o payload para o Facebook CAPI
    const payload = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        client_ip_address: ip,
        client_user_agent: user_agent,
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        external_id,
        ct: sha256(location.city),
        st: sha256(location.state),
        zp: sha256(location.zip),
        country: sha256(location.country)
      }
    };

    // Exibir o payload no console
    console.log('[CAPI] Payload enviado para o Facebook:', JSON.stringify(payload, null, 2));

    // Enviar para o Facebook CAPI
    const accessToken = process.env.FB_CAPI_TOKEN;
    const pixelId = process.env.FB_PIXEL_ID;
    const fbUrl = `https://graph.facebook.com/v19.0/644431871463181/events?access_token=EAASsZARGMYwQBO7xs0TgXDK6g9LxuofBwdZCvuKsWVxbFy0TZCDaiwjuf335OXHRTCMfJFcUUQ1WyE31cCOQl6dAd53gdG6XZBXwMBkRO7u11sUaZCi8d0JZBTExZATtAe7eiJ3chxONU9kVYysAZBMVET3G3Ypy1y1JjsAZC3bAobWpjZBQblc4ptmUhCTDgZAM5IE9AZDZD`;

    try {
      const fbResponse = await axios.post(fbUrl, {
        data: [payload]
      });
      console.log('[CAPI] Resposta do Facebook:', fbResponse.data);
      res.json({ success: true, payload, fbResponse: fbResponse.data });
    } catch (fbError: any) {
      console.error('[CAPI] Erro ao enviar para o Facebook:', fbError.response?.data || fbError.message);
      res.status(500).json({ success: false, error: 'Erro ao enviar evento para o Facebook CAPI', details: fbError.response?.data || fbError.message });
    }
  } catch (error) {
    console.error('[CAPI] Erro ao preparar evento:', error);
    res.status(500).json({ success: false, error: 'Erro ao preparar evento para o Facebook CAPI' });
  }
});

export default router; 