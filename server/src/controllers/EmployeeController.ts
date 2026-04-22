import type { Request, Response } from 'express';
import { employeeService } from '../services/EmployeeService.js';

export const employeeController = {
  getDepartments: async (req: Request, res: Response) => {
    try {
      // Extract pagination params, set defaults if not provided
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const paginatedData = await employeeService.getDepartments(page, limit);
      res.json(paginatedData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
  },
  
  addEmployee: async (req: Request, res: Response) => {
    try {
      const { departmentName, employee } = req.body;
      const result = await employeeService.addEmployee(departmentName, employee);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to add employee' });
    }
  }
};