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
exports.bookingController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const booking_service_1 = require("./booking.service");
// Controller function to create a booking
const createBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body;
    const newBooking = yield booking_service_1.bookingService.createBooking(bookingData);
    res
        .status(201)
        .json({
        statusCode: 201,
        success: true,
        message: 'Seat booked successfully !',
        data: newBooking,
    });
}));
// Controller function to update booking status
const updateBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const { status } = req.body;
    const updatedBooking = yield booking_service_1.bookingService.updateBooking(bookingId, status);
    res.json(updatedBooking);
}));
const getBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getBooking = yield booking_service_1.bookingService.getBooking();
    res.json(getBooking);
}));
// Export the controller functions with error handling
exports.bookingController = {
    createBookingController,
    updateBookingController,
    getBookingController,
};
