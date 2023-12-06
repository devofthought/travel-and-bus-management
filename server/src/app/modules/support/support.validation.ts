import { z } from 'zod'

const createSupportZodSchema = z.object({
  body: z.object({
    first_name: z.string({
      required_error: 'first name is required',
    }),
    email: z
      .string()
      .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: 'Invalid email',
      }),
    phone: z
      .string({
        required_error: 'phone is required',
      })
      .optional(),
    subject: z
      .string({
        required_error: 'subject is not required',
      })
      .optional(),
    last_name: z
      .string({
        required_error: 'last name is not required',
      })
      .optional(),
    message: z.string({
      required_error: 'message is required',
    }),
  }),
})

export const SupportValidation = {
  createSupportZodSchema,
}
