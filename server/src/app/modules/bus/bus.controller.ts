import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { BusService } from './bus.services'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { routeFilterableFields } from './bus.constants'
import { paginationFields } from '../../../constants/pagination'
import { IBusResponse } from './bus.interface'

const createBus = catchAsync(async (req: Request, res: Response) => {
  const result = await BusService.createBus(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus created successfully!',
    data: result,
  })
})

const getAllBus = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, routeFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await BusService.getAllBus(filters, paginationOptions)

  sendResponse<IBusResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bus retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

// const getSingleRoute = catchAsync(async (req: Request, res: Response) => {
//   const route_code = req.params.route_code
//   const result = await RouteService.getSingleRoute(route_code)

//   sendResponse<IRouteResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Route retrieved successfully !',
//     data: result,
//   })
// })

// const updateRoute = catchAsync(async (req: Request, res: Response) => {
//   const route_code = req.params.route_code
//   const updatedData = req.body
//   const result = await RouteService.updateRoute(route_code, updatedData)

//   sendResponse<IRouteResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Route updated successfully !',
//     data: result,
//   })
// })

// const deleteRoute = catchAsync(async (req: Request, res: Response) => {
//   const route_code = req.params.route_code
//   const result = await RouteService.deleteRoute(route_code)

//   sendResponse<IRouteResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Route deleted successfully!',
//     data: result,
//   })
// })

export const BusController = {
  createBus,
  getAllBus,
  // getSingleRoute,
  // updateRoute,
  // deleteRoute,
}
