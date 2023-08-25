import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type IFeedback = {
  feedback_for: string
  user_id: Types.ObjectId | IUser
  trip_id: Types.ObjectId
  feedback: string
  rating: number
  status: string
}

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>

export type IFeedbackFilter = {
  searchTerm?: string
  trip_id?: string
  user_id?: string
  rating?: string
  status?: string
}
