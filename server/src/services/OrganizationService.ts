import type { Role } from '../types/types.js';
import { organizationRepo } from '../repositories/OrganizationRepository.js';

export const organizationService = {
  getRoles: async () => {
    // Await the database call from the Prisma repository
    return await organizationRepo.getRoles();
  },

  addRole: async (role: Role): Promise<{ success: boolean; message?: string }> => {
    // Await the check to see if the role already exists in the database
    const exists = await organizationRepo.roleExists(role.title);
    
    if (exists) {
      return { success: false, message: 'Role title already exists.' };
    }

    // Await the creation of the new role in the database
    await organizationRepo.addRole(role);
    return { success: true };
  }
};