import { Model } from 'mongoose'

export type IBooking = {
  user_id: string
  trip_id: string
  booking_seat: string
  status: string
  payment_id: string
}

export type BookingModel = Model<IBooking, Record<string, unknown>>
