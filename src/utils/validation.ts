export const validateNumber = (
  value: string,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    integer?: boolean;
  } = {}
): string | undefined => {
  // Allow empty value if not required
  if (!value) {
    return options.required ? 'This field is required' : undefined;
  }
  
  const num = Number(value);
  // Check if it's a valid number
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }
  
  // Check if it's a whole number when integer is required
  if (options.integer && !Number.isInteger(num)) {
    return 'Please enter a whole number';
  }
  
  // Check if it's within range
  if (options.min !== undefined && num < options.min) {
    return `Number must be ${options.min} or greater`;
  }
  if (options.max !== undefined && num > options.max) {
    return `Number must be ${options.max} or less`;
  }
  
  // Validation passed
  return undefined;
};

export const validateInput = (
  value: string,
  field: {
    required?: boolean;
    inputType?: string;
    min?: number;
    max?: number;
  }
): string | undefined => {
  if (field.required && !value) {
    return 'This field is required';
  }

  if (!value) return undefined;

  switch (field.inputType) {
    case 'number':
      return validateNumber(value, {
        required: field.required,
        min: field.min,
        max: field.max,
        integer: true
      });
    // Add more type validations as needed
    default:
      return undefined;
  }
}; 