import { useState, useEffect } from 'react';
import { Page } from '../components/layout/Page';
import DepartmentSection from '../components/Department/DepartmentSection';
import AddEmployeeForm from '../components/Employee/AddEmployeeForm';
import type { Department } from '../types/types';
import { employeeService } from '../services/EmployeeService';

const EmployeesPage = () => {
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        refreshDepartments();
    }, []);

    const refreshDepartments = async () => {
        const data = await employeeService.getDepartments();
        setDepartments(data);
    };

    return (
        <Page>
            {departments.map((dept, index) => (
                <DepartmentSection key={index} dept={dept} />
            ))}
            
            {departments.length > 0 && (
                <AddEmployeeForm 
                    departments={departments} 
                    onEmployeeAdded={refreshDepartments} 
                />
            )}
        </Page>
    );
};

export default EmployeesPage;