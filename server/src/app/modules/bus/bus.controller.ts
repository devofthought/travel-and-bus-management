import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { BusService } from './bus.services'
import catchAsync from '../../../shared/catchAsync'

const createBus = catchAsync(async (req: Request, res: Response) => {
  const result = await BusService.createBus(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus created successfully!',
    data: result,
  })
})

export const BusController = {
  createBus,
}
