import { useState } from "react";

export type Answer = {
  [key: string]: string;
};

export function useQuiz(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer>({});
  const [showResult, setShowResult] = useState(false);
  const [showSalesPage, setShowSalesPage] = useState(false);

  const handleOptionSelect = (name: string, value: string) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
    
    // Auto advance to next step after selection
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else if (showResult) {
      setShowSalesPage(true);
    } else {
      setShowResult(true);
    }
  };

  return {
    currentStep,
    totalSteps,
    answers,
    handleOptionSelect,
    handleNextStep,
    showResult,
    showSalesPage
  };
}
