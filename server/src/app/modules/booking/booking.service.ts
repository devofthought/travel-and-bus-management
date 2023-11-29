import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { BookingCreateDTO, BookingUpdateDTO } from './booking.interface';
import { Booking } from './booking.model';
import { all_seats } from '../bus/bus.constants';
import mongoose from 'mongoose';
import { Trip } from '../trip/trip.model';

const getBooking = async (payload: any) => {
    const result = await Booking.find({});
    return result;
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
  
      /* checking seat number is has or not in a bus */
      const isSeatsPresentOnBus = booking_seat.every(seat =>
        all_seats.includes(seat)
      )
      if (!isSeatsPresentOnBus) {
        throw new ApiError(httpStatus.NOT_FOUND, 'wrong seats chosen!')
      }
  
      /* user allowed to book a maximum of 4 seats */
      const bookingList = await Booking.find({
        $and: [
          { trip_id },
          {
            user_id,
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
      if(!request_trip){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'something wrong trip is not found.');
      }
      await Trip.findByIdAndUpdate(
        trip_id,
        { seats_available: request_trip.seats_available - bookingData.booking_seat.length },
        { new: true, session }
      ); 
       
      const newBooking = []
  
      for (let i = 0; i < bookingData.booking_seat.length; i++) {
        const revisedBookingData = {
          trip_id: bookingData.trip_id,
          user_id: bookingData.user_id,
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
  
  

const updateBooking = async (bookingId: string, statusData: BookingUpdateDTO) => {
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status: statusData.status }, { new: true });

    if (!updatedBooking) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Booking not found.');
    }

    return updatedBooking;
};

export const bookingService = {
    createBooking,
    updateBooking,
    getBooking,
};

