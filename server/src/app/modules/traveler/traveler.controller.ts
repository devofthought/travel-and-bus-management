import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { travelerFilterableFields } from './traveler.constants'
import { TravelerService } from './traveler.service'
import sendResponse from '../../../shared/sendResponse'
import { ITravelerResponse } from './traveler.interface'
import httpStatus from 'http-status'
import cloudinary from '../../../config/cloudinary'

const getAllTraveler = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, travelerFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await TravelerService.getAllTraveler(
    filters,
    paginationOptions
  )

  sendResponse<ITravelerResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Traveler retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleTraveler = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await TravelerService.getSingleTraveler(id)

  sendResponse<ITravelerResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Traveler data retrieved successfully!',
    data: result,
  })
})

const updateTraveler = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const updatedData = req.body

  if (req.file) {
    const uploadedImage = await cloudinary.uploader.upload(req.file?.path)
    const avatar = {
      avatar: uploadedImage.secure_url,
      avatar_public_url: uploadedImage.public_id,
    }
    updatedData.image = avatar
  }

  const result = await TravelerService.updateTraveler(user, updatedData)

  sendResponse<ITravelerResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Traveler information updated successfully!',
    data: result,
  })
})
export const TravelerController = {
  getAllTraveler,
  getSingleTraveler,
  updateTraveler,
}
