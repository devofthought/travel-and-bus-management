import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { tripFilterableFields } from './trip.constants'
import { IGetUpComingTripResponse, ITripResponse } from './trip.interface'
import { TripService } from './trip.services'

const createTrip = catchAsync(async (req: Request, res: Response) => {
  const result = await TripService.createTrip(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip created successfully!',
    data: result,
  })
})

const getUpComingTrip = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, upComingTripFilterableFields)
  // const paginationOptions = pick(req.query, paginationFields)
  const payload = req.query
  const userAuth = req.user
  const result = await TripService.getUpComingTrip(payload, userAuth)

  sendResponse<IGetUpComingTripResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Up-coming Trip retrieved successfully!',
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

const getAllTrip = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tripFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await TripService.getAllTrip(filters, paginationOptions)

  sendResponse<any[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Trip retrieved successfully!',
    meta: result.meta,
    data: result?.data,
  })
})
const getSingleTrip = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await TripService.getSingleTrip(id)

  sendResponse<ITripResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip retrieved successfully!',
    data: result,
  })
})

const getAllUpdateAbleTrip = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tripFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await TripService.getAllUpdateAbleTrip(
    filters,
    paginationOptions
  )

  sendResponse<ITripResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Update able Trip retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getTripsByUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TripService.getTripByUser(req.body)

    sendResponse<ITripResponse[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All route wise Trip retrieved successfully!',
      // meta: result?.meta,
      data: result.data,
    })
  }
)

const getBusSeatStatusOnTripController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TripService.getBusSeatStatusOnTrip(req.body)

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Seat status retrieved successfully!',
      // meta: result?.meta,
      data: result,
    })
  }
)

const UpdateDateAndTimeFromAdminPanel = catchAsync(
  async (req: Request, res: Response) => {
    console.log('dad', req.body)
    const result = await TripService.UpdateDateAndTimeFromAdminPanel(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trip data time update successfully!',
      data: result,
    })
  }
)

export const TripController = {
  createTrip,
  updateTrip,
  getAllTrip,
  getSingleTrip,
  getUpComingTrip,
  getAllUpdateAbleTrip,
  getTripsByUsersController,
  getBusSeatStatusOnTripController,
  UpdateDateAndTimeFromAdminPanel,
}
