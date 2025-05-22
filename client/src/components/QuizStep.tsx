import { motion } from "framer-motion";
import React from "react";
import RadioOption from "@/components/RadioOption";
import Testimonial from "@/components/Testimonial";
import { QuizStepType } from "@/types";
import { testimonials } from "@/data/quizData";

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
        className="quiz-step landing-page text-center"
      >
        {/* Title */}
        {step.title && (
          <h1>{step.title}</h1>
        )}

        {/* Text Blocks */}
        {step.textBlocks && (
          <div className="text-blocks">
            {step.textBlocks.map((text, i) => (
              <p 
                key={i} 
                className={text.highlight ? "text-primary font-medium" : ""}
                dangerouslySetInnerHTML={{ __html: text.content }}
              />
            ))}
          </div>
        )}

        {/* Image - Food images grid */}
        {step.image && (
          <div className="my-8 max-w-md mx-auto">
            <img 
              src={step.image} 
              alt={step.imageAlt || ""} 
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* Down arrow indicator */}
        <div className="arrow-down">▼</div>

        {/* Button with pulse animation */}
        {step.buttonText && (
          <div className="relative w-full md:w-auto md:mx-auto mt-4 mb-6">
            <button 
              className="btn-primary btn-pulse w-full md:w-auto md:px-16 py-5 font-medium text-lg mx-auto block"
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
      className="quiz-step"
    >
      {/* Title */}
      {step.title && (
        <h2 
          className="text-xl md:text-2xl font-medium mb-6 text-center"
          dangerouslySetInnerHTML={{ __html: step.title }}
        />
      )}

      {/* Description */}
      {step.description && (
        <p 
          className="text-center mb-6" 
          dangerouslySetInnerHTML={{ __html: step.description }}
        />
      )}

      {/* Image */}
      {step.image && (
        <img 
          src={step.image} 
          alt={step.imageAlt || ""} 
          className="w-full h-auto rounded-xl mb-4"
        />
      )}

      {/* Image Grid */}
      {step.imageGrid && (
        <div className="grid grid-cols-2 gap-4 my-6">
          {step.imageGrid.map((img, i) => (
            <img 
              key={i}
              src={img.src} 
              alt={img.alt} 
              className="w-full h-auto rounded-lg" 
            />
          ))}
        </div>
      )}

      {/* Text Blocks */}
      {step.textBlocks && (
        <div className="space-y-4 text-[#555555]">
          {step.textBlocks.map((text, i) => (
            <p 
              key={i} 
              className={text.highlight ? "text-primary font-medium" : ""}
              dangerouslySetInnerHTML={{ __html: text.content }}
            />
          ))}
        </div>
      )}

      {/* Options */}
      {step.options && (
        <div className="space-y-4 mt-8">
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
        <div className="relative w-full mt-6">
          <div className="absolute inset-0 rounded-full opacity-30" 
            style={{
              background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
              animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
            }}
          ></div>
          <button 
            className="btn-primary relative w-full py-4 px-8 flex items-center justify-center z-10" 
            onClick={onNextStep}
          >
            <span>{step.buttonText}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
