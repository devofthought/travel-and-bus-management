import { z } from 'zod'
import { status } from './incident.constants'

const createIncidentZodSchema = z.object({
  body: z.object({
    bus_code: z.string({
      required_error: 'bus_code is required',
    }),
    avaliable_seats: z.number({
      required_error: 'avaliable_seats is required',
    }),
    description: z.string({
      required_error: 'description  is required',
    }),
    cost: z.number({
      required_error: 'cost  is required',
    }),
    servicing_staus: z.enum([...status] as [string, ...string[]]).optional(),
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
