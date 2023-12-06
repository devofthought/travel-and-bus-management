import { Model } from 'mongoose'

export type ISupport = {
  first_name: string
  last_name?: string
  email: string
  phone: string
  subject?: string
  message: string
}

export type SupportModel = Model<ISupport, Record<string, unknown>>

export type ISupportFilter = {
  searchTerm?: string
  subject?: string
  phone?: string
  first_name?: string
  email?: string
}
