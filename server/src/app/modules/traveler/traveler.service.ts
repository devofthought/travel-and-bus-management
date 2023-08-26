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
  id: string,
  payload: Partial<ITraveler>
): Promise<ITraveler | null> => {
  delete payload._id
  const isExist = await Traveler.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bus not found!')
  }

  const result = await Traveler.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const TravelerService = {
  getAllTraveler,
  getSingleTraveler,
  updateTraveler,
}
