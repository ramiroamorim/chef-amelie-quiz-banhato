import express from 'express';
import { Server } from 'http';

// Função para registrar todas as rotas da aplicação
export async function registerRoutes(app: express.Application): Promise<Server> {
  // Aqui vamos registrar todas as rotas da API
  // Por exemplo:
  // app.use('/api/quiz', quizRoutes);
  
  // Criar o servidor HTTP
  const server = new Server(app);
  
  return server;
}

// Exportar tipos úteis
export type { Request, Response, NextFunction } from 'express'; 