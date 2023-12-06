import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IReserveBus } from './reserveBus.interface'
import { ReserveBusService } from './reserveBus.services'
import { reserveBusFilterableFields } from './reserveBus.constants'

const reserveBusRequest: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReserveBusService.reserveBusRequest(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your reserved bus request has been successfully sent!',
    data: result,
  })
})

const getAllReserveBus: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, reserveBusFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await ReserveBusService.getAllReserveBus(
    filters,
    paginationOptions
  )

  sendResponse<IReserveBus[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All ReserveBus retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleUserReserveBus: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReserveBusService.getSingleUserReserveBus(
    req.params.user_id
  )

  sendResponse<IReserveBus[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ReserveBuss retrieved successfully!',
    data: result,
  })
})

const updateReserveBus: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await ReserveBusService.updateReserveBus(id, updatedData)

  sendResponse<IReserveBus>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ReserveBus updated successfully!',
    data: result,
  })
})

const deleteReserveBus: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReserveBusService.deleteReserveBus(req.params.id)

  sendResponse<IReserveBus>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ReserveBus deleted successfully!',
    data: result,
  })
})

export const ReserveBusController = {
  reserveBusRequest,
  getAllReserveBus,
  getSingleUserReserveBus,
  updateReserveBus,
  deleteReserveBus,
}
