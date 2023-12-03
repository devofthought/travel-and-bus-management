import { z } from 'zod'

const updateTravelerZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .optional(),
    image: z
      .string({
        required_error: 'image is required',
      })
      .optional(),
    age: z
      .string({
        required_error: 'Age is required',
      })
      .optional(),
    phone: z
      .string({
        required_error: 'phone is required',
      })
      .optional(),
  }),
})

export const TravelerValidation = {
  updateTravelerZodSchema,
}
