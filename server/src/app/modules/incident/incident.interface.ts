import { Model } from 'mongoose'

export type IIncident = {
  bus_code: string
  avaliable_seats: number
  servicing_status: 'pending' | 'on-servicing' | 'done'
  description: string
  cost: number
}

export type IIncidentModel = Model<IIncident, Record<string, unknown>>

export type IIncidentFilter = {
  searchTerm?: string
  bus_code?: string
  servicing_status?: string
}
