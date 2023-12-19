import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { BookingCreateDTO, BookingUpdateDTO } from './booking.interface'
import { Booking } from './booking.model'
import { all_seats } from '../bus/bus.constants'
import mongoose from 'mongoose'
import { Trip } from '../trip/trip.model'
import { Traveler } from '../traveler/traveler.modal'
import { User } from '../user/user.model'
import { generateRandomPassword } from '../../../utils/utilities'
import { travelerUserInfoSendByEmail } from '../../../config/emailHandle/travellerUserInfoSend'

const getBooking = async () => {
  const result = await Booking.find({})
  return result
}

/* const getSpecificBooking = async (payload: any) => {
    const result = await Booking.find(payload);
    return result;
} */

const createBooking = async (bookingData: BookingCreateDTO) => {
  /* TODO: every 10min automatically delete the status pending books seat */

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const { trip_id, user_id, booking_seat } = bookingData

    /* user checking || user crate */
    let getTraveler = await Traveler.findOne({ email: user_id.email })
    if (!getTraveler) {
      // ** email is validation checking
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(user_id.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Put a valid email address')
      }

      //array
      const newTraveler = await Traveler.create(user_id)
      if (!newTraveler) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Failed to create a traveler'
        )
      }

      const user = {
        ...user_id,
        traveler_id: newTraveler._id,
        password: generateRandomPassword(),
        role: 'traveler',
      }

      const newUser = await User.create(user)

      if (!newUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
      }
      /* travel account centennial email function */
      travelerUserInfoSendByEmail(user)

      getTraveler = await Traveler.findById(newUser.traveler_id)
    }

    if (!getTraveler) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'some thing is wrong! try again later.'
      )
    }

    /* //* checking seat number is has or not in a bus */
    const isSeatsPresentOnBus = booking_seat.every(seat =>
      all_seats.includes(seat)
    )
    if (!isSeatsPresentOnBus) {
      throw new ApiError(httpStatus.NOT_FOUND, 'wrong seats chosen!')
    }

    /* //*user allowed to book a maximum of 4 seats */
    const bookingList = await Booking.find({
      $and: [
        { trip_id },
        {
          travel_id: getTraveler._id,
        },
      ],
    }).select('booking_seat status user_id trip_id')

    if (bookingList.length + booking_seat.length > 4) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'your request reaches the booking limit of this trip!'
      )
    }

    /* not allowed to book duplicate seats */
    const booksListOnTrip = await Booking.find({ trip_id }).select(
      'booking_seat status'
    )
    const isSeatsAvailable = booking_seat.every(seat =>
      booksListOnTrip.some(booking => booking.booking_seat === seat)
    )
    if (isSeatsAvailable) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'selected seats are not available!'
      )
    }

    /* seats_available deduct on trip*/
    const request_trip = await Trip.findById(trip_id).session(session)
    if (!request_trip) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'something wrong trip is not found.'
      )
    }
    await Trip.findByIdAndUpdate(
      trip_id,
      {
        seats_available:
          request_trip.seats_available - bookingData.booking_seat.length,
      },
      { new: true, session }
    )

    const newBooking = []

    for (let i = 0; i < bookingData.booking_seat.length; i++) {
      const revisedBookingData = {
        trip_id: bookingData.trip_id,
        travel_id: getTraveler._id,
        booking_seat: bookingData.booking_seat[i],
      }
      const booking = await Booking.create([revisedBookingData], { session })
      newBooking.push(booking)
    }

    await session.commitTransaction()
    session.endSession()

    return newBooking
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const updateBooking = async (
  bookingId: string,
  statusData: BookingUpdateDTO
) => {
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: statusData.status },
    { new: true }
  )

  if (!updatedBooking) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Booking not found.')
  }

  return updatedBooking
}

export const bookingService = {
  createBooking,
  updateBooking,
  getBooking,
}
