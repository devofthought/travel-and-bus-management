import { Schema, model } from 'mongoose'
import { FeedbackModel, IFeedback } from './feedback.interface'
import { feedbackFor, feedbackStatus } from './feedback.constants'

export const feedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    feedback_for: {
      type: String,
      required: true,
      enum: feedbackFor,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    trip_id: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
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
      enum: feedbackStatus,
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
