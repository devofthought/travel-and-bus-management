"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const booking_model_1 = require("./booking.model");
const bus_constants_1 = require("../bus/bus.constants");
const mongoose_1 = __importDefault(require("mongoose"));
const trip_model_1 = require("../trip/trip.model");
const traveler_modal_1 = require("../traveler/traveler.modal");
const user_model_1 = require("../user/user.model");
const utilities_1 = require("../../../utils/utilities");
const travellerUserInfoSend_1 = require("../../../config/emailHandle/travellerUserInfoSend");
const getBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({});
    return result;
});
/* const getSpecificBooking = async (payload: any) => {
    const result = await Booking.find(payload);
    return result;
} */
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    /* TODO: every 10min automatically delete the status pending books seat */
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { trip_id, user_id, booking_seat } = bookingData;
        /* user checking || user crate */
        let getTraveler = yield traveler_modal_1.Traveler.findOne({ email: user_id.email });
        if (!getTraveler) {
            // ** email is validation checking
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(user_id.email)) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Put a valid email address');
            }
            //array
            const newTraveler = yield traveler_modal_1.Traveler.create(user_id);
            if (!newTraveler) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create a traveler');
            }
            const user = Object.assign(Object.assign({}, user_id), { traveler_id: newTraveler._id, password: (0, utilities_1.generateRandomPassword)(), role: 'traveler' });
            const newUser = yield user_model_1.User.create(user);
            if (!newUser) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
            /* travel account centennial email function */
            (0, travellerUserInfoSend_1.travelerUserInfoSendByEmail)(user);
            getTraveler = yield traveler_modal_1.Traveler.findById(newUser.traveler_id);
        }
        if (!getTraveler) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'some thing is wrong! try again later.');
        }
        /* //* checking seat number is has or not in a bus */
        const isSeatsPresentOnBus = booking_seat.every(seat => bus_constants_1.all_seats.includes(seat));
        if (!isSeatsPresentOnBus) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'wrong seats chosen!');
        }
        /* //*user allowed to book a maximum of 4 seats */
        const bookingList = yield booking_model_1.Booking.find({
            $and: [
                { trip_id },
                {
                    travel_id: getTraveler._id,
                },
            ],
        }).select('booking_seat status user_id trip_id');
        if (bookingList.length + booking_seat.length > 4) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'your request reaches the booking limit of this trip!');
        }
        /* not allowed to book duplicate seats */
        const booksListOnTrip = yield booking_model_1.Booking.find({ trip_id }).select('booking_seat status');
        const isSeatsAvailable = booking_seat.every(seat => booksListOnTrip.some(booking => booking.booking_seat === seat));
        if (isSeatsAvailable) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'selected seats are not available!');
        }
        /* seats_available deduct on trip*/
        const request_trip = yield trip_model_1.Trip.findById(trip_id).session(session);
        if (!request_trip) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'something wrong trip is not found.');
        }
        yield trip_model_1.Trip.findByIdAndUpdate(trip_id, {
            seats_available: request_trip.seats_available - bookingData.booking_seat.length,
        }, { new: true, session });
        const newBooking = [];
        for (let i = 0; i < bookingData.booking_seat.length; i++) {
            const revisedBookingData = {
                trip_id: bookingData.trip_id,
                travel_id: getTraveler._id,
                booking_seat: bookingData.booking_seat[i],
            };
            const booking = yield booking_model_1.Booking.create([revisedBookingData], { session });
            newBooking.push(booking);
        }
        yield session.commitTransaction();
        session.endSession();
        return newBooking;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateBooking = (bookingId, statusData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBooking = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, { status: statusData.status }, { new: true });
    if (!updatedBooking) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Booking not found.');
    }
    return updatedBooking;
});
exports.bookingService = {
    createBooking,
    updateBooking,
    getBooking,
};
