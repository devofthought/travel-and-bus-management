import { Schema, model } from 'mongoose'
import { all_seats, availability_status } from './bus.constants'
import { BusModel, IBus } from './bus.interface'

/* 
Total seats for the bus: [ 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
  'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
  'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10' ]

*/

export const busSchema = new Schema<IBus, BusModel>(
  {
    total_seats: {
      type: [String],
      default: all_seats
    },
    /* total_seats: {
      type: Number,
      required: true,
    }, */
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
