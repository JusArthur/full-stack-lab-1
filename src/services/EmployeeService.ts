import type { Employee } from '../types/types';
import { employeeRepo } from '../repositories/EmployeeRepository';

export const employeeService = {
  addEmployee: (departmentName: string, employee: Employee): { success: boolean; message?: string } => {
    // Validate Department Exists
    if (!employeeRepo.departmentExists(departmentName)) {
      return { success: false, message: 'Invalid department selected.' };
    }

    // Validate First Name Length
    if (employee.firstName.trim().length < 3) {
      return { success: false, message: 'First Name must be at least 3 characters long.' };
    }

    // If validations pass, call repository
    employeeRepo.addEmployee(departmentName, employee);
    return { success: true };
  },
  
  getDepartments: () => {
    return employeeRepo.getDepartments();
  }
};