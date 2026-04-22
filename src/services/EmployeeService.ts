import type { Employee, Department } from '../types/types';

const API_URL = '/api/employees';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  }
}

export const employeeService = {
  getDepartments: async (page: number = 1, limit: number = 5): Promise<PaginatedResponse<Department>> => {
    const response = await fetch(`${API_URL}/departments?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch departments from database');
    return await response.json();
  },

  addEmployee: async (departmentName: string, employee: Employee, token: string | null): Promise<{ success: boolean; message?: string }> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ departmentName, employee })
    });
    
    if (!response.ok) throw new Error('Failed to add employee to database');
    return await response.json();
  }
};