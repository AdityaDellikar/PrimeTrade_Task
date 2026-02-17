import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../validators/userValidators.js';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validate(updateProfileSchema), updateProfile);

export default router;
