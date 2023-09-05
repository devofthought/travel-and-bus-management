import { Model } from 'mongoose'
import { IBus } from '../bus/bus.interface'

export type IIncident = {
  bus_code: string
  servicing_status: 'pending' | 'on-servicing' | 'done'
  description: string
  cost: number
  bus_id?: string | undefined
}

export type IIncidentModel = Model<IIncident, Record<string, unknown>>

export type IIncidentFilter = {
  searchTerm?: string
  bus_code?: string
  servicing_status?: string
}

export type IIncidentResponse = {
  bus_code: string
  servicing_status: 'pending' | 'on-servicing' | 'done'
  description: string
  cost: number
  bus_id?: IBus | undefined | string
}
