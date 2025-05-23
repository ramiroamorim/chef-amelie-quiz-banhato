import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@/assets/icons";

// Importação das imagens dos testemunhos
import testimonialImage1 from '@/assets/images/testimonials/testimonial1.png';
import testimonialImage2 from '@/assets/images/testimonials/testimonial2.png';
import testimonialImage3 from '@/assets/images/testimonials/testimonial3.png';
import testimonialImage4 from '@/assets/images/testimonials/testimonial4.png';
import recipeMainImage from '@/assets/images/recipes/recipes-main.png';

// Array com as imagens importadas
const testimonialImages = [
  testimonialImage1,
  testimonialImage2,
  testimonialImage3,
  testimonialImage4
];

// Usamos o tipo importado da pasta centralizada
import { TestimonialType } from "@/types/quiz";

// Renomeamos para manter compatibilidade com o código existente
type TestimonialData = TestimonialType;

interface TestimonialProps {
  testimonials: TestimonialData[];
  onComplete: () => void;
}

export default function Testimonial({ testimonials, onComplete }: TestimonialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Configuração mínima de deslize para mudar o depoimento
  const minSwipeDistance = 50;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (currentIndex === testimonials.length - 1) {
      // If we're on the last testimonial, call onComplete to proceed to the next step
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleViewProfile = () => {
    // Call onComplete directly to proceed to the next step
    onComplete();
  };

  // Handlers de toque para deslizar na tela
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Auto-avança o carrossel a cada 5 segundos (desativado se o usuário interagir)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < testimonials.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="testimonial-wrapper max-w-md mx-auto">
      <div className="mb-4 text-center text-primary font-medium">
        Faites glisser ➤ pour voir ce qu'elles disent.
      </div>
      
      <div className="h-auto min-h-[480px] overflow-hidden mb-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="testimonial h-full w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="testimonial-content p-5 bg-white rounded-2xl shadow-lg flex flex-col"
                 style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.05)', minHeight: '450px' }}>
              <p 
                className="mb-4 text-[#333333] text-sm md:text-base leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: current.message }} 
              />
              
              <div className="mt-4 mb-4">
                <div className="max-w-[500px] w-full mx-auto p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <img 
                    src={testimonialImages[currentIndex % testimonialImages.length]}
                    alt={current.imageAlt || "Recettes Chef Amélie Dupont"} 
                    className="w-full h-auto rounded-lg shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = recipeMainImage;
                    }}
                  />
                </div>
              </div>
              
              {current.time && (
                <div className="text-right mt-3">
                  <span className="text-xs text-gray-500">{current.time}</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center gap-2 my-4 px-2">
        <button 
          onClick={handlePrev}
          className="bg-black hover:bg-gray-800 transition-colors text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft />
        </button>
        
        <div className="flex gap-1.5 items-center">
          {testimonials.map((_, index) => (
            <span 
              key={index} 
              className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className={`${currentIndex === testimonials.length - 1 ? 'bg-primary hover:bg-primary/90' : 'bg-black hover:bg-gray-800'} transition-colors text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md`}
          aria-label={currentIndex === testimonials.length - 1 ? "Voir mon profil" : "Témoignage suivant"}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="text-center mt-8">
        <button 
          className="btn-primary btn-pulse w-full md:w-auto py-4 px-10 font-medium text-base rounded-full"
          onClick={handleViewProfile}
        >
          🔍 DÉCOUVRIR MON PROFIL
        </button>
      </div>
    </div>
  );
}
