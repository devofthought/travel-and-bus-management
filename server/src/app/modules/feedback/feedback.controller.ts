import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { feedbackFilterableFields } from './feedback.constants'
import { FeedbackService } from './feedback.services'
import { IFeedback } from './feedback.interface'

const createFeedback: RequestHandler = catchAsync(async (req, res) => {
  const result = await FeedbackService.createFeedback(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback created successfully!',
    data: result,
  })
})

const getAllFeedback: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, feedbackFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await FeedbackService.getAllFeedback(
    filters,
    paginationOptions
  )

  sendResponse<IFeedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Feedback retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleUserFeedback: RequestHandler = catchAsync(async (req, res) => {
  const result = await FeedbackService.getSingleUserFeedbacks(
    req.params.user_id
  )

  sendResponse<IFeedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedbacks retrieved successfully!',
    data: result,
  })
})

const getApprovedFeedbacks: RequestHandler = catchAsync(async (req, res) => {
  const result = await FeedbackService.getApprovedFeedbacks()

  sendResponse<IFeedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Approved feedbacks retrieved successfully!',
    data: result,
  })
})

const updateFeedback: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await FeedbackService.updateFeedback(id, updatedData)

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully!',
    data: result,
  })
})

const deleteFeedback: RequestHandler = catchAsync(async (req, res) => {
  const result = await FeedbackService.deleteFeedback(req.params.id)

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully!',
    data: result,
  })
})

export const FeedbackController = {
  createFeedback,
  getAllFeedback,
  getSingleUserFeedback,
  updateFeedback,
  deleteFeedback,
  getApprovedFeedbacks,
}
