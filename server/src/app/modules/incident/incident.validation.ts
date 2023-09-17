import { z } from 'zod'
import { status } from './incident.constants'

const createIncidentZodSchema = z.object({
  body: z.object({
    bus_code: z.string({
      required_error: 'bus_code is required',
    }),
    servicing_status: z.enum([...status] as [string, ...string[]]).optional(),
    description: z
      .string({
        required_error: 'description  is required',
      })
      .optional(),
    cost: z.number({
      required_error: 'cost  is required',
    }),
  }),
})

const updateIncidentZodSchema = z.object({
  body: z.object({
    bus_code: z.string().optional(),
    avaliable_seats: z.number().optional(),
    description: z.string().optional(),
    cost: z.number().optional(),
    servicing_staus: z.enum([...status] as [string, ...string[]]).optional(),
  }),
})

export const IncidentValidation = {
  createIncidentZodSchema,
  updateIncidentZodSchema,
}
