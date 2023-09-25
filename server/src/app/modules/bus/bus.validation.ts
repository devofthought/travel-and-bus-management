import { z } from 'zod';

const createBusZodSchema = z.object({
  body: z.object({
    total_seats: z.string({
      required_error: 'Available seats is required',
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
      .optional(), // Making availability_status optional
    brand_name: z.string({
      required_error: 'Brand name is required',
    }),
    model: z.string({
      required_error: 'Bus model is required',
    }),
    bus_image: z
      .string({
        required_error: 'Bus image is required',
      })
      .optional(),
    outer_image: z
      .string({
        required_error: 'Outer image is required',
      })
      .optional(),
    inner_image: z
      .string({
        required_error: 'Inner image is required',
      })
      .optional(),
  }),
});


const updateBusZodSchema = z.object({
  body: z.object({
    total_seats: z
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
    model: z
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
