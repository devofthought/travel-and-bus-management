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
const getBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({});
    return result;
});
/* const getSpecificBooking = async (payload: any) => {
    const result = await Booking.find(payload);
    return result;
} */
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    trip_id: "",
    user_id,
    seat: ["A1","A2","A3"],
    */
    /*
    let userInfo;
    if(bookingData.user_email && bookingData.user_name){
     const userExist = await User.findOne({user_email: bookingData.user_email})
     if(userExist){
         userInfo = await authService.createTraveller({user_email: bookingData.user_email, user_name: bookingData.user_name});
     } else{
         userInfo = userExist;
     }
    }
    */
    let newBooking = [];
    for (let i = 0; i < bookingData.booking_seat.length; i++) {
        const revisedBookingData = {
            trip_id: bookingData.trip_id,
            user_id: bookingData.user_id,
            bookingSeat: bookingData.booking_seat[i],
        };
        const booking = yield booking_model_1.Booking.create(revisedBookingData);
        newBooking.push(booking);
    }
    // const newBooking = await Booking.create(bookingData);
    return newBooking;
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
