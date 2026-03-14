import type { Request, Response } from 'express';
import { organizationService } from '../services/OrganizationService.js';

export const organizationController = {
  getRoles: (req: Request, res: Response) => {
    res.json(organizationService.getRoles());
  },
  addRole: (req: Request, res: Response) => {
    const role = req.body;
    const result = organizationService.addRole(role);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  }
};