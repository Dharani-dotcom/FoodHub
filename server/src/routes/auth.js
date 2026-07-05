import express from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { validate, validateRegister, validateLogin, validateForgotPassword, validateResetPassword } from '../validators/validators.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', validateForgotPassword, validate, forgotPassword);
router.post('/reset-password/:token', validateResetPassword, validate, resetPassword);

export default router;
