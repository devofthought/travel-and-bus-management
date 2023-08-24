import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { TripService } from './trip.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createTrip = catchAsync(async (req: Request, res: Response) => {
  const result = await TripService.createTrip(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip created successfully!',
    data: result,
  })
})

export const TripController = {
  createTrip,
}
