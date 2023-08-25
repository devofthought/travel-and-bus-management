import { Schema, model } from 'mongoose'
import { ITrip, TripModel } from './trip.interface'
import { trips_status } from './trip.constants'
export const tripSchema = new Schema<ITrip, TripModel>(
  {
    route_code: {
      type: String,
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
    ticket_price: {
      type: Number,
      required: true,
    },
    trips_status: {
      type: String,
      required: true,
      enum: trips_status,
    },
    driver_id: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
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
