#!/usr/bin/env node

/**
 * Script para detectar confusão entre event_id e external_id
 * Execute com: node debug-event-id-confusion.js
 */

import axios from 'axios';

// Configuração
const BASE_URL = 'http://localhost:3000';

async function testEventIdConfusion() {
  console.log('🔍 [DEBUG] Testando possível confusão entre event_id e external_id...\n');

  try {
    // Teste 1: Verificar se o event_id está sendo usado como external_id
    console.log('📋 Teste 1: Verificar se event_id está sendo usado como external_id');
    
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 15)}`;
    const sessionId = '550e8400-e29b-41d4-a716-446655440000';
    
    console.log('Event ID gerado:', eventId);
    console.log('Session ID (deveria ser external_id):', sessionId);
    
    // Simular evento com event_id e external_id separados
    const eventData = {
      event: 'StartQuiz',
      external_id: sessionId, // Este deveria ser o UUID da sessão
      event_id: eventId, // Este deveria ser só para deduplicação
      fbp: 'fb.1.1234567890.1234567890',
      fbc: 'fb.1.1234567890.1234567890',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    console.log('📤 Enviando evento com event_id e external_id separados:');
    console.log(JSON.stringify(eventData, null, 2));
    
    const response = await axios.post(`${BASE_URL}/api/quiz/event`, eventData);
    
    console.log('✅ Resposta do servidor:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Erro no teste 1:', error.response?.data || error.message);
  }

  try {
    // Teste 2: Verificar se o event_id da query string está sendo usado como external_id
    console.log('📋 Teste 2: Verificar se event_id da query string está sendo usado como external_id');
    
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 15)}`;
    
    // Simular requisição com event_id na query string
    const urlWithEventId = `${BASE_URL}/api/quiz/test-external-id?event_id=${eventId}`;
    
    console.log('URL com event_id na query string:', urlWithEventId);
    
    const response = await axios.post(urlWithEventId, {
      external_id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'usuario@exemplo.com'
    });
    
    console.log('✅ Resposta do servidor:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Erro no teste 2:', error.response?.data || error.message);
  }

  try {
    // Teste 3: Verificar se há confusão no buildHotmartUrl
    console.log('📋 Teste 3: Verificar se há confusão no buildHotmartUrl');
    
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 15)}`;
    const sessionId = '550e8400-e29b-41d4-a716-446655440000';
    
    // Simular dados que seriam passados para buildHotmartUrl
    const params = {
      client_ip_address: '192.168.1.1',
      ct: 'hash_da_cidade',
      st: 'hash_do_estado',
      country: 'hash_do_pais',
      zip: 'hash_do_cep',
      client_user_agent: 'Mozilla/5.0...'
    };
    
    console.log('Parâmetros para buildHotmartUrl:');
    console.log('params:', params);
    console.log('eventId:', eventId);
    console.log('sessionId (deveria ser external_id):', sessionId);
    
    // Simular o que acontece no buildHotmartUrl
    const urlParams = new URLSearchParams();
    urlParams.append('event_id', eventId); // ✅ Correto: event_id na query string
    // urlParams.append('external_id', sessionId); // ❌ ERRADO: external_id não deveria ir na query string
    
    console.log('Query string gerada:', urlParams.toString());
    console.log('');

  } catch (error) {
    console.error('❌ Erro no teste 3:', error.message);
  }

  try {
    // Teste 4: Verificar se o external_id está sendo enviado corretamente no Facebook CAPI
    console.log('📋 Teste 4: Verificar external_id no Facebook CAPI');
    
    const sessionId = '550e8400-e29b-41d4-a716-446655440000';
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 15)}`;
    
    // Simular payload do Facebook CAPI
    const facebookPayload = {
      event_name: 'StartQuiz',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId, // ✅ Correto: event_id para deduplicação
      user_data: {
        external_id: sessionId, // ✅ Correto: external_id é o UUID da sessão
        client_ip_address: '192.168.1.1',
        client_user_agent: 'Mozilla/5.0...'
      }
    };
    
    console.log('Payload do Facebook CAPI:');
    console.log(JSON.stringify(facebookPayload, null, 2));
    console.log('');
    
    console.log('✅ Verificações:');
    console.log('- event_id está sendo usado para deduplicação:', facebookPayload.event_id === eventId);
    console.log('- external_id está sendo usado como identificador do usuário:', facebookPayload.user_data.external_id === sessionId);
    console.log('- event_id e external_id são diferentes:', facebookPayload.event_id !== facebookPayload.user_data.external_id);

  } catch (error) {
    console.error('❌ Erro no teste 4:', error.message);
  }
}

async function checkCodePatterns() {
  console.log('🔍 [DEBUG] Verificando padrões no código...\n');
  
  console.log('📋 Padrões que podem causar confusão:');
  console.log('');
  console.log('1. ❌ ERRADO - Usar event_id como external_id:');
  console.log('   external_id: eventId // ❌ ERRADO!');
  console.log('');
  console.log('2. ✅ CORRETO - Usar sessionId como external_id:');
  console.log('   external_id: sessionId // ✅ CORRETO!');
  console.log('');
  console.log('3. ❌ ERRADO - Colocar external_id na query string:');
  console.log('   urlParams.append("external_id", sessionId); // ❌ ERRADO!');
  console.log('');
  console.log('4. ✅ CORRETO - Colocar event_id na query string:');
  console.log('   urlParams.append("event_id", eventId); // ✅ CORRETO!');
  console.log('');
  console.log('5. ✅ CORRETO - Enviar external_id no body da requisição:');
  console.log('   body: { external_id: sessionId } // ✅ CORRETO!');
  console.log('');
}

async function runDebug() {
  console.log('🚀 Iniciando debug da confusão entre event_id e external_id\n');
  
  await checkCodePatterns();
  await testEventIdConfusion();
  
  console.log('✅ Debug concluído!');
  console.log('');
  console.log('💡 Dicas para evitar confusão:');
  console.log('- event_id: usado apenas para deduplicação de eventos');
  console.log('- external_id: usado como identificador único do usuário (UUID da sessão)');
  console.log('- Nunca use event_id como external_id');
  console.log('- Nunca coloque external_id na query string');
  console.log('- Sempre envie external_id no body da requisição');
}

// Executar se chamado diretamente
runDebug().catch(console.error); 