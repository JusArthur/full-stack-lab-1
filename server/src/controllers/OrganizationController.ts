import type { Request, Response } from 'express';
import { organizationService } from '../services/OrganizationService.js';

export const organizationController = {
  getRoles: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const paginatedData = await organizationService.getRoles(page, limit);
      
      // Flatten the employees out of the paginated roles
      const flattenedRoles = paginatedData.data.flatMap((role: any) => 
        role.employees.map((emp: any) => ({
          firstName: emp.firstName,
          lastName: emp.lastName,
          title: role.title
        }))
      );

      // Return both the flattened data array and the pagination metadata
      res.json({
        data: flattenedRoles,
        meta: paginatedData.meta
      });
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