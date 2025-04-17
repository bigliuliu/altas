import { z } from 'zod';

export const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;

export const baseAuthSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = baseAuthSchema;

export const registerSchema = baseAuthSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  entity: z.enum(['individual', 'company', 'organization']),
  promo_code: z.string().optional(),
  inviter: z.string().nullable().optional(),
});
