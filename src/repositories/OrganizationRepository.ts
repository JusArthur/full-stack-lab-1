import type { Role } from '../types/types';
import { organizationData } from '../data/organizationData';

class OrganizationRepository {
  private roles: Role[];

  // In a real application, this would interface with a database or API. For this example, we'll use in-memory data.
  constructor() {
    this.roles = [...organizationData];
  }

  getRoles(): Role[] {
    return [...this.roles];
  }

  roleExists(title: string): boolean {
    return this.roles.some((r) => r.title.trim().toLowerCase() === title.trim().toLowerCase());
  }

  addRole(role: Role): void {
    this.roles.push(role);
  }
}

export const organizationRepo = new OrganizationRepository();