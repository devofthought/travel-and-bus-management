import { z } from 'zod'

const createBusZodSchema = z.object({
  body: z.object({
    available_seats: z.number({
      required_error: 'Available seats is required',
    }),
    availability_status: z.string({
      required_error: 'Availability status is required',
    }),
    brand_name: z.string({
      required_error: 'Brand name is required',
    }),
    modal: z.string({
      required_error: 'Brand name is required',
    }),
    bus_image: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
    outer_image: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
    inner_image: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
  }),
})

const updateBusZodSchema = z.object({
  body: z.object({
    available_seats: z
      .number({
        required_error: 'Available seats is required',
      })
      .optional(),
    availability_status: z
      .string({
        required_error: 'Availability status is required',
      })
      .optional(),
    brand_name: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
    modal: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
    bus_image: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
    outer_image: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
    inner_image: z
      .string({
        required_error: 'Brand name is required',
      })
      .optional(),
  }),
})

export const BusValidation = {
  createBusZodSchema,
  updateBusZodSchema,
}
