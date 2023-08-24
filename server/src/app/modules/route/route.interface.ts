import { Model } from 'mongoose'

export type IRoute = {
  route_code: string
  from: string
  to: string
  distance: number
}

export type RouteModel = Model<IRoute, Record<string, unknown>>

export type IRouteFilter = {
  searchTerm?: string
  route_code?: string
  from?: string
  to?: string
  distance?: number
}

export type IRouteResponse = {
  route_code: string
  from: string
  to: string
  distance: number
}
