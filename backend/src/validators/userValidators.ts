import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(64).optional()
}).refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required'
});
