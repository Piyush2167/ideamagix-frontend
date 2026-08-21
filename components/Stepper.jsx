export default function Stepper({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-between mb-4 w-full">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;
        
        return (
          <div key={index} className="flex flex-col items-center relative w-full">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors shadow-sm
                ${isActive ? 'bg-slate-900 text-white ring-4 ring-slate-100' : 
                  isCompleted ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
            <div className={`text-xs mt-3 font-semibold tracking-wide uppercase ${isActive ? 'text-slate-900' : isCompleted ? 'text-blue-600' : 'text-slate-400'}`}>
              {step}
            </div>
            
            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div 
                className={`absolute top-4 left-[50%] right-[-50%] h-[2px] -z-10 transition-colors
                  ${isCompleted ? 'bg-blue-600' : 'bg-slate-200'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
