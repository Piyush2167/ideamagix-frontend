import { Check } from '@phosphor-icons/react/dist/ssr';

export default function Stepper({ currentStep, steps }) {
  return (
    <div className="flex items-start">
      {steps.map((step, index) => {
        const num = index + 1;
        const isActive = num === currentStep;
        const isCompleted = num < currentStep;

        return (
          <div key={step} className={`flex items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors
                  ${isActive ? 'bg-ink text-white' : isCompleted ? 'bg-clinic-500 text-white' : 'bg-canvas text-ink/35 border border-line'}`}
              >
                {isCompleted ? <Check size={14} weight="bold" /> : String(num).padStart(2, '0')}
              </div>
              <span className={`whitespace-nowrap text-xs font-medium ${isActive ? 'text-ink' : 'text-ink/40'}`}>
                {step}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div className={`mx-3 mt-4 h-px flex-1 ${isCompleted ? 'bg-clinic-500' : 'bg-line'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
