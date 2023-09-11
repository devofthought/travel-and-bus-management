import { Model, Types } from 'mongoose'
import { IBus } from '../bus/bus.interface'
import { IDriver } from '../driver/driver.interface'
import { IRoute } from '../route/route.interface'

export type ITrip = {
  route_code: string
  route_id: Types.ObjectId | IRoute | string
  departure_time: string
  arrival_time: string
  bus_code: string
  bus_id?: Types.ObjectId | IRoute | string
  ticket_price: number
  trips_status: 'pending' | 'completed' | 'on-processing'
  driver_code: string
  driver_id?: Types.ObjectId | IDriver
  createdAt: Date
  active_status: 'active' | 'inactive'
}

export type ITripResponse = {
  route_code: string
  departure_time: string
  arrival_time: string
  bus_code: string | IBus
  ticket_price: number
  trips_status: 'pending' | 'completed' | 'on-processing'
  driver_id?: Types.ObjectId | IDriver
  active_status: 'active' | 'inactive'
}

export type TripModel = Model<ITrip, Record<string, unknown>>

export type ITripFilter = {
  searchTerm?: string
  trips_status?: 'pending' | 'completed' | 'on-processing'
  ticket_price?: number
  bus_code?: string
  route_code?: string
}
