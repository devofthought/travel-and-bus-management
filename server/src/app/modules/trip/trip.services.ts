import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ITrip, ITripFilter, ITripResponse } from './trip.interface'
import { Trip } from './trip.model'
import { Driver } from '../driver/driver.model'
import { Bus } from '../bus/bus.model'
import mongoose, { SortOrder } from 'mongoose'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { tripSearchableFields } from './trip.constants'
import { paginationHelper } from '../../../helper/paginationHelper'

const createTrip = async (payload: ITrip): Promise<ITripResponse | null> => {
  const driver = await Driver.findById(payload.driver_id)
  const bus = await Bus.findOne({ bus_code: payload.bus_code })

  if (!driver) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not found')
  }

  if (!bus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bus not found')
  }

  if (driver.driving_status !== 'ready') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Driver is not available')
  }

  if (bus.availability_status !== 'standBy') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bus is not available')
  }

  if (payload.trips_status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not able to create a past trip')
  }

  // generate student id
  let newTripObject = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    //array
    const newTrip = await Trip.create([payload], { session })
    if (!newTrip.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create trip')
    }

    newTripObject = newTrip[0]

    await Bus.findOneAndUpdate(
      { bus_code: newTripObject.bus_code },
      { availability_status: 'transit' },
      { session, new: true }
    )

    await Driver.findOneAndUpdate(
      { _id: newTripObject.driver_id },
      { driving_status: 'on-trip' },
      { session, new: true }
    )

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  let finalTrip = null
  if (newTripObject) {
    finalTrip = await Trip.findById(newTripObject._id)
      .populate('driver_id')
      .populate('bus_code')
  }
  return finalTrip
}

/*
 * change previous bus status
 * change pervious driver status
 * update trip
 * update bus status
 * update driver status
 */

const updateTrip = async (
  id: string,
  payload: Partial<ITrip>
): Promise<ITripResponse | null> => {
  const isExist = await Trip.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trip not found!')
  }
  if (payload.driver_id) {
    const driver = await Driver.findById(payload.driver_id)
    if (!driver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not found')
    }
    if (driver.driving_status !== 'ready') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver is not available')
    }
  }
  if (payload.bus_code) {
    const bus = await Bus.findOne({ bus_code: payload.bus_code })
    if (!bus) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Bus not found')
    }
    if (bus.availability_status !== 'standBy') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Bus is not available')
    }
  }
  // generate student id
  let newTripObject = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    if (payload.bus_code) {
      await Bus.findOneAndUpdate(
        { bus_code: isExist.bus_code },
        { availability_status: 'rest' },
        { session, new: true }
      )
    }
    if (payload.driver_id) {
      await Driver.findOneAndUpdate(
        { _id: isExist.driver_id },
        { driving_status: 'rest' },
        { session, new: true }
      )
    }

    //array
    const newTrip = await Trip.findByIdAndUpdate(id, payload, {
      session,
      new: true,
    })
    if (!newTrip) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update trip')
    }
    newTripObject = newTrip

    if (payload.driver_id) {
      await Bus.findOneAndUpdate(
        { bus_code: newTripObject.bus_code },
        { availability_status: 'transit' },
        { session, new: true }
      )
    }
    if (payload.driver_id) {
      await Driver.findOneAndUpdate(
        { _id: newTripObject.driver_id },
        { driving_status: 'on-trip' },
        { session, new: true }
      )
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  let finalTrip = null
  if (newTripObject) {
    finalTrip = await Trip.findById(newTripObject._id).populate('driver_id')
  }
  return finalTrip
  /* if admin want to change driver id */
}

const getAllTrip = async (
  filters: ITripFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITrip[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: tripSearchableFields?.map((field: any) => ({
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

  const result = await Trip.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Trip.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleTrip = async (id: string): Promise<ITrip | null> => {
  const result = await Trip.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'route not found!')
  }
  return result
}

export const TripService = {
  createTrip,
  updateTrip,
  getAllTrip,
  getSingleTrip,
}
