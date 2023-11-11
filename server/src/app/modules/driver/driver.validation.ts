import { z } from 'zod'

const createDriverValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    driver_code: z.string({ required_error: 'code is required' }),
    image: z.string({ required_error: 'image is required' }).optional(),
    age: z.number({ required_error: 'age is required' }),
    email: z.string({ required_error: 'email is required' }),
    phone: z.string({ required_error: 'phone is required' }),
    driving_license: z.string({
      required_error: 'driving license is required',
    }),
    years_experience: z.number({
      required_error: 'years experience is required',
    }),
    address: z.string({ required_error: 'address is required' }).optional(),
    joining_date: z.string({ required_error: 'joining date is required' }),
    availability_status: z
      .array(
        z.object({
          // Define properties inside the availability_status object
          date: z.string({
            required_error: 'Availability status date is required',
          }),
          status: z.string({
            required_error: 'Availability status is required',
          }),
        })
      )
      .optional(), // Making availability_status optional
  }),
})

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

const CheckDriverAvailableZodSchema = z.object({
  body: z.object({
    departure_time: z.string({
      required_error: 'Brand name is required',
    }),
    arrival_time: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
  }),
})

export const DriverValidation = {
  createDriverValidation,
  updateDriverZodSchema,
  CheckDriverAvailableZodSchema,
}
