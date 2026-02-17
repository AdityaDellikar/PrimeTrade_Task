import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidators.js';

const router = Router();

router.use(authenticate);
router.get('/', getTasks);
router.post('/', validate(createTaskSchema), createTask);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
