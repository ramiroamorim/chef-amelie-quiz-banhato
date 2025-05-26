/**
 * Utilitário para rastreamento de eventos do Facebook Pixel
 * Facilita o disparo de eventos de conversão em diferentes pontos da aplicação
 */

declare global {
  interface Window {
    fbq: any;
  }
}

export const FacebookPixel = {
  /**
   * Rastreia evento de início do quiz
   */
  trackQuizStart: () => {
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout');
      }
    } catch (error) {
      console.log('Facebook Pixel tracking error:', error);
    }
  },

  /**
   * Rastreia evento de conclusão do quiz
   */
  trackQuizComplete: () => {
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'CompleteRegistration');
      }
    } catch (error) {
      console.log('Facebook Pixel tracking error:', error);
    }
  },

  /**
   * Rastreia evento de visualização da página de vendas
   */
  trackViewContent: () => {
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent');
      }
    } catch (error) {
      console.log('Facebook Pixel tracking error:', error);
    }
  },

  /**
   * Rastreia evento de clique no botão de compra
   */
  trackPurchaseClick: () => {
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'AddToCart');
      }
    } catch (error) {
      console.log('Facebook Pixel tracking error:', error);
    }
  },

  /**
   * Rastreia evento de visualização da página de agradecimento
   */
  trackThankYouPage: () => {
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', {
          value: 49.90,
          currency: 'EUR'
        });
      }
    } catch (error) {
      console.log('Facebook Pixel tracking error:', error);
    }
  },

  /**
   * Rastreia evento personalizado
   */
  trackCustomEvent: (eventName: string, parameters?: any) => {
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', eventName, parameters);
      }
    } catch (error) {
      console.log('Facebook Pixel tracking error:', error);
    }
  }
};