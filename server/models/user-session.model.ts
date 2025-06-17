export interface UserLocation {
  state: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface UserSession {
  id: string;           // External ID
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
    id: generateExternalId(),
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

// Função para gerar um External ID único
function generateExternalId(): string {
  return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
} 