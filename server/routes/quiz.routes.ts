import express from 'express';
import { createUserSession } from '../models/user-session.model';
import { GeolocationService } from '../services/geolocation.service';

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
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
};

router.use(logRequest);

// Iniciar quiz - captura IP e gera UUID
router.post('/start', async (req, res) => {
  try {
    const ip = getClientIP(req);
    console.log('Iniciando nova sessão para IP:', ip);

    const session = createUserSession(ip);
    console.log('Sessão criada com UUID:', session.id);
    
    // Obter localização do IP
    const geolocationService = GeolocationService.getInstance();
    const location = await geolocationService.getLocationFromIP(ip);
    
    if (location) {
      session.location = location;
      console.log('Localização obtida:', location);
    } else {
      console.warn('Não foi possível obter localização para o IP:', ip);
    }

    // Aqui você pode salvar a sessão em um banco de dados
    // Por enquanto, vamos apenas retornar os dados
    res.json({
      success: true,
      sessionId: session.id,
      location: session.location,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao iniciar quiz:', error);
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

export default router; 