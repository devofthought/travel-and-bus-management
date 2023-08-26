import { Model } from 'mongoose'

export type ITraveler = {
  _id: string
  name: string
  image: string
  age: number
  phone: string
  email: string
}
export type TravelerModel = Model<ITraveler, Record<string, unknown>>
