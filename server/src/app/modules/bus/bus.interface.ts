import { Model } from 'mongoose'

export type ImageMetaData = {
  avatar?: string
  avatar_public_url?: string
}

export type IBusFilter = {
  searchTerm?: string
  available_seats?: number
  bus_code?: string
  availability_status?: 'transit' | 'discontinue' | 'servicing' | 'standBy'
  brand_name?: string
  model?: string
}

export type IBusResponse = {
  total_seats: Array<string>
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
  bus_image?: ImageMetaData
  outer_image?: ImageMetaData
  inner_image?: ImageMetaData
}

export type IBus = {
  total_seats: Array<string>
  available_seats: number
  bus_code: string
  availability_status: Array<{
    status: 'transit' | 'discontinue' | 'servicing' | 'standBy'
    date?: string
  }>
  // availability_status: 'transit' | 'discontinue' | 'servicing' | 'standBy'
  brand_name: string
  model: string
  bus_image?: ImageMetaData
  outer_image?: ImageMetaData
  inner_image?: ImageMetaData
}

export type BusModel = Model<IBus, Record<string, unknown>>
