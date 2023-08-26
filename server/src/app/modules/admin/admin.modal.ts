import { AdminModel, IAdmin } from './admin.interface'
import { Schema, model } from 'mongoose'

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  image: { type: String },
})

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
