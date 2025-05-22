import { useState } from "react";
import { motion } from "framer-motion";

interface TestimonialData {
  message: string;
  time: string;
  image?: string;
  imageAlt?: string;
}

interface TestimonialProps {
  testimonials: TestimonialData[];
}

export default function Testimonial({ testimonials }: TestimonialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <>
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="testimonial mb-8 relative"
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
          className="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
          aria-label="Témoignage suivant"
        >
          &#10095;
        </button>
      </div>
    </>
  );
}
