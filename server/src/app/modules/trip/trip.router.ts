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

export const TripRoutes = router
