import express from 'express'
import { BusValidation } from './bus.validation'
import validateRequest from '../../middlewares/validateRequest'
import { BusController } from './bus.controller'
import multer from '../../middlewares/multer'
const router = express.Router()

router.get('/', BusController.getAllBus)
router.post(
  '/',
  multer.array('bus_image', 3),
  validateRequest(BusValidation.createBusZodSchema),
  BusController.createBus
)

router.patch(
  '/:bus_code',
  validateRequest(BusValidation.updateBusZodSchema),
  BusController.updateBus
)
router.get('/:bus_code', BusController.getSingleBus)
router.delete('/:bus_code', BusController.deleteBus)

export const BusRoutes = router
