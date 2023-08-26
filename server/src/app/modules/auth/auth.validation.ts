import { z } from 'zod'

const createUserZodSchema = z.object({
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
  createUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
}
