import type { FormEvent } from 'react';
import { useFormInput } from '../../hooks/useFormInput';
import { organizationService } from '../../services/OrganizationService';

interface Props {
  onRoleAdded: () => void;
}

const AddRoleForm = ({ onRoleAdded }: Props) => {
  const firstNameInput = useFormInput('');
  const lastNameInput = useFormInput('');
  const roleInput = useFormInput('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const roleData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      title: roleInput.value,
    };

    const result = organizationService.addRole(roleData);

    if (result.success) {
      onRoleAdded();
      firstNameInput.reset();
      lastNameInput.reset();
      roleInput.reset();
    } else {
      // Continuing the flawed string-matching pattern from Lab 3.1 for consistency
      if (result.message?.includes('First Name')) {
        firstNameInput.setMessage(result.message);
      } else if (result.message?.includes('role')) {
        roleInput.setMessage(result.message);
      } else {
        firstNameInput.setMessage(result.message || 'An error occurred');
      }
    }
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit} style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
      <h3>Add New Role</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
        <input
          type="text"
          value={firstNameInput.value}
          onChange={firstNameInput.onChange}
          placeholder="Enter first name"
          style={{ padding: '5px', width: '100%' }}
        />
        {firstNameInput.message && <span style={{ color: 'red', fontSize: '0.9rem' }}>{firstNameInput.message}</span>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
        <input
          type="text"
          value={lastNameInput.value}
          onChange={lastNameInput.onChange}
          placeholder="Enter last name (optional)"
          style={{ padding: '5px', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Role (Title):</label>
        <input
          type="text"
          value={roleInput.value}
          onChange={roleInput.onChange}
          placeholder="Enter role title"
          style={{ padding: '5px', width: '100%' }}
        />
        {roleInput.message && <span style={{ color: 'red', fontSize: '0.9rem' }}>{roleInput.message}</span>}
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8a8a21', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Add Role
      </button>
    </form>
  );
};

export default AddRoleForm;