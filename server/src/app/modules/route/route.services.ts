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

/*
 *'from',
 *'to',
 *'distance',
 */
const createRoute = async (payload: IRoute): Promise<IRouteResponse> => {
  const route_code = await generatedRouteCode() // genarated bus code
  payload.route_code = route_code
  const newRoute = await Route.create(payload)
  return newRoute
}

export const RouteService = {
  createRoute,
}
