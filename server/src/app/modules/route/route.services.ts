/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IRoute, IRouteFilter, IRouteResponse } from './route.interface'
import { Route } from './route.model'
import { routeSearchableFields } from './route.constants'
import { generatedRouteCode } from './route.utils'

const createRoute = async (payload: IRoute): Promise<IRouteResponse> => {
  const route_code = await generatedRouteCode() // genarated bus code
  payload.route_code = route_code
  payload.from = payload.from.toLowerCase()
  payload.to = payload.to.toLowerCase()
  const existingRoute = await Route.findOne({
    from: payload.from,
    to: payload.to,
  })
  if (existingRoute) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'This route already has!')
  }
  const newRoute = await Route.create(payload)
  return newRoute
}

const getAllRoute = async (
  filters: IRouteFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IRoute[]>> => {
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

  const result = await Route.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Route.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleRoute = async (route_code: string): Promise<IRoute | null> => {
  const id = route_code.toLocaleUpperCase()
  const result = await Route.findOne({ route_code: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'route not found!')
  }
  return result
}

const updateRoute = async (
  id: string,
  payload: Partial<IRoute>
): Promise<IRoute | null> => {
  const route_code = id.toLocaleUpperCase()
  delete payload.route_code
  const isExist = await Route.findOne({ route_code })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Route not found')
  }

  const result = await Route.findOneAndUpdate({ route_code }, payload, {
    new: true,
  })
  return result
}

const deleteRoute = async (id: string): Promise<IRoute | null> => {
  const result = await Route.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'route not found!')
  }
  return result
}

export const RouteService = {
  createRoute,
  getAllRoute,
  getSingleRoute,
  updateRoute,
  deleteRoute,
}
