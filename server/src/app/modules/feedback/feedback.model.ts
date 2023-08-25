import { Schema, model } from 'mongoose'
import { FeedbackModel, IFeedback } from './feedback.interface'

export const feedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    feedback_for: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    trip_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  feedbackSchema
)
