import { Schema, model } from 'mongoose'
import { IReserveBus, IReserveBusModel } from './reserveBus.interface'
import { status } from './reserveBus.constants'

export const ReserveBusSchema = new Schema<IReserveBus, IReserveBusModel>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    departure_time: { type: Date, required: true },
    arrival_time: { type: Date, required: true },
    name: { type: String, required: true },
    bus_type: { type: String, required: true },
    bus_seats: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    bus_code: { type: String },
    total_price: { type: Number },
    driver_ids: { type: [String] },
    status: { type: String, enum: status, default: 'pending' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const ReserveBus = model<IReserveBus, IReserveBusModel>(
  'ReserveBus',
  ReserveBusSchema
)
