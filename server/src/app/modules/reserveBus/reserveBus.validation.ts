import { z } from 'zod'
import { status } from './reserveBus.constants'

const createReserveBusZodSchema = z.object({
  body: z.object({
    from: z.string({
      required_error: 'from is required',
    }),
    to: z.string({
      required_error: 'to is required',
    }),
    bus_seats: z.string({
      required_error: 'Bus Seats is required',
    }),
    bus_type: z.string({
      required_error: 'Bus type is required',
    }),
    departure_time: z.string({
      required_error: 'departure_time  is required',
    }),
    arrival_time: z.string({
      required_error: 'departure_time  is required',
    }),
    email: z.string({
      required_error: 'email  is required',
    }),
    name: z.string({
      required_error: 'name is required',
    }),
  }),
})

const updateReserveBusZodSchema = z.object({
  body: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    departure_time: z.string().optional(),
    arrival_time: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    user_id: z.string().optional(),
    bus_code: z.string().optional(),
    total_price: z.number().optional(),
    driver_ids: z.array(z.string()).optional(),
    status: z.enum([...status] as [string, ...string[]]).optional(),
  }),
})

export const ReserveBusValidation = {
  createReserveBusZodSchema,
  updateReserveBusZodSchema,
}
