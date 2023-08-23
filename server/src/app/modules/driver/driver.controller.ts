import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IDriver } from './driver.interface'
import { driverFilterableFields } from './driver.constants'
import { DriverService } from './driver.service'

const getAllDrivers: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, driverFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await DriverService.getAllDrivers(filters, paginationOptions)
  sendResponse<IDriver[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver retrived successfully',
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

export const DriverController = {
  getAllDrivers,
  getSingleDriver,
  updateDriver,
}
