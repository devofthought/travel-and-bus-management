import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { TripService } from './trip.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ITripResponse } from './trip.interface'

const createTrip = catchAsync(async (req: Request, res: Response) => {
  const result = await TripService.createTrip(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip created successfully!',
    data: result,
  })
})

const updateTrip = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await TripService.updateTrip(id, updatedData)

  sendResponse<ITripResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip updated successfully!',
    data: result,
  })
})

export const TripController = {
  createTrip,
  updateTrip,
}
