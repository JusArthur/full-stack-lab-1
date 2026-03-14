import type { Employee, Department } from '../types/types';

const API_URL = 'http://localhost:3000/api/employees';

export const employeeService = {
  getDepartments: async (): Promise<Department[]> => {
    const response = await fetch(`${API_URL}/departments`);
    return response.json();
  },

  addEmployee: async (departmentName: string, employee: Employee): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departmentName, employee })
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'Failed to connect to the server.' };
    }
  }
};