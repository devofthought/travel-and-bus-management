import express from 'express'
import { ReserveBusValidation } from './reserveBus.validation'
import validateRequest from '../../middlewares/validateRequest'
import { ReserveBusController } from './reserveBus.controller'
const router = express.Router()

router.get('/', ReserveBusController.getAllReserveBus)
router.post(
  '/',
  validateRequest(ReserveBusValidation.createReserveBusZodSchema),
  ReserveBusController.reserveBusRequest
)
router.patch(
  '/:id',
  validateRequest(ReserveBusValidation.updateReserveBusZodSchema),
  ReserveBusController.updateReserveBus
)

router.get('/:user_id', ReserveBusController.getSingleUserReserveBus)
router.delete('/:id', ReserveBusController.deleteReserveBus)

export const ReserveBusRoutes = router
