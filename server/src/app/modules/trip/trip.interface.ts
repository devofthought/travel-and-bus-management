import { Model, Types } from 'mongoose'
import { IDriver } from '../driver/driver.interface'
import { IBus } from '../bus/bus.interface'

export type ITrip = {
  route_code: string
  departure_time: string
  arrival_time: string
  bus_code: string
  ticket_price: number
  trips_status: 'pending' | 'completed' | 'on-processing'
  driver_id: Types.ObjectId | IDriver
}

export type ITripResponse = {
  route_code: string
  departure_time: string
  arrival_time: string
  bus_code: string | IBus
  ticket_price: number
  trips_status: 'pending' | 'completed' | 'on-processing'
  driver_id?: Types.ObjectId | IDriver
}

export type TripModel = Model<ITrip, Record<string, unknown>>

export type ITripFilter = {
  searchTerm?: string
  trips_status?: 'pending' | 'completed' | 'on-processing'
  ticket_price?: number
  bus_code?: string
  route_code?: string
}