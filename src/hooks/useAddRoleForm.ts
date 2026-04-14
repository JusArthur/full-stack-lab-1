import { useState, type FormEvent } from 'react';
import { useFormInput } from './useFormInput';
import { organizationService } from '../services/OrganizationService';
import { useAuth } from '@clerk/clerk-react'; 

export const useAddRoleForm = (onSuccess: () => void) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const title = useFormInput('');
  const [formError, setFormError] = useState<string | null>(null);
  
  const { getToken } = useAuth(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    firstName.setMessage('');
    title.setMessage('');

    try {
        const token = await getToken();
        
        if (!token) {
            setFormError("You must be logged in to do this.");
            return;
        }

        const result = await organizationService.addRole({
          firstName: firstName.value,
          lastName: lastName.value,
          title: title.value,
        }, token);

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
    } catch (error) {
        setFormError('Failed to communicate with the server.');
        console.error(error);
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