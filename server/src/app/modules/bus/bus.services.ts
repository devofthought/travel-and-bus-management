/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { routeSearchableFields } from './bus.constants'
import { IBus, IBusFilter, IBusResponse } from './bus.interface'
import { generatedBusCode } from './bus.utils'
import { Bus } from './bus.model'

const createBus = async (payload: IBus): Promise<IBusResponse> => {
  const bus_code = await generatedBusCode() // generated bus code
  payload.bus_code = bus_code
  const newRoute = await Bus.create(payload)
  if (!newRoute) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create bus')
  }
  return newRoute
}

const getAllBus = async (
  filters: IBusFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBus[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: routeSearchableFields?.map((field: any) => ({
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

  const result = await Bus.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Bus.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleBus = async (bus_code: string): Promise<IBus | null> => {
  const id = bus_code.toLocaleUpperCase()
  const result = await Bus.findOne({ bus_code: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found!')
  }
  return result
}

export const BusService = {
  createBus,
  getAllBus,
  getSingleBus,
}
