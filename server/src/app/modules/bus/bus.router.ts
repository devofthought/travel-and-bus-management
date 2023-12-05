import express from 'express'
import multer from '../../middlewares/multer'
import validateRequest from '../../middlewares/validateRequest'
import { BusController } from './bus.controller'
import { BusValidation } from './bus.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
const router = express.Router()

router.get('/', BusController.getAllBus)
router.post(
  '/',
  multer.array('bus_image', 3),
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BusValidation.createBusZodSchema),
  BusController.createBus
)

router.patch(
  '/image/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  multer.single('image'),
  validateRequest(BusValidation.updateBusImageZodSchema),
  BusController.updateBusImage
)

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BusValidation.updateBusZodSchema),
  BusController.updateBus
)
router.get('/:bus_code', BusController.getSingleBus)
router.delete('/:bus_code', BusController.deleteBus)

router.post(
  '/get-available-buses',
  validateRequest(BusValidation.CheckBusAvailableZodSchema),
  BusController.getAvailableBusController
)

router.post(
  '/seat-view-for-booking',
  BusController.seatViewForBookingController
)

export const BusRoutes = router
