import express from 'express';
import { Server } from 'http';
import quizRoutes from './quiz.routes';
import geolocationRoutes from './geolocation.routes';
import pixelRoutes from './pixel.routes';
import hotmartRoutes from './hotmart-server-integration';

// Função para registrar todas as rotas da aplicação
export async function registerRoutes(app: express.Application): Promise<Server> {
  // Rota de teste simples
  app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando!', timestamp: new Date().toISOString() });
  });
  
  // Registrar rotas do quiz
  app.use('/api/quiz', quizRoutes);
  
  // Registrar rotas de geolocalização
  app.use('/api/geolocation', geolocationRoutes);
  
  // Registrar rotas de pixel
  app.use('/api', pixelRoutes);
  
  // Registrar rotas do Hotmart
  app.use('/api/hotmart', hotmartRoutes);
  
  // Configurar servir arquivos de mídia com tipos MIME corretos
  app.use('/audio', express.static('public/audio', {
    setHeaders: (res, path) => {
      if (path.endsWith('.mp4')) {
        res.set('Content-Type', 'video/mp4');
      } else if (path.endsWith('.mp3')) {
        res.set('Content-Type', 'audio/mpeg');
      } else if (path.endsWith('.wav')) {
        res.set('Content-Type', 'audio/wav');
      }
      res.set('Accept-Ranges', 'bytes');
    }
  }));
  
  // Criar o servidor HTTP
  const server = new Server(app);
  
  return server;
}

// Exportar tipos úteis
export type { Request, Response, NextFunction } from 'express'; 