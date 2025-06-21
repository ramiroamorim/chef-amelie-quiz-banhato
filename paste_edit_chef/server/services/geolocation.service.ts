import axios from 'axios';

export interface UserLocation {
  ip: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export class GeolocationService {
  private static readonly IPINFO_TOKEN = process.env.IPINFO_TOKEN;

  static async getLocation(ip: string): Promise<UserLocation> {
    try {
      // Para testes locais, retorna um mock
      if (ip === '::1' || ip === '127.0.0.1') {
        return {
          ip: ip,
          city: 'Localhost City',
          state: 'Local State',
          country: 'Local Country',
          zipCode: '00000',
        };
      }
      
      const response = await axios.get(`https://ipinfo.io/${ip}?token=${this.IPINFO_TOKEN}`);
      const { city, region, country, postal } = response.data;
      
      return {
        ip: ip,
        city: city || '',
        state: region || '',
        country: country || '',
        zipCode: postal || '',
      };
    } catch (error) {
      console.error('Erro ao buscar geolocalização:', error);
      // Retorna um objeto padrão em caso de erro
      return {
        ip: ip,
        city: '',
        state: '',
        country: '',
        zipCode: '',
      };
    }
  }
}

// Função helper exportada para uso direto
export async function getGeolocation(ip: string): Promise<UserLocation> {
  return GeolocationService.getLocation(ip);
} 