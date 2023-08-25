import express from 'express'
import { DriverController } from './driver.controller'
import validateRequest from '../../middlewares/validateRequest'
import { DriverValidation } from './driver.validation'

const router = express.Router()

router.get('/:id', DriverController.getSingleDriver)
router.patch(
  '/:id',
  validateRequest(DriverValidation.updateDriverZodSchema),
  DriverController.updateDriver
)
router.get('/', DriverController.getAllDrivers)

export const DriverRouter = router
