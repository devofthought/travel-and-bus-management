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

export const RouteValidation = {
  createRouteZodSchema,
}
