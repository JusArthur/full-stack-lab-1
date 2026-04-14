import { Router } from 'express';
import { requireAuth } from '@clerk/express'; // Import Clerk middleware
import { employeeController } from '../controllers/EmployeeController.js';

const router = Router();

// GET is public (anyone can view entries)
router.get('/departments', employeeController.getDepartments);

// POST is protected (only logged in users can create entries)
router.post('/', requireAuth(), employeeController.addEmployee);

export default router;