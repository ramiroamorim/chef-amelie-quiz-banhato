import axios from 'axios';

// Configurações do Facebook (substitua pelos seus valores reais)
const PIXEL_ID = '123456789012345'; // Substitua pelo seu Pixel ID
const ACCESS_TOKEN = 'seu_access_token_aqui'; // Substitua pelo seu Access Token

// Função para simular o envio de evento
async function testFacebookEvent() {
  const testData = {
    event_name: 'TestEvent',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: 'https://seusite.com',
    user_data: {
      external_id: ['user-uuid-test-123'], // Array com o external_id
      client_ip_address: '192.168.1.1',
      client_user_agent: 'Mozilla/5.0 (Test Browser)',
      fbp: 'fb.1.1629123456789.1234567890',
      fbc: null
    },
    custom_data: {
      content_name: 'Test Content',
      value: 100,
      currency: 'BRL'
    }
  };

  const payload = {
    data: [testData]
  };

  console.log('🚀 Enviando dados para o Facebook:');
  console.log('📊 Payload completo:');
  console.log(JSON.stringify(payload, null, 2));
  
  console.log('\n🔍 Dados específicos do external_id:');
  console.log('external_id (bruto):', testData.user_data.external_id[0]);
  console.log('external_id (tipo):', typeof testData.user_data.external_id[0]);
  console.log('external_id (hash esperado):', await generateSHA256(testData.user_data.external_id[0]));

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('\n✅ Resposta do Facebook:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.events_received) {
      console.log('\n🎉 Evento recebido com sucesso pelo Facebook!');
      console.log('Eventos recebidos:', response.data.events_received);
    }

  } catch (error) {
    console.error('\n❌ Erro ao enviar para o Facebook:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dados:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Erro:', error.message);
    }
  }
}

// Função para gerar hash SHA256 (igual ao servidor)
async function generateSHA256(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Função para testar via seu servidor local
async function testViaLocalServer() {
  console.log('\n🔄 Testando via seu servidor local...\n');
  
  try {
    const response = await axios.post('http://localhost:3000/api/quiz/event', {
      event: 'LocalServerTest',
      external_id: 'user-uuid-local-test-456',
      user_agent: 'Local Test Agent',
      fbp: 'fb.1.1629123456789.1234567890',
      fbc: null
    });

    console.log('✅ Resposta do servidor local:');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Erro no servidor local:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dados:', error.response.data);
    } else {
      console.error('Erro:', error.message);
    }
  }
}

// Executar os testes
async function runTests() {
  console.log('🧪 TESTE DE RECEPÇÃO DO FACEBOOK');
  console.log('================================\n');
  
  // Teste 1: Direto para o Facebook (requer credenciais)
  console.log('1️⃣ Teste direto para o Facebook:');
  await testFacebookEvent();
  
  // Teste 2: Via servidor local
  console.log('\n2️⃣ Teste via servidor local:');
  await testViaLocalServer();
}

// Executar se for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { testFacebookEvent, testViaLocalServer }; 