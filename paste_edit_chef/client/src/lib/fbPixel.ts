/**
 * Utilitário para rastreamento de eventos do Facebook Pixel
 * Facilita o disparo de eventos de conversão em diferentes pontos da aplicação
 */

import { getClientIP, sha256 } from './utils';

// Função para gerar um event_id único (UUID v4-like)
export function generateEventId() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `evt_${timestamp}_${randomString}`;
}

declare global {
  interface Window {
    fbq: any;
  }
}

// Variável para armazenar o ID da sessão
let currentSessionId: string | null = null;

// Função utilitária para buscar parâmetros comuns (IP, localização, etc.)
export async function getCommonPixelParams() {
  try {
    const clientIp = await getClientIP(); // Usar a função centralizada
    let info: any = {};

    // Se tivermos um IP, buscar informações de geolocalização
    if (clientIp) {
      try {
        const infoResponse = await fetch(`https://ipinfo.io/${clientIp}/json?token=1ad4cf7c8cc087`);
        info = await infoResponse.json();
      } catch (e) {
        console.warn('[DEBUG] Falha ao obter dados do ipinfo.io, alguns parâmetros podem estar ausentes.', e);
      }
    }

    // Hash dos campos sensíveis
    const [cityHash, stateHash, countryHash, zipHash] = await Promise.all([
      sha256(info.city || ''),    // ct = cidade
      sha256(info.region || ''),  // st = estado
      sha256(info.country || ''), // country = país
      sha256(info.postal || '')   // zip = CEP
    ]);
    return {
      client_ip_address: clientIp,
      ct: cityHash,      // cidade (city)
      st: stateHash,     // estado (state/region)
      country: countryHash,
      zip: zipHash,
      client_user_agent: navigator.userAgent,
      currency: 'EUR',
      event_day: new Date().toLocaleString('en-US', { weekday: 'long' }),
      event_day_in_month: new Date().getDate(),
      event_month: new Date().toLocaleString('en-US', { month: 'long' }),
      event_time: Date.now(),
      page_title: document.title,
    };
  } catch {
    return {
      client_user_agent: navigator.userAgent,
      currency: 'EUR',
      event_day: new Date().toLocaleString('en-US', { weekday: 'long' }),
      event_day_in_month: new Date().getDate(),
      event_month: new Date().toLocaleString('en-US', { month: 'long' }),
      event_time: Date.now(),
      page_title: document.title,
    };
  }
}

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
   * Rastreia evento de visualização de página (PageView) com parâmetros customizados
   * @param parameters Parâmetros adicionais para o evento (opcional)
   * @param eventID ID único do evento para deduplicação (opcional)
   * Exemplo de uso:
   *   const eventId = generateEventId();
   *   getCommonPixelParams().then(params => {
   *     FacebookPixel.trackPageView({ ...params }, eventId);
   *   });
   */
  trackPageView: (parameters?: any, eventID?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (eventID) {
        window.fbq('track', 'PageView', {
          ...parameters,
          external_id: currentSessionId
        }, { eventID });
      } else {
        window.fbq('track', 'PageView', {
          ...parameters,
          external_id: currentSessionId
        });
      }
    }
  },

  /**
   * Rastreia evento de início do quiz
   * @param parameters Parâmetros adicionais para o evento (opcional)
   * @param eventID ID único do evento para deduplicação (opcional)
   * Exemplo de uso:
   *   const eventId = generateEventId();
   *   getCommonPixelParams().then(params => {
   *     FacebookPixel.trackQuizStart({ ...params }, eventId);
   *   });
   */
  trackQuizStart: (parameters?: any, eventID?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (eventID) {
        window.fbq('track', 'StartQuiz', {
          ...parameters,
          external_id: currentSessionId
        }, { eventID });
      } else {
        window.fbq('track', 'StartQuiz', {
          ...parameters,
          external_id: currentSessionId
        });
      }
    }
  },

  /**
   * Rastreia evento de conclusão do quiz
   * @param parameters Parâmetros adicionais para o evento (opcional)
   * @param eventID ID único do evento para deduplicação (opcional)
   * Exemplo de uso:
   *   const eventId = generateEventId();
   *   getCommonPixelParams().then(params => {
   *     FacebookPixel.trackQuizComplete({ ...params }, eventId);
   *   });
   */
  trackQuizComplete: (parameters?: any, eventID?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (eventID) {
        window.fbq('track', 'CompleteRegistration', {
          ...parameters,
          external_id: currentSessionId
        }, { eventID });
      } else {
        window.fbq('track', 'CompleteRegistration', {
          ...parameters,
          external_id: currentSessionId
        });
      }
    }
  },

  /**
   * Rastreia evento de visualização da página de vendas
   * @param parameters Parâmetros adicionais para o evento (opcional)
   * @param eventID ID único do evento para deduplicação (opcional)
   * Exemplo de uso:
   *   const eventId = generateEventId();
   *   getCommonPixelParams().then(params => {
   *     FacebookPixel.trackViewContent({ ...params }, eventId);
   *   });
   */
  trackViewContent: (parameters?: any, eventID?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (eventID) {
        window.fbq('track', 'ViewContent', {
          ...parameters,
          external_id: currentSessionId,
          content_name: 'Pack de Receitas',
          content_category: 'Vendas',
          content_ids: ['pack-001'],
          value: 17.00,
          currency: 'EUR'
        }, { eventID });
      } else {
        window.fbq('track', 'ViewContent', {
          ...parameters,
          external_id: currentSessionId,
          content_name: 'Pack de Receitas',
          content_category: 'Vendas',
          content_ids: ['pack-001'],
          value: 17.00,
          currency: 'EUR'
        });
      }
    }
  },

  /**
   * Rastreia evento de clique no botão de compra
   * @param parameters Parâmetros adicionais para o evento (opcional)
   * @param eventID ID único do evento para deduplicação (opcional)
   * Exemplo de uso:
   *   const eventId = generateEventId();
   *   getCommonPixelParams().then(params => {
   *     FacebookPixel.trackPurchaseClick({ ...params }, eventId);
   *   });
   */
  trackPurchaseClick: (parameters?: any, eventID?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (eventID) {
        window.fbq('track', 'InitiateCheckout', {
          ...parameters,
          external_id: currentSessionId
        }, { eventID });
      } else {
        window.fbq('track', 'InitiateCheckout', {
          ...parameters,
          external_id: currentSessionId
        });
      }
    }
  },

  /**
   * Rastreia evento de visualização da página de agradecimento
   * @param value Valor da conversão (opcional)
   * @param currency Moeda (opcional)
   * @param parameters Parâmetros adicionais para o evento (opcional)
   * @param eventID ID único do evento para deduplicação (opcional)
   * Exemplo de uso:
   *   const eventId = generateEventId();
   *   getCommonPixelParams().then(params => {
   *     FacebookPixel.trackThankYouPage(49.90, 'BRL', { ...params }, eventId);
   *   });
   */
  trackThankYouPage: (value?: number, currency: string = 'EUR', parameters?: any, eventID?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (eventID) {
        window.fbq('track', 'Purchase', {
          value: value || 17.00,
          currency,
          external_id: currentSessionId,
          ...parameters
        }, { eventID });
      } else {
        window.fbq('track', 'Purchase', {
          value: value || 17.00,
          currency,
          external_id: currentSessionId,
          ...parameters
        });
      }
    }
  },

  /**
   * Rastreia evento personalizado
   * @param eventName Nome do evento personalizado
   * @param parameters Parâmetros adicionais para o evento (opcional)
   * @param eventID ID único do evento para deduplicação (opcional)
   * Exemplo de uso:
   *   const eventId = generateEventId();
   *   getCommonPixelParams().then(params => {
   *     FacebookPixel.trackCustomEvent('MeuEvento', { ...params }, eventId);
   *   });
   */
  trackCustomEvent: (eventName: string, parameters?: any, eventID?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (eventID) {
        window.fbq('trackCustom', eventName, {
          ...parameters,
          external_id: currentSessionId
        }, { eventID });
      } else {
        window.fbq('trackCustom', eventName, {
          ...parameters,
          external_id: currentSessionId
        });
      }
    }
  }
};