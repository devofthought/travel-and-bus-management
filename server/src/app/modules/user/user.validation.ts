import { z } from 'zod'

const updateUserZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
  }),
})

const updateUserEmailUpdateZodSchema = z.object({
  body: z.object({
    old_email: z.string(),
    new_email: z
      .string()
      .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: 'Invalid email format',
      }),
  }),
})

const updateUserPasswordUpdateZodSchema = z.object({
  body: z.object({
    old_password: z.string(),
    new_password: z.string(),
    confirm_new_password: z.string(),
  }),
})

export const userValidation = {
  updateUserZodSchema,
  updateUserEmailUpdateZodSchema,
  updateUserPasswordUpdateZodSchema,
}
