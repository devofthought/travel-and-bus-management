import { z } from 'zod'

const createFeedbackZodSchema = z.object({
  body: z.object({
    feedback_for: z.string({
      required_error: 'feedback_for is required',
    }),
    trip_id: z.string({
      required_error: 'trip_id is required',
    }),
    feedback: z.string({
      required_error: 'feedback is required',
    }),
    rating: z
      .number({
        required_error: 'rating is required',
      })
      .max(5, {
        message: 'Rating must be at most 5',
      }),
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

const adminApprovedFeedbackZodSchema = z.object({
  body: z.object({
    status: z.string(),
    feedback_id: z.string(),
  }),
})

export const FeedbackValidation = {
  createFeedbackZodSchema,
  updateFeedbackZodSchema,
  adminApprovedFeedbackZodSchema,
}
