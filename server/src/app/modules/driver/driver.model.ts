import { Schema, model } from 'mongoose'
import { IDriver, DriverModel } from './driver.interface'

export const driverSchema = new Schema<IDriver, DriverModel>(
  {
    driver_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    driving_licence: {
      type: Number,
      required: true,
    },
    years_exprience: {
      type: Number,
      required: true,
    },
    address: {
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

export const Driver = model<IDriver, DriverModel>('Driver', driverSchema)
