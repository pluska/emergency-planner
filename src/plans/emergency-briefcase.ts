import { PlanStep } from "../types/plans";

export const emergencyBagpackSteps: PlanStep[] = [
      {
        id: 1,
        title: 'Basic Information',
        fields: [
          { type: 'input', label: 'Number of people', key: 'peopleCount', required: true, inputType: 'number', min: 1, max: 10 },
          { type: 'select', label: 'Duration', key: 'duration', required: true,
            options: [
              { value: '3days', label: '3 days' },
              { value: '7days', label: '7 days' },
              { value: '14days', label: '14 days' }
            ]
          },
        ]
      },
    ];