/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  IApprovedFeedback,
  IFeedback,
  IFeedbackFilter,
} from './feedback.interface'
import { Feedback } from './feedback.model'
import { feedbackSearchableFields, feedbackStatus } from './feedback.constants'
import { User } from '../user/user.model'
import { Trip } from '../trip/trip.model'
import { Booking } from '../booking/booking.model'
import { ENUM_USER_ROLE } from '../../../enums/user'

const createFeedback = async (
  payload: IFeedback,
  userAuth: any
): Promise<IFeedback | null> => {
  const user = await User.findById(userAuth.id)
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'traveler is not found')
  }

  const trip = await Trip.findById(payload.trip_id)
  if (!trip) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'trip is not found')
  }

  if (trip.trips_status !== 'completed') {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'trip is not completed')
  }

  /* check traveler is able to add feed or not */
  // const booking = await Booking.find({ trip_id: payload.trip_id })
  const booking = await Booking.find({
    $and: [{ travel_id: user.traveler_id }, { trip_id: payload.trip_id }],
  })

  if (booking.length === 0) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'travel is not able to add feedback on this trip'
    )
  }

  /* check feedback category match or not */
  const feedback = await Feedback.find({
    $and: [{ user_id: user._id }, { trip_id: payload.trip_id }],
  }).select('feedback_for')

  const isMatch = feedback.some(
    item => item.feedback_for === payload.feedback_for
  )

  if (isMatch) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'already add feedback on same category'
    )
  }

  if ('status' in payload) {
    delete payload.status
  }
  const createFeedback = {
    ...payload,
    feedback: payload.feedback.trim(),
    user_id: user._id,
  }

  const newFeedback = await Feedback.create(createFeedback)

  if (!newFeedback) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Feedback')
  }
  return newFeedback
}

const getAllFeedback = async (
  payload: any,
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

  if (payload.role === ENUM_USER_ROLE.ADMIN) {
    const result = await Feedback.find(whereCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'trip_id',
        populate: [
          { path: 'driver_id', select: 'driver_code name email age' },
          { path: 'route_id', select: 'from to distance' },
        ],
      })
      .populate({
        path: 'user_id',
        select: 'email traveler_id',
      })

    const total = await Feedback.countDocuments(whereCondition)

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } else if (payload.role === ENUM_USER_ROLE.USER) {
    const result = await Feedback.find({ user_id: payload.id })
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .select('-status')
      .populate({
        path: 'trip_id',
        populate: [
          { path: 'driver_id', select: 'driver_code name age' },
          { path: 'route_id', select: 'from to distance' },
        ],
      })
      .populate({
        path: 'user_id',
        select: 'email traveler_id',
      })
    const total = await Feedback.countDocuments({ user_id: payload.id })

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } else {
    const result = await Feedback.find({})
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .select('-status')

    const total = await Feedback.countDocuments({})

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  }
}

const getSingleUserFeedbacks = async (
  user_id: string,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFeedback[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder }

  const result = await Feedback.find({ user_id })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .select('-status')
    .populate({
      path: 'trip_id',
      populate: [
        { path: 'driver_id', select: 'driver_code name age' },
        { path: 'route_id', select: 'from to distance' },
      ],
    })
    .populate({
      path: 'user_id',
      select: 'email traveler_id',
    })
  const total = await Feedback.countDocuments({ user_id })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// const getApprovedFeedbacks = async (): Promise<IApprovedFeedbackResponse[] | null> => {
//   const result = await Feedback.find({ status: 'approved' }).populate({
//     path: 'user_id',
//     select: 'email traveler_id',
//     populate: [{ path: 'traveler_id', select: 'driver_code name email age' }],
//   })

//   if (result.length === 0) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'traveler is not found')
//   }

//   const approvedFeedback = []
//   for (const feedback of result) {
//     approvedFeedback.push({
//       feedback_content: feedback.feedback,
//       name: feedback.user_id?.traveler_id?.name,
//       user_type: 'traveler',
//       user_image: feedback.user_id?.traveler_id?.image,
//       rating: feedback.rating,
//       feedback_for: feedback.feedback_for,
//     })
//   }

//   return approvedFeedback
// }

const getApprovedFeedbacks = async (): Promise<IFeedback[] | null> => {
  const result = await Feedback.find({ status: 'approved' })
    .select('-status')
    .populate({
      path: 'user_id',
      select: 'traveler_id',
      populate: [{ path: 'traveler_id', select: 'name image' }],
    })

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

const updateAdminApprovedFeedback = async (
  payload: Partial<IApprovedFeedback>
): Promise<IFeedback | null> => {
  const isExist = await Feedback.findOne({ _id: payload.feedback_id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback not found!')
  }

  if (!feedbackStatus.includes(payload.status || 'none')) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Try to put wrong status!')
  }

  const result = await Feedback.findOneAndUpdate(
    { _id: payload.feedback_id },
    { status: payload.status },
    {
      new: true,
    }
  )
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
  getApprovedFeedbacks,
  updateAdminApprovedFeedback,
}
