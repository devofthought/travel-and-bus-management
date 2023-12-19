import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { BookingCreateDTO } from './booking.interface'
import { bookingService } from './booking.service'

// Controller function to create a booking
const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const bookingData: BookingCreateDTO = req.body
    const newBooking = await bookingService.createBooking(bookingData)
    res
      .status(201)
      .json({
        statusCode: 201,
        success: true,
        message: 'Seat booked successfully !',
        data: newBooking,
      })
  }
)

// Controller function to update booking status
const updateBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const { bookingId } = req.params
    const { status } = req.body

    const updatedBooking = await bookingService.updateBooking(bookingId, status)

    res.json(updatedBooking)
  }
)

const getBookingController = catchAsync(async (req: Request, res: Response) => {
  const getBooking = await bookingService.getBooking()
  res.json(getBooking)
})

// Export the controller functions with error handling
export const bookingController = {
  createBookingController,
  updateBookingController,
  getBookingController,
}
