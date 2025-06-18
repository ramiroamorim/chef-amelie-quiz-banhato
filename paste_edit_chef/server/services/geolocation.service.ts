import { UserLocation } from '../models/user-session.model';

export class GeolocationService {
  private static instance: GeolocationService;
  private apiKey: string;
  private readonly API_URL = 'https://ipapi.co';

  constructor() {
    this.apiKey = process.env.GEOLOCATION_API_KEY || '';
    if (!this.apiKey) {
      console.warn('GEOLOCATION_API_KEY não configurada. O serviço pode ter limitações de requisições.');
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

  public async getLocationFromIP(ip: string): Promise<UserLocation | null> {
    try {
      if (!ip || ip === '0.0.0.0') {
        console.warn('IP inválido fornecido:', ip);
        return null;
      }

      const url = this.apiKey 
        ? `${this.API_URL}/${ip}/json/?key=${this.apiKey}`
        : `${this.API_URL}/${ip}/json/`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.error('Erro ao obter localização:', data.error);
        return null;
      }

      // Validação dos dados recebidos
      if (!data.region || !data.city || !data.postal || !data.country_name) {
        console.warn('Dados de localização incompletos:', data);
        return null;
      }

      return {
        state: data.region,
        city: data.city,
        zipCode: data.postal,
        country: data.country_name
      };
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      return null;
    }
  }
} 