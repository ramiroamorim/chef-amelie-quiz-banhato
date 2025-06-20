import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { sha256 as sha256_js } from 'js-sha256';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Função utilitária para SHA256
 */
export function sha256(value: string | undefined): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  // Usa a biblioteca js-sha256 para o hash
  return sha256_js(value.trim().toLowerCase());
}

/**
 * Função utilitária para criar cookies
 */
export function setCookie(name: string, value: string, days = 7) {
  if (typeof document !== 'undefined') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }
}

/**
 * Função utilitária para capturar parâmetros UTM da URL
 * Primeiro tenta usar window.utm_params (definido pelo script no HTML)
 * Se não estiver disponível, captura diretamente da URL
 */
export function getUtmParams() {
  // Primeiro, tentar usar window.utm_params (definido pelo script no HTML)
  if (typeof window !== 'undefined' && (window as any).utm_params) {
    return {
      utm_source: (window as any).utm_params.utm_source || 'organic',
      utm_campaign: (window as any).utm_params.utm_campaign || '',
      utm_medium: (window as any).utm_params.utm_medium || '',
      utm_content: (window as any).utm_params.utm_content || '',
      utm_term: (window as any).utm_params.utm_term || ''
    };
  }
  
  // Fallback: capturar diretamente da URL
  if (typeof window !== 'undefined') {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        utm_source: urlParams.get('utm_source') || 'organic',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_content: urlParams.get('utm_content') || '',
        utm_term: urlParams.get('utm_term') || ''
      };
    } catch (error) {
      console.error('Error parsing UTM parameters from URL:', error);
    }
  }
  
  // Fallback final
  return {
    utm_source: 'organic',
    utm_campaign: '',
    utm_medium: '',
    utm_content: '',
    utm_term: ''
  };
}

/**
 * Função para verificar se há parâmetros UTM válidos
 */
export function hasValidUtmParams() {
  const params = getUtmParams();
  return params.utm_source !== 'organic' || 
         params.utm_campaign !== '' || 
         params.utm_medium !== '' || 
         params.utm_content !== '' || 
         params.utm_term !== '';
}

/**
 * Função para construir uma URL com parâmetros UTM
 */
export function buildUrlWithUtm(baseUrl: string, additionalParams?: Record<string, string>) {
  const utmParams = getUtmParams();
  const urlParams = new URLSearchParams();
  
  // Adicionar parâmetros UTM
  if (utmParams.utm_source !== 'organic') urlParams.append('utm_source', utmParams.utm_source);
  if (utmParams.utm_campaign) urlParams.append('utm_campaign', utmParams.utm_campaign);
  if (utmParams.utm_medium) urlParams.append('utm_medium', utmParams.utm_medium);
  if (utmParams.utm_content) urlParams.append('utm_content', utmParams.utm_content);
  if (utmParams.utm_term) urlParams.append('utm_term', utmParams.utm_term);
  
  // Adicionar parâmetros adicionais
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      if (value) urlParams.append(key, value);
    });
  }
  
  const queryString = urlParams.toString();
  return queryString ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}` : baseUrl;
}

/**
 * Função para construir URL completa do Hotmart com todos os parâmetros
 * Inclui UTM, geolocalização, dados do cliente e tracking
 */
export function buildHotmartUrl(params: any, eventId: string) {
  const baseUrl = 'https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10';
  const utmParams = getUtmParams();
  const urlParams = new URLSearchParams();
  
  console.log('🔍 [DEBUG] buildHotmartUrl - Parâmetros recebidos:', {
    params,
    utmParams,
    eventId
  });
  
  // Parâmetros UTM
  if (utmParams.utm_source !== 'organic') urlParams.append('utm_source', utmParams.utm_source);
  if (utmParams.utm_campaign) urlParams.append('utm_campaign', utmParams.utm_campaign);
  if (utmParams.utm_medium) urlParams.append('utm_medium', utmParams.utm_medium);
  if (utmParams.utm_content) urlParams.append('utm_content', utmParams.utm_content);
  if (utmParams.utm_term) urlParams.append('utm_term', utmParams.utm_term);
  
  // Dados de geolocalização (hasheados)
  if (params.ct) urlParams.append('ct', params.ct);
  if (params.st) urlParams.append('st', params.st);
  if (params.country) urlParams.append('country', params.country);
  if (params.zip) urlParams.append('zip', params.zip);
  
  // Dados do cliente
  if (params.client_ip_address) urlParams.append('client_ip', params.client_ip_address);
  if (params.client_user_agent) urlParams.append('user_agent', encodeURIComponent(params.client_user_agent));
  
  // Event ID
  if (eventId) urlParams.append('event_id', eventId);
  
  // Timestamp
  urlParams.append('timestamp', new Date().toISOString());
  
  // Facebook tracking (se disponível)
  if (typeof window !== 'undefined') {
    const fbc = getCookie('_fbc');
    const fbp = getCookie('_fbp');
    
    if (fbc) urlParams.append('fbc', fbc);
    if (fbp) urlParams.append('fbp', fbp);
  }
  
  const queryString = urlParams.toString();
  const finalUrl = queryString ? `${baseUrl}&${queryString}` : baseUrl;
  
  console.log('🔍 [DEBUG] buildHotmartUrl - URL final gerada:', finalUrl);
  console.log('🔍 [DEBUG] buildHotmartUrl - Query string:', queryString);
  
  return finalUrl;
}

/**
 * Função para ler o valor de um cookie
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const match = document.cookie.match(new RegExp('(^|;) *' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

/**
 * Função para obter o endereço IP do cliente, com prioridade para IPv6.
 * Tenta buscar o IPv6 de um endpoint específico. Se falhar, usa o ipinfo.io como fallback.
 */
export async function getClientIP(): Promise<string | null> {
  try {
    // Tenta obter o IPv6 primeiro por ser mais preciso para geolocalização
    const response = await fetch('https://api6.ipify.org?format=json');
    if (response.ok) {
      const data = await response.json();
      if (data.ip) {
        console.log('✅ [DEBUG] IPv6 obtido com sucesso:', data.ip);
        return data.ip;
      }
    }
  } catch (error) {
    console.warn('[DEBUG] Falha ao obter IPv6. Tentando fallback.', error);
  }

  // Fallback para o serviço ipinfo.io (que pode retornar IPv4 ou IPv6)
  try {
    const response = await fetch('https://ipinfo.io/json?token=1ad4cf7c8cc087');
    if (response.ok) {
      const data = await response.json();
      if (data.ip) {
        console.log('🔄 [DEBUG] Usando IP de fallback (ipinfo.io):', data.ip);
        return data.ip;
      }
    }
  } catch (error) {
    console.error('❌ [DEBUG] Falha ao obter IP de fallback (ipinfo.io).', error);
  }

  return null;
}
