import { z } from 'zod'

const createFeedbackZodSchema = z.object({
  body: z.object({
    feedback_for: z.string({
      required_error: 'feedback_for is required',
    }),
    user_id: z.string({
      required_error: 'user_id is required',
    }),
    trip_id: z.string({
      required_error: 'trip_id  is required',
    }),
    feedback: z.string({
      required_error: 'feedback  is required',
    }),
    rating: z.string({
      required_error: 'rating  is required',
    }),
    status: z.string().optional(),
  }),
})

const updateFeedbackZodSchema = z.object({
  body: z.object({
    feedback_for: z.string().optional(),
    user_id: z.string().optional(),
    trip_id: z.string().optional(),
    feedback: z.string().optional(),
    rating: z.string().optional(),
    status: z.string().optional(),
  }),
})

export const FeedbackValidation = {
  createFeedbackZodSchema,
  updateFeedbackZodSchema,
}
