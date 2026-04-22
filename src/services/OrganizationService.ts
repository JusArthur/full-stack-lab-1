import type { Role } from '../types/types';

const API_URL = '/api/organization';

export interface PaginatedRoleResponse {
  data: Role[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  }
}

export const organizationService = {
  getRoles: async (page: number = 1, limit: number = 5): Promise<PaginatedRoleResponse> => {
    const response = await fetch(`${API_URL}/roles?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch roles from database');
    return await response.json();
  },

  addRole: async (role: Role, token: string): Promise<{ success: boolean; message?: string }> => {
    const response = await fetch(`${API_URL}/roles`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(role)
    });
    
    if (!response.ok) throw new Error('Failed to add role to database');
    return await response.json();
  }
};