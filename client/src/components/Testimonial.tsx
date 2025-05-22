import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="testimonial-wrapper">
      <div className="mb-3 text-center text-primary font-medium">
        Faites glisser ➤ pour voir ce qu'elles disent.
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="testimonial mb-6 relative"
          style={{ background: '#FFFDF9', borderRadius: '12px' }}
        >
          <div className="testimonial-content p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: current.message }} />
            
            {current.image && (
              <img 
                src={current.image} 
                alt={current.imageAlt || "Témoignage"} 
                className="w-full h-auto rounded-lg"
              />
            )}
            <span className="text-xs text-gray-500">{current.time}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center gap-2 mb-8">
        <button 
          onClick={handlePrev}
          className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center"
          aria-label="Témoignage précédent"
        >
          &#10094;
        </button>
        <button 
          onClick={handleNext}
          className={`${currentIndex === testimonials.length - 1 ? 'bg-primary' : 'bg-gray-300'} text-white w-8 h-8 rounded-full flex items-center justify-center`}
          aria-label={currentIndex === testimonials.length - 1 ? "Voir mon profil" : "Témoignage suivant"}
        >
          &#10095;
        </button>
      </div>

      <div className="text-center mt-8">
        <button 
          className="btn-primary w-full md:w-auto py-4 px-10 font-medium text-base rounded-full"
          onClick={onComplete}
        >
          🔍 DÉCOUVRIR MON PROFIL
        </button>
      </div>
    </div>
  );
}
