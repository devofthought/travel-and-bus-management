import mongoose, { Schema } from 'mongoose';
import { BookingInterface } from './booking.interface';

const bookingSchema = new Schema<BookingInterface>(
  {
    travel_id: { type: String, required: true },
    trip_id: { type: String, required: true },
    booking_seat: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    payment_id: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Booking = mongoose.model<BookingInterface>('Booking', bookingSchema);

export { Booking };

