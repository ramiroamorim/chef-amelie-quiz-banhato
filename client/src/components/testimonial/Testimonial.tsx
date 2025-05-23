import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Importação do tipo TestimonialType
import { TestimonialType } from "@/types/quiz";

// Interface para definir a estrutura de um testemunho
interface TestimonialProps {
  testimonials: TestimonialType[];
  onComplete: () => void;
}

/**
 * Componente de Carrossel de Testemunhos
 * Exibe um slider com diversos testemunhos e imagens de usuários satisfeitos
 * 
 * Este componente foi movido para /components/testimonial para seguir
 * a convenção de organização por domínio
 */
export function Testimonial({ testimonials, onComplete }: TestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = 5000; // Tempo entre transições automáticas (ms)

  // Controla a navegação automática entre testemunhos
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Pausa a navegação automática quando o usuário interage com o slider
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  
  // Funções para navegar entre os testemunhos
  const goToNext = () => {
    pauseAutoPlay();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const goToPrevious = () => {
    pauseAutoPlay();
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-slider my-8 relative">
      <div className="testimonial-container bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="testimonial-image w-full md:w-1/3">
              <img
                src={testimonials[activeIndex].image || testimonialImages[activeIndex % testimonialImages.length]}
                alt={testimonials[activeIndex].imageAlt || `Témoignage ${activeIndex + 1}`}
                className="w-full h-auto rounded-xl"
              />
            </div>
            
            <div className="testimonial-content w-full md:w-2/3">
              <div className="mb-4">
                <p className="text-[#555555] italic mb-2">
                  "{testimonials[activeIndex].message}"
                </p>
                <p className="text-sm text-gray-400">
                  {testimonials[activeIndex].time}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navegação */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6 text-[#A85544]" aria-hidden="true" />
          </button>
          
          <div className="flex space-x-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  pauseAutoPlay();
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-[#A85544]" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6 text-[#A85544]" aria-hidden="true" />
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="relative inline-block">
          <div 
            className="absolute inset-0 rounded-full opacity-30" 
            style={{
              background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
              animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
            }}
          ></div>
          <button 
            className="btn-primary relative z-10 py-4 px-10"
            onClick={onComplete}
          >
            Découvrir mon profil gourmand
          </button>
        </div>
      </div>
    </div>
  );
}