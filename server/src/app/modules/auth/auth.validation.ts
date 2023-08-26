import { z } from 'zod'
import { driving_status } from '../driver/driver.constants'

const createTravelerZodSchema = z.object({
  body: z
    .object({
      email: z.string({
        required_error: 'email is required',
      }),
      password: z.string({
        required_error: 'password is required',
      }),
      confirm_password: z.string({
        required_error: 'confirm password is required',
      }),
    })
    .refine(data => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ['confirm_password'],
    }),
})

const createDriverZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    age: z.number({
      required_error: 'age is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    phone: z.string({
      required_error: 'phone is required',
    }),
    driving_license: z.string({
      required_error: 'Driving License code is required',
    }),
    years_experience: z.number({
      required_error: 'Years of experience is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    driving_status: z.enum([...driving_status] as [string, ...string[]], {
      required_error: 'driving status is required',
    }),
  }),
})

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
})

export const authValidation = {
  createTravelerZodSchema,
  createDriverZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
}
