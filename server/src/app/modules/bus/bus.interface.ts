import { Model } from 'mongoose'

export type IBusFilter = {
  available_seats: number
  bus_code: string
  availability_status: 'transit' | 'discontinue' | 'service' | 'standBy'
  brand_name: string
  modal: string
}

export type IBusResponse = {
  available_seats: number
  bus_code: string
  availability_status: 'transit' | 'discontinue' | 'service' | 'standBy'
  brand_name: string
  modal: string
  bus_image: string
  outer_image: string
  inner_image: string
}

export type IBus = {
  available_seats: number
  bus_code: string
  availability_status: 'transit' | 'discontinue' | 'service' | 'standBy'
  brand_name: string
  modal: string
  bus_image: string
  outer_image: string
  inner_image: string
}

export type BusModel = Model<IBus, Record<string, unknown>>
