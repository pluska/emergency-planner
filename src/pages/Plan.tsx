import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { beginSteps, determineRecommendedPlan } from '../plans/begin';
import { storageSteps } from '../plans/storage';
import { emergencyFundSteps } from '../plans/emergency-fund';
import { emergencyBagpackSteps } from '../plans/emergency-bagpack';
import { validateInput } from '../utils/validation';
import { PlanStep } from '../types/plans';
import { generatePlanFromPrompt } from '../services/openai';
import EmergencyChecklist from '../components/EmergencyChecklist';

type PlanType = 'emergency-bagpack' | 'storage' | 'emergency-fund' | null;

interface RecommendationResult {
  primaryRecommendation: PlanType;
  secondaryRecommendation?: PlanType;
  reasoning: string;
}

const Plan = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [planType, setPlanType] = useState<PlanType>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isGeneratingPlanError, setIsGeneratingPlanError] = useState(false);
  const [checklistData, setChecklistData] = useState('');

  // Determine which steps to use based on the plan type
  const getSteps = () => {
    if (!planType) return beginSteps;
    
    switch (planType) {
      case 'storage':
        return storageSteps;
      case 'emergency-fund':
        return emergencyFundSteps;
      case 'emergency-bagpack':
        return emergencyBagpackSteps;
      default:
        return beginSteps;
    }
  };

  useEffect(() => {
    const type = searchParams.get('type') as PlanType;
    if (type) {
      setPlanType(type);
    }
  }, [searchParams]);

  const handleInputChange = (key: string, value: string, field: PlanStep['fields'][0]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    
    // Validate on change
    const error = validateInput(value, field);
    if (error) {
      setErrors(prev => ({ ...prev, [key]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateStep = (stepData: PlanStep) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    stepData.fields.forEach(field => {
      const value = formData[field.key] || '';
      const error = validateInput(value, field);
      
      if (error) {
        newErrors[field.key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    const steps = getSteps();
    const currentStepData = steps[currentStep - 1];
    
    if (validateStep(currentStepData)) {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        // If we're in begin steps, show recommendation
        if (!planType) {
          const result = determineRecommendedPlan(formData);
          setRecommendation(result);
        } else {
          // Generate plan-specific result
          generatePlan();
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generatePlan = async () => {
    if (!planType) return;

    setIsGeneratingPlan(true);


    try {
      const planContent = await generatePlanFromPrompt(planType, formData);

      setIsGeneratingPlan(false);


      setChecklistData(planContent);
    } catch (error) {
      setIsGeneratingPlan(false);
      console.log('Error generating plan:', error);
      setIsGeneratingPlanError(true);
    }
  };

  const handleRecommendationSelect = (selectedPlan: PlanType) => {
    navigate(`/plan?type=${selectedPlan}`);
    setRecommendation(null);
    setCurrentStep(1);
    setFormData({});
  };

  // Show recommendation result
  if (recommendation) {
    return (
      <div className="min-h-screen bg-secondary p-8">
        <div className="max-w-4xl mx-auto">
          <Card title="Your Recommended Plan">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-header font-semibold text-primary mb-2">
                  Primary Recommendation
                </h3>
                <p className="text-gray-700 mb-4">{recommendation.reasoning}</p>
                <button
                  onClick={() => handleRecommendationSelect(recommendation.primaryRecommendation)}
                  className="bg-primary hover:bg-primary/90 text-white font-header font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Start {recommendation.primaryRecommendation?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Plan
                </button>
              </div>

              {recommendation.secondaryRecommendation && (
                <div className="text-center pt-6 border-t">
                  <h3 className="text-lg font-header font-semibold text-gray-700 mb-2">
                    Alternative Option
                  </h3>
                  <button
                    onClick={() => handleRecommendationSelect(recommendation.secondaryRecommendation!)}
                    className="bg-third hover:bg-third/90 text-white font-header font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Try {recommendation.secondaryRecommendation?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Plan Instead
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const steps = getSteps();
  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-4xl mx-auto">
        {checklistData === '' && (
        <Card
          title={currentStepData.title}
          currentStep={currentStep}
          totalSteps={steps.length}
        >
          {currentStepData.fields.map(field => (
            field.type === 'input' ? (
              <Input
                key={field.key}
                label={field.label}
                value={formData[field.key] || ''}
                onChange={(value) => handleInputChange(field.key, value, field)}
                type={field.inputType}
                required={field.required}
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
                error={errors[field.key]}
              />
            ) : (
              <Select
                key={field.key}
                label={field.label}
                options={field.options!}
                value={formData[field.key] || ''}
                onChange={(value) => handleInputChange(field.key, value, field)}
                required={field.required}
                error={errors[field.key]}
              />
            )
          ))}
          
          <div className="flex justify-end mt-6">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                disabled={isGeneratingPlan || (checklistData !== '')}
                className="mr-4 px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed bg-third hover:bg-third/90 text-white font-header font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
            )}
            <button
              disabled={isGeneratingPlan || (checklistData !== '')}
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white font-header font-semibold px-6 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPlan ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
              ) : (
                currentStep === steps.length ? (planType ? 'Generate Plan' : 'Get Recommendation') : 'Next'
              )}
            </button>
          </div>
        </Card>
        )}
        {isGeneratingPlan && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Generating your personalized plan...</p>
          </div>
        )}

        {isGeneratingPlanError && (
          <div className="text-center py-8">
            <p className="text-red-500">Error generating plan. Please try again.</p>
          </div>
        )}

        {checklistData && !isGeneratingPlan && !isGeneratingPlanError && (
          <div className="mt-8">
            <Card title={`${planType?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Checklist`}>
              <EmergencyChecklist checklistData={checklistData} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
