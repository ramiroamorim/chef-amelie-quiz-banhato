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

// Iniciar quiz - captura IP e gera External ID
router.post('/start', async (req, res) => {
  try {
    const ip = getClientIP(req);
    const session = createUserSession(ip);
    
    // Obter localização do IP
    const geolocationService = GeolocationService.getInstance();
    const location = await geolocationService.getLocationFromIP(ip);
    
    if (location) {
      session.location = location;
    }

    // Aqui você pode salvar a sessão em um banco de dados
    // Por enquanto, vamos apenas retornar os dados
    res.json({
      success: true,
      sessionId: session.id,
      location: session.location
    });
  } catch (error) {
    console.error('Erro ao iniciar quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao iniciar quiz'
    });
  }
});

// Atualizar progresso do quiz
router.post('/progress/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { step, answer } = req.body;

  // Aqui você atualizaria o progresso no banco de dados
  res.json({
    success: true,
    message: 'Progresso atualizado'
  });
});

// Finalizar quiz
router.post('/complete/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  // Aqui você marcaria o quiz como completo no banco de dados
  res.json({
    success: true,
    message: 'Quiz completado'
  });
});

export default router; 