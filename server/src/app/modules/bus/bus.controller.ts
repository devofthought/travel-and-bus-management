import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { BusService } from './bus.services'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { busFilterableFields } from './bus.constants'
import { paginationFields } from '../../../constants/pagination'
import { IBusResponse } from './bus.interface'
import cloudinary from '../../../config/cloudinary'

const createBus = catchAsync(async (req: Request, res: Response) => {
  const bus = { ...req.body }

  if (Array.isArray(req.files)) {
    const uploadPromises = req.files.map(
      async (element: Express.Multer.File) => {
        if (element) {
          const image = await cloudinary.uploader.upload(element.path) // Use element.path to get the file path
          return image
        }
        return null
      }
    )

    // Wait for all the uploads to complete before continuing
    const uploadedImages = await Promise.all(uploadPromises)

    // Process the uploaded images as needed
    uploadedImages.forEach((image, index) => {
      if (image && index === 0) {
        const avatar = {
          avatar: image.secure_url,
          avatar_public_url: image.public_id,
        }
        bus.bus_image = avatar
      } else if (image && index === 1) {
        const avatar = {
          avatar: image.secure_url,
          avatar_public_url: image.public_id,
        }
        bus.inner_image = avatar
      } else if (image && index === 2) {
        const avatar = {
          avatar: image.secure_url,
          avatar_public_url: image.public_id,
        }
        bus.outer_image = avatar
      }
    })
  }

  const result = await BusService.createBus(bus)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus created successfully!',
    data: result,
  })
})

const getAllBus = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, busFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await BusService.getAllBus(filters, paginationOptions)

  sendResponse<IBusResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bus retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleBus = catchAsync(async (req: Request, res: Response) => {
  const bus_code = req.params.bus_code
  const result = await BusService.getSingleBus(bus_code)

  sendResponse<IBusResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus data retrieved successfully!',
    data: result,
  })
})

const updateBus = catchAsync(async (req: Request, res: Response) => {
  const bus_code = req.params.bus_code
  const updatedData = req.body
  const result = await BusService.updateBus(bus_code, updatedData)

  sendResponse<IBusResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus updated successfully!',
    data: result,
  })
})

const deleteBus = catchAsync(async (req: Request, res: Response) => {
  const bus_code = req.params.bus_code
  const result = await BusService.deleteBus(bus_code)

  sendResponse<IBusResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bus deleted successfully!',
    data: result,
  })
})

export const BusController = {
  createBus,
  getAllBus,
  getSingleBus,
  updateBus,
  deleteBus,
}
