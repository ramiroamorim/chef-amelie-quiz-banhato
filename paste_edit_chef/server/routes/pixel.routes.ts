import { Router } from 'express';

const router = Router();

// Endpoint para receber eventos do Pixel do frontend
router.post('/pixel-event', (req, res) => {
  const eventData = req.body;
  // Aqui você pode salvar no banco, enviar para outro serviço, etc.
  console.log('Evento Pixel recebido do frontend:', eventData);
  res.status(200).json({ success: true });
});

export default router; 