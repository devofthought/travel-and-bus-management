import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.get('/', bookingController.getBookingController);
router.post('/', bookingController.getBookingController);
router.patch('/:bookingId', bookingController.getBookingController);

export const BookingRoutes = router
