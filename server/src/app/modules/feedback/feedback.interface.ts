import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type IFeedback = {
  feedback_for: 'driver' | 'bus' | 'trip'
  trip_id: Types.ObjectId
  user_id: Types.ObjectId | IUser
  feedback: string
  rating: number
  status: 'pending' | 'approved' | 'rejected'
}

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>

export type IFeedbackFilter = {
  searchTerm?: string
  trip_id?: string
  user_id?: string
  rating?: string
  status?: string
}
