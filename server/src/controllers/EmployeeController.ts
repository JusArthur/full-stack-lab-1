import type { Request, Response } from 'express';
import { employeeService } from '../services/EmployeeService.js';

export const employeeController = {
  // Add async and await here
  getDepartments: async (req: Request, res: Response) => {
    try {
      const departments = await employeeService.getDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
  },
  
  // Add async and await here
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