import { useState, useEffect } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import ProgressDots from "@/components/quiz/ProgressDots";
import QuizStep from "@/components/quiz/QuizStep";
import ProfileResult from "@/components/quiz/ProfileResult";
import SalesPage from "@/components/layout/SalesPage";
import { quizSteps } from "@/data";
import { FacebookPixel, getCommonPixelParams, generateEventId } from "@/lib/fbPixel";

// Função utilitária para criar cookies
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Função utilitária para extrair parâmetros UTM
function getUtmParams() {
  return {
    utm_source: (window as any).utm_params?.utm_source || 'organic',
    utm_campaign: (window as any).utm_params?.utm_campaign || '',
    utm_medium: (window as any).utm_params?.utm_medium || '',
    utm_content: (window as any).utm_params?.utm_content || '',
    utm_term: (window as any).utm_params?.utm_term || ''
  };
}

// Função para montar a URL do checkout da Hotmart com parâmetros customizados
function redirectToHotmartCheckout(params: any, eventId: string) {
  const baseUrl = 'https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10'; // URL correta com parâmetros da oferta
  
  // Obter parâmetros UTM
  const utmParams = getUtmParams();
  
  // Salvar dados sensíveis no localStorage (acessível via JavaScript na Hotmart)
  localStorage.setItem('client_ip_address', params.client_ip_address || '');
  localStorage.setItem('ct', params.ct || '');
  localStorage.setItem('st', params.st || '');
  localStorage.setItem('country', params.country || '');
  localStorage.setItem('zip', params.zip || '');
  localStorage.setItem('eventID', eventId);
  localStorage.setItem('userAgent', params.client_user_agent || navigator.userAgent || '');
  
  // Manter apenas os parâmetros UTM visíveis na URL
  const query = [
    `utm_source=${encodeURIComponent(utmParams.utm_source)}`,
    `utm_campaign=${encodeURIComponent(utmParams.utm_campaign)}`,
    `utm_medium=${encodeURIComponent(utmParams.utm_medium)}`,
    `utm_content=${encodeURIComponent(utmParams.utm_content)}`,
    `utm_term=${encodeURIComponent(utmParams.utm_term)}`
  ].join('&');
  
  window.location.href = `${baseUrl}?${query}`;
}

export default function QuizApp() {
  const { 
    currentStep, 
    totalSteps, 
    answers, 
    handleOptionSelect, 
    handleNextStep, 
    showResult, 
    showSalesPage
  } = useQuiz(quizSteps.length);

  // Disparar PageView com parâmetros customizados ao carregar a página
  useEffect(() => {
    const eventId = generateEventId();
    // Enviar para o Pixel (com hash)
    getCommonPixelParams().then(params => {
      // Criar cookies padronizados
      setCookie('client_ip_address', params.client_ip_address || '');
      setCookie('ct', params.ct || '');
      setCookie('st', params.st || '');
      setCookie('country', params.country || '');
      setCookie('zip', params.zip || '');
      setCookie('eventID', eventId);
      
      // Criar cookies para parâmetros UTM
      const utmParams = getUtmParams();
      
      setCookie('utm_source', utmParams.utm_source);
      setCookie('utm_campaign', utmParams.utm_campaign);
      setCookie('utm_medium', utmParams.utm_medium);
      setCookie('utm_content', utmParams.utm_content);
      setCookie('utm_term', utmParams.utm_term);
      
      FacebookPixel.trackPageView(params, eventId);
    });
  }, []);

  // Pré-carregar todas as imagens do quiz e inicializar o pixel
  useEffect(() => {
    function waitForFbq(callback: () => void) {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        callback();
      } else {
        setTimeout(() => waitForFbq(callback), 200);
      }
    }

    const initializeQuiz = async () => {
      try {
        // Iniciar o quiz e obter o ID da sessão
        const response = await fetch('/api/quiz/start', {
          method: 'POST'
        });
        const data = await response.json();
        
        if (data.success && data.sessionId) {
          // Inicializar o pixel com o ID da sessão
          FacebookPixel.initWithUserId(data.sessionId);
          // Buscar parâmetros comuns e disparar evento StartQuiz
          const eventId = generateEventId();
          getCommonPixelParams().then(params => {
            // Criar cookies padronizados
            setCookie('client_ip_address', params.client_ip_address || '');
            setCookie('ct', params.ct || '');
            setCookie('st', params.st || '');
            setCookie('country', params.country || '');
            setCookie('zip', params.zip || '');
            setCookie('eventID', eventId);
            
            // Criar cookies para parâmetros UTM
            const utmParams = getUtmParams();
            
            setCookie('utm_source', utmParams.utm_source);
            setCookie('utm_campaign', utmParams.utm_campaign);
            setCookie('utm_medium', utmParams.utm_medium);
            setCookie('utm_content', utmParams.utm_content);
            setCookie('utm_term', utmParams.utm_term);
            
            const customParams = {
              ...params,
              session_id: data.sessionId
            };
            waitForFbq(() => {
              FacebookPixel.trackQuizStart(customParams, eventId);
            });
          });
        }

        // Pré-carregar imagens
        quizSteps.forEach(step => {
          if (step.image) {
            const img = new Image();
            img.src = step.image;
          }
          if (step.imageGrid) {
            step.imageGrid.forEach(gridImg => {
              const img = new Image();
              img.src = gridImg.src;
            });
          }
        });
      } catch (error) {
        console.error('Erro ao inicializar quiz:', error);
      }
    };

    initializeQuiz();
  }, []);

  return (
    <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-6 md:py-8 flex flex-col">
      {/* Progress Dots - only show during actual quiz, not on landing or sales page */}
      {currentStep > 0 && !showResult && !showSalesPage && (
        <ProgressDots 
          currentStep={currentStep} 
          totalSteps={totalSteps - 1} 
        />
      )}

      {/* Quiz Container */}
      <div className="quiz-container slide-transition flex-1 flex flex-col justify-center">
        {/* Quiz Steps */}
        {quizSteps.map((step, index) => (
          <QuizStep
            key={index}
            step={step}
            stepNumber={index}
            isVisible={currentStep === index && !showResult && !showSalesPage}
            onOptionSelect={handleOptionSelect}
            onNextStep={handleNextStep}
          />
        ))}

        {/* Profile Result */}
        {showResult && !showSalesPage && (
          <ProfileResult onViewSuggestions={() => handleNextStep()} />
        )}

        {/* Sales Page */}
        {showSalesPage && <SalesPage />}
      </div>
    </div>
  );
}
