/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IFeedback, IFeedbackFilter } from './feedback.interface'
import { Feedback } from './feedback.model'
import { feedbackSearchableFields } from './feedback.constants'

const createFeedback = async (
  payload: IFeedback
): Promise<IFeedback | null> => {
  const newFeedback = await Feedback.create(payload)
  if (!newFeedback) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Feedback')
  }
  return newFeedback
}

const getAllFeedback = async (
  filters: IFeedbackFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFeedback[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: feedbackSearchableFields?.map((field: any) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder }

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {}

  const result = await Feedback.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Feedback.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUserFeedbacks = async (
  user_id: string
): Promise<IFeedback[] | null> => {
  const result = await Feedback.find({ user_id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedbacks not found!')
  }
  return result
}

const updateFeedback = async (
  id: string,
  payload: Partial<IFeedback>
): Promise<IFeedback | null> => {
  const isExist = await Feedback.findOne({ _id: id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback not found!')
  }

  const result = await Feedback.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findOneAndDelete({ _id: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found!')
  }
  return result
}

export const FeedbackService = {
  createFeedback,
  getAllFeedback,
  getSingleUserFeedbacks,
  updateFeedback,
  deleteFeedback,
}
