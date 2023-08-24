import express from 'express'
import { TripValidation } from './trip.validation'
import validateRequest from '../../middlewares/validateRequest'
import { TripController } from './trip.controller'
const router = express.Router()

router.post(
  '/',
  validateRequest(TripValidation.createTripZodSchema),
  TripController.createTrip
)

router.patch(
  '/:id',
  validateRequest(TripValidation.updateTripZodSchema),
  TripController.updateTrip
)

export const TripRoutes = router
