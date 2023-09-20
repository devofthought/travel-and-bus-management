import httpStatus from 'http-status'
import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { VariantCreation } from '../../../utils/utilities'
import { Booking } from '../booking/booking.model'
import { Bus } from '../bus/bus.model'
import { Driver } from '../driver/driver.model'
import { Route } from '../route/route.model'
import { tripSearchableFields } from './trip.constants'
import { ITrip, ITripFilter, ITripResponse } from './trip.interface'
import { Trip } from './trip.model'

const createTrip = async (payload: ITrip): Promise<ITripResponse | null> => {
  const driver = await VariantCreation.findAvailabilityByDepartureTime({ driver_code: payload.driver_code }, payload.departure_time, Driver);
  const bus = await VariantCreation.findAvailabilityByDepartureTime({ bus_code: payload.bus_code }, payload.departure_time, Bus);
  const route = await Route.findOne({ route_code: payload.route_code })
  if (!route) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Route is not found')
  }
  payload.route_id = route._id.toString()
  if (driver) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Driver is not available')
  }
  if (bus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bus is not available')
  }
  if (payload.trips_status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not able to create a past trip')
  }

  payload.active_status = 'active'
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
      { $push: { availability_status: { status: 'transit', date: newTripObject.departure_time } } },
      { session, new: true }
    )
    await Driver.findOneAndUpdate(
      { _id: newTripObject.driver_id },
      { $push: { availability_status: { status: 'on-trip', date: newTripObject.departure_time } } },
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
      .populate('bus_id')
      .populate('route_id')
  }
  return finalTrip
}

const getAllUpdateAbleTrip = async (
  filters: ITripFilter,
  paginationOptions: IPaginationOptions
) => {
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
    .populate('driver_id')
    .populate('bus_id')
    .populate('route_id')

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
  console.log(payload)
  const isExist = await Trip.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trip not found!')
  }
  if (payload.driver_id) {
    const driver = await VariantCreation.findAvailabilityByDepartureTime({ driver_code: payload.driver_code }, payload.departure_time, Driver);
    if (driver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not found')
    }
    if (driver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver is not available')
    }
  }
  if (payload.bus_code) {
    const bus = await VariantCreation.findAvailabilityByDepartureTime({ bus_code: payload.bus_code }, payload.departure_time, Bus);
    if (bus) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Bus is not available')
    }
  }

  let newTripObject = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    if (payload.bus_code) {
      await Bus.findOneAndUpdate(
        { bus_code: isExist.bus_code },
        { availability_status: 'standBy' },
        { session, new: true }
      )
    }
    if (payload.driver_id) {
      await Driver.findOneAndUpdate(
        { _id: isExist.driver_id },
        { driving_status: 'ready' },
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
) => {
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

  let result2 = []
  for (let trip of result) {
    const bus = await Bus.findOne({ bus_code: trip.bus_code }).select(
      '_id model total_seats'
    ) // find bus_id and bus_model
    const route = await Route.findById(trip.route_id) // find to and from
    const bookedSeatsArray = await Booking.aggregate([
      {
        $group: {
          _id: null,
          booked_seats: { $push: '$booked_seat' },
        },
      },
      {
        $project: {
          _id: 0,
          booked_seats: 1,
        },
      },
    ]) // create an array of booked_seats

    result2.push({
      bus_id: bus?._id,
      bus_model: bus?.model,
      driver_id: trip.driver_id,
      traveling_date: trip?.createdAt,
      departure_time: trip.departure_time,
      arrival_time: trip.arrival_time,
      from: route?.from,
      to: route?.to,
      fare: trip.ticket_price,
      available_seat:
        bus?.total_seats &&
        bus?.total_seats - bookedSeatsArray[0]?.booked_seats?.length,
      total_seat: bus?.total_seats,
    })
  }

  const total = await Trip.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result2,
  }
}

const getSingleTrip = async (id: string): Promise<ITrip | null> => {
  const result = await Trip.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'route not found!')
  }
  return result
}

/**
 * dept.
 * from
 * to
 *
 * (must trips status pending)
 * */

const getUpComingTrip = async () => {
  const result = await Trip.find({ trips_status: "pending" })
  return result
}

export const TripService = {
  createTrip,
  updateTrip,
  getAllTrip,
  getSingleTrip,
  getUpComingTrip,
  getAllUpdateAbleTrip,
}

/* 
const { from, to, departure_time } = req.query;

// Aggregate pipeline
const pipeline = [
  {
    $match: {
      $and: [
        { from: from },
        { to: to },
      ],
    },
  },
  {
    $lookup: {
      from: 'trips', // Assuming your trips collection is named 'trips'
      localField: '_id',
      foreignField: 'route_id',
      as: 'trips',
    },
  },
  {
    $unwind: '$trips',
  },
  {
    $match: {
      'trips.departure_time': departure_time,
    },
  },
];

// Execute the aggregation pipeline
const result = await Route.aggregate(pipeline);

// The result will contain trips that match both route_id and departure_time

*/
