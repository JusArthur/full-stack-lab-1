import type { Role } from '../types/types.js';
import { organizationRepo } from '../repositories/OrganizationRepository.js';

export const organizationService = {
  getRoles: async (page: number = 1, limit: number = 5) => {
    const { roles, totalCount } = await organizationRepo.getRoles(page, limit);

    return {
      data: roles,
      meta: {
        totalItems: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        itemsPerPage: limit
      }
    };
  },

  addRole: async (role: Role): Promise<{ success: boolean; message?: string }> => {
    const exists = await organizationRepo.roleExists(role.title);
    
    if (exists) {
      return { success: false, message: 'Role title already exists.' };
    }

    await organizationRepo.addRole(role);
    return { success: true };
  }
};