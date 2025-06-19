import express from 'express';
import { Server } from 'http';
import quizRoutes from './quiz.routes';
import geolocationRoutes from './geolocation.routes';
import pixelRoutes from './pixel.routes';

// Função para registrar todas as rotas da aplicação
export async function registerRoutes(app: express.Application): Promise<Server> {
  // Registrar rotas do quiz
  app.use('/api/quiz', quizRoutes);
  
  // Registrar rotas de geolocalização
  app.use('/api/geolocation', geolocationRoutes);
  
  // Registrar rotas de pixel
  app.use('/api', pixelRoutes);
  
  // Criar o servidor HTTP
  const server = new Server(app);
  
  return server;
}

// Exportar tipos úteis
export type { Request, Response, NextFunction } from 'express'; 