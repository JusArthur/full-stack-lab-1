import type { Request, Response } from 'express';
import { employeeService } from '../services/EmployeeService.js';

export const employeeController = {
  getDepartments: (req: Request, res: Response) => {
    res.json(employeeService.getDepartments());
  },
  addEmployee: (req: Request, res: Response) => {
    const { departmentName, employee } = req.body;
    const result = employeeService.addEmployee(departmentName, employee);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  }
};