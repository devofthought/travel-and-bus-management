import express from 'express'
import { TravelerController } from './traveler.controller'
import validateRequest from '../../middlewares/validateRequest'
import { TravelerValidation } from './traveler.validation'
const router = express.Router()

router.get('/', TravelerController.getAllTraveler)
router.patch(
  '/:id',
  validateRequest(TravelerValidation.updateTravelerZodSchema),
  TravelerController.updateTraveler
)

router.get('/:id', TravelerController.getSingleTraveler)
export const TravelerRoutes = router
