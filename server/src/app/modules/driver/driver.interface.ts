import { Model } from 'mongoose'

export type IDriver = {
  driver_id: string
  name: string
  image: string
  age: number
  email: string
  phone: string
  driving_license: string
  years_experience: number
  address: string
  joining_date: string
  driving_status: Array<{
    status: 'on-trip' | 'rest' | 'ready' | 'sick';
    date?: string;
  }>,
  // driving_status: 'on-trip' | 'rest' | 'ready' | 'sick'
}

export type DriverModel = Model<IDriver, Record<string, unknown>>

export type IDriverFilter = {
  searchTerm?: string
  driver_id?: string
  bloodGroup?: string
  email?: string
  phone?: string
  driving_license?: string
  address?: string
  driving_status?: string
}
