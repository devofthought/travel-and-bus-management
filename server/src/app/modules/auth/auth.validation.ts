import { z } from 'zod'

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
    phone: z
      .string({
        required_error: 'phone is required',
      })
      .optional(),
    driving_license: z.string({
      required_error: 'Driving License code is required',
    }),
    years_experience: z.number({
      required_error: 'Years of experience is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
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
      .optional(),
  }),
})

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',  //TODO: check email checking is working perfectly or not 
    }),
    phone: z.string({
      required_error: 'phone is required',
    }),
    address: z.string({
      required_error: 'address is required',
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
  createAdminZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
}
