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
    new_email: z.string(),
  }),
})

export const userValidation = {
  updateUserZodSchema,
  updateUserEmailUpdateZodSchema,
}
