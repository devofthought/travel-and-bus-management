import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { RouteService } from './route.services'
import catchAsync from '../../../shared/catchAsync'

const createRoute = catchAsync(async (req: Request, res: Response) => {
  const result = await RouteService.createRoute(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Route created successfully!',
    data: result,
  })
})

export const RouteController = {
  createRoute,
}
