import express from 'express'
import { DriverController } from './driver.controller'
import validateRequest from '../../middlewares/validateRequest'
import { DriverValidation } from './driver.validation'

const router = express.Router()

router.get('/', DriverController.getAllDrivers)
router.patch(
  '/:id',
  validateRequest(DriverValidation.updateDriverZodSchema),
  DriverController.updateDriver
)
router.get('/:id', DriverController.getSingleDriver)

export const DriverRouter = router
