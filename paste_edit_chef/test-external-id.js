#!/usr/bin/env node

/**
 * Script para testar o processamento do external ID
 * Execute com: node test-external-id.js
 */

const axios = require('axios');

// Configuração
const BASE_URL = 'http://localhost:3000'; // Ajuste conforme sua configuração

async function testExternalId() {
  console.log('🧪 Testando processamento do external ID...\n');

  try {
    // Teste 1: External ID normal (UUID da sessão)
    console.log('📋 Teste 1: External ID (UUID da sessão)');
    const test1 = await axios.post(`${BASE_URL}/api/quiz/test-external-id`, {
      external_id: '550e8400-e29b-41d4-a716-446655440000',
      email: null
    });
    console.log('✅ Resultado:', JSON.stringify(test1.data, null, 2));
    console.log('');

    // Teste 2: Email como external ID
    console.log('📋 Teste 2: Email como external ID');
    const test2 = await axios.post(`${BASE_URL}/api/quiz/test-external-id`, {
      external_id: null,
      email: 'usuario@exemplo.com'
    });
    console.log('✅ Resultado:', JSON.stringify(test2.data, null, 2));
    console.log('');

    // Teste 3: Ambos os valores
    console.log('📋 Teste 3: Ambos os valores');
    const test3 = await axios.post(`${BASE_URL}/api/quiz/test-external-id`, {
      external_id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'usuario@exemplo.com'
    });
    console.log('✅ Resultado:', JSON.stringify(test3.data, null, 2));
    console.log('');

    // Teste 4: Valores vazios
    console.log('📋 Teste 4: Valores vazios');
    const test4 = await axios.post(`${BASE_URL}/api/quiz/test-external-id`, {
      external_id: '',
      email: ''
    });
    console.log('✅ Resultado:', JSON.stringify(test4.data, null, 2));
    console.log('');

    // Teste 5: Valores undefined
    console.log('📋 Teste 5: Valores undefined');
    const test5 = await axios.post(`${BASE_URL}/api/quiz/test-external-id`, {
      external_id: undefined,
      email: undefined
    });
    console.log('✅ Resultado:', JSON.stringify(test5.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
  }
}

async function testRealEvent() {
  console.log('🎯 Testando evento real do Facebook CAPI...\n');

  try {
    // Simular evento do frontend
    const eventData = {
      event: 'StartQuiz',
      external_id: '550e8400-e29b-41d4-a716-446655440000',
      fbp: 'fb.1.1234567890.1234567890',
      fbc: 'fb.1.1234567890.1234567890',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    console.log('📤 Enviando evento:', JSON.stringify(eventData, null, 2));
    
    const response = await axios.post(`${BASE_URL}/api/quiz/event`, eventData);
    
    console.log('✅ Resposta do servidor:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Erro no evento real:', error.response?.data || error.message);
  }
}

async function testUserData() {
  console.log('👤 Testando dados do usuário...\n');

  try {
    // Simular dados de compra
    const userData = {
      email: 'comprador@exemplo.com',
      name: 'João Silva',
      phone: '+5511999999999',
      event: 'Purchase',
      fbp: 'fb.1.1234567890.1234567890',
      fbc: 'fb.1.1234567890.1234567890'
    };

    console.log('📤 Enviando dados do usuário:', JSON.stringify(userData, null, 2));
    
    const response = await axios.post(`${BASE_URL}/api/quiz/user-data/test-session-123`, userData);
    
    console.log('✅ Resposta do servidor:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Erro nos dados do usuário:', error.response?.data || error.message);
  }
}

// Executar testes
async function runTests() {
  console.log('🚀 Iniciando testes do external ID\n');
  
  await testExternalId();
  await testRealEvent();
  await testUserData();
  
  console.log('✅ Todos os testes concluídos!');
}

// Executar se chamado diretamente
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testExternalId, testRealEvent, testUserData }; 