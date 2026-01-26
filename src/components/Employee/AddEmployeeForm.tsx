import { useState } from 'react';
import type { Department, Employee } from '../../types/types';

interface Props {
  departments: Department[];
  onAdd: (departmentName: string, employee: Employee) => void;
}

const AddEmployeeForm = ({ departments, onAdd }: Props) => {
  // Initialize state for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedDept, setSelectedDept] = useState(departments[0]?.name || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear existing validation messages
    setError(null);

    // Validate First Name (at least 3 characters)
    if (firstName.trim().length < 3) {
      setError('First Name must be at least 3 characters long.');
      return;
    }

    // Validate Department selection
    if (!selectedDept) {
      setError('Please select a department.');
      return;
    }

    // If valid, pass data to parent
    onAdd(selectedDept, { firstName, lastName });

    // Reset form fields (optional, but good UX)
    setFirstName('');
    setLastName('');
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit} style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
      <h3>Add New Employee</h3>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
        <input 
          type="text" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          style={{ padding: '5px', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name (optional)"
          style={{ padding: '5px', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Department:</label>
        <select 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{ padding: '5px', width: '100%' }}
        >
          {departments.map(dept => (
            <option key={dept.name} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8a8a21', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;