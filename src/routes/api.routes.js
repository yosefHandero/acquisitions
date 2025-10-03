// src/routes/api.route.js
import { Router } from 'express';
import usersRouter from '#routes/users.routes.js';

const router = Router();

router.use('/users', usersRouter); // /api/users -> usersRouter

export default router;
