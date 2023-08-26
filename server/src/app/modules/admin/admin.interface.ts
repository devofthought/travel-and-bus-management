import { Model } from 'mongoose'

export type IAdmin = {
  _id: string
  name: string
  email: string
  address: string
  password: string
  image: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
