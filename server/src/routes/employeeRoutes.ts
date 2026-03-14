import { Router } from 'express';
import { employeeController } from '../controllers/EmployeeController.js';

const router = Router();
router.get('/departments', employeeController.getDepartments);
router.post('/', employeeController.addEmployee);

export default router;