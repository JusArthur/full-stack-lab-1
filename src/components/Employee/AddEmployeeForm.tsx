import type { FormEvent } from 'react';
import type { Department } from '../../types/types';
import { useFormInput } from '../../hooks/useFormInput';
import { employeeService } from '../../services/EmployeeService';

interface Props {
  departments: Department[];
  onEmployeeAdded: () => void; // Callback to refresh parent data
}

const AddEmployeeForm = ({ departments, onEmployeeAdded }: Props) => {
  const firstNameInput = useFormInput('');
  const lastNameInput = useFormInput('');
  // Default to first department if available, else empty string
  const departmentInput = useFormInput(departments[0]?.name || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const employeeData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
    };

    // Attempt to create employee via service
    const result = employeeService.addEmployee(departmentInput.value, employeeData);

    if (result.success) {
      // Refresh the list in the parent
      onEmployeeAdded();
      // Reset form
      firstNameInput.reset();
      lastNameInput.reset();
    } else {
      // If failed, indicate what went wrong to the hook
      if (result.message?.includes('Department')) {
        departmentInput.setMessage(result.message);
      } else {
        firstNameInput.setMessage(result.message || 'An error occurred');
      }
    }
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit} style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
      <h3>Add New Employee</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
        <input
          type="text"
          value={firstNameInput.value}
          onChange={firstNameInput.onChange}
          placeholder="Enter first name"
          style={{ padding: '5px', width: '100%' }}
        />
        {/* Hook controls the values of any messages */}
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
        <label style={{ display: 'block', marginBottom: '5px' }}>Department:</label>
        <select
          value={departmentInput.value}
          onChange={departmentInput.onChange}
          style={{ padding: '5px', width: '100%' }}
        >
          {departments.map((dept) => (
            <option key={dept.name} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
        {departmentInput.message && <span style={{ color: 'red', fontSize: '0.9rem' }}>{departmentInput.message}</span>}
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8a8a21', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;