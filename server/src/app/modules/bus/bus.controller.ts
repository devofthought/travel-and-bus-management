import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { BusService } from './bus.services'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { busFilterableFields } from './bus.constants'
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
  const filters = pick(req.query, busFilterableFields)
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

const getSingleBus = catchAsync(async (req: Request, res: Response) => {
  const bus_code = req.params.bus_code
  const result = await BusService.getSingleBus(bus_code)

  sendResponse<IBusResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus data retrieved successfully!',
    data: result,
  })
})

const updateBus = catchAsync(async (req: Request, res: Response) => {
  const bus_code = req.params.bus_code
  const updatedData = req.body
  const result = await BusService.updateBus(bus_code, updatedData)

  sendResponse<IBusResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus updated successfully!',
    data: result,
  })
})

const deleteBus = catchAsync(async (req: Request, res: Response) => {
  const bus_code = req.params.bus_code
  const result = await BusService.deleteBus(bus_code)

  sendResponse<IBusResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus deleted successfully!',
    data: result,
  })
})

export const BusController = {
  createBus,
  getAllBus,
  getSingleBus,
  updateBus,
  deleteBus,
}
