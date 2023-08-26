import { AdminModel, IAdmin } from './admin.interface'
import { Schema, model } from 'mongoose'

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
})

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
