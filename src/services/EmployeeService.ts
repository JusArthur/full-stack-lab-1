import type { Employee, Department } from '../types/types';
import { employeeRepo } from '../repositories/EmployeeRepository'; 

const API_URL = 'http://localhost:3000/api/employees';

export const employeeService = {
  getDepartments: async (): Promise<Department[]> => {
    try {
      const response = await fetch(`${API_URL}/departments`);
      if (!response.ok) throw new Error('Backend unavailable');
      return await response.json();
    } catch (error) {
      console.warn('Backend is down, falling back to static employee data.');
      // Fallback: load static data from the local repository
      return employeeRepo.getDepartments();
    }
  },

  addEmployee: async (departmentName: string, employee: Employee): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departmentName, employee })
      });
      if (!response.ok) throw new Error('Backend unavailable');
      return await response.json();
    } catch (error) {
      console.warn('Backend is down, adding employee locally.');
      // Fallback: save data in memory to the local repository
      employeeRepo.addEmployee(departmentName, employee);
      return { success: true, message: 'Saved locally (Offline Mode).' };
    }
  }
};