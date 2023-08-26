import { ITraveler, TravelerModel } from './traveler.interface'
import { Schema, model } from 'mongoose'

const travelerSchema = new Schema<ITraveler>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})

export const Traveler = model<ITraveler, TravelerModel>(
  'Traveler',
  travelerSchema
)
