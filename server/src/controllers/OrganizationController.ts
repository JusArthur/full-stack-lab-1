import type { Request, Response } from 'express';
import { organizationService } from '../services/OrganizationService.js';

export const organizationController = {
  getRoles: async (req: Request, res: Response) => {
    try {
      // Await the database call
      const rolesData = await organizationService.getRoles();
      
      const flattenedRoles = rolesData.flatMap((role: any) => 
        role.employees.map((emp: any) => ({
          firstName: emp.firstName,
          lastName: emp.lastName,
          title: role.title
        }))
      );

      res.json(flattenedRoles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  },
  
  addRole: async (req: Request, res: Response) => {
    try {
      const role = req.body;
      const result = await organizationService.addRole(role);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to add role' });
    }
  }
};