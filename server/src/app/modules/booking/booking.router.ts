import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.get('/', bookingController.getBookingController);
router.post('/', bookingController.createBookingController);
router.patch('/:bookingId', bookingController.updateBookingController);

export const BookingRoutes = router
