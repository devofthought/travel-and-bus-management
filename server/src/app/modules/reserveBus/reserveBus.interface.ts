import { Model } from 'mongoose'

export type IReserveBus = {
  from: string
  to: string
  departure_time: Date
  arrival_time: Date
  name:string
  email: string
  phone: string
  bus_code: string
  bus_type: string
  bus_seats: string
  total_price: number
  driver_ids: string[]
  status: 'pending' | 'approved' | 'rejected'
}

export type IReserveBusModel = Model<IReserveBus, Record<string, unknown>>

export type IReserveBusFilter = {
  searchTerm?: string
  trip_id?: string
  email?: string
  user_id?: string
  bus_code?: string
  status?: string
}
