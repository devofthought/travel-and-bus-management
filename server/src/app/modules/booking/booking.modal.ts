import { Schema, model } from 'mongoose'
import { BookingModel, IBooking } from './booking.interface'
export const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    user_id: {
      type: String,
      required: true,
    },
    trip_id: {
      type: String,
      required: true,
      unique: true,
    },
    booking_seat: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema)
