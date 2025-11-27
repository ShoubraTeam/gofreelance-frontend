interface StepIndicatorProps {
  currentStep: 1 | 2;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps): React.ReactElement {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentStep === index + 1 ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-center text-gray-600 mt-2">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
