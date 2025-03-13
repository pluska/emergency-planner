import { PlanStep } from "../types/plans";

export const beginSteps: PlanStep[] = [
  {
    id: 1,
    title: 'Personal Information',
    fields: [
      {
        type: 'select',
        label: 'Age Range',
        key: 'ageRange',
        required: true,
        options: [
          { value: '18-25', label: '18-25 years' },
          { value: '26-35', label: '26-35 years' },
          { value: '36-50', label: '36-50 years' },
          { value: '51-65', label: '51-65 years' },
          { value: '65+', label: 'Over 65 years' }
        ]
      },
      {
        type: 'input',
        label: 'Number of Dependents',
        key: 'dependentsCount',
        required: true,
        inputType: 'number',
        min: 0,
        max: 15,
        placeholder: 'e.g., 2'
      },
      {
        type: 'select',
        label: 'Living Situation',
        key: 'livingSituation',
        required: true,
        options: [
          { value: 'own-house', label: 'Own House' },
          { value: 'rent-house', label: 'Rented House' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'shared', label: 'Shared Housing' },
          { value: 'other', label: 'Other' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Location Risk Assessment',
    fields: [
      {
        type: 'select',
        label: 'Natural Disaster Risk',
        key: 'naturalDisasterRisk',
        required: true,
        options: [
          { value: 'high', label: 'High (Frequent earthquakes, hurricanes, etc.)' },
          { value: 'medium', label: 'Medium (Occasional natural disasters)' },
          { value: 'low', label: 'Low (Rare natural disasters)' }
        ]
      },
      {
        type: 'select',
        label: 'Economic Stability in Your Region',
        key: 'economicStability',
        required: true,
        options: [
          { value: 'stable', label: 'Stable (Strong economy, low inflation)' },
          { value: 'moderate', label: 'Moderate (Some economic concerns)' },
          { value: 'unstable', label: 'Unstable (High inflation, economic uncertainty)' }
        ]
      },
      {
        type: 'select',
        label: 'Access to Essential Services',
        key: 'essentialServices',
        required: true,
        options: [
          { value: 'excellent', label: 'Excellent (Reliable utilities, healthcare)' },
          { value: 'good', label: 'Good (Occasional disruptions)' },
          { value: 'limited', label: 'Limited (Frequent disruptions)' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Financial Situation',
    fields: [
      {
        type: 'select',
        label: 'Employment Status',
        key: 'employmentStatus',
        required: true,
        options: [
          { value: 'full-time', label: 'Full-time employed' },
          { value: 'part-time', label: 'Part-time employed' },
          { value: 'self-employed', label: 'Self-employed' },
          { value: 'unemployed', label: 'Currently unemployed' },
          { value: 'retired', label: 'Retired' }
        ]
      },
      {
        type: 'select',
        label: 'Income Stability',
        key: 'incomeStability',
        required: true,
        options: [
          { value: 'very-stable', label: 'Very stable income' },
          { value: 'stable', label: 'Stable income' },
          { value: 'variable', label: 'Variable income' },
          { value: 'unstable', label: 'Unstable income' }
        ]
      },
      {
        type: 'select',
        label: 'Savings Level',
        key: 'savingsLevel',
        required: true,
        options: [
          { value: 'none', label: 'No savings' },
          { value: 'low', label: 'Less than 1 month of expenses' },
          { value: 'medium', label: '1-3 months of expenses' },
          { value: 'high', label: 'More than 3 months of expenses' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Priority Assessment',
    fields: [
      {
        type: 'select',
        label: 'Primary Concern',
        key: 'primaryConcern',
        required: true,
        options: [
          { value: 'natural-disasters', label: 'Natural Disasters' },
          { value: 'economic-crisis', label: 'Economic Crisis' },
          { value: 'health-emergencies', label: 'Health Emergencies' },
          { value: 'job-loss', label: 'Job Loss' },
          { value: 'general-preparedness', label: 'General Preparedness' }
        ]
      },
      {
        type: 'select',
        label: 'Immediate Need',
        key: 'immediateNeed',
        required: true,
        options: [
          { value: 'high', label: 'Need immediate preparation' },
          { value: 'medium', label: 'Can prepare over next few months' },
          { value: 'low', label: 'Long-term planning' }
        ]
      },
      {
        type: 'select',
        label: 'Available Space for Storage',
        key: 'storageSpace',
        required: true,
        options: [
          { value: 'large', label: 'Large storage space available' },
          { value: 'medium', label: 'Moderate storage space' },
          { value: 'limited', label: 'Limited storage space' },
          { value: 'none', label: 'No extra storage space' }
        ]
      }
    ]
  }
];

// Logic to determine the recommended plan
export const determineRecommendedPlan = (formData: Record<string, string>): {
  primaryRecommendation: 'emergency-bagpack' | 'storage' | 'emergency-fund';
  secondaryRecommendation?: 'emergency-bagpack' | 'storage' | 'emergency-fund';
  reasoning: string;
} => {
  const points = {
    'emergency-bagpack': 0,
    'storage': 0,
    'emergency-fund': 0
  };

  // Natural disaster risk assessment
  if (formData.naturalDisasterRisk === 'high') {
    points['emergency-bagpack'] += 3;
    points['storage'] += 2;
  }

  // Economic stability assessment
  if (formData.economicStability === 'unstable') {
    points['emergency-fund'] += 3;
  }

  // Living situation assessment
  if (formData.livingSituation === 'apartment') {
    points['emergency-bagpack'] += 1;
    points['emergency-fund'] += 1;
  } else if (formData.livingSituation === 'own-house') {
    points['storage'] += 2;
  }

  // Storage space assessment
  if (formData.storageSpace === 'large') {
    points['storage'] += 2;
  } else if (formData.storageSpace === 'limited' || formData.storageSpace === 'none') {
    points['emergency-fund'] += 1;
    points['emergency-bagpack'] += 1;
  }

  // Financial situation assessment
  if (formData.incomeStability === 'unstable' || formData.incomeStability === 'variable') {
    points['emergency-fund'] += 3;
  }

  if (formData.savingsLevel === 'none' || formData.savingsLevel === 'low') {
    points['emergency-fund'] += 2;
  }

  // Primary concern assessment
  if (formData.primaryConcern === 'natural-disasters') {
    points['emergency-bagpack'] += 2;
    points['storage'] += 1;
  } else if (formData.primaryConcern === 'economic-crisis' || formData.primaryConcern === 'job-loss') {
    points['emergency-fund'] += 2;
  }

  // Determine primary and secondary recommendations
  const sortedPlans = Object.entries(points)
    .sort(([,a], [,b]) => b - a)
    .map(([plan]) => plan) as Array<'emergency-bagpack' | 'storage' | 'emergency-fund'>;

  const primaryRecommendation = sortedPlans[0];
  const secondaryRecommendation = sortedPlans[1];

  // Generate reasoning
  let reasoning = '';
  if (primaryRecommendation === 'emergency-bagpack') {
    reasoning = 'Based on your location\'s natural disaster risk and living situation, an Emergency Bagpack would be most beneficial for immediate evacuation needs.';
  } else if (primaryRecommendation === 'storage') {
    reasoning = 'Given your available space and stable living situation, a comprehensive Storage plan would provide the best long-term security.';
  } else {
    reasoning = 'Considering the economic factors and your financial situation, building an Emergency Fund should be your top priority.';
  }

  return {
    primaryRecommendation,
    secondaryRecommendation,
    reasoning
  };
};
