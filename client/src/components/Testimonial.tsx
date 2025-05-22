import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@/assets/icons";

interface TestimonialData {
  message: string;
  time: string;
  image?: string;
  imageAlt?: string;
}

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
      <div className="mb-3 text-center text-primary font-medium">
        Faites glisser ➤ pour voir ce qu'elles disent.
      </div>
      
      <div className="min-h-[400px] h-auto overflow-hidden mb-4 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="testimonial relative h-full w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="testimonial-content p-4 bg-[#f8f8f8] rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
              <p 
                className="mb-3 text-[#333333] text-sm md:text-base" 
                dangerouslySetInnerHTML={{ __html: current.message }} 
              />
              
              {current.image && (
                <div className="flex-grow flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center py-2">
                    <img 
                      src={current.image} 
                      alt={current.imageAlt || "Témoignage"} 
                      className="rounded-lg max-w-full max-h-[350px] shadow-sm"
                      style={{ 
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  </div>
                </div>
              )}
              
              {current.time && (
                <div className="text-right mt-2">
                  <span className="text-xs text-gray-500">{current.time}</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-4 my-6">
        <button 
          onClick={handlePrev}
          className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft />
        </button>
        
        <div className="flex gap-1 items-center">
          {testimonials.map((_, index) => (
            <span 
              key={index} 
              className={`block w-2 h-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className={`${currentIndex === testimonials.length - 1 ? 'bg-primary' : 'bg-black'} text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md`}
          aria-label={currentIndex === testimonials.length - 1 ? "Voir mon profil" : "Témoignage suivant"}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="text-center mt-8">
        <button 
          className="btn-primary btn-pulse w-full md:w-auto py-4 px-10 font-medium text-base rounded-full"
          onClick={onComplete}
        >
          🔍 DÉCOUVRIR MON PROFIL
        </button>
      </div>
    </div>
  );
}
