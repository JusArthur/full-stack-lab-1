import type { Employee, Department } from '../types/types';

const API_URL = '/api/employees';

export const employeeService = {
  getDepartments: async (): Promise<Department[]> => {
    const response = await fetch(`${API_URL}/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments from database');
    return await response.json();
  },

  // Update signature to require a token
  addEmployee: async (departmentName: string, employee: Employee, token: string): Promise<{ success: boolean; message?: string }> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Send token to backend
      },
      body: JSON.stringify({ departmentName, employee })
    });
    
    if (!response.ok) throw new Error('Failed to add employee to database');
    return await response.json();
  }
};