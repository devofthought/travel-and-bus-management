/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IDriver, IDriverFilter } from './driver.interface'
import { driverSearchableFields } from './driver.constants'
import { Driver } from './driver.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'

const getAllDrivers = async (
  filters: IDriverFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDriver[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: driverSearchableFields?.map(field => ({
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

  const result = await Driver.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Driver.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDriver = async (id: string): Promise<IDriver | null> => {
  const result = await Driver.findOne({ id })
  return result
}

const updateDriver = async (
  id: string,
  payload: Partial<IDriver>
): Promise<IDriver | null> => {
  const isExist = await Driver.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not found')
  }

  const result = await Driver.findOneAndUpdate({ id }, payload, {
    new: true,
  })
  return result
}

export const DriverService = {
  getAllDrivers,
  getSingleDriver,
  updateDriver,
}
