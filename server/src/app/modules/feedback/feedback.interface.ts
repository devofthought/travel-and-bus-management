import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type IFeedback = {
  feedback_for: 'driver' | 'bus' | 'trip'
  trip_id: Types.ObjectId
  user_id: Types.ObjectId | IUser
  feedback: string
  rating: number
  status?: 'pending' | 'approved' | 'rejected'
}

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>

export type IFeedbackFilter = {
  searchTerm?: string
  trip_id?: string
  user_id?: string
  rating?: string
  status?: string
}

export type IApprovedFeedback = {
  status: string
  feedback_id: string
}

// export type IApprovedFeedbackResponse = {
//   feedback_content: string,
//   name: string,
//   user_type: 'traveler',
//   user_image: string,
//   rating: string
//   feedback_for: 'driver' | 'bus' | 'trip',
// }
