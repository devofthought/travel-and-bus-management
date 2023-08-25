import { Schema, model } from 'mongoose'
import { IBus, BusModel } from './bus.interface'
import { availability_status } from './bus.constants'
export const busSchema = new Schema<IBus, BusModel>(
  {
    available_seats: {
      type: Number,
      required: true,
    },
    bus_code: {
      type: String,
      required: true,
      unique: true,
    },
    availability_status: {
      type: String,
      required: true,
      enum: availability_status,
    },
    brand_name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    bus_image: {
      type: String,
      required: true,
    },
    outer_image: {
      type: String,
      required: true,
    },
    inner_image: {
      type: String,
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

export const Bus = model<IBus, BusModel>('Bus', busSchema)
