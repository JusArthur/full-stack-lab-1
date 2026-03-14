import type { Employee } from '../types/types.js';
import { employeeRepo } from '../repositories/EmployeeRepository.js';

export const employeeService = {
  getDepartments: () => {
    return employeeRepo.getDepartments();
  },
  
  addEmployee: (departmentName: string, employee: Employee): { success: boolean; message?: string } => {
    if (!employeeRepo.departmentExists(departmentName)) {
      return { success: false, message: 'Invalid department selected.' };
    }
    if (employee.firstName.trim().length < 3) {
      return { success: false, message: 'First Name must be at least 3 characters long.' };
    }
    
    employeeRepo.addEmployee(departmentName, employee);
    return { success: true };
  }
};
