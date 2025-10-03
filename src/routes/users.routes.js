import { Router } from 'express';
import {
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  deleteUserById,
} from '#controllers/users.controller.js';

// ⬇️ use YOUR middleware file (note: singular "#middleware", not "#middlewares")
import { authenticateToken, requireRole } from '#middleware/auth.middleware.js';

const router = Router();

// GET /api/users   -> admin only
router.get('/', authenticateToken, requireRole(['admin']), fetchAllUsers);

// GET /api/users/:id  -> any authenticated user
router.get('/:id', authenticateToken, fetchUserById);

// PUT /api/users/:id  -> any authenticated user (controller enforces self/admin)
router.put('/:id', authenticateToken, updateUserById);

// DELETE /api/users/:id -> admin only
router.delete(
  '/:id',
  authenticateToken,
  requireRole(['admin']),
  deleteUserById
);

export default router;
