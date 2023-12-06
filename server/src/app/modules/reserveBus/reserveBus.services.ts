/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IReserveBus, IReserveBusFilter } from './reserveBus.interface'
import { ReserveBus } from './reserveBus.model'
import { reserveBusSearchableFields } from './reserveBus.constants'

const reserveBusRequest = async (
  payload: Partial<IReserveBus>
): Promise<IReserveBus | null> => {
  const updatePayload = {
    from: payload.from,
    to: payload.to,
    departure_time: payload.departure_time,
    arrival_time: payload.arrival_time,
    name: payload.name,
    email: payload.email,
    bus_seats: payload.bus_seats,
    bus_type: payload.bus_type,
  }
  const newReserveBus = await ReserveBus.create(updatePayload)
  if (!newReserveBus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create ReserveBus')
  }
  /* //TODO: email send when someone request for a bus */

  return newReserveBus
}

const getAllReserveBus = async (
  filters: IReserveBusFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReserveBus[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: reserveBusSearchableFields?.map((field: any) => ({
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

  const result = await ReserveBus.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await ReserveBus.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUserReserveBus = async (
  user_id: string
): Promise<IReserveBus[] | null> => {
  const result = await ReserveBus.find({ user_id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ReserveBuss not found!')
  }
  return result
}

const updateReserveBus = async (
  id: string,
  payload: Partial<IReserveBus>
): Promise<IReserveBus | null> => {
  const isExist = await ReserveBus.findOne({ _id: id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ReserveBus not found!')
  }

  const result = await ReserveBus.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteReserveBus = async (id: string): Promise<IReserveBus | null> => {
  const result = await ReserveBus.findOneAndDelete({ _id: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ReserveBus not found!')
  }
  return result
}

export const ReserveBusService = {
  reserveBusRequest,
  getAllReserveBus,
  getSingleUserReserveBus,
  updateReserveBus,
  deleteReserveBus,
}
