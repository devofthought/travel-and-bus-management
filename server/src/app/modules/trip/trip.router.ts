import express from 'express'
import { TripValidation } from './trip.validation'
import validateRequest from '../../middlewares/validateRequest'
import { TripController } from './trip.controller'
const router = express.Router()

router.get('/', TripController.getAllTrip)
router.get('/up-coming', TripController.getUpComingTrip)

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
