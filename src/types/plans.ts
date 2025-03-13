export interface PlanField {
  type: 'input' | 'select';
  label: string;
  key: string;
  required?: boolean;
  placeholder?: string;
  inputType?: 'text' | 'number' | 'email';
  min?: number;
  max?: number;
  pattern?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface PlanStep {
  id: number;
  title: string;
  fields: PlanField[];
}
