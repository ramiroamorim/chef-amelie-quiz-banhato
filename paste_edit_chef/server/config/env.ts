import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    // Configurações do servidor
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // API Keys
    ipapiKey: process.env.IPAPI_KEY,
    googleMapsKey: process.env.GOOGLE_MAPS_API_KEY,
    
    // Configurações de segurança
    corsOrigin: process.env.CORS_ORIGIN || '*',
    
    // Configurações de banco de dados (se necessário)
    databaseUrl: process.env.DATABASE_URL,
    
    // Configurações de cache (se necessário)
    cacheEnabled: process.env.CACHE_ENABLED === 'true',
    cacheTTL: parseInt(process.env.CACHE_TTL || '3600', 10), // 1 hora em segundos
    
    // Outras configurações
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
}; 