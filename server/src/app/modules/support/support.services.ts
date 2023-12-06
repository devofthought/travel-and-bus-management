/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ISupport, ISupportFilter } from './support.interface'
import { Support } from './support.model'
import { supportSearchableFields } from './support.constants'

const createSupport = async (payload: ISupport): Promise<ISupport | null> => {
  const createSupport = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    subject: payload.subject,
    message: payload.message,
  }

  const newSupport = await Support.create(createSupport)

  if (!newSupport) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Support')
  }
  return newSupport
}

const getAllSupport = async (
  payload: any,
  filters: ISupportFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISupport[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: supportSearchableFields?.map((field: any) => ({
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

  const result = await Support.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Support.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const SupportService = {
  createSupport,
  getAllSupport,
}
