import { Schema, model } from 'mongoose'
import { ISupport, SupportModel } from './support.interface'

export const supportSchema = new Schema<ISupport, SupportModel>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
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

export const Support = model<ISupport, SupportModel>('Support', supportSchema)
