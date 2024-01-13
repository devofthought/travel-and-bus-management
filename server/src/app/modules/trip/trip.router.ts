import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TripController } from './trip.controller'
import { TripValidation } from './trip.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.get('/', auth(ENUM_USER_ROLE.ADMIN), TripController.getAllTrip) //done testing
router.get(
  '/up-coming',
  auth(ENUM_USER_ROLE.USER),
  TripController.getUpComingTrip
) //done testing // for user dashboard // upcoming-trip and complete trip

router.post(
  '/update-trip-data-and-time',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TripValidation.updateTimeZodSchema),
  TripController.UpdateDateAndTimeFromAdminPanel
)

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TripValidation.createTripZodSchema),
  TripController.createTrip
)
router.get(
  '/update-able-trip',
  auth(ENUM_USER_ROLE.ADMIN),
  TripController.getAllUpdateAbleTrip
)

router.patch(
  '/:id',
  validateRequest(TripValidation.updateTripZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  TripController.updateTrip
) //done testing

router.get('/:id', TripController.getSingleTrip)

/* public API */
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
