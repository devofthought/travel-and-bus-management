import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TripController } from './trip.controller'
import { TripValidation } from './trip.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.get('/', TripController.getAllTrip) //done testing
router.get(
  '/up-coming',
  auth(ENUM_USER_ROLE.USER),
  TripController.getUpComingTrip
) //done testing // for user dashboard // upcoming-trip and complete trip

router.post(
  '/',
  validateRequest(TripValidation.createTripZodSchema),
  TripController.createTrip
)
router.get('/update-able-trip', TripController.getAllUpdateAbleTrip)

router.patch(
  '/:id',
  validateRequest(TripValidation.updateTripZodSchema),
  TripController.updateTrip
) //done testing

router.get('/:id', TripController.getSingleTrip)

router.post(
  '/get-trips-by-users',
  validateRequest(TripValidation.getTripsByUsers),
  TripController.getTripsByUsersController
)
router.post(
  '/get-bus-seat-status-on-trip',
  TripController.getBusSeatStatusOnTripController
)

export const TripRoutes = router
