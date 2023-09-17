import { Schema, model } from 'mongoose'
import { IRoute, RouteModel } from './route.interface'
export const routeSchema = new Schema<IRoute, RouteModel>(
  {
    route_code: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
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


export const Route = model<IRoute, RouteModel>('Route', routeSchema)
