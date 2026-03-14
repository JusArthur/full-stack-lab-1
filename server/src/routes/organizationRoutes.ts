import { Router } from 'express';
import { organizationController } from '../controllers/OrganizationController.js';

const router = Router();
router.get('/roles', organizationController.getRoles);
router.post('/roles', organizationController.addRole);

export default router;