import express, { Router } from 'express';
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  updateChecklistItems,
  deleteTask
} from '../controllers/taskController';
import { 
  createTaskValidation, 
  updateTaskValidation,
  updateChecklistItemsValidation
} from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

// Protect all routes
router.use(authenticateToken);

// Route: /api/v1/task
router.route('/')
  .get(getAllTasks)
  .post(createTaskValidation, createTask);

// Route: /api/v1/task/:id
router.route('/:id')
  .get(getTask)
  .put(updateTaskValidation, updateTask)
  .delete(deleteTask);

// Route: /api/v1/task/checklist/update
router.route('/checklist/status')
  .put(updateChecklistItemsValidation, updateChecklistItems);

export default router; 