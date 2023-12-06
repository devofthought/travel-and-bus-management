import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { supportFilterableFields } from './support.constants'
import { SupportService } from './support.services'
import { ISupport } from './support.interface'

const createSupport: RequestHandler = catchAsync(async (req, res) => {
  const result = await SupportService.createSupport(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'your message received successfully!',
    data: result,
  })
})

const getAllSupport: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, supportFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const user = req.user
  const result = await SupportService.getAllSupport(
    user,
    filters,
    paginationOptions
  )

  sendResponse<ISupport[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All support retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

export const SupportController = {
  createSupport,
  getAllSupport,
}
