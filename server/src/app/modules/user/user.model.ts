/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, UserModel } from './user.interface'
import config from '../../../config'
import { role } from './user.constants'
const { Schema } = mongoose

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: role, required: true },
  admin_id: { type: Schema.Types.ObjectId, ref: 'Admin' },
  traveler_id: { type: Schema.Types.ObjectId, ref: 'Traveler' },
  driver_id: { type: Schema.Types.ObjectId, ref: 'Driver' },
})

userSchema.methods.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'role' | 'password' | '_id'> | null> {
  const user = await User.findOne(
    { email: email },
    { _id: 1, role: 1, password: 1 }
  ).select('+password')

  if (user) {
    return {
      _id: user._id.toString(),
      role: user.role,
      password: user.password,
    }
  }

  return null
}

userSchema.methods.isPasswordMatch = function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  // hash the password before saving into the database
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
