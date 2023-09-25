import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { DriverController } from './driver.controller'
import { DriverValidation } from './driver.validation'

const router = express.Router()

router.get('/', DriverController.getAllDrivers)
router.patch(
  '/:id',
  validateRequest(DriverValidation.updateDriverZodSchema),
  DriverController.updateDriver
)
router.get('/:id', DriverController.getSingleDriver)

router.post('/get-available-drivers', DriverController.getAvailabledriverController)

export const DriverRouter = router
