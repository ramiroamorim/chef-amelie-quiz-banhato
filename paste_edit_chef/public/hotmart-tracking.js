/**
 * Script para rastreamento na página da Hotmart
 * Este script deve ser incluído na página de checkout da Hotmart
 * para capturar os dados de geolocalização e UTM
 */

(function() {
  'use strict';
  
  // Função para obter dados do localStorage
  function getTrackingData() {
    try {
      return {
        client_ip_address: localStorage.getItem('client_ip_address') || '',
        ct: localStorage.getItem('ct') || '',
        st: localStorage.getItem('st') || '',
        country: localStorage.getItem('country') || '',
        zip: localStorage.getItem('zip') || '',
        eventID: localStorage.getItem('eventID') || '',
        userAgent: localStorage.getItem('userAgent') || navigator.userAgent || '',
        // Parâmetros UTM da URL
        utm_source: getUrlParameter('utm_source') || 'organic',
        utm_campaign: getUrlParameter('utm_campaign') || '',
        utm_medium: getUrlParameter('utm_medium') || '',
        utm_content: getUrlParameter('utm_content') || '',
        utm_term: getUrlParameter('utm_term') || '',
        // Informações da página Hotmart
        page_url: window.location.href,
        page_title: document.title,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao obter dados do localStorage:', error);
      return {};
    }
  }
  
  // Função para obter parâmetros da URL
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Função para enviar dados para o backend
  function sendTrackingData(data) {
    try {
      // Enviar para o backend do seu projeto
      fetch('https://seu-dominio.com/api/hotmart-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          eventName: 'HotmartPageView',
          source: 'hotmart'
        })
      }).then(response => {
        console.log('Dados enviados para o backend:', response.status);
      }).catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    } catch (error) {
      console.error('Erro ao enviar dados de tracking:', error);
    }
  }
  
  // Função para limpar dados do localStorage após uso
  function clearTrackingData() {
    try {
      localStorage.removeItem('client_ip_address');
      localStorage.removeItem('ct');
      localStorage.removeItem('st');
      localStorage.removeItem('country');
      localStorage.removeItem('zip');
      localStorage.removeItem('eventID');
      localStorage.removeItem('userAgent');
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }
  
  // Executar quando a página carregar
  function initTracking() {
    // Aguardar um pouco para garantir que a página carregou
    setTimeout(() => {
      const trackingData = getTrackingData();
      
      if (trackingData.eventID) {
        console.log('Dados de tracking encontrados:', trackingData);
        
        // Enviar dados para o backend
        sendTrackingData(trackingData);
        
        // Limpar dados após envio (opcional)
        // clearTrackingData();
      } else {
        console.log('Nenhum dado de tracking encontrado no localStorage');
      }
    }, 1000);
  }
  
  // Inicializar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
  
  // Expor funções globalmente para debug
  window.HotmartTracking = {
    getData: getTrackingData,
    sendData: sendTrackingData,
    clearData: clearTrackingData
  };
  
})(); 