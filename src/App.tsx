// src/App.tsx
import { useState } from 'react';
import './App.css';
import { Page } from './components/layout/Page';
import DepartmentSection from './components/Department/DepartmentSection';
import AddEmployeeForm from './components/Employee/AddEmployeeForm';
import type { Department, Employee } from './types/types';
import { initialDepartments } from './data/initialData';

function App() {
    // 1. Initialize state with the initial data
    const [departments, setDepartments] = useState<Department[]>(initialDepartments);

    // 2. Create handler to update state
    const handleAddEmployee = (departmentName: string, newEmployee: Employee) => {
        setDepartments(prevDepartments => {
            return prevDepartments.map(dept => {
                if (dept.name === departmentName) {
                    return {
                        ...dept,
                        employees: [...dept.employees, newEmployee]
                    };
                }
                // Return other departments unchanged
                return dept;
            });
        });
    };

    return (
        <Page>
            {/* Render the departments from STATE, not the constant */}
            {departments.map((dept, index) => (
                <DepartmentSection key={index} dept={dept} />
            ))}
            
            {/* 3. Render the Form and pass the state and handler */}
            <AddEmployeeForm 
                departments={departments} 
                onAdd={handleAddEmployee} 
            />
        </Page>
    );
}

export default App;