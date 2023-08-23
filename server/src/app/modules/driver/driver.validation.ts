import { z } from 'zod'

// Define the Zod schema for updating student
const updateDriverZodSchema = z.object({
  body: z.object({
    driver_id: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional(),
    age: z.number().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    driving_licence: z.number().optional(),
    years_exprience: z.number().optional(),
  }),
})

export const DriverValidation = {
  updateDriverZodSchema,
}
