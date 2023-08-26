import { Schema, model } from 'mongoose'
import { IDriver, DriverModel } from './driver.interface'
import { driving_status } from './driver.constants'

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
    driving_license: {
      type: Number,
      required: true,
    },
    years_experience: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    joining_date: {
      type: String,
      required: true,
    },
    driving_status: {
      type: String,
      required: true,
      enum: driving_status,
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
