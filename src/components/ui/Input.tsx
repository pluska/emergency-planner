interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'email';
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  validateInput?: (value: string) => string | undefined;
}

const Input = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  error,
  required,
  min,
  max,
  pattern,
  validateInput
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Handle number type validation
    if (type === 'number') {
      // Allow empty value or valid numbers only
      if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
        const numValue = newValue === '' ? '' : Number(newValue);
        
        // Check min/max constraints
        if (typeof numValue === 'number') {
          if ((min === undefined || numValue >= min) && 
              (max === undefined || numValue <= max)) {
            onChange(newValue);
          }
        } else {
          onChange(newValue); // Allow empty value
        }
      }
      return;
    }

    // Handle custom validation
    if (validateInput) {
      const validationError = validateInput(newValue);
      if (!validationError) {
        onChange(newValue);
      }
      return;
    }

    // Default behavior for other types
    onChange(newValue);
  };

  const getInputMode = () => {
    switch (type) {
      case 'number':
        return 'decimal';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type === 'number' ? 'text' : type} // Use text type for numbers to handle decimal validation
        inputMode={getInputMode()}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        pattern={pattern}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;