/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { bcryptHelpers } from '../../../helper/bcryptHelpers'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { UserSearchableFields } from './user.constants'
import { IUser, IUserFilter } from './user.interface'
import { User } from './user.model'
import { Admin } from '../admin/admin.modal'
import mongoose from 'mongoose'
import { Driver } from '../driver/driver.model'
import { Traveler } from '../traveler/traveler.modal'

const getAllUsers = async (
  filters: IUserFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: UserSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder }

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {}

  const result = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id })
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
  }

  const { ...userData } = payload
  const updateUserData: Partial<IUser> = { ...userData }

  // dynamically handling nested fields
  /* if (name && Object.keys(name)?.length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>
        ; (updateUserData as any)[nameKey] = name[key as keyof typeof name]
    })
  } */

  const result = await User.findOneAndUpdate({ _id: id }, updateUserData, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ _id: id })
  return result
}

const getMyProfile = async (
  payload: JwtPayload | null
): Promise<IUser | null> => {
  let result = null
  result = await User.findById({ _id: payload?.id })
    .select('-password')
    .populate('traveler_id')
    .populate('admin_id')
    .populate('driver_id')

  return result
}

const updateMyProfile = async (
  user: JwtPayload | null,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: user?.id })
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
  }

  const { password, ...userData } = payload
  const updateUserData: Partial<IUser> = { ...userData }

  // dynamically handling nested fields
  /* if (name && Object.keys(name)?.length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>
        ; (updateUserData as any)[nameKey] = name[key as keyof typeof name]
    })
  } */

  // hash the password before updating
  if (password) {
    ;(updateUserData as any)['password'] = await bcryptHelpers.hashPassword(
      password
    )
  }

  const result = await User.findOneAndUpdate(
    { _id: user?.id },
    updateUserData,
    {
      new: true,
    }
  )
  return result
}

const updateUserEmail = async (
  user: JwtPayload | null, // TODO: [note] JWT Payload
  payload: { old_email: string; new_email: string }
): Promise<IUser | null> => {
  let result: IUser | null = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const existingUser = await User.findOne({ _id: user?.id })


    if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    if (existingUser.email !== payload.old_email) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Wrong email')
    }

    const isEmailAcceptAble = await User.findOne({ email: payload.new_email })
    if (isEmailAcceptAble) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'This email already exists')
    }

    const updateOptions = { session, new: true }
    const updatePayload = { email: payload.new_email }

    if (existingUser.role === 'admin') {
      await Admin.findByIdAndUpdate(
        existingUser.admin_id,
        updatePayload,
        updateOptions
      )
    } else if (existingUser.role === 'driver') {
      await Driver.findByIdAndUpdate(
        existingUser.driver_id,
        updatePayload,
        updateOptions
      )
    } else if (existingUser.role === 'traveler') {
      await Traveler.findByIdAndUpdate(
        existingUser.traveler_id,
        updatePayload,
        updateOptions
      )
    }

    result = await User.findByIdAndUpdate(
      existingUser.id,
      updatePayload,
      updateOptions
    )

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (result) {
    result = await User.findById(result._id)
      .select('-password')
      .populate('traveler_id')
      .populate('driver_id')
      .populate('admin_id')
  }
  return result
}

const updateUserPassword = async (
  user_id: JwtPayload | null,
  payload: {
    old_password: string
    new_password: string
    confirm_new_password: string
  }
): Promise<IUser | null> => {
  const user = new User()
  const isUserExist = await User.findById(user_id?.id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  if (payload.confirm_new_password !== payload.new_password) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'New password and confirm password is not match'
    )
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(payload.old_password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Invalid password')
  }

  const password_hashed = await bcryptHelpers.hashPassword(payload.new_password)
  const result = await User.findByIdAndUpdate(user_id?.id, {
    password: password_hashed,
  })

  return result
}

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  updateUserEmail,
  updateUserPassword,
}
