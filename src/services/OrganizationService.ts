import type { Role } from '../types/types';
import { organizationRepo } from '../repositories/OrganizationRepository';

export const organizationService = {
  addRole: (role: Role): { success: boolean; message?: string } => {
    // Add validation logic for role data
    if (role.firstName.trim().length < 3) {
      return { success: false, message: 'First Name must be at least 3 characters long.' };
    }

    if (!role.title.trim()) {
      return { success: false, message: 'Role title is required.' };
    }

    if (organizationRepo.roleExists(role.title)) {
      return { success: false, message: 'This role is already occupied.' };
    }

    organizationRepo.addRole(role);
    return { success: true };
  },

  getRoles: () => {
    return organizationRepo.getRoles();
  }
};