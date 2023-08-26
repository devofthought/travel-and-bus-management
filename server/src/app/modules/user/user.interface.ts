/* eslint-disable no-unused-vars */

import { Model } from 'mongoose'

export type IUser = {
  _id: string
  email: string
  password: string
  role: 'admin' | 'traveler' | 'driver'
  admin_id?: string
  traveler_id?: string
  driver_id?: string
}

export type IUserMethods = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'role' | 'password' | '_id'> | null>

  isPasswordMatch(givenPassword: string, savedPassword: string): boolean
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>

export type IUserFilter = {
  searchTerm?: string
  _id?: string
  email?: string
  passwor?: string
  role?: 'admin' | 'traveler' | 'driver'
  admin_id?: string
  traveler_id?: string
  driver_id?: string
}
