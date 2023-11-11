import { Schema, model } from 'mongoose'
import { driving_status } from './driver.constants'
import { DriverModel, IDriver } from './driver.interface'

export const driverSchema = new Schema<IDriver, DriverModel>(
  {
    name: {
      type: String,
      required: true,
    },
    driver_code: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
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
      unique: true,
    },
    driving_license: {
      type: String,
      required: true,
    },
    years_experience: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    joining_date: {
      type: String,
      required: true,
    },
    /* 
    export const driving_status = ['on-trip', 'rest', 'ready', 'sick']
    */
    // driving_status: {
    //   type: String,
    //   required: true,
    //   enum: driving_status,
    // },
    availability_status: [
      {
        status: {
          type: String,
          enum: driving_status,
        },
        date: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Driver = model<IDriver, DriverModel>('Driver', driverSchema)
