// src/validations/users.validation.js
import { z } from 'zod';

// Accept either a UUID string OR a positive integer id (coerced from string)
export const userIdSchema = z.object({
  id: z.union([
    z.string().uuid(),
    z.coerce.number().int().positive().transform(String),
  ]),
});

// Allow partial updates; unknown fields are stripped
export const updateUserSchema = z
  .object({
    firstName: z.string().min(1).max(120).optional(),
    lastName: z.string().min(1).max(120).optional(),
    name: z.string().min(1).max(240).optional(), // if you use a single name field
    email: z.string().email().optional(),
    phone: z.string().min(7).max(32).optional(),
    role: z.enum(['user', 'admin']).optional(),
    // add any other fields you allow users to change:
    // avatarUrl: z.string().url().optional(),
    // timezone: z.string().optional(),
  })
  .strip(); // remove unknown keys
