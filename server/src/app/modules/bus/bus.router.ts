import express from 'express'
import { BusValidation } from './bus.validation'
import validateRequest from '../../middlewares/validateRequest'
import { BusController } from './bus.controller'
const router = express.Router()

router.get('/', BusController.getAllBus)
router.post(
  '/',
  validateRequest(BusValidation.createBusZodSchema),
  BusController.createBus
)
router.get('/:bus_code', BusController.getSingleBus)
export const BusRoutes = router
