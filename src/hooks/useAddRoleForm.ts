import { useState, type FormEvent } from 'react';
import { useFormInput } from './useFormInput';
import { organizationService } from '../services/OrganizationService';

export const useAddRoleForm = (onSuccess: () => void) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const title = useFormInput('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    firstName.setMessage('');
    title.setMessage('');

    // AWAIT the response from the backend
    const result = await organizationService.addRole({
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