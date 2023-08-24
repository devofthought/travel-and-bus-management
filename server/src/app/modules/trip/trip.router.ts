import express from 'express'
import { TripValidation } from './trip.validation'
import validateRequest from '../../middlewares/validateRequest'
import { TripController } from './trip.controller'
const router = express.Router()

router.get('/', TripController.getAllTrip)
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

router.get('/:id', TripController.getSingleTrip)

export const TripRoutes = router
