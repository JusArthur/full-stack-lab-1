import { useState, type FormEvent } from 'react';
import { useFormInput } from './useFormInput';
import { organizationService } from '../services/OrganizationService';

export const useAddRoleForm = (onSuccess: () => void) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const title = useFormInput('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    firstName.setMessage('');
    title.setMessage('');

    const result = organizationService.addRole({
      firstName: firstName.value,
      lastName: lastName.value,
      title: title.value,
    });

    if (result.success) {
      firstName.reset();
      lastName.reset();
      title.reset();
      onSuccess();
    } else {
      setFormError(result.message || 'An error occurred during submission.');
      
      // Target specific input fields based on the service's error message
      if (result.message?.toLowerCase().includes('first name')) {
        firstName.setMessage(result.message);
      } else if (result.message?.toLowerCase().includes('role')) {
        title.setMessage(result.message);
      }
    }
  };

  return {
    firstName,
    lastName,
    title,
    formError,
    handleSubmit,
  };
};