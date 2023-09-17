import { ITraveler, TravelerModel } from './traveler.interface'
import { Schema, model } from 'mongoose'

const travelerSchema = new Schema<ITraveler>({
  name: { type: String, required: true },
  image: { type: String },
  age: { type: Number },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
})

export const Traveler = model<ITraveler, TravelerModel>(
  'Traveler',
  travelerSchema
)
