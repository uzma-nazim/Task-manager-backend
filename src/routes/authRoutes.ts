import express, { Router } from 'express';
import { register, login, refreshAccessToken, logout } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { registerValidation, loginValidation, refreshTokenValidation } from '../middleware/validation';

const router: Router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh-token', refreshTokenValidation, refreshAccessToken);

// Protected routes
router.post('/logout', authenticateToken, logout);

export default router; 