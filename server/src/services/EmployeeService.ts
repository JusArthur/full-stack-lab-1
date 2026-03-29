import type { Employee } from '../types/types.js';
import { employeeRepo } from '../repositories/EmployeeRepository.js';

export const employeeService = {
  getDepartments: async () => {
    // Await the database call from the repo
    return await employeeRepo.getDepartments();
  },
  
  addEmployee: async (departmentName: string, employee: Employee): Promise<{ success: boolean; message?: string }> => {
    // Await the boolean check from the database
    const exists = await employeeRepo.departmentExists(departmentName);
    
    if (!exists) {
      return { success: false, message: 'Invalid department selected.' };
    }
    if (employee.firstName.trim().length < 3) {
      return { success: false, message: 'First Name must be at least 3 characters long.' };
    }
    
    // Await the creation process
    await employeeRepo.addEmployee(departmentName, employee);
    return { success: true };
  }
};