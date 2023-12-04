import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { DriverController } from './driver.controller'
import { DriverValidation } from './driver.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get('/', auth(ENUM_USER_ROLE.ADMIN), DriverController.getAllDrivers)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(DriverValidation.updateDriverZodSchema),
  DriverController.updateDriver
)
router.get('/:id', DriverController.getSingleDriver)

router.post(
  '/get-available-drivers',
  validateRequest(DriverValidation.CheckDriverAvailableZodSchema),
  DriverController.getAvailableDriverController
)

export const DriverRouter = router
