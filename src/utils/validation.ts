import { z } from 'zod';

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

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>; 