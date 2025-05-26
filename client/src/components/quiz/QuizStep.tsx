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

        {/* Image - Food images grid com otimização */}
        {step.image && (
          <div className="my-3 sm:my-4 md:my-5 max-w-md mx-auto">
            <img 
              src={step.image} 
              alt={step.imageAlt || ""} 
              className="w-full h-auto"
              loading="eager"
              decoding="async"
              style={{ 
                maxHeight: "300px",
                objectFit: "contain"
              }}
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
      {/* Layout especial para Chef Profile */}
      {step.name === 'chef_profile' && (
        <div className="w-full max-w-lg mx-auto">
          {/* Image no topo */}
          {step.image && (
            <div className="w-full mb-6">
              <img 
                src={step.image} 
                alt={step.imageAlt || ""} 
                className="w-full h-auto rounded-xl shadow-lg"
                loading="eager"
                decoding="async"
                style={{ 
                  maxHeight: "280px",
                  objectFit: "cover",
                  aspectRatio: "16/9"
                }}
              />
            </div>
          )}
          
          {/* Title */}
          {step.title && (
            <h2 
              className="text-xl font-medium mb-2 text-left text-[#333333]"
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              }}
              dangerouslySetInnerHTML={{ __html: step.title }}
            />
          )}
          
          {/* Description */}
          {step.description && (
            <p 
              className="text-sm text-left mb-6 text-[#666666] italic"
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              }}
              dangerouslySetInnerHTML={{ __html: step.description }}
            />
          )}
        </div>
      )}
      
      {/* Title padrão para outros steps */}
      {step.title && step.name !== 'chef_profile' && (
        <h2 
          className="sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 text-center text-[16px]"
          dangerouslySetInnerHTML={{ __html: step.title }}
        />
      )}
      {/* Description padrão */}
      {step.description && step.name !== 'chef_profile' && (
        <p 
          className="text-sm sm:text-base text-center mb-4 sm:mb-6" 
          dangerouslySetInnerHTML={{ __html: step.description }}
        />
      )}
      {/* Image padrão para outros steps */}
      {step.image && step.name !== 'chef_profile' && (
        <img 
          src={step.image} 
          alt={step.imageAlt || ""} 
          className="w-full h-auto rounded-xl mb-3 sm:mb-4"
          loading="eager"
          decoding="async"
          style={{ 
            maxHeight: "400px",
            objectFit: "contain"
          }}
        />
      )}
      {/* Image Grid com otimização */}
      {step.imageGrid && (
        <div className="flex justify-center my-4 sm:my-6">
          {step.imageGrid.map((img, i) => (
            <img 
              key={i}
              src={img.src} 
              alt={img.alt} 
              className="w-full max-w-2xl h-auto rounded-lg"
              loading="eager"
              decoding="async"
              style={{ 
                maxHeight: "280px",
                objectFit: "contain"
              }}
            />
          ))}
        </div>
      )}
      {/* Text Blocks - Layout especial para Chef Profile */}
      {step.textBlocks && step.name === 'chef_profile' && (
        <div className="w-full max-w-lg mx-auto space-y-4 text-left">
          {step.textBlocks.map((text, i) => (
            <p 
              key={i} 
              className={text.highlight ? 
                "text-[#E07260] font-medium text-base leading-relaxed" : 
                "text-[#333333] text-base leading-relaxed"
              }
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                lineHeight: "1.6"
              }}
              dangerouslySetInnerHTML={{ __html: text.content }}
            />
          ))}
        </div>
      )}
      {/* Text Blocks padrão */}
      {step.textBlocks && step.name !== 'chef_profile' && (
        <div className="space-y-2 sm:space-y-3 text-[#555555]">
          {step.textBlocks.map((text, i) => (
            <p 
              key={i} 
              className={text.highlight ? "text-primary font-medium text-xs sm:text-sm" : "text-xs sm:text-sm"}
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
      {/* Button for steps without options - Layout especial para Chef Profile */}
      {step.buttonText && !step.options && step.name === 'chef_profile' && (
        <div className="relative w-full mt-8 flex justify-center">
          <div className="absolute inset-0 rounded-full opacity-30 flex justify-center items-center" 
            style={{
              background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
              animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite",
              width: "fit-content",
              margin: "0 auto"
            }}
          ></div>
          <button 
            className="bg-[#E07260] hover:bg-[#D66650] text-white font-medium px-6 py-3 rounded-full transition-colors shadow-lg flex items-center gap-2 relative z-10"
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              fontSize: "16px"
            }}
            onClick={onNextStep}
          >
            <span>👉</span>
            {step.buttonText}
          </button>
        </div>
      )}
      {/* Button padrão para outros steps */}
      {step.buttonText && !step.options && step.name !== 'chef_profile' && (
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
