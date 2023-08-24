import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { RouteService } from './route.services'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { routeFilterableFields } from './route.constants'
import { paginationFields } from '../../../constants/pagination'
import { IRouteResponse } from './route.interface'

const createRoute = catchAsync(async (req: Request, res: Response) => {
  const result = await RouteService.createRoute(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Route created successfully!',
    data: result,
  })
})

const getAllRoute = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, routeFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await RouteService.getAllRoute(filters, paginationOptions)

  sendResponse<IRouteResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All route retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

export const RouteController = {
  createRoute,
  getAllRoute,
}
