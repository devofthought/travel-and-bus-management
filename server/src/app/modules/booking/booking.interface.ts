import { Document } from 'mongoose'

export type BookingInterface = {
  travel_id: string
  trip_id: string
  booking_seat: string
  status: 'pending' | 'approved' | 'completed' | 'cancelled'
  payment_id?: string
} & Document

export type BookingCreateDTO = {
  user_id: {
    name: string
    email: string
  }
  trip_id: string
  booking_seat: string[]
}

export type BookingUpdateDTO = {
  status: string
}
