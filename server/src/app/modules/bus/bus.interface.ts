import { Model } from 'mongoose'

export type IBusFilter = {
  searchTerm?: string
  available_seats?: number
  bus_code?: string
  availability_status?: 'transit' | 'discontinue' | 'servicing' | 'standBy'
  brand_name?: string
  model?: string
}

export type IBusResponse = {
  total_seats: number
  available_seats: number
  bus_code: string
  availability_status:
  | 'transit'
  | 'discontinue'
  | 'servicing'
  | 'standBy'
  | 'rest'
  brand_name: string
  model: string
  bus_image: string
  outer_image: string
  inner_image: string
}

export type IBus = {
  total_seats: number
  bus_code: string
  availability_status: 'transit' | 'discontinue' | 'servicing' | 'standBy'
  brand_name: string
  model: string
  bus_image: string
  outer_image: string
  inner_image: string
}

export type BusModel = Model<IBus, Record<string, unknown>>
