import { Schema, model } from 'mongoose'
import { active_status, trips_status } from './trip.constants'
import { ITrip, TripModel } from './trip.interface'
export const tripSchema = new Schema<ITrip, TripModel>(
  {
    route_code: {
      type: String,
      required: true,
    },
    route_id: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
      required: true,
    },
    departure_time: {
      type: String,
      required: true,
    },
    arrival_time: {
      type: String,
      required: true,
    },
    bus_code: {
      type: String,
      ref: 'Bus',
      required: true,
    },
    bus_id: {
      type: Schema.Types.ObjectId,
      ref: 'Bus',
    },
    ticket_price: {
      type: Number,
      required: true,
    },
    seats_available: {
      type: Number,
      required: true,
    },
    active_status: {
      type: String,
      required: true,
      enum: active_status,
    },
    driver_id: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
    },
    driver_code: {
      type: String,
      ref: 'Driver',
      required: true,
    },
    trips_status: {
      type: String,
      required: true,
      enum: trips_status,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Trip = model<ITrip, TripModel>('Trip', tripSchema)
