import type { Role } from '../types/types.js';
import { organizationData } from '../data/organizationData';

class OrganizationRepository {
  private roles: Role[] = [...organizationData];

  getRoles(): Role[] {
    return this.roles;
  }

  roleExists(title: string): boolean {
    return this.roles.some((r) => r.title.trim().toLowerCase() === title.trim().toLowerCase());
  }

  addRole(role: Role): void {
    this.roles.push(role);
  }
}

export const organizationRepo = new OrganizationRepository();