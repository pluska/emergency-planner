interface CardProps {
  title: string;
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

const Card = ({ title, children, currentStep, totalSteps }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-header font-semibold text-gray-800">{title}</h2>
        {currentStep && totalSteps && (
          <span className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card; 