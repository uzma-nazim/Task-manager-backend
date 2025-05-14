import express, { Router } from 'express';
import taskRoutes from './taskRoutes';
import authRoutes from './authRoutes';

const router: Router = express.Router();

// Mount routes with their base endpoints
router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);

export default router; 