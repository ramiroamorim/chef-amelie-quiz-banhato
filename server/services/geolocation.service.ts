import { UserLocation } from '../models/user-session.model';

export class GeolocationService {
  private static instance: GeolocationService;
  private apiKey: string;

  private constructor() {
    // Você precisará obter uma chave de API de um serviço de geolocalização
    this.apiKey = process.env.GEOLOCATION_API_KEY || '';
  }

  public static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  public async getLocationFromIP(ip: string): Promise<UserLocation | null> {
    try {
      // Exemplo usando ipapi.co (você pode trocar por outro serviço)
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();

      if (data.error) {
        console.error('Erro ao obter localização:', data.error);
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