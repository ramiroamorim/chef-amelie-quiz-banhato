import { motion } from "framer-motion";
import RadioOption from "@/components/quiz/RadioOption";
import Testimonial from "@/components/quiz/Testimonial";
import { QuizStepType } from "@/types/quiz";
import { testimonials } from "@/data";

interface QuizStepProps {
  step: QuizStepType;
  stepNumber: number;
  isVisible: boolean;
  onOptionSelect: (name: string, value: string) => void;
  onNextStep: () => void;
}

export default function QuizStep({ 
  step, 
  stepNumber, 
  isVisible, 
  onOptionSelect, 
  onNextStep 
}: QuizStepProps) {
  if (!isVisible) return null;
  
  // Special layout for landing page (step 0)
  if (step.name === 'landing') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="quiz-step landing-page text-center px-2 sm:px-4"
      >
        {/* Title */}
        {step.title && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl">{step.title}</h1>
        )}

        {/* Text Blocks */}
        {step.textBlocks && (
          <div className="text-blocks">
            {step.textBlocks.map((text, i) => (
              <p 
                key={i} 
                className={text.highlight ? "text-primary font-medium text-sm sm:text-base md:text-lg" : "text-sm sm:text-base md:text-lg"}
                dangerouslySetInnerHTML={{ __html: text.content }}
              />
            ))}
          </div>
        )}

        {/* Image - Food images grid */}
        {step.image && (
          <div className="my-5 sm:my-6 md:my-8 max-w-md mx-auto">
            <img 
              src={step.image} 
              alt={step.imageAlt || ""} 
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* Down arrow indicator */}
        <div className="arrow-down text-2xl sm:text-3xl">▼</div>

        {/* Button with pulse animation */}
        {step.buttonText && (
          <div className="relative w-full sm:w-auto sm:mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6">
            <button 
              className="btn-primary btn-pulse w-full sm:w-auto sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 font-medium text-base sm:text-lg mx-auto block"
              onClick={onNextStep}
            >
              {step.buttonText}
            </button>
          </div>
        )}

        {/* Footer Text */}
        {step.footerText && (
          <div className="footer-text" dangerouslySetInnerHTML={{ __html: step.footerText }}></div>
        )}
      </motion.div>
    );
  }

  // Special layout for testimonial step
  if (step.isTestimonialStep) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="quiz-step"
      >
        {/* Title */}
        {step.title && (
          <h2 
            className="text-xl md:text-2xl font-medium mb-4 text-center"
            dangerouslySetInnerHTML={{ __html: step.title }}
          />
        )}

        {/* Testimonial Component */}
        <Testimonial 
          testimonials={testimonials}
          onComplete={onNextStep}
        />
      </motion.div>
    );
  }

  // Standard layout for quiz steps
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="quiz-step px-2 sm:px-4"
    >
      {/* Title */}
      {step.title && (
        <h2 
          className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 text-center"
          dangerouslySetInnerHTML={{ __html: step.title }}
        />
      )}

      {/* Description */}
      {step.description && (
        <p 
          className="text-sm sm:text-base text-center mb-4 sm:mb-6" 
          dangerouslySetInnerHTML={{ __html: step.description }}
        />
      )}

      {/* Image */}
      {step.image && (
        <img 
          src={step.image} 
          alt={step.imageAlt || ""} 
          className="w-full h-auto rounded-xl mb-3 sm:mb-4"
        />
      )}

      {/* Image Grid */}
      {step.imageGrid && (
        <div className="flex justify-center my-4 sm:my-6">
          {step.imageGrid.map((img, i) => (
            <img 
              key={i}
              src={img.src} 
              alt={img.alt} 
              className="w-full max-w-2xl h-auto rounded-lg" 
            />
          ))}
        </div>
      )}

      {/* Text Blocks */}
      {step.textBlocks && (
        <div className="space-y-3 sm:space-y-4 text-[#555555]">
          {step.textBlocks.map((text, i) => (
            <p 
              key={i} 
              className={text.highlight ? "text-primary font-medium text-sm sm:text-base" : "text-sm sm:text-base"}
              dangerouslySetInnerHTML={{ __html: text.content }}
            />
          ))}
        </div>
      )}

      {/* Options */}
      {step.options && (
        <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          {step.options.map((option, i) => (
            <RadioOption 
              key={i}
              name={step.name}
              value={option.value}
              label={option.label}
              onSelect={() => onOptionSelect(step.name, option.value)}
            />
          ))}
        </div>
      )}

      {/* Button for steps without options (like step 4) */}
      {step.buttonText && !step.options && (
        <div className="relative w-full mt-4 sm:mt-6">
          <div className="absolute inset-0 rounded-full opacity-30" 
            style={{
              background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
              animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
            }}
          ></div>
          <button 
            className="btn-primary relative w-full py-3 sm:py-4 px-6 sm:px-8 flex items-center justify-center z-10 text-sm sm:text-base" 
            onClick={onNextStep}
          >
            <span>{step.buttonText}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
