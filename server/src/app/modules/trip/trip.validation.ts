import { z } from 'zod'

const createTripZodSchema = z.object({
  body: z.object({
    route_code: z.string({
      required_error: 'route_code status is required',
    }),
    departure_time: z.string({
      required_error: 'departure time is required',
    }),
    arrival_time: z.string({
      required_error: 'arrival time is required',
    }),
    bus_code: z.string({
      required_error: 'bus code is required',
    }),
    ticket_price: z.number({
      required_error: 'ticket price is required',
    }),
    trips_status: z.string({
      required_error: 'trips status is required',
    }),
    driver_id: z.string({
      required_error: 'driver id is required',
    }),
  }),
})

const updateTripZodSchema = z.object({
  body: z.object({
    route_code: z
      .string({
        required_error: 'route code status is required',
      })
      .optional(),
    departure_time: z
      .string({
        required_error: 'departure time is required',
      })
      .optional(),
    arrival_time: z
      .string({
        required_error: 'arrival time is required',
      })
      .optional(),
    bus_code: z
      .string({
        required_error: 'bus code is required',
      })
      .optional(),
    ticket_price: z
      .number({
        required_error: 'ticket price is required',
      })
      .optional(),
    trips_status: z
      .string({
        required_error: 'trips status is required',
      })
      .optional(),
    driver_id: z
      .string({
        required_error: 'driver id is required',
      })
      .optional(),
  }),
})

const getTripsByUsers = z.object({
  body: z.object({
    to: z.string({
      required_error: 'to is required',
    }),
    departure_time: z.string({
      required_error: 'departure time is required',
    }),
    from: z.string({
      required_error: 'from time is required',
    }),
  }),
})

const updateTimeZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})

export const TripValidation = {
  createTripZodSchema,
  updateTripZodSchema,
  getTripsByUsers,
  updateTimeZodSchema,
}
