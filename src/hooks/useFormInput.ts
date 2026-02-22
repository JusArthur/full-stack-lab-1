import { useState, type ChangeEvent } from 'react';

export const useFormInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value);
    setMessage(''); // Clear errors when user types
  };

  // Accepts a validator function that returns an error string or null
  const validate = (validator: (val: string) => string | null): boolean => {
    const error = validator(value);
    if (error) {
      setMessage(error);
      return false;
    }
    return true;
  };

  const reset = () => {
    setValue(initialValue);
    setMessage('');
  };

  return {
    value,
    onChange: handleChange,
    message,
    setMessage, // Exposed to allow services to set external errors
    validate,
    reset,
  };
};