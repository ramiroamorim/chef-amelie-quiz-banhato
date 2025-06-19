import express from 'express';

const router = express.Router();

// Rota para receber eventos do Pixel
router.post('/pixel-event', async (req, res) => {
  try {
    const data = req.body;
    console.log('Evento recebido:', data);
    
    // Aqui você pode salvar no banco de dados
    // Por exemplo: await saveEventToDatabase(data);
    
    res.json({ success: true, message: 'Evento registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao processar evento:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Rota para receber dados de tracking da Hotmart
router.post('/hotmart-tracking', async (req, res) => {
  try {
    const data = req.body;
    console.log('Dados de tracking da Hotmart recebidos:', data);
    
    // Aqui você pode salvar no banco de dados
    // Por exemplo: await saveHotmartTrackingToDatabase(data);
    
    res.json({ success: true, message: 'Dados de tracking registrados com sucesso' });
  } catch (error) {
    console.error('Erro ao processar dados de tracking da Hotmart:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

export default router; 