import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const generativeAI = new GoogleGenerativeAI(
  apiKey
);

const model = generativeAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generatePlanFromPrompt = async (
  planType: string,
  formData: Record<string, string>
): Promise<string> => {
  try {
    const prompt = generatePromptFromData(planType, formData);
    
    const result = await model.generateContent(prompt);
    const data = result.response.text();


    return data || '';
  } catch (error) {
    console.error('Error generating plan:', error);
    throw new Error('Failed to generate plan. Please try again.');
  }
};

const generatePromptFromData = (planType: string, formData: Record<string, string>): string => {
  switch (planType) {
    case 'emergency-bagpack':
      return `Create a detailed emergency bagpack checklist based on the following requirements:
        - Number of people: ${formData.peopleCount}
        - Duration: ${formData.duration}
        - Mobility needs: ${formData.mobilityNeeds}
        - Medical conditions: ${formData.medicalConditions}
        - Climate preparation: ${formData.climate}
        - Special items needed: ${formData.specialItems}

        Format the response exactly as follows, with each category starting with a letter and period (A., B., etc):

        A. Water & Hydration:
        Water bottles x 2
        Electrolyte packets x 4

        B. Food & Nutrition:
        Energy bars x 4
        Trail mix x 2

        Each item should be on a new line with the format:
        [Item name] x [quantity]`;

    case 'storage':
      return `Create a detailed emergency storage checklist based on the following requirements:
        - Number of people: ${formData.peopleCount}
        - Duration: ${formData.duration}
        - Storage space: ${formData.spaceType}
        - Food storage method: ${formData.storageMethod}
        - Temperature control: ${formData.temperatureControl}
        - Organization system: ${formData.organizationSystem}

        Format the response EXACTLY as follows:
        - Each category must start with a letter and period (A., B., etc)
        - Each item MUST be on its own line
        - Each line MUST follow the format: [Single Item Name] x [Single Quantity]
        - DO NOT combine multiple items in one line

        Example format:
        A. Storage Equipment:
        Storage shelves x 2
        Airtight containers x 10
        Heavy-duty shelf liner x 2

        B. Food Storage:
        Canned fruits x 12
        Canned vegetables x 20
        Rice (5lb bags) x 4

        IMPORTANT: Each item must be separated onto its own line with a single quantity.
        DO NOT combine multiple items or quantities in the same line.`;

    case 'emergency-fund':
      return `Create a detailed emergency fund checklist based on the following information:
        - Employment status: ${formData.employmentStatus}
        - Income stability: ${formData.incomeStability}
        - Monthly expenses: Housing: $${formData.housingExpense}, Utilities: $${formData.utilitiesExpense}
        - Target fund size: ${formData.targetFundSize}
        - Current savings level: ${formData.savingsLevel}
        - Timeline: ${formData.savingTimeline}

        Format the response exactly as follows, with each category starting with a letter and period (A., B., etc):

        A. Initial Setup Tasks:
        Open high-yield savings account x 1
        Set up automatic transfers x 1

        B. Monthly Savings Goals:
        Emergency fund contribution x $500
        Additional income allocation x $200

        C. Milestone Targets:
        First month expenses saved x $3000
        Three months expenses saved x $9000

        Each item should be on a new line with the format:
        [Action/Item] x [quantity/amount]`;

    default:
      return '';
  }
};

export default generatePlanFromPrompt; 