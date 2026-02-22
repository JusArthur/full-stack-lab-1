import { useState } from 'react';
import { Page } from '../components/layout/Page';
import DepartmentSection from '../components/Department/DepartmentSection';
import AddEmployeeForm from '../components/Employee/AddEmployeeForm';
import type { Department } from '../types/types';
import { employeeService } from '../services/EmployeeService';

const EmployeesPage = () => {
    // Initialize state using the service/repo data
    const [departments, setDepartments] = useState<Department[]>(employeeService.getDepartments());

    // Function to refresh data from the repository
    const refreshDepartments = () => {
        setDepartments(employeeService.getDepartments());
    };

    return (
        <Page>
            {departments.map((dept, index) => (
                <DepartmentSection key={index} dept={dept} />
            ))}
            
            {/* Pass the refresh function to the form */}
            <AddEmployeeForm 
                departments={departments} 
                onEmployeeAdded={refreshDepartments} 
            />
        </Page>
    );
};

export default EmployeesPage;