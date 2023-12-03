/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ITraveler, ITravelerFilter } from './traveler.interface'
import { Traveler } from './traveler.modal'
import { travelerSearchableFields } from './traveler.constants'
import { User } from '../user/user.model'
import cloudinary from '../../../config/cloudinary'
import { JwtPayload } from 'jsonwebtoken'

const getAllTraveler = async (
  filters: ITravelerFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITraveler[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: travelerSearchableFields?.map((field: any) => ({
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

  const result = await Traveler.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Traveler.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleTraveler = async (id: string): Promise<ITraveler | null> => {
  const result = await Traveler.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Traveler not found!')
  }
  return result
}

const updateTraveler = async (
  user: JwtPayload | null,
  payload: Partial<ITraveler>
): Promise<ITraveler | null> => {
  delete payload._id
  delete payload.email


  const isExistUser = await User.findById(user?.id)

  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Traveler is not found!')
  }

  const traveler = await Traveler.findById(isExistUser.traveler_id)
  // console.log(traveler)

  if (payload.image && traveler && traveler.image && traveler.image.avatar_public_url) {
    await cloudinary.uploader.destroy(traveler.image.avatar_public_url)
    // console.log(result);
    // console.log('image here', traveler.image.avatar_public_url)
  }


  const result = await Traveler.findByIdAndUpdate(
    isExistUser.traveler_id,
    payload,
    { new: true }
  )

  return result
}

export const TravelerService = {
  getAllTraveler,
  getSingleTraveler,
  updateTraveler,
}
