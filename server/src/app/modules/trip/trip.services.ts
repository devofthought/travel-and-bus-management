import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ITrip, ITripResponse } from './trip.interface'
import { Trip } from './trip.model'
import { Driver } from '../driver/driver.model'
import { Bus } from '../bus/bus.model'
import mongoose from 'mongoose'

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
    finalTrip = await Trip.findById(newTripObject._id).populate('driver_id')
  }
  return finalTrip
}

export const TripService = {
  createTrip,
}
