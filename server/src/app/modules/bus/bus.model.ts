import { Schema, model } from 'mongoose'
import { all_seats, availability_status } from './bus.constants'
import { BusModel, IBus } from './bus.interface'

/* 
Total seats structure for a bus: 
[ 
  'A1', 'A2', 'A3', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4', 
  'D1', 'D2', 'D3', 'D4',
  'E1', 'E2', 'E3', 'E4', 
  'F1', 'F2', 'F3', 'F4',
  'G1', 'G2', 'G3', 'G4',
  'H1', 'H2', 'H3', 'H4', 
  'I1', 'I2', 'I3', 'I4',
  'J1', 'J2', 'J3', 'J4', 
]
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
