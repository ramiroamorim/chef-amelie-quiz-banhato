import { Router } from 'express';
import axios from 'axios';
import { config } from '../config/env';

const router = Router();

// Rota para obter geolocalização
router.get('/location', async (req, res) => {
    try {
        // Obtém o IP do cliente
        const clientIP = req.ip || req.socket.remoteAddress;
        
        // Faz a requisição para o ipapi.co
        // Nota: ipapi.co não requer API key no plano gratuito
        const response = await axios.get(`https://ipapi.co/${clientIP}/json`);
        
        // Retorna os dados de localização
        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Erro ao obter geolocalização:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao obter geolocalização'
        });
    }
});

export default router; 