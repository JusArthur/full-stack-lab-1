import type { Role } from '../types/types';

const API_URL = 'http://localhost:3000/api/organization';

export const organizationService = {
  getRoles: async (): Promise<Role[]> => {
    const response = await fetch(`${API_URL}/roles`);
    return response.json();
  },

  addRole: async (role: Role): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(`${API_URL}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role)
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'Failed to connect to the server.' };
    }
  }
};