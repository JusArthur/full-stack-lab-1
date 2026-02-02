import { useState } from 'react';
import { Page } from '../components/layout/Page';
import DepartmentSection from '../components/Department/DepartmentSection';
import AddEmployeeForm from '../components/Employee/AddEmployeeForm';
import type { Department, Employee } from '../types/types';
import { initialDepartments } from '../data/initialData';

const EmployeesPage = () => {
    const [departments, setDepartments] = useState<Department[]>(initialDepartments);

    const handleAddEmployee = (departmentName: string, newEmployee: Employee) => {
        setDepartments(prevDepartments => {
            return prevDepartments.map(dept => {
                if (dept.name === departmentName) {
                    return {
                        ...dept,
                        employees: [...dept.employees, newEmployee]
                    };
                }
                return dept;
            });
        });
    };

    return (
        <Page>
            {departments.map((dept, index) => (
                <DepartmentSection key={index} dept={dept} />
            ))}
            
            <AddEmployeeForm 
                departments={departments} 
                onAdd={handleAddEmployee} 
            />
        </Page>
    );
};

export default EmployeesPage;