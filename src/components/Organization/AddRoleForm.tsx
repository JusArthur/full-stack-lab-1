import { useAddRoleForm } from '../../hooks/useAddRoleForm';

interface Props {
  onRoleAdded: () => void;
}

const AddRoleForm = ({ onRoleAdded }: Props) => {
  // The component delegates all form logic, state, and submission handling to the hook
  const { firstName, lastName, title, formError, handleSubmit } = useAddRoleForm(onRoleAdded);

  return (
    <form className="add-employee-form" onSubmit={handleSubmit} style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
      <h3>Add New Role</h3>
      
      {formError && <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>{formError}</div>}

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
        <input
          type="text"
          value={firstName.value}
          onChange={firstName.onChange}
          placeholder="Enter first name"
          style={{ padding: '5px', width: '100%' }}
        />
        {firstName.message && <span style={{ color: 'red', fontSize: '0.9rem' }}>{firstName.message}</span>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
        <input
          type="text"
          value={lastName.value}
          onChange={lastName.onChange}
          placeholder="Enter last name (optional)"
          style={{ padding: '5px', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Role (Title):</label>
        <input
          type="text"
          value={title.value}
          onChange={title.onChange}
          placeholder="Enter role title"
          style={{ padding: '5px', width: '100%' }}
        />
        {title.message && <span style={{ color: 'red', fontSize: '0.9rem' }}>{title.message}</span>}
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8a8a21', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Add Role
      </button>
    </form>
  );
};

export default AddRoleForm;