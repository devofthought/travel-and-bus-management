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
    const newBooking = await Booking.create(bookingData);
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

