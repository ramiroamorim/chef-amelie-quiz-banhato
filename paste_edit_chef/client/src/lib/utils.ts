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
 * Função utilitária para capturar parâmetros UTM SOMENTE dos cookies da Utmify
 * NÃO cria cookies - apenas lê os cookies existentes da Utmify
 */
export function getUtmParams() {
  console.log('🔍 [UTMIFY ONLY] getUtmParams - Lendo APENAS cookies da Utmify');
  
  // Buscar UTM nos cookies (padrão Utmify)
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value || '');
    return acc;
  }, {} as Record<string, string>);
  
  console.log('🔍 [UTMIFY ONLY] getUtmParams - Todos os cookies encontrados:', cookies);
  
  // Verificar cookies específicos da Utmify
  const utmifyCookies = [
    'utm_source',
    'utm_campaign', 
    'utm_medium',
    'utm_content',
    'utm_term',
    'utmify_source',
    'utmify_campaign',
    'utmify_medium',
    'utmify_content',
    'utmify_term'
  ];
  
  console.log('🔍 [UTMIFY ONLY] getUtmParams - Verificando cookies UTM da Utmify:');
  utmifyCookies.forEach(cookieName => {
    const value = cookies[cookieName];
    if (value) {
      console.log(`✅ [UTMIFY ONLY] getUtmParams - ${cookieName}: ${value}`);
    } else {
      console.log(`❌ [UTMIFY ONLY] getUtmParams - ${cookieName}: não encontrado`);
    }
  });
  
  // Ler APENAS dos cookies da Utmify (sem fallbacks do projeto)
  const utmParams = {
    utm_source: cookies.utm_source || cookies.utmify_source || 'organic',
    utm_campaign: cookies.utm_campaign || cookies.utmify_campaign || '',
    utm_medium: cookies.utm_medium || cookies.utmify_medium || '',
    utm_content: cookies.utm_content || cookies.utmify_content || '',
    utm_term: cookies.utm_term || cookies.utmify_term || ''
  };
  
  console.log('🔍 [UTMIFY ONLY] getUtmParams - Parâmetros UTM extraídos da Utmify:', utmParams);
  
  // Verificar se temos parâmetros válidos da Utmify
  const hasValidParams = utmParams.utm_source !== 'organic' || 
                        utmParams.utm_campaign !== '' || 
                        utmParams.utm_medium !== '' || 
                        utmParams.utm_content !== '' || 
                        utmParams.utm_term !== '';
  
  if (hasValidParams) {
    console.log('✅ [UTMIFY ONLY] getUtmParams - Parâmetros UTM válidos da Utmify encontrados');
  } else {
    console.warn('⚠️ [UTMIFY ONLY] getUtmParams - Nenhum parâmetro UTM válido da Utmify encontrado');
    console.warn('⚠️ [UTMIFY ONLY] getUtmParams - Usando valores padrão (organic)');
  }
  
  return utmParams;
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
  if (utmParams.utm_source && utmParams.utm_source !== 'organic') urlParams.append('utm_source', utmParams.utm_source);
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
 * Função para construir URL do Hotmart APENAS com parâmetros UTM da Utmify
 * Prioridade máxima para Utmify - sem outros parâmetros
 */
export function buildHotmartUrl(params: any, eventId: string) {
  const baseUrl = 'https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10';
  const utmParams = getUtmParams();
  const urlParams = new URLSearchParams();
  
  console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - Construindo URL APENAS com UTM da Utmify');
  console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - Parâmetros UTM da Utmify:', utmParams);
  
  // Parâmetros UTM - APENAS da Utmify (prioridade máxima)
  if (utmParams.utm_source && utmParams.utm_source !== 'organic') {
    urlParams.append('utm_source', utmParams.utm_source);
    console.log('✅ [UTMIFY ONLY] buildHotmartUrl - Adicionado utm_source da Utmify:', utmParams.utm_source);
  } else {
    console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - utm_source da Utmify é organic ou vazio');
  }
  
  if (utmParams.utm_campaign && utmParams.utm_campaign.trim() !== '') {
    urlParams.append('utm_campaign', utmParams.utm_campaign);
    console.log('✅ [UTMIFY ONLY] buildHotmartUrl - Adicionado utm_campaign da Utmify:', utmParams.utm_campaign);
  }
  
  if (utmParams.utm_medium && utmParams.utm_medium.trim() !== '') {
    urlParams.append('utm_medium', utmParams.utm_medium);
    console.log('✅ [UTMIFY ONLY] buildHotmartUrl - Adicionado utm_medium da Utmify:', utmParams.utm_medium);
  }
  
  if (utmParams.utm_content && utmParams.utm_content.trim() !== '') {
    urlParams.append('utm_content', utmParams.utm_content);
    console.log('✅ [UTMIFY ONLY] buildHotmartUrl - Adicionado utm_content da Utmify:', utmParams.utm_content);
  }
  
  if (utmParams.utm_term && utmParams.utm_term.trim() !== '') {
    urlParams.append('utm_term', utmParams.utm_term);
    console.log('✅ [UTMIFY ONLY] buildHotmartUrl - Adicionado utm_term da Utmify:', utmParams.utm_term);
  }
  
  const queryString = urlParams.toString();
  const finalUrl = queryString ? `${baseUrl}&${queryString}` : baseUrl;
  
  console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - Query string gerada:', queryString);
  console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - URL final gerada:', finalUrl);
  
  // Verificação final se os parâmetros UTM da Utmify estão na URL final
  const finalUrlObj = new URL(finalUrl);
  const finalUtmSource = finalUrlObj.searchParams.get('utm_source');
  const finalUtmCampaign = finalUrlObj.searchParams.get('utm_campaign');
  const finalUtmMedium = finalUrlObj.searchParams.get('utm_medium');
  
  console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - Verificação final UTM da Utmify na URL:', {
    utm_source: finalUtmSource,
    utm_campaign: finalUtmCampaign,
    utm_medium: finalUtmMedium,
    urlContainsUtm: finalUtmSource !== null || finalUtmCampaign !== null || finalUtmMedium !== null,
    originalUtmParams: utmParams
  });
  
  // Log se os parâmetros UTM da Utmify não estão na URL final
  if (!finalUtmSource || finalUtmSource === 'organic') {
    console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - Parâmetros UTM da Utmify não estão na URL final');
    console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - Parâmetros originais da Utmify:', utmParams);
    console.log('🔍 [UTMIFY ONLY] buildHotmartUrl - URL final:', finalUrl);
  } else {
    console.log('✅ [UTMIFY ONLY] buildHotmartUrl - Parâmetros UTM da Utmify confirmados na URL final!');
  }
  
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
