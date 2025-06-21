import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { sha256 as sha256_js } from 'js-sha256';

// Declarações de tipo para Utmify
declare global {
  interface Window {
    utmifyLoaded?: boolean;
    utmify?: {
      getUtmParams?: () => {
        utm_source?: string;
        utm_campaign?: string;
        utm_medium?: string;
        utm_content?: string;
        utm_term?: string;
      };
    };
  }
}

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
 * Função utilitária para capturar parâmetros UTM (simplificada)
 * Retorna objeto vazio pois o tracking é feito por script externo
 */
export function getUtmParams() {
  console.log('🔍 [UTM] Parâmetros UTM gerenciados por script externo');
  
  return {
    utm_source: '',
    utm_campaign: '',
    utm_medium: '',
    utm_content: '',
    utm_term: ''
  };
}

/**
 * Função para verificar se há parâmetros UTM válidos (simplificada)
 * Sempre retorna false pois o tracking é feito por script externo
 */
export function hasValidUtmParams() {
  return false;
}

/**
 * Função para construir uma URL com parâmetros UTM (simplificada)
 * Retorna apenas a URL base pois o tracking é feito por script externo
 */
export function buildUrlWithUtm(baseUrl: string, additionalParams?: Record<string, string>) {
  console.log('🔍 [UTM] URL construída sem parâmetros UTM (gerenciado por script externo)');
  return baseUrl;
}

/**
 * Função para construir URL do Hotmart (simplificada)
 */
export function buildHotmartUrl(params: any, eventId: string) {
  const baseUrl = 'https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10';
  
  console.log('🔍 [HOTMART] URL gerada:', baseUrl);
  
  return baseUrl;
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
