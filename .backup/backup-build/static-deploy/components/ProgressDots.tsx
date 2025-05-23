interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressDots({ currentStep, totalSteps }: ProgressDotsProps) {
  return (
    <div className="flex justify-center mb-8">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full mx-1 ${
            i < currentStep ? "bg-primary" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
