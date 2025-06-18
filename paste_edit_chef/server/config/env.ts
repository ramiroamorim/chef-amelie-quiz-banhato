import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    // API Keys
    ipapiKey: process.env.IPAPI_KEY,
    googleMapsKey: process.env.GOOGLE_MAPS_KEY,
    
    // Configurações do servidor
    port: process.env.PORT || 5001,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Outras configurações
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
}; 