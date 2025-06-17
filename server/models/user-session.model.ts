import { v4 as uuidv4 } from 'uuid';

export interface UserLocation {
  state: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface UserSession {
  id: string;           // UUID
  ip: string;           // IP do usuário
  location?: UserLocation; // Dados de localização
  createdAt: Date;      // Data de criação
  updatedAt: Date;      // Última atualização
  quizProgress: {
    started: boolean;   // Quiz iniciado
    completed: boolean; // Quiz completado
    currentStep: number; // Etapa atual
    answers: Record<string, any>; // Respostas do usuário
  };
  checkout?: {
    completed: boolean;
    timestamp?: Date;
  };
}

// Função para criar uma nova sessão
export function createUserSession(ip: string): UserSession {
  return {
    id: uuidv4(), // Gerando UUID v4
    ip,
    createdAt: new Date(),
    updatedAt: new Date(),
    quizProgress: {
      started: false,
      completed: false,
      currentStep: 0,
      answers: {}
    }
  };
} 