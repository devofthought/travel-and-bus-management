import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { BookingCreateDTO, BookingUpdateDTO } from './booking.interface';
import { Booking } from './booking.model';

const getBooking = async (payload: any) => {
    const result = await Booking.find({});
    return result;
}

/* const getSpecificBooking = async (payload: any) => {
    const result = await Booking.find(payload);
    return result;
} */

const createBooking = async (bookingData: BookingCreateDTO) => {

    /* 
    trip_id: "",
    user_id,
    seat: ["A1","A2","A3"],
    */
    let newBooking = [];
    for (let i = 0; i < bookingData.booking_seat.length; i++) {
        const revisedBookingData = {
            trip_id: bookingData.trip_id,
            user_id: bookingData.user_id,
            bookingSeat: bookingData.booking_seat[i],
        }
        const booking = await Booking.create(revisedBookingData);
        newBooking.push(booking);
    }
    // const newBooking = await Booking.create(bookingData);
    return newBooking;
};

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

