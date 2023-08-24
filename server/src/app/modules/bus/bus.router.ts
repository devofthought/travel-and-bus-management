import express from 'express'
import { BusValidation } from './bus.validation'
import validateRequest from '../../middlewares/validateRequest'
import { BusController } from './bus.controller'
const router = express.Router()

router.post(
  '/',
  validateRequest(BusValidation.createBusZodSchema),
  BusController.createBus
)
export const BusRoutes = router
