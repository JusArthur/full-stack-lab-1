import type { Role } from '../types/types';
import { organizationRepo } from '../repositories/OrganizationRepository';

const API_URL = 'http://localhost:3000/api/organization';

export const organizationService = {
  getRoles: async (): Promise<Role[]> => {
    try {
      const response = await fetch(`${API_URL}/roles`);
      if (!response.ok) throw new Error('Backend unavailable');
      return await response.json();
    } catch (error) {
      console.warn('Backend is down, falling back to static organization data.');
      // Fallback: load static data from the local repository
      return organizationRepo.getRoles();
    }
  },

  addRole: async (role: Role): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(`${API_URL}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role)
      });
      if (!response.ok) throw new Error('Backend unavailable');
      return await response.json();
    } catch (error) {
      console.warn('Backend is down, adding role locally.');
      // Fallback: save data in memory to the local repository
      organizationRepo.addRole(role);
      return { success: true, message: 'Saved locally (Offline Mode).' };
    }
  }
};