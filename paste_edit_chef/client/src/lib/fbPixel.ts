/**
 * Utilitário para rastreamento de eventos do Facebook Pixel
 * Facilita o disparo de eventos de conversão em diferentes pontos da aplicação
 */

declare global {
  interface Window {
    fbq: any;
  }
}

// Variável para armazenar o ID da sessão
let currentSessionId: string | null = null;

export const FacebookPixel = {
  /**
   * Inicializa o pixel com o ID do usuário
   * @param userId ID único do usuário
   */
  initWithUserId: (userId: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      currentSessionId = userId;
      window.fbq('init', '644431871463181', {
        external_id: userId
      });
    }
  },

  /**
   * Rastreia evento de início do quiz
   * @param parameters Parâmetros adicionais para o evento (opcional)
   */
  trackQuizStart: (parameters?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'StartQuiz', {
        ...parameters,
        external_id: currentSessionId
      });
    }
  },

  /**
   * Rastreia evento de conclusão do quiz
   * @param parameters Parâmetros adicionais para o evento (opcional)
   */
  trackQuizComplete: (parameters?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        ...parameters,
        external_id: currentSessionId
      });
    }
  },

  /**
   * Rastreia evento de visualização da página de vendas
   * @param parameters Parâmetros adicionais para o evento (opcional)
   */
  trackViewContent: (parameters?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        ...parameters,
        external_id: currentSessionId,
        content_name: 'Pack de Receitas',
        content_category: 'Vendas',
        content_ids: ['pack-001'],
        value: 49.90,
        currency: 'EUR'
      });
    }
  },

  /**
   * Rastreia evento de clique no botão de compra
   * @param parameters Parâmetros adicionais para o evento (opcional)
   */
  trackPurchaseClick: (parameters?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        ...parameters,
        external_id: currentSessionId
      });
    }
  },

  /**
   * Rastreia evento de visualização da página de agradecimento
   * @param value Valor da conversão (opcional)
   * @param currency Moeda (opcional)
   * @param parameters Parâmetros adicionais para o evento (opcional)
   */
  trackThankYouPage: (value?: number, currency: string = 'EUR', parameters?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: value || 49.90,
        currency,
        external_id: currentSessionId,
        ...parameters
      });
    }
  },

  /**
   * Rastreia evento personalizado
   * @param eventName Nome do evento personalizado
   * @param parameters Parâmetros adicionais para o evento (opcional)
   */
  trackCustomEvent: (eventName: string, parameters?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, {
        ...parameters,
        external_id: currentSessionId
      });
    }
  }
};