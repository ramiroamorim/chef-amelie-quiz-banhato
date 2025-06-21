import { useState, useEffect } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import ProgressDots from "@/components/quiz/ProgressDots";
import QuizStep from "@/components/quiz/QuizStep";
import ProfileResult from "@/components/quiz/ProfileResult";
import SalesPage from "@/components/layout/SalesPage";
import { quizSteps } from "@/data";
import { FacebookPixel, getCommonPixelParams, generateEventId } from "@/lib/fbPixel";

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
      // NÃO criar cookies - usar apenas Utmify
      console.log('✅ [UTMIFY ONLY] QuizApp - Nenhum cookie criado, usando apenas Utmify');
      
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
            // NÃO criar cookies - usar apenas Utmify
            console.log('✅ [UTMIFY ONLY] QuizApp - Nenhum cookie criado na inicialização, usando apenas Utmify');
            
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
