import axios from 'axios';
import { UserLocation } from '../models/user-session.model';
import { config } from '../config/env';

export class GeolocationService {
  private static instance: GeolocationService;
  private apiKey: string;
  private readonly API_URL = 'https://ipinfo.io';

  constructor() {
    this.apiKey = process.env.IPINFO_TOKEN || '1ad4cf7c8cc087';
    if (!this.apiKey) {
      console.warn('IPINFO_TOKEN não configurada. O serviço pode ter limitações de requisições.');
    }
  }

  public static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  // Método para reset da instância (útil para testes)
  public static resetInstance(): void {
    GeolocationService.instance = null as any;
  }

  // Método para criar nova instância (útil para testes)
  public static createInstance(): GeolocationService {
    return new GeolocationService();
  }

  public async getLocationFromIP(ip: string): Promise<UserLocation> {
    try {
      console.log('[Geolocation] Obtendo localização para IP:', ip);
      console.log('[Geolocation] API Key configurada:', !!this.apiKey);
      
      // Verificar se é IP local/privado
      if (this.isPrivateIP(ip)) {
        console.log('[Geolocation] ⚠️ IP privado detectado, usando IP público de teste para desenvolvimento');
        console.log('[Geolocation] 🔍 IP original (privado):', ip);
        console.log('[Geolocation] 🧪 IP de teste (público): 8.8.8.8');
        // Usar um IP público conhecido para testes
        ip = '8.8.8.8'; // Google DNS
      } else {
        console.log('[Geolocation] ✅ IP público detectado, usando IP real do usuário');
      }
      
      // Priorizar IPv6 se disponível
      const ipToUse = this.prioritizeIPv6(ip);
      
      const url = `https://ipinfo.io/${ipToUse}/json?token=${this.apiKey}`;
      console.log('[Geolocation] URL da requisição:', url);

      const response = await axios.get(url);
      const data = response.data;
      
      console.log('[Geolocation] Resposta da API:', data);

      const location: UserLocation = {
        state: data.region,
        city: data.city,
        zipCode: data.postal,
        country: data.country
      };

      console.log('[Geolocation] Localização obtida com sucesso:', location);
      return location;
    } catch (error) {
      console.error('[Geolocation] Erro ao obter localização:', error);
      return {
        state: '',
        city: '',
        zipCode: '',
        country: ''
      };
    }
  }

  // Função para verificar se é IP privado/local
  private isPrivateIP(ip: string): boolean {
    // IPs locais conhecidos
    const privateIPs = [
      '127.0.0.1',      // localhost
      '::1',            // localhost IPv6
      '0.0.0.0',        // all interfaces
      '10.0.0.0',       // private network
      '172.16.0.0',     // private network
      '192.168.0.0'     // private network
    ];
    
    return privateIPs.some(privateIP => ip.startsWith(privateIP));
  }

  // Função para priorizar IPv6
  private prioritizeIPv6(ip: string): string {
    // Se o IP já é IPv6, usar diretamente
    if (ip.includes(':')) {
      return ip;
    }
    
    // Se é IPv4, tentar obter IPv6
    // Para testes, vamos usar um IPv6 conhecido
    if (ip === '8.8.8.8') {
      return '2001:4860:4860::8888'; // Google IPv6
    }
    
    // Para outros IPs, tentar obter IPv6 via API
    // Por enquanto, retornar o IP original
    return ip;
  }

  // Função para obter IP real do cliente (priorizando IPv6)
  async getClientIP(req: any): Promise<string> {
    // Priorizar headers que podem conter IPv6
    const possibleHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'x-client-ip',
      'cf-connecting-ip', // Cloudflare
      'x-forwarded',
      'forwarded-for',
      'forwarded'
    ];

    for (const header of possibleHeaders) {
      const value = req.headers[header];
      if (value) {
        // Se contém IPv6 (tem ':')
        if (value.includes(':')) {
          return value.split(',')[0].trim();
        }
        // Se contém IPv4
        if (value.includes('.')) {
          return value.split(',')[0].trim();
        }
      }
    }

    // Fallback para IP da conexão
    return req.connection?.remoteAddress || req.socket?.remoteAddress || '127.0.0.1';
  }
} 