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
    utm_term: (window as any).utm_params?.utm_term || '',
    xcod: (window as any).utm_params?.xcod || 'organic'
  };
}

// Função para montar a URL do checkout da Hotmart com parâmetros customizados
function redirectToHotmartCheckout(params: any, eventId: string) {
  const baseUrl = 'https://pay.hotmart.com/D98080625O'; // hotmart Checkout
  
  // Obter parâmetros UTM
  const utmParams = getUtmParams();
  
  const query = [
    `client_ip_address=${encodeURIComponent(params.client_ip_address || '')}`,
    `ct=${encodeURIComponent(params.ct || '')}`,
    `st=${encodeURIComponent(params.st || '')}`,
    `country=${encodeURIComponent(params.country || '')}`,
    `zip=${encodeURIComponent(params.zip || '')}`,
    `eventID=${encodeURIComponent(eventId)}`,
    `userAgent=${encodeURIComponent(params.client_user_agent || navigator.userAgent || '')}`,
    // Parâmetros UTM
    `utm_source=${encodeURIComponent(utmParams.utm_source)}`,
    `utm_campaign=${encodeURIComponent(utmParams.utm_campaign)}`,
    `utm_medium=${encodeURIComponent(utmParams.utm_medium)}`,
    `utm_content=${encodeURIComponent(utmParams.utm_content)}`,
    `utm_term=${encodeURIComponent(utmParams.utm_term)}`,
    `xcod=${encodeURIComponent(utmParams.xcod)}`
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
      setCookie('xcod', utmParams.xcod);
      
      FacebookPixel.trackPageView(params, eventId);
    });
    // Enviar para o backend (dados originais)
    fetch('https://ipinfo.io/json?token=1ad4cf7c8cc087')
      .then(res => res.json())
      .then(info => {
        const rawData = {
          ip: info.ip,
          city: info.city,
          region: info.region,
          country: info.country,
          postal: info.postal,
          userAgent: navigator.userAgent,
          eventName: 'PageView',
          eventID: eventId,
          // Parâmetros UTM
          ...getUtmParams()
        };
        fetch('/api/pixel-event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rawData)
        });
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
            setCookie('xcod', utmParams.xcod);
            
            const customParams = {
              ...params,
              session_id: data.sessionId
            };
            waitForFbq(() => {
              FacebookPixel.trackQuizStart(customParams, eventId);
            });
          });
          // Enviar para o backend (dados originais)
          fetch('https://ipinfo.io/json?token=1ad4cf7c8cc087')
            .then(res => res.json())
            .then(info => {
              const rawData = {
                ip: info.ip,
                city: info.city,
                region: info.region,
                country: info.country,
                postal: info.postal,
                userAgent: navigator.userAgent,
                eventName: 'StartQuiz',
                eventID: eventId,
                session_id: data.sessionId,
                // Parâmetros UTM
                ...getUtmParams()
              };
              fetch('/api/pixel-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rawData)
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
