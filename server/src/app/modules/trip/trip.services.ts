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
import {
  ITrip,
  ITripFilter,
  ITripResponse,
  ITripSP,
  ITripUserSearch,
} from './trip.interface'
import { Trip } from './trip.model'
import { User } from '../user/user.model'
import { JwtPayload } from 'jsonwebtoken'

const createTrip = async (payload: ITrip): Promise<ITripResponse | null> => {
  const driver = await VariantCreation.findAvailabilityByDepartureTime(
    { driver_code: payload.driver_code },
    payload.departure_time,
    Driver
  )
  console.log('17')
  const bus = await VariantCreation.findAvailabilityByDepartureTime(
    { bus_code: payload.bus_code },
    payload.departure_time,
    Bus
  )
  console.log('19')
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
  // payload.bus_id = bus._id.toString()
  if (payload.trips_status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not able to create a past trip')
  }

  /* add available seat on the trip */
  //  const currentBus = Bus.findById(payload.bus_id)
  //  if (currentBus) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Bus is not available')
  // }
  payload.seats_available = 40

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
    console.log('49')
    await Bus.findOneAndUpdate(
      { bus_code: newTripObject.bus_code },
      {
        $push: {
          availability_status: {
            status: 'transit',
            date: newTripObject.departure_time,
          },
        },
      },
      { session, new: true }
    )
    console.log('55')
    await Driver.findOneAndUpdate(
      { _id: newTripObject.driver_id },
      {
        $push: {
          availability_status: {
            status: 'on-trip',
            date: newTripObject.departure_time,
          },
        },
      },
      { session, new: true }
    )
    console.log('61')
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
    const driver = await VariantCreation.findAvailabilityByDepartureTime(
      { driver_code: payload.driver_code },
      payload.departure_time,
      Driver
    )
    if (driver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not found')
    }
    if (driver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver is not available')
    }
  }
  if (payload.bus_code) {
    const bus = await VariantCreation.findAvailabilityByDepartureTime(
      { bus_code: payload.bus_code },
      payload.departure_time,
      Bus
    )
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
    const update = {
      status: 'transit',
      date: payload.departure_time,
    }

    if (payload.driver_id) {
      await Bus.findOneAndUpdate(
        { bus_code: newTripObject.bus_code },
        { $push: { availability_status: update } },
        // { availability_status: 'transit' },
        { session, new: true }
      )
    }
    if (payload.driver_id) {
      await Driver.findOneAndUpdate(
        { _id: newTripObject.driver_id },
        { $push: { availability_status: update } },
        // { driving_status: 'on-trip' },
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

  const result2 = []
  for (const trip of result) {
    const bus = await Bus.findOne({ bus_code: trip.bus_code }).select(
      '_id model total_seats bus_code'
    ) // find bus_id and bus_model
    const driver = await Driver.findById(trip.driver_id).select(
      '_id driver_code'
    ) // find driver name and driver_code
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

    // console.log(bookedSeatsArray)

    result2.push({
      bus_id: bus?._id,
      bus_model: bus?.model,
      bus_code: bus?.bus_code,
      driver_id: driver?._id,
      driver_code: driver?.driver_code,
      traveling_date: trip?.createdAt,
      departure_time: trip.departure_time,
      arrival_time: trip.arrival_time,
      from: route?.from,
      to: route?.to,
      distance: route?.distance,
      fare: trip.ticket_price,
      available_seat:
        bus?.total_seats &&
        bus?.total_seats.length - bookedSeatsArray[0]?.booked_seats?.length,
      booked_seats_list: bookedSeatsArray,
      total_seat: bus?.total_seats,
      trips_status: trip.trips_status,
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip not found!')
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

// const getUpComingTrip = async (payload: IUpComingTripPayload) => {
//   const result = await Booking.find({ travel_id: payload.travel_id })

//   const uniqueBookings = Object.values(
//     result.reduce((acc, booking) => {
//       const key = booking.trip_id
//       if (!acc[key]) {
//         acc[key] = booking
//       }
//       return acc
//     }, {})
//   )

//   if (uniqueBookings.length === 0) {
//     return []
//   }

//   /*  */
//   const pendingTrip = []
//   for (const booksTrip of uniqueBookings as IBooksTrip[]) {
//     const trip = await Trip.findById(booksTrip.trip_id).populate({
//       path: 'route_id',
//       select: 'from to distance',
//     })

//     if (trip && trip.trips_status === 'pending') {
//       const seatCount = await Booking.find({
//         $and: [{ travel_id: payload.travel_id }, { trip_id: trip._id }],
//       })

//       pendingTrip.push({
//         from: trip.route_id.from,
//         to: trip.route_id.to,
//         distance: trip.route_id.distance,
//         departure_time: trip.departure_time,
//         arrival_time: trip.arrival_time,
//         bus_code: trip.bus_code,
//         fare: trip.ticket_price,
//         payment_status: booksTrip.status,
//         seat: seatCount.length,
//       })
//     }

//   }

//   return pendingTrip
// }

const getUpComingTrip = async (
  payload: any,
  userAuth: JwtPayload | null
): Promise<any> => {
  const user = await User.findById(userAuth?.id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!')
  }
  const bookings = await Booking.find({ travel_id: user.traveler_id })
  if (bookings.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No booking found!')
  }

  const uniqueBookings = Array.from(
    new Set(bookings.map(booking => booking.trip_id))
  ).map(tripId => bookings.find(booking => booking.trip_id === tripId))

  const pendingTrip = await Promise.all(
    uniqueBookings.map(async booksTrip => {
      if (booksTrip) {
        const trip: ITripSP | null = await Trip.findById(
          booksTrip.trip_id
        ).populate({
          path: 'route_id',
          select: 'from to distance',
        })

        if (trip && trip.trips_status === payload.trip_status) {
          const seatCount = await Booking.countDocuments({
            $and: [{ travel_id: user.traveler_id }, { trip_id: trip._id }],
          })

          return {
            id: trip._id,
            from: trip.route_id.from,
            to: trip.route_id.to,
            distance: trip.route_id.distance,
            departure_time: trip.departure_time,
            arrival_time: trip.arrival_time,
            bus_code: trip.bus_code,
            fare: trip.ticket_price,
            trip_status: payload.trip_status,
            payment_status: booksTrip.status,
            seats: seatCount,
            feedback: 'pending',
          }
        }
      }
      return null
    })
  )

  return pendingTrip.filter(trip => trip !== null)
}

const getTripByUser = async (info: ITripUserSearch) => {
  const { from, to, departure_time } = info
  // Aggregate pipeline
  const getRoute = await Route.findOne({
    $and: [
      { from: from.trim().toLocaleLowerCase() },
      { to: to.trim().toLocaleLowerCase() },
    ],
  })

  if (!getRoute) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No trip found')
  }
  /* 
  const dateObject = new Date(departure_time)
  dateObject.setUTCHours(23, 59, 59, 999) // Set the time to the end of the day
  const dayEnd = dateObject.toISOString()
*/

  // search depend time
  const datePart = departure_time.split('T')[0]
  const dayEnd = datePart + 'T23:59:59.999Z'

  const result = await Trip.find({
    $and: [
      { route_code: getRoute?.route_code },
      {
        departure_time: {
          $gte: departure_time,
          $lt: dayEnd,
        },
      },
    ],
  })
    .populate({
      path: 'route_id',
      select: 'from to distance',
    })
    .populate({
      path: 'driver_id',
      select: 'name driver_code',
    })
    .populate({
      path: 'bus_id',
      select: 'bus_code brand_name model',
    })

  return {
    meta: {},
    data: result,
  }
}

const getBusSeatStatusOnTrip = async (payload: {
  trip_id: string
}): Promise<any> => {
  const { trip_id } = payload
  const bookingList = await Booking.find({ trip_id }).select(
    'booking_seat status'
  )
  return bookingList
}

export const UpdateDateAndTimeFromAdminPanel = async ({
  password,
}: {
  password: string
}) => {
  if (password !== 'trip_update_admin') {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Please enter correct credentials')
  }
  const allDocuments = await Trip.find()
  if (!allDocuments || allDocuments.length === 0) {
    return false
  }

  await Promise.all(
    allDocuments.map(async document => {
      const updatedDepartureDate = new Date(document.departure_time)
      updatedDepartureDate.setDate(updatedDepartureDate.getDate() + 1)

      const updatedArrivalDate = new Date(document.arrival_time)
      updatedArrivalDate.setDate(updatedArrivalDate.getDate() + 1)

      document.departure_time = updatedDepartureDate.toISOString()
      document.arrival_time = updatedArrivalDate.toISOString()
      await document.save()
    })
  )

  return allDocuments
}

export const TripService = {
  createTrip,
  updateTrip,
  getAllTrip,
  getSingleTrip,
  getUpComingTrip,
  getAllUpdateAbleTrip,
  getTripByUser,
  getBusSeatStatusOnTrip,
  UpdateDateAndTimeFromAdminPanel,
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
