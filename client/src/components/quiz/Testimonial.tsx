import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@/assets/icons";

// Importação das imagens de forma centralizada
import { TestimonialImages, RecipeImages } from "@/assets/imageExports";

// Array com as imagens importadas
const testimonialImages = [
  TestimonialImages.testimonial1,
  TestimonialImages.testimonial2,
  TestimonialImages.testimonial3,
  TestimonialImages.testimonial4
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

  // Pré-carregamento de imagens para melhorar performance
  useEffect(() => {
    // Pré-carregar todas as imagens do carrossel
    testimonialImages.forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

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
    <div className="testimonial-wrapper max-w-md mx-auto px-2 sm:px-4">
      <div className="mb-3 sm:mb-4 text-center text-primary font-medium text-sm sm:text-base">
        Faites glisser ➤ pour voir ce qu'elles disent.
      </div>
      
      <div className="h-auto min-h-[350px] sm:min-h-[400px] md:min-h-[450px] overflow-hidden mb-3 sm:mb-4 relative">
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
            <div className="testimonial-content p-2 sm:p-4 bg-white rounded-2xl shadow-lg flex flex-col"
                 style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.05)', minHeight: '320px', height: '100%' }}>
              
              <div className="mt-2 sm:mt-3 mb-2 sm:mb-3 relative flex-grow flex justify-center items-center">
                <div className="max-w-full w-full h-[250px] mx-auto p-1 sm:p-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                  {/* Botões de navegação laterais */}
                  <button 
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-black/80 hover:bg-black transition-colors text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md z-10"
                    aria-label="Témoignage précédent"
                  >
                    <ChevronLeft />
                  </button>
                  
                  <img 
                    src={testimonialImages[currentIndex % testimonialImages.length]}
                    alt={current.imageAlt || "Recettes Chef Amélie Dupont"} 
                    className="w-full rounded-lg shadow-sm"
                    loading="eager"
                    decoding="async"
                    style={{ 
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = RecipeImages.main;
                    }}
                  />
                  
                  <button 
                    onClick={handleNext}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 ${currentIndex === testimonials.length - 1 ? 'bg-primary/90 hover:bg-primary' : 'bg-black/80 hover:bg-black'} transition-colors text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md z-10`}
                    aria-label={currentIndex === testimonials.length - 1 ? "Voir mon profil" : "Témoignage suivant"}
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
              
              {current.time && (
                <div className="text-right mt-2 sm:mt-3">
                  <span className="text-xs text-gray-500">{current.time}</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-2 my-3 sm:my-4 px-0 sm:px-2">
        <div className="flex gap-1 sm:gap-1.5 items-center">
          {testimonials.map((_, index) => (
            <span 
              key={index} 
              className={`block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-5 sm:mt-8">
        <button 
          className="btn-primary btn-pulse w-full sm:w-auto py-3 sm:py-4 px-6 sm:px-10 font-medium text-sm sm:text-base rounded-full"
          onClick={handleViewProfile}
        >
          🔍 DÉCOUVRIR MON PROFIL
        </button>
      </div>
    </div>
  );
}
