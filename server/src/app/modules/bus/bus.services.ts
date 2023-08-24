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

const getSingleBus = async (id: string): Promise<IBus | null> => {
  const bus_code = id.toLocaleUpperCase()
  const result = await Bus.findOne({ bus_code })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found!')
  }
  return result
}

const updateBus = async (
  id: string,
  payload: Partial<IBus>
): Promise<IBus | null> => {
  const bus_code = id.toLocaleUpperCase()
  delete payload.bus_code
  const isExist = await Bus.findOne({ bus_code })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bus not found!')
  }

  const result = await Bus.findOneAndUpdate({ bus_code }, payload, {
    new: true,
  })
  return result
}

const deleteBus = async (id: string): Promise<IBus | null> => {
  const bus_code = id.toLocaleUpperCase()
  const result = await Bus.findOneAndDelete({ bus_code })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found!')
  }
  return result
}

export const BusService = {
  createBus,
  getAllBus,
  getSingleBus,
  updateBus,
  deleteBus,
}
