import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { driverFilterableFields } from './driver.constants'
import { IDriver } from './driver.interface'
import { DriverService } from './driver.service'

const getAllDrivers: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, driverFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await DriverService.getAllDrivers(filters, paginationOptions)
  sendResponse<IDriver[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDriver: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await DriverService.getSingleDriver(id)
  sendResponse<IDriver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver retrived successfully',
    data: result,
  })
})

const updateDriver: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateData = req.body

  const result = await DriverService.updateDriver(id, updateData)

  sendResponse<IDriver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver updated successfully',
    data: result,
  })
})

const getAvailableDriverController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await DriverService.getAvailableDriver(
      req.body.departure_time
    )

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available drivers fetched successfully',
      data: result,
    })
  }
)

export const DriverController = {
  getAllDrivers,
  getSingleDriver,
  updateDriver,
  getAvailableDriverController,
}
