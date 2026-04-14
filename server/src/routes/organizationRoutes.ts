import { Router } from 'express';
import { organizationController } from '../controllers/OrganizationController.js';
import { requireAuth } from '@clerk/express';

const router = Router();
router.get('/roles', organizationController.getRoles);
router.post('/roles', requireAuth(), organizationController.addRole);

export default router;