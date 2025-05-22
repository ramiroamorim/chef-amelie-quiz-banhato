import { motion } from "framer-motion";
import RadioOption from "@/components/RadioOption";
import { QuizStepType } from "@/types";

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
      {step.buttonText && (
        <button 
          className="btn-primary w-full mt-6 flex items-center justify-center" 
          onClick={onNextStep}
        >
          <span>{step.buttonText}</span>
        </button>
      )}
    </motion.div>
  );
}
