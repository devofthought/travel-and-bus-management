import express from 'express'
import multer from '../../middlewares/multer'
import validateRequest from '../../middlewares/validateRequest'
import { BusController } from './bus.controller'
import { BusValidation } from './bus.validation'
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

router.post('/get-available-buses', BusController.getAvailableBusController)

export const BusRoutes = router
