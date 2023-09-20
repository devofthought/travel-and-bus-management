import { Schema, model } from 'mongoose'
import { availability_status } from './bus.constants'
import { BusModel, IBus } from './bus.interface'

export const busSchema = new Schema<IBus, BusModel>(
  {
    total_seats: {
      type: Number,
      required: true,
    },
    bus_code: {
      type: String,
      required: true,
      unique: true,
    },
    // availability_status: {
    //   type: String,
    //   required: true,
    //   enum: availability_status,
    // },
    /* 
    export const availability_status = [
  'transit',
  'discontinue',
  'servicing',
  'standBy',
  'rest',
]
    */
    availability_status: [
      {
        status: {
          type: String,
          enum: availability_status,
        },
        date: String,
      }
    ],
    brand_name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    bus_image: {
      avatar: {
        type: String,
        required: false,
      },
      avatar_public_url: {
        type: String,
        required: false,
      },
    },
    outer_image: {
      avatar: {
        type: String,
        required: false,
      },
      avatar_public_url: {
        type: String,
        required: false,
      },
    },
    inner_image: {
      avatar: {
        type: String,
        required: false,
      },
      avatar_public_url: {
        type: String,
        required: false,
      },
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
