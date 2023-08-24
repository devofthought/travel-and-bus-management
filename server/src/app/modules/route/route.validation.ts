import { z } from 'zod'

const createRouteZodSchema = z.object({
  body: z.object({
    from: z.string({
      required_error: 'from is required',
    }),
    to: z.string({
      required_error: 'to is required',
    }),
    distance: z.number({
      required_error: 'distance is required',
    }),
  }),
})

const updateRouteZodSchema = z.object({
  body: z.object({
    from: z
      .string({
        required_error: 'from is required',
      })
      .optional(),
    to: z
      .string({
        required_error: 'to is required',
      })
      .optional(),
    distance: z
      .number({
        required_error: 'distance is required',
      })
      .optional(),
  }),
})

export const RouteValidation = {
  createRouteZodSchema,
  updateRouteZodSchema,
}
