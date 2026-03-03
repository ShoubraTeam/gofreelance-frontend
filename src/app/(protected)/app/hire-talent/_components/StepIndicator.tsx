interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps): React.ReactElement {
  return (
    <div className="mb-8">
      <div className="flex items-center w-full mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className="flex items-center"
            style={{ flex: step < totalSteps ? 1 : '0 0 auto' }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                currentStep >= step
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div
                className={`flex-1 h-1 mx-2 transition-all ${
                  currentStep > step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}: {labels[currentStep - 1]}
        </p>
      </div>
    </div>
  );
}
