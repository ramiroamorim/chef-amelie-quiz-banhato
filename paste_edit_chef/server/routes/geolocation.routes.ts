import { Router } from 'express';
import axios from 'axios';
import { config } from '../config/env';

const router = Router();

// Rota de teste para verificar a configuração
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'API de geolocalização está funcionando',
        config: {
            hasIpapiKey: !!config.ipapiKey,
            hasGoogleMapsKey: !!config.googleMapsKey,
            environment: config.nodeEnv,
            port: config.port
        }
    });
});

// Rota para obter geolocalização
router.get('/location', async (req, res) => {
    try {
        // Obtém o IP do cliente
        const clientIP = req.ip || req.socket.remoteAddress;
        console.log('Obtendo localização para IP:', clientIP);
        
        // Faz a requisição para o ip-api.com com a API key
        const response = await axios.get(`http://ip-api.com/json/${clientIP}`, {
            headers: {
                'Authorization': `Token ${config.ipapiKey}`
            }
        });
        console.log('Resposta recebida:', response.data);
        
        res.json({
            success: true,
            data: response.data
        });
    } catch (error: any) {
        console.error('Erro detalhado:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        res.status(500).json({
            success: false,
            error: 'Erro ao obter geolocalização',
            details: error.message
        });
    }
});

// Rota para testar com IP específico
router.get('/location/:ip', async (req, res) => {
    try {
        const { ip } = req.params;
        console.log('Consultando localização para IP:', ip);
        
        // Consulta o ip-api.com com a API key
        const response = await axios.get(`http://ip-api.com/json/${ip}`, {
            headers: {
                'Authorization': `Token ${config.ipapiKey}`
            }
        });
        console.log('Resposta recebida:', response.data);
        
        res.json({
            success: true,
            data: response.data
        });
    } catch (error: any) {
        console.error('Erro detalhado:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        res.status(500).json({
            success: false,
            error: 'Erro ao obter geolocalização',
            details: error.message
        });
    }
});

export default router; 