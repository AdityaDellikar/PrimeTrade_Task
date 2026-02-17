import { z } from 'zod';

export const taskStatusSchema = z.enum(['pending', 'completed']);

export const createTaskSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(1000).optional(),
  status: taskStatusSchema.optional()
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(1000).optional(),
  status: taskStatusSchema.optional()
}).refine((value) => Object.keys(value).length > 0, {
  message: 'At least one field is required'
});
