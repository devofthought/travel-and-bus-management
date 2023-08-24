import { Model } from 'mongoose'

export type IDriver = {
  driver_id: string
  name: string
  image: string
  age: number
  email: string
  phone: string
  driving_licence: number
  years_exprience: number
  address: string
}

export type DriverModel = Model<IDriver, Record<string, unknown>>

export type IDriverFilter = {
  searchTerm?: string
  driver_id?: string
  bloodGroup?: string
  email?: string
  phone?: string
  driving_licence?: string
  address?: string
}
