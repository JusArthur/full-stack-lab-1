import type { Role } from '../types/types';

const API_URL = '/api/organization';

export const organizationService = {
  getRoles: async (): Promise<Role[]> => {
    const response = await fetch(`${API_URL}/roles`);
    if (!response.ok) throw new Error('Failed to fetch roles from database');
    return await response.json();
  },

  addRole: async (role: Role): Promise<{ success: boolean; message?: string }> => {
    const response = await fetch(`${API_URL}/roles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(role)
    });
    
    if (!response.ok) throw new Error('Failed to add role to database');
    return await response.json();
  }
};