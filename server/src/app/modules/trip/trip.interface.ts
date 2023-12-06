import { Model, Types } from 'mongoose'
import { IBus } from '../bus/bus.interface'
import { IDriver } from '../driver/driver.interface'
import { IRoute } from '../route/route.interface'
import { ObjectId } from 'mongoose'

export type ITrip = {
  route_code: string
  route_id: Types.ObjectId | IRoute | string
  departure_time: string
  arrival_time: string
  bus_code: string
  bus_id?: Types.ObjectId | IRoute | string
  ticket_price: number
  seats_available: number
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

export type ITripUserSearch = {
  departure_time: string
  to: string
  from: string
}

export type IUpComingTripPayload = {
  travel_id: string
}

export type IBooksTrip = {
  _id: ObjectId
  user_id: string
  trip_id: string
  booking_seat: string
  status: string
  createdAt: string
  updatedAt: string
}

export type IRouteSP = {
  _id: ObjectId
  from: string
  to: string
  distance: number
}

export type ITripSP = {
  _id: ObjectId
  route_code: string
  route_id: IRouteSP
  departure_time: string
  arrival_time: string
  bus_code: string
  bus_id: ObjectId
  ticket_price: number
  seats_available: number
  active_status: string
  driver_id: ObjectId
  driver_code: string
  trips_status: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

export type IGetUpComingTripResponse = {
  id: string
  from: string
  to: string
  distance: number
  departure_time: string
  arrival_time: string
  bus_code: string
  fare: number
  trip_status: string
  payment_status: string
  seats: number
  feedback: string
}

export type IGetAllTripResponse = {
  bus_id: string
  bus_model: string
  bus_code: string
  driver_id: string
  driver_code: string
  traveling_date: Date
  departure_time: string
  arrival_time: string
  from: string
  to: string
  distance: number
  fare: number
  available_seat: number
  booked_seats_list: any[]
  total_seat: string[]
  trips_status: string
}
